import { BadGatewayException, BadRequestException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendChatMessageDto } from './dto/send-chat-message.dto';
import type { N8nChatRawResponse, WebsiteChatPayload, WebsiteChatResponse } from './types/chat-contracts';

const DEFAULT_CHAT_TIMEOUT_MS = 20000;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly config: ConfigService) {}

  getRouteStatus() {
    return {
      success: true,
      module: 'chat',
      route: '/api/v1/chat/message',
      webhookConfigured: Boolean(this.config.get<string>('N8N_CHAT_WEBHOOK_URL')),
    };
  }

  async sendWebsiteChatMessage(input: SendChatMessageDto): Promise<WebsiteChatResponse> {
    const message = input.message.trim();

    if (!message) {
      throw new BadRequestException('message is required');
    }

    const payload: WebsiteChatPayload = {
      message,
      service: input.service?.trim() || undefined,
      location: input.location?.trim() || undefined,
      propertyType: input.propertyType?.trim() || undefined,
      workType: input.workType?.trim() || undefined,
      sessionId: input.sessionId?.trim() || this.createSessionId(),
    };

    const webhookUrl = this.config.get<string>('N8N_CHAT_WEBHOOK_URL');

    if (!webhookUrl) {
      throw new ServiceUnavailableException('N8N_CHAT_WEBHOOK_URL is not configured');
    }

    const timeoutMs = this.config.get<number>('N8N_CHAT_TIMEOUT_MS', DEFAULT_CHAT_TIMEOUT_MS);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        this.logger.warn(`n8n chat webhook responded with ${response.status}`);
        throw new BadGatewayException('Chat automation service returned an error');
      }

      const body = await response.text();

      if (!body.trim()) {
        throw new BadGatewayException('Chat automation service returned an empty response');
      }

      let data: unknown;

      try {
        data = JSON.parse(body);
      } catch {
        throw new BadGatewayException('Chat automation service returned invalid JSON');
      }

      const reply = this.extractReply(data as N8nChatRawResponse);

      if (!reply) {
        throw new BadGatewayException('Chat automation service response did not include reply');
      }

      return { success: true, reply };
    } catch (error) {
      if (error instanceof BadGatewayException || error instanceof BadRequestException) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ServiceUnavailableException('Chat automation service timed out');
      }

      this.logger.warn(`Unable to reach n8n chat webhook: ${error instanceof Error ? error.message : 'unknown error'}`);
      throw new ServiceUnavailableException('Chat automation service is unavailable');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private extractReply(value: N8nChatRawResponse | unknown): string | null {
    if (Array.isArray(value)) {
      for (const item of value) {
        const reply = this.extractReply(item);
        if (reply) return reply;
      }

      return null;
    }

    if (!value || typeof value !== 'object') {
      return null;
    }

    const response = value as Record<string, unknown>;

    for (const key of ['reply', 'output', 'message', 'text', 'response']) {
      const candidate = response[key];

      if (typeof candidate === 'string' && candidate.trim().length > 0) {
        return candidate.trim();
      }
    }

    return this.extractReply(response.data);
  }

  private createSessionId() {
    return `ps-chat-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
