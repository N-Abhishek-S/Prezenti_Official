/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

interface ApiRequest {
  method?: string;
  headers: {
    origin?: string;
  };
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

const successMessage = 'Inquiry received successfully. Our team has been notified.';
const requestTimeoutMs = 18_000;
const maxJsonBodyBytes = 32_000;

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
}

type InquiryFormErrors = Partial<Record<keyof ExpertInquiryFormValues, string>>;

interface NotificationConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  supabaseUrl: string;
  supabaseKey: string;
  emailTo: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioWhatsAppFrom: string;
  twilioWhatsAppTo: string;
  twilioContentSid: string;
}

function setCorsHeaders(request: ApiRequest, response: ApiResponse) {
  const allowedOrigin = process.env.INQUIRY_ALLOWED_ORIGIN;
  const requestOrigin = request.headers.origin;

  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  response.setHeader('Vary', 'Origin');

  if (!requestOrigin) {
    return;
  }

  if (allowedOrigin && requestOrigin === allowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', requestOrigin);
  }
}

function getConfig(): NotificationConfig {
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER || '';

  return {
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: Number.isFinite(smtpPort) ? smtpPort : 587,
    smtpUser,
    smtpPass: process.env.SMTP_PASS || '',
    supabaseUrl: process.env.VITE_SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '',
    emailTo: process.env.INQUIRY_EMAIL_TO || '',
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
    ['VITE_SUPABASE_URL', config.supabaseUrl],
    ['SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY', config.supabaseKey],
    ['INQUIRY_EMAIL_TO', config.emailTo],
    ['TWILIO_ACCOUNT_SID', config.twilioAccountSid],
    ['TWILIO_AUTH_TOKEN', config.twilioAuthToken],
    ['TWILIO_WHATSAPP_FROM', config.twilioWhatsAppFrom],
    ['TWILIO_WHATSAPP_TO', config.twilioWhatsAppTo],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    throw new Error(`Missing configuration: ${missing.map(([key]) => key).join(', ')}`);
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
    return body as Partial<InquiryRequestBody>;
  }

  return {};
}

function normalizeBody(body: Partial<InquiryRequestBody>): ExpertInquiryFormValues {
  return {
    fullName: String(body.fullName || ''),
    mobileNumber: String(body.mobileNumber || ''),
    email: String(body.email || ''),
    companyName: String(body.companyName || ''),
    location: String(body.location || ''),
    requiredStartDate: String(body.requiredStartDate || ''),
    services: Array.isArray(body.services) ? body.services.map(String) : [],
    categories: Array.isArray(body.categories) ? body.categories.map(String) : [],
    additionalRequirement: String(body.additionalRequirement || ''),
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
    services: values.services.map((service) => sanitizeText(service).replace(/\s+/g, ' ')).filter(Boolean).slice(0, 8),
    categories: values.categories ? values.categories.map((category) => sanitizeText(category).replace(/\s+/g, ' ')).filter(Boolean).slice(0, 4) : [],
    additionalRequirement: sanitizeMultilineText(values.additionalRequirement),
  };
}

function validateInquiryForm(values: ExpertInquiryFormValues, availableServices: string[] = []) {
  const sanitized = sanitizeInquiryForm(values);
  const errors: InquiryFormErrors = {};
  const activeServiceNames = new Set(availableServices.map((service) => service.toLowerCase()));

  if (sanitized.fullName.length < 2) {
    errors.fullName = 'Enter full name.';
  }

  if (!isValidIndianMobile(sanitized.mobileNumber)) {
    errors.mobileNumber = 'Enter a valid Indian mobile number.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (sanitized.companyName.length < 2) {
    errors.companyName = 'Enter company name.';
  }

  if (sanitized.location.length < 2) {
    errors.location = 'Enter location or area.';
  }

  if (!sanitized.requiredStartDate) {
    errors.requiredStartDate = 'Select required start date.';
  } else if (sanitized.requiredStartDate < getTodayDateValue()) {
    errors.requiredStartDate = 'Date cannot be in the past.';
  }

  if (sanitized.services.length === 0) {
    errors.services = 'Select at least one service.';
  } else if (activeServiceNames.size > 0 && sanitized.services.some((service) => !activeServiceNames.has(service.toLowerCase()))) {
    errors.services = 'Choose a currently active service.';
  }

  if (sanitized.additionalRequirement.length < 5) {
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

async function storeInquiry(config: NotificationConfig, payload: ExpertInquiryFormValues) {
  try {
    const supabase = createClient(config.supabaseUrl, config.supabaseKey);

    // Using a typical 'inquiries' table name. Ensure this table is created in Supabase.
    const { error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: payload.fullName,
          phone: payload.mobileNumber,
          email: payload.email,
          company: payload.companyName,
          location: payload.location,
          required_start_date: payload.requiredStartDate,
          services: payload.services,
          categories: payload.categories,
          message: payload.additionalRequirement,
        },
      ]);

    if (error) {
      throw error;
    }

    console.log('[SUPABASE SUCCESS] Inquiry stored in database.');
    return true;
  } catch (err: any) {
    console.error('[SUPABASE ERROR] Failed to store inquiry:', err.message);
    throw { stage: 'DATABASE', error: err.message || 'Database insert failed' };
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
        html: buildEmailHtmlBody(payload, timestamp),
      }),
      'Email notification timed out.',
    );
    console.log('[SMTP SUCCESS] Email sent to', config.emailTo, '| Message ID:', info.messageId);
    return info;
  } catch (err: any) {
    console.error('[SMTP ERROR] Failed to send email:', err.message);
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
        console.log('[TWILIO SUCCESS] WhatsApp template sent to', config.twilioWhatsAppTo, '| SID:', result.sid || result.sid);
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
    console.log('[TWILIO SUCCESS] WhatsApp message sent to', config.twilioWhatsAppTo, '| SID:', result.sid);
    return result;
  } catch (err: any) {
    console.error('[TWILIO ERROR] Failed to send WhatsApp:', err.message);
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
    const errorBody = await response.text();
    throw new Error(`Twilio message request failed with status ${response.status}: ${errorBody}`);
  }

  return response.json();
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  setCorsHeaders(request, response);

  if (request.method === 'OPTIONS') {
    return response.status(204).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  let requestBody: any;
  let normalized: any;
  let validation: any;
  let config: any;

  try {
    requestBody = readBody(request.body);
    normalized = normalizeBody(requestBody);
    validation = validateInquiryForm(normalized, allowedServices);

    if (!validation.isValid) {
      console.error('[VALIDATION ERROR]', validation.errors);
      return response.status(400).json({ success: false, stage: 'VALIDATION', error: 'Payload validation failed', details: validation.errors });
    }
  } catch (error: any) {
    console.error('[BODY READ/VALIDATION ERROR]', error);
    return response.status(400).json({ success: false, stage: 'VALIDATION', error: error.message });
  }

  try {
    config = getConfig();
    assertConfig(config);
  } catch (error: any) {
    console.error('[CONFIG ERROR]', error.message);
    return response.status(500).json({ success: false, stage: 'CONFIGURATION', error: error.message });
  }

  try {
    const timestamp = formatTimestamp(requestBody.submittedAt);

    // Process database storage first
    let dbSaved = false;
    let dbError = null;
    try {
      await storeInquiry(config, validation.sanitized);
      dbSaved = true;
    } catch (err: any) {
      dbError = err;
      // If db fails, we still want to try sending notifications so we don't completely lose the lead
    }

    // Process delivery channels concurrently
    const emailPromise = sendEmail(config, validation.sanitized, timestamp);
    const twilioPromise = sendWhatsApp(config, validation.sanitized, timestamp);

    const [emailResult, twilioResult] = await Promise.allSettled([emailPromise, twilioPromise]);

    const emailSent = emailResult.status === 'fulfilled';
    const twilioSent = twilioResult.status === 'fulfilled';

    // Logging exact outcomes
    if (!emailSent) console.error('[EMAIL FAILURE]', emailResult.reason);
    if (!twilioSent) console.error('[WHATSAPP FAILURE]', twilioResult.reason);

    // Logging complete transaction status
    console.log(JSON.stringify({
      inquiryId: requestBody.submissionId,
      timestamp: new Date().toISOString(),
      emailStatus: emailSent ? 'SUCCESS' : 'FAILED',
      whatsappStatus: twilioSent ? 'SUCCESS' : 'FAILED',
      dbStatus: dbSaved ? 'SUCCESS' : 'FAILED'
    }));

    if (!dbSaved && !emailSent && !twilioSent) {
      return response.status(502).json({
        success: false,
        stage: 'DELIVERY',
        message: 'All systems failed to process the inquiry. Please try again.',
        emailSent,
        twilioSent,
        dbSaved
      });
    }

    let finalMessage = successMessage;

    if (!emailSent && !twilioSent && dbSaved) {
      finalMessage = 'Inquiry was saved securely, but instant notifications are delayed. Our team will check the system and follow up.';
    } else if (!emailSent) {
      finalMessage = 'Inquiry received. Inquiry was sent via WhatsApp. Email notification is delayed.';
    } else if (!twilioSent) {
      finalMessage = 'Inquiry received. Email notification was sent. WhatsApp notification is delayed.';
    } else if (!dbSaved) {
      finalMessage = 'Inquiry sent via Email and WhatsApp. Database archiving failed.';
    }

    return response.status(200).json({
      success: true,
      message: finalMessage,
      emailSent,
      twilioSent,
      dbSaved,
      partialSuccess: (!emailSent || !twilioSent || !dbSaved)
    });
  } catch (error: any) {
    console.error('[CRITICAL HANDLER ERROR]', error);
    return response.status(500).json({ success: false, stage: 'INTERNAL', error: error.message });
  }
}
