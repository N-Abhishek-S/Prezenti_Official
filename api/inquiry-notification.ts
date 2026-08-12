/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';

interface ApiRequest {
  method?: string;
  headers: {
    origin?: string;
    referer?: string;
    [key: string]: string | string[] | undefined;
  };
  socket?: { remoteAddress?: string };
  body?: unknown;
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(statusCode: number): ApiResponse;
  end(): void;
  json(body: unknown): void;
}

const allowedServices = [
  'Housekeeping',
  'Office Assistant',
  'Facility Supervisor',
  'Receptionist',
];

// Mirrors the fixed categoryOptions list in TalkToExpertForm.tsx.
const allowedCategories = [
  'Offices / Corporate / Educational Institute',
  'Commercial Buildings',
  'Residential Buildings',
  'Hospital / Healthcare',
  'Cafes / Restaurants',
  'Pre Schools',
];

const successMessage = 'Inquiry sent successfully. Our team has been notified.';
const requestTimeoutMs = 18_000;
const maxJsonBodyBytes = 32_000;

const fieldLimits = {
  fullName: 100,
  mobileNumber: 20,
  email: 254,
  companyName: 150,
  location: 150,
  requiredStartDate: 10,
  serviceItem: 60,
  categoryItem: 80,
  additionalRequirement: 2000,
} as const;

const maxServices = 8;
const maxCategories = 4;

// --- Abuse protection state -------------------------------------------------
// Per-instance rate limiting. Not globally distributed across serverless
// instances — each warm Vercel Fluid Compute instance keeps its own counters,
// so an attacker hitting multiple cold-started instances in parallel sees a
// higher effective limit than the numbers below suggest. This is still real,
// dependency-free protection against a single scripted client, not a
// distributed guarantee. A shared store (e.g. Upstash Redis via the Vercel
// Marketplace) would close that gap; it is not added here since it is new
// infrastructure this repository doesn't already depend on.
const RATE_LIMIT_WINDOW_MS = 15 * 60_000;
const RATE_LIMIT_MAX_PER_WINDOW = 5;
const RATE_LIMIT_MIN_GAP_MS = 15_000;
const SUBMISSION_ID_TTL_MS = 10 * 60_000;
const MAX_TRACKED_IPS = 5_000;

const requestLogByIp = new Map<string, number[]>();
const seenSubmissionIds = new Map<string, number>();

function pruneRequestLog(ip: string, now: number): number[] {
  const timestamps = (requestLogByIp.get(ip) ?? []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  requestLogByIp.set(ip, timestamps);
  return timestamps;
}

function pruneSubmissionIds(now: number) {
  for (const [id, seenAt] of seenSubmissionIds) {
    if (now - seenAt > SUBMISSION_ID_TTL_MS) {
      seenSubmissionIds.delete(id);
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();

  if (requestLogByIp.size > MAX_TRACKED_IPS) {
    requestLogByIp.clear();
  }

  const timestamps = pruneRequestLog(ip, now);
  const lastRequest = timestamps[timestamps.length - 1];

  if (lastRequest && now - lastRequest < RATE_LIMIT_MIN_GAP_MS) {
    return { allowed: false, reason: 'TOO_FAST' };
  }

  if (timestamps.length >= RATE_LIMIT_MAX_PER_WINDOW) {
    return { allowed: false, reason: 'TOO_MANY' };
  }

  timestamps.push(now);
  requestLogByIp.set(ip, timestamps);
  return { allowed: true };
}

function isDuplicateSubmission(submissionId: string | undefined): boolean {
  if (!submissionId) return false;

  const now = Date.now();
  pruneSubmissionIds(now);

  if (seenSubmissionIds.has(submissionId)) {
    return true;
  }

  seenSubmissionIds.set(submissionId, now);
  return false;
}

function getClientIp(request: ApiRequest): string {
  // Vercel's edge is the only hop in front of this function. Standard proxy
  // behavior is that each hop APPENDS its own address to the end of
  // X-Forwarded-For, so the LAST entry is the one Vercel's own infrastructure
  // set and the FIRST entry can be arbitrary client-supplied input. Trusting
  // the first entry made the rate limiter trivially bypassable (an attacker
  // just sends a different fake X-Forwarded-For on every request). x-real-ip,
  // when present, is set directly by Vercel to the single connecting IP and
  // is preferred when available.
  const realIp = request.headers['x-real-ip'];
  const realIpValue = Array.isArray(realIp) ? realIp[0] : realIp;

  if (realIpValue) {
    return realIpValue.trim();
  }

  const forwarded = request.headers['x-forwarded-for'];
  const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;

  if (forwardedValue) {
    const hops = forwardedValue.split(',').map((hop) => hop.trim()).filter(Boolean);
    return hops[hops.length - 1] || 'unknown';
  }

  return request.socket?.remoteAddress || 'unknown';
}

// -----------------------------------------------------------------------------

interface ExpertInquiryFormValues {
  fullName: string;
  mobileNumber: string;
  email: string;
  companyName: string;
  location: string;
  requiredStartDate: string;
  services: string[];
  categories: string[];
  additionalRequirement: string;
}

interface InquiryRequestBody extends ExpertInquiryFormValues {
  submissionId?: string;
  submittedAt?: string;
  // Honeypot: a field real users never see or fill. Any non-empty value here
  // marks the request as automated; we accept the request outward (so the
  // bot gets no useful error signal) but never dispatch a notification.
  website?: string;
}

type InquiryFormErrors = Partial<Record<keyof ExpertInquiryFormValues, string>>;

interface NotificationConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  emailTo: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioWhatsAppFrom: string;
  twilioWhatsAppTo: string;
  twilioContentSid: string;
}

function resolveAllowedOrigin(): string | undefined {
  const configured = process.env.INQUIRY_ALLOWED_ORIGIN;
  return configured || undefined;
}

/**
 * Sets CORS headers AND returns whether this request is authorized to
 * proceed. Setting a CORS header alone does not stop a non-browser client
 * (curl, a script) from reaching this handler — the previous version only
 * gated the header and let every request through regardless of Origin.
 */
function enforceOrigin(request: ApiRequest, response: ApiResponse): boolean {
  const allowedOrigin = resolveAllowedOrigin();
  const requestOrigin = request.headers.origin;

  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  response.setHeader('Vary', 'Origin');

  if (!allowedOrigin) {
    // No allowlist configured: cannot safely restrict by origin, so we don't
    // set Access-Control-Allow-Origin (browser fetches from other origins
    // will be blocked client-side) but we don't reject server-side either,
    // since a same-origin server-rendered form has no Origin header to check.
    return true;
  }

  if (!requestOrigin) {
    // Same-origin requests and some non-browser tooling omit Origin. We allow
    // this rather than block legitimate same-origin submissions, and rely on
    // rate limiting / honeypot / validation as defense in depth.
    return true;
  }

  if (requestOrigin === allowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', requestOrigin);
    return true;
  }

  return false;
}

function getConfig(): NotificationConfig {
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER || '';

  return {
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: Number.isFinite(smtpPort) ? smtpPort : 587,
    smtpUser,
    smtpPass: process.env.SMTP_PASS || '',
    emailTo: process.env.INQUIRY_EMAIL_TO || smtpUser,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    twilioWhatsAppFrom: process.env.TWILIO_WHATSAPP_FROM || '',
    twilioWhatsAppTo: process.env.TWILIO_WHATSAPP_TO || '',
    twilioContentSid: process.env.TWILIO_CONTENT_SID || '',
  };
}

function assertConfig(config: NotificationConfig) {
  const missing = [
    ['SMTP_USER', config.smtpUser],
    ['SMTP_PASS', config.smtpPass],
    ['INQUIRY_EMAIL_TO or SMTP_USER', config.emailTo],
    ['TWILIO_ACCOUNT_SID', config.twilioAccountSid],
    ['TWILIO_AUTH_TOKEN', config.twilioAuthToken],
    ['TWILIO_WHATSAPP_FROM', config.twilioWhatsAppFrom],
    ['TWILIO_WHATSAPP_TO', config.twilioWhatsAppTo],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    // Detail stays server-side only; callers never learn which var is missing.
    throw new Error(`Missing notification configuration: ${missing.map(([key]) => key).join(', ')}`);
  }
}

function readBody(body: unknown): Partial<InquiryRequestBody> {
  if (typeof body === 'string') {
    if (body.length > maxJsonBodyBytes) {
      throw new Error('Request body is too large.');
    }

    return JSON.parse(body) as Partial<InquiryRequestBody>;
  }

  if (body && typeof body === 'object') {
    if (JSON.stringify(body).length > maxJsonBodyBytes) {
      throw new Error('Request body is too large.');
    }

    return body as Partial<InquiryRequestBody>;
  }

  return {};
}

function clamp(value: string, maxLength: number) {
  return value.slice(0, maxLength);
}

function normalizeBody(body: Partial<InquiryRequestBody>): ExpertInquiryFormValues {
  return {
    fullName: clamp(String(body.fullName || ''), fieldLimits.fullName),
    mobileNumber: clamp(String(body.mobileNumber || ''), fieldLimits.mobileNumber),
    email: clamp(String(body.email || ''), fieldLimits.email),
    companyName: clamp(String(body.companyName || ''), fieldLimits.companyName),
    location: clamp(String(body.location || ''), fieldLimits.location),
    requiredStartDate: clamp(String(body.requiredStartDate || ''), fieldLimits.requiredStartDate),
    services: Array.isArray(body.services)
      ? body.services.slice(0, maxServices).map((service) => clamp(String(service), fieldLimits.serviceItem))
      : [],
    categories: Array.isArray(body.categories)
      ? body.categories.slice(0, maxCategories).map((category) => clamp(String(category), fieldLimits.categoryItem))
      : [],
    additionalRequirement: clamp(String(body.additionalRequirement || ''), fieldLimits.additionalRequirement),
  };
}

function getTodayDateValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function sanitizeText(value: string) {
  let output = '';

  for (const char of value) {
    const code = char.charCodeAt(0);
    output += code < 32 || code === 127 ? ' ' : char;
  }

  return output.replace(/[<>]/g, '').trim();
}

function sanitizeMultilineText(value: string) {
  let output = '';

  for (const char of value) {
    const code = char.charCodeAt(0);
    const allowedWhitespace = char === '\n' || char === '\r' || char === '\t';
    output += code < 32 || code === 127 ? (allowedWhitespace ? char : ' ') : char;
  }

  return output
    .replace(/[<>]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeIndianMobile(value: string) {
  return value.replace(/[\s()-]/g, '').trim();
}

function isValidIndianMobile(value: string) {
  return /^(?:\+91|91)?[6-9]\d{9}$/.test(normalizeIndianMobile(value));
}

function sanitizeInquiryForm(values: ExpertInquiryFormValues): ExpertInquiryFormValues {
  return {
    fullName: sanitizeText(values.fullName).replace(/\s+/g, ' '),
    mobileNumber: normalizeIndianMobile(values.mobileNumber),
    email: sanitizeText(values.email).replace(/\s+/g, '').toLowerCase(),
    companyName: sanitizeText(values.companyName).replace(/\s+/g, ' '),
    location: sanitizeText(values.location).replace(/\s+/g, ' '),
    requiredStartDate: values.requiredStartDate.trim(),
    services: values.services.map((service) => sanitizeText(service).replace(/\s+/g, ' ')).filter(Boolean).slice(0, maxServices),
    categories: values.categories ? values.categories.map((category) => sanitizeText(category).replace(/\s+/g, ' ')).filter(Boolean).slice(0, maxCategories) : [],
    additionalRequirement: sanitizeMultilineText(values.additionalRequirement),
  };
}

function validateInquiryForm(
  values: ExpertInquiryFormValues,
  availableServices: string[] = [],
  availableCategories: string[] = [],
) {
  const sanitized = sanitizeInquiryForm(values);
  const errors: InquiryFormErrors = {};
  const activeServiceNames = new Set(availableServices.map((service) => service.toLowerCase()));
  const activeCategoryNames = new Set(availableCategories.map((category) => category.toLowerCase()));

  if (sanitized.fullName.length < 2 || sanitized.fullName.length > fieldLimits.fullName) {
    errors.fullName = 'Enter full name.';
  }

  if (!isValidIndianMobile(sanitized.mobileNumber)) {
    errors.mobileNumber = 'Enter a valid Indian mobile number.';
  }

  if (
    sanitized.email.length > fieldLimits.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized.email)
  ) {
    errors.email = 'Enter a valid email address.';
  }

  if (sanitized.companyName.length < 2 || sanitized.companyName.length > fieldLimits.companyName) {
    errors.companyName = 'Enter company name.';
  }

  if (sanitized.location.length < 2 || sanitized.location.length > fieldLimits.location) {
    errors.location = 'Enter location or area.';
  }

  if (!sanitized.requiredStartDate || !/^\d{4}-\d{2}-\d{2}$/.test(sanitized.requiredStartDate)) {
    errors.requiredStartDate = 'Select required start date.';
  } else if (sanitized.requiredStartDate < getTodayDateValue()) {
    errors.requiredStartDate = 'Date cannot be in the past.';
  }

  if (sanitized.services.length === 0) {
    errors.services = 'Select at least one service.';
  } else if (activeServiceNames.size > 0 && sanitized.services.some((service) => !activeServiceNames.has(service.toLowerCase()))) {
    errors.services = 'Choose a currently active service.';
  }

  if (activeCategoryNames.size > 0 && sanitized.categories.some((category) => !activeCategoryNames.has(category.toLowerCase()))) {
    errors.categories = 'Choose a valid facility category.';
  }

  if (sanitized.additionalRequirement.length < 5 || sanitized.additionalRequirement.length > fieldLimits.additionalRequirement) {
    errors.additionalRequirement = 'Add a short requirement.';
  }

  return { sanitized, errors, isValid: Object.keys(errors).length === 0 };
}

function formatTimestamp(submittedAt?: string) {
  const date = submittedAt ? new Date(submittedAt) : new Date();
  const validDate = Number.isNaN(date.getTime()) ? new Date() : date;

  return validDate.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });
}

function getDisplayValue(value: string, fallback: string) {
  const trimmed = value.trim();
  return trimmed || fallback;
}

function getSelectedServices(payload: ExpertInquiryFormValues) {
  return payload.services.length > 0 ? payload.services.join(', ') : 'No services selected.';
}

function formatDisplayDate(value: string) {
  const date = new Date(`${value}T00:00:00+05:30`);

  if (!value || Number.isNaN(date.getTime())) {
    return 'Not specified.';
  }

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailBody(payload: ExpertInquiryFormValues, timestamp: string) {
  const selectedServices = getSelectedServices(payload);
  const additionalRequirement = getDisplayValue(payload.additionalRequirement, 'No additional requirement provided.');

  return [
    'New Business Inquiry | Prezenti',
    '',
    'Hello Team,',
    '',
    'A new business inquiry has been submitted through the Prezenti website.',
    '',
    'Customer Information:',
    `Full Name: ${payload.fullName}`,
    `Mobile Number: ${payload.mobileNumber}`,
    `Email Address: ${payload.email}`,
    `Company Name: ${payload.companyName}`,
    `Location / Area: ${payload.location}`,
    '',
    'Service Requirement:',
    `Required Start Date: ${formatDisplayDate(payload.requiredStartDate)}`,
    `Selected Services: ${selectedServices}`,
    '',
    'Additional Requirement:',
    additionalRequirement,
    '',
    'Submission Details:',
    'Source: Prezenti Website - Talk To Expert',
    `Submitted At: ${timestamp}`,
    '',
    'Please review this inquiry and connect with the customer at the earliest convenience.',
    '',
    'Regards,',
    'Prezenti Automated Notification System',
  ].join('\n');
}

function buildEmailHtmlBody(payload: ExpertInquiryFormValues, timestamp: string) {
  const selectedServices = getSelectedServices(payload);
  const additionalRequirement = getDisplayValue(payload.additionalRequirement, 'No additional requirement provided.');
  const requiredStartDate = formatDisplayDate(payload.requiredStartDate);

  const customerRows = [
    ['Full Name', payload.fullName],
    ['Mobile Number', payload.mobileNumber],
    ['Email Address', payload.email],
    ['Company Name', payload.companyName],
    ['Location / Area', payload.location],
  ];
  const serviceRows = [
    ['Required Start Date', requiredStartDate],
    ['Selected Services', selectedServices],
    ['Selected Categories', payload.categories.join(', ') || 'None'],
  ];
  const submissionRows = [
    ['Source', 'Prezenti Website - Talk To Expert'],
    ['Submitted At', timestamp],
  ];

  const renderRows = (rows: string[][]) => rows.map(([label, value]) => `
                    <tr>
                      <td style="padding: 8px 0; color: #475569; font-size: 14px; width: 180px;">${escapeHtml(label)}</td>
                      <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(value)}</td>
                    </tr>`).join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Business Inquiry | Prezenti</title>
  </head>
  <body style="margin: 0; padding: 0; background: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f8fafc; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 680px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <tr>
              <td style="background: #0f172a; padding: 24px 28px;">
                <div style="color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 0.2px;">Prezenti</div>
                <div style="color: #cbd5e1; font-size: 14px; margin-top: 6px;">New Business Inquiry</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 28px;">
                <p style="margin: 0 0 14px; font-size: 15px; line-height: 1.6;">Hello Team,</p>
                <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6;">A new business inquiry has been submitted through the Prezenti website.</p>

                <h2 style="margin: 0 0 10px; font-size: 16px; color: #0f172a;">Customer Information</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-bottom: 24px;">
                  ${renderRows(customerRows)}
                </table>

                <h2 style="margin: 0 0 10px; font-size: 16px; color: #0f172a;">Service Requirement</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-bottom: 24px;">
                  ${renderRows(serviceRows)}
                </table>

                <h2 style="margin: 0 0 10px; font-size: 16px; color: #0f172a;">Additional Requirement</h2>
                <p style="margin: 0 0 24px; padding: 14px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-line;">${escapeHtml(additionalRequirement)}</p>

                <h2 style="margin: 0 0 10px; font-size: 16px; color: #0f172a;">Submission Details</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-bottom: 24px;">
                  ${renderRows(submissionRows)}
                </table>

                <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6;">Please review this inquiry and connect with the customer at the earliest convenience.</p>
                <p style="margin: 0; font-size: 15px; line-height: 1.6;">Regards,<br><strong>Prezenti Automated Notification System</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildWhatsAppBody(payload: ExpertInquiryFormValues, timestamp: string) {
  const selectedServices = getSelectedServices(payload);
  const additionalRequirement = getDisplayValue(payload.additionalRequirement, 'No additional requirement provided.');

  return [
    '*New Business Inquiry | Prezenti*',
    '',
    'A new customer inquiry has been received through the Prezenti website.',
    '',
    '👤 *Customer Details*',
    `Name: ${payload.fullName}`,
    `Mobile: ${payload.mobileNumber}`,
    `Email: ${payload.email}`,
    `Company: ${payload.companyName}`,
    `Location: ${payload.location}`,
    '',
    '🛠 *Service Requirement*',
    `Required Start Date: ${formatDisplayDate(payload.requiredStartDate)}`,
    `Selected Services: ${selectedServices}`,
    '',
    '📝 *Additional Requirement*',
    additionalRequirement,
    '',
    '📌 Source: Prezenti Website',
    `🕒 Submitted: ${timestamp}`,
    '',
    'Please follow up with the customer promptly.',
  ].join('\n');
}

function buildWhatsAppContentVariables(payload: ExpertInquiryFormValues, timestamp: string) {
  return JSON.stringify({
    1: payload.fullName,
    2: payload.mobileNumber,
    3: payload.email,
    4: payload.companyName,
    5: payload.location,
    6: formatDisplayDate(payload.requiredStartDate),
    7: getSelectedServices(payload),
    8: getDisplayValue(payload.additionalRequirement, 'No additional requirement provided.'),
    9: 'Prezenti Website',
    10: timestamp,
  });
}

async function withTimeout<T>(operation: Promise<T>, message: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), requestTimeoutMs);
  });

  try {
    return await Promise.race([operation, timeout]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

async function sendEmail(config: NotificationConfig, payload: ExpertInquiryFormValues, timestamp: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
      connectionTimeout: requestTimeoutMs,
      greetingTimeout: requestTimeoutMs,
      socketTimeout: requestTimeoutMs,
    });

    const info = await withTimeout(
      transporter.sendMail({
        from: `"Prezenti Website" <${config.smtpUser}>`,
        to: config.emailTo,
        replyTo: payload.email,
        subject: 'New Business Inquiry | Prezenti',
        text: buildEmailBody(payload, timestamp),
        html: buildEmailHtmlBody(payload, timestamp),
      }),
      'Email notification timed out.',
    );
    console.log('[SMTP SUCCESS]');
    return info;
  } catch (err: any) {
    // Log full detail server-side only; callers only ever see a generic message (see handler).
    console.error('[SMTP ERROR]', err.message);
    throw { stage: 'SMTP', error: err.message || 'Authentication or network failed' };
  }
}

async function sendWhatsApp(config: NotificationConfig, payload: ExpertInquiryFormValues, timestamp: string) {
  try {
    const body = buildWhatsAppBody(payload, timestamp);

    if (config.twilioContentSid) {
      try {
        const result = await withTimeout(
          sendTwilioMessage(config, {
            from: config.twilioWhatsAppFrom,
            to: config.twilioWhatsAppTo,
            contentSid: config.twilioContentSid,
            contentVariables: buildWhatsAppContentVariables(payload, timestamp),
          }),
          'WhatsApp template notification timed out.',
        );
        console.log('[TWILIO SUCCESS] (template)');
        return result;
      } catch (error: any) {
        console.error('[TWILIO WARNING] Content API notification failed; falling back to direct body:', error.message);
      }
    }

    const result = await withTimeout(
      sendTwilioMessage(config, {
        from: config.twilioWhatsAppFrom,
        to: config.twilioWhatsAppTo,
        body,
      }),
      'WhatsApp notification timed out.',
    );
    console.log('[TWILIO SUCCESS]');
    return result;
  } catch (err: any) {
    console.error('[TWILIO ERROR]', err.message);
    throw { stage: 'TWILIO', error: err.message || 'Twilio API failed' };
  }
}

async function sendTwilioMessage(
  config: NotificationConfig,
  message: {
    from: string;
    to: string;
    body?: string;
    contentSid?: string;
    contentVariables?: string;
  },
) {
  const params = new URLSearchParams({
    From: message.from,
    To: message.to,
  });

  if (message.contentSid) {
    params.set('ContentSid', message.contentSid);
  }

  if (message.contentVariables) {
    params.set('ContentVariables', message.contentVariables);
  }

  if (message.body) {
    params.set('Body', message.body);
  }

  // Never log this value: it is the Basic-auth credential for the Twilio API.
  const credentials = Buffer.from(`${config.twilioAccountSid}:${config.twilioAuthToken}`).toString('base64');
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.twilioAccountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!response.ok) {
    // Twilio error bodies can restate account SID / phone numbers / other
    // account detail. Extract only the numeric error code (safe, operationally
    // useful for looking up the error in Twilio's docs) and discard the rest,
    // even from the server-side log.
    const errorBody = await response.text();
    let twilioErrorCode: unknown;
    try {
      twilioErrorCode = JSON.parse(errorBody)?.code;
    } catch {
      twilioErrorCode = undefined;
    }
    console.error('[TWILIO HTTP ERROR]', response.status, twilioErrorCode ?? 'unknown');
    throw new Error(`Twilio message request failed with status ${response.status}.`);
  }

  return response.json();
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const originOk = enforceOrigin(request, response);

  if (request.method === 'OPTIONS') {
    return response.status(204).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  if (!originOk) {
    return response.status(403).json({ success: false, message: 'Request origin is not allowed.' });
  }

  const contentType = request.headers['content-type'];
  const contentTypeValue = Array.isArray(contentType) ? contentType[0] : contentType;

  if (!contentTypeValue || !contentTypeValue.toLowerCase().includes('application/json')) {
    return response.status(415).json({ success: false, message: 'Content-Type must be application/json.' });
  }

  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    console.warn('[RATE LIMIT]', rateLimit.reason, 'ip:', clientIp);
    return response.status(429).json({
      success: false,
      message: 'Too many inquiries submitted recently. Please try again in a few minutes.',
    });
  }

  let requestBody: Partial<InquiryRequestBody>;
  let normalized: ExpertInquiryFormValues;
  let validation: ReturnType<typeof validateInquiryForm>;
  let config: NotificationConfig;

  try {
    requestBody = readBody(request.body);
  } catch (error: any) {
    console.warn('[BODY READ ERROR]', error?.message);
    return response.status(400).json({ success: false, stage: 'VALIDATION', error: 'Invalid request body.' });
  }

  // Honeypot: a real visitor never populates this field. Accept quietly
  // without sending any notification, so scripted submitters get no signal
  // that they were detected.
  if (typeof requestBody.website === 'string' && requestBody.website.trim() !== '') {
    console.warn('[HONEYPOT] Rejected automated submission.');
    return response.status(200).json({ success: true, message: successMessage });
  }

  if (isDuplicateSubmission(requestBody.submissionId)) {
    return response.status(200).json({ success: true, message: successMessage });
  }

  try {
    normalized = normalizeBody(requestBody);
    validation = validateInquiryForm(normalized, allowedServices, allowedCategories);

    if (!validation.isValid) {
      return response.status(400).json({ success: false, stage: 'VALIDATION', error: 'Payload validation failed', details: validation.errors });
    }
  } catch (error: any) {
    console.error('[BODY VALIDATION ERROR]', error?.message);
    return response.status(400).json({ success: false, stage: 'VALIDATION', error: 'Unable to process request.' });
  }

  try {
    config = getConfig();
    assertConfig(config);
  } catch (error: any) {
    console.error('[CONFIG ERROR]', error.message);
    return response.status(500).json({ success: false, stage: 'CONFIGURATION', error: 'Service is temporarily unavailable.' });
  }

  try {
    const timestamp = formatTimestamp(requestBody.submittedAt);

    const emailPromise = sendEmail(config, validation.sanitized, timestamp);
    const twilioPromise = sendWhatsApp(config, validation.sanitized, timestamp);

    const [emailResult, twilioResult] = await Promise.allSettled([emailPromise, twilioPromise]);

    const emailSent = emailResult.status === 'fulfilled';
    const twilioSent = twilioResult.status === 'fulfilled';

    if (!emailSent) {
      console.error('[SMTP RESULT] Failed:', JSON.stringify(emailResult.reason));
    }
    if (!twilioSent) {
      console.error('[TWILIO RESULT] Failed:', JSON.stringify(twilioResult.reason));
    }

    if (!emailSent && !twilioSent) {
      console.error('[DELIVERY FAILURE] Both Email and WhatsApp failed.');
      return response.status(502).json({
        success: false,
        stage: 'DELIVERY',
        message: 'We could not deliver your inquiry right now. Please try again shortly or contact us directly.',
      });
    }

    if (!emailSent && twilioSent) {
      return response.status(200).json({
        success: true,
        message: 'Inquiry was sent via WhatsApp. Email notification is delayed.',
        stage: 'SMTP_FALLBACK',
      });
    }

    if (emailSent && !twilioSent) {
      return response.status(200).json({
        success: true,
        message: 'Inquiry was sent to our email team. WhatsApp notification is delayed.',
        stage: 'TWILIO_FALLBACK',
      });
    }

    return response.status(200).json({ success: true, message: successMessage });
  } catch (error: any) {
    console.error('[CRITICAL HANDLER ERROR]', error?.message || error);
    return response.status(500).json({ success: false, stage: 'INTERNAL', error: 'Unable to process your inquiry right now.' });
  }
}
