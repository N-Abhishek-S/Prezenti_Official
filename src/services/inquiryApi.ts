import type { ExpertInquiryFormValues } from '../modules/inquiry/inquiryValidation';

const targetEmail = 'bd@kargar.co.in';
const formSubmitEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;

export interface InquiryDeliveryResult {
  success: boolean;
  message: string;
  whatsAppUrl: string;
  whatsAppOpened: boolean;
}

export type SendInquiryResponse = InquiryDeliveryResult;

export function buildInquiryMessage(payload: ExpertInquiryFormValues) {
  const service = Array.isArray(payload.services) ? payload.services.join(', ') : payload.services || '';

  return [
    'New Inquiry - Prezenti',
    '',
    `Name: ${payload.fullName}`,
    `Phone: ${payload.mobileNumber}`,
    `Company: ${payload.companyName}`,
    `Service: ${service}`,
    `Message: ${payload.additionalRequirement}`,
    '------------------',
  ].join('\n');
}

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

async function sendFormSubmitEmail(payload: ExpertInquiryFormValues, messageBody: string) {
  const response = await fetch(formSubmitEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _subject: 'New Inquiry - Prezenti',
      _captcha: 'false',
      _replyto: payload.email,
      message: messageBody,
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to send inquiry. Please try again.');
  }
}

export async function sendExpertInquiry(payload: ExpertInquiryFormValues): Promise<SendInquiryResponse> {
  const messageBody = buildInquiryMessage(payload);
  const whatsAppUrl = buildWhatsAppUrl(messageBody);
  const whatsAppWindow = window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');

  await sendFormSubmitEmail(payload, messageBody);

  return {
    success: true,
    message: 'Inquiry sent successfully. Please check your email.',
    whatsAppUrl,
    whatsAppOpened: Boolean(whatsAppWindow),
  };
}
