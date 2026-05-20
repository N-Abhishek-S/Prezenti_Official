import type { ExpertInquiryFormValues } from '../modules/inquiry/inquiryValidation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

export interface InquiryChannelResult {
  sent: boolean;
  error?: string;
}

export interface SendInquiryResponse {
  success: boolean;
  message: string;
  generatedMessage: string;
  channels: {
    whatsapp: InquiryChannelResult;
    email: InquiryChannelResult;
  };
}

function getErrorMessage(data: unknown) {
  if (!data || typeof data !== 'object' || !('error' in data)) {
    return 'Unable to send inquiry. Please try again.';
  }

  const error = (data as { error?: unknown }).error;

  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string') return message;
  }

  return 'Unable to send inquiry. Please try again.';
}

export async function sendExpertInquiry(payload: ExpertInquiryFormValues) {
  const response = await fetch(`${API_BASE_URL}/inquiry/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null) as SendInquiryResponse | { error?: unknown } | null;

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  if (!data || !('channels' in data)) {
    throw new Error('Inquiry service returned an invalid response.');
  }

  return data;
}
