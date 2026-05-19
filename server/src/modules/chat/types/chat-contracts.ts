export interface WebsiteChatPayload {
  message: string;
  service?: string;
  location?: string;
  propertyType?: string;
  workType?: string;
  sessionId: string;
}

export interface WebsiteChatResponse {
  success: true;
  reply: string;
}

export type N8nChatRawResponse =
  | Partial<WebsiteChatResponse>
  | { output?: unknown; message?: unknown; text?: unknown; response?: unknown; data?: unknown }
  | Array<Partial<WebsiteChatResponse> | { output?: unknown; message?: unknown; text?: unknown; response?: unknown; data?: unknown }>;
