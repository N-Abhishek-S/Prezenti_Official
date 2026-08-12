import type { ExpertInquiryFormValues } from '../modules/inquiry/inquiryValidation';

const defaultInquiryEndpoint = '/api/inquiry-notification';
const requestTimeoutMs = 18_000;

export interface SendInquiryResponse {
  success: boolean;
  message: string;
}

interface InquiryApiResponse {
  success?: boolean;
  message?: string;
}

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

async function parseResponse(response: Response): Promise<InquiryApiResponse> {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return {};
  }

  return response.json() as Promise<InquiryApiResponse>;
}

export async function sendExpertInquiry(payload: ExpertInquiryFormValues, honeypot = ''): Promise<SendInquiryResponse> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(defaultInquiryEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        // Honeypot field: left empty by real users, silently rejected server-side if filled.
        website: honeypot,
        submissionId: createSubmissionId(),
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    const data = await parseResponse(response);

    if (!response.ok || data.success !== true) {
      throw new Error(data.message || 'Unable to send inquiry. Please try again.');
    }

    return {
      success: true,
      message: data.message || 'Inquiry sent successfully. Our team has been notified.',
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Inquiry submission timed out. Please try again.', { cause: error });
    }

    throw new Error(error instanceof Error ? error.message : 'Unable to send inquiry. Please try again.', {
      cause: error,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}
