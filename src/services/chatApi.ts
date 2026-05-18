import type { ChatApiErrorCode, ChatWebhookRawResponse, ChatWebhookRequest, ChatWebhookResponse } from '../types/chat';

const CHAT_WEBHOOK_URL =
  import.meta.env.VITE_PS_CHAT_WEBHOOK_URL ||
  import.meta.env.VITE_CHAT_WEBHOOK_URL ||
  'http://localhost:5678/webhook/ps-whatsapp';
const DEFAULT_TIMEOUT_MS = 20000;
const CHAT_SESSION_STORAGE_KEY = 'presenti-chat-session-id';

export class ChatApiError extends Error {
  code: ChatApiErrorCode;

  constructor(message: string, code: ChatApiErrorCode) {
    super(message);
    this.name = 'ChatApiError';
    this.code = code;
  }
}

interface SendChatMessageOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

function getChatSessionId() {
  const fallbackId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `presenti-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  try {
    const existingSessionId = window.localStorage.getItem(CHAT_SESSION_STORAGE_KEY);
    if (existingSessionId) return existingSessionId;

    window.localStorage.setItem(CHAT_SESSION_STORAGE_KEY, fallbackId);
  } catch {
    return fallbackId;
  }

  return fallbackId;
}

function extractReply(value: unknown): string | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const reply = extractReply(item);
      if (reply) return reply;
    }

    return null;
  }

  if (!value || typeof value !== 'object') {
    return null;
  }

  const response = value as ChatWebhookRawResponse & Record<string, unknown>;

  for (const key of ['reply', 'output', 'message', 'text', 'response']) {
    const candidate = response[key];

    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }

  return extractReply(response.data);
}

export async function sendStaffingChatMessage(
  message: string,
  options: SendChatMessageOptions = {},
): Promise<ChatWebhookResponse> {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    throw new ChatApiError('Message is required.', 'invalid-response');
  }

  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = window.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  const abortRequest = () => controller.abort();
  options.signal?.addEventListener('abort', abortRequest, { once: true });

  const payload: ChatWebhookRequest = {
    message: trimmedMessage,
    chatInput: trimmedMessage,
    sessionId: getChatSessionId(),
    source: 'presenti-web',
  };

  try {
    const response = await fetch(CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ChatApiError(`Chat service responded with ${response.status}.`, 'server');
    }

    const body = await response.text();

    if (!body.trim()) {
      throw new ChatApiError('Chat service returned an empty response.', 'empty-response');
    }

    let data: unknown;

    try {
      data = JSON.parse(body);
    } catch {
      throw new ChatApiError('Chat service returned invalid JSON.', 'invalid-response');
    }

    const reply = extractReply(data);

    if (!reply) {
      throw new ChatApiError('Chat service returned an invalid response.', 'invalid-response');
    }

    return { reply };
  } catch (error) {
    if (error instanceof ChatApiError) {
      throw error;
    }

    if (timedOut) {
      throw new ChatApiError('Chat service timed out.', 'timeout');
    }

    if (options.signal?.aborted) {
      throw new ChatApiError('Chat request was cancelled.', 'aborted');
    }

    throw new ChatApiError('Unable to reach chat service.', 'network');
  } finally {
    window.clearTimeout(timeoutId);
    options.signal?.removeEventListener('abort', abortRequest);
  }
}

export function getChatApiErrorMessage(error: unknown): string {
  if (!(error instanceof ChatApiError)) {
    return 'Something went wrong while contacting the AI assistant.';
  }

  switch (error.code) {
    case 'timeout':
      return 'The AI assistant is taking longer than expected. Please retry in a moment.';
    case 'server':
      return 'The AI assistant is temporarily unavailable. Please retry your message.';
    case 'invalid-response':
      return 'The AI assistant returned an unreadable response. Please retry your message.';
    case 'empty-response':
      return 'The AI assistant returned an empty response. Please retry your message.';
    case 'aborted':
      return 'The request was cancelled before the AI assistant replied.';
    case 'network':
    default:
      return 'Unable to reach the AI assistant. Please check the webhook service and retry.';
  }
}
