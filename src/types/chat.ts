export type ChatMessageRole = 'user' | 'assistant' | 'system';

export type ChatMessageStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'error';

export type ConnectionStatus = 'online' | 'offline' | 'connecting' | 'error';

export type ConversationFilter = 'all' | 'unread' | 'urgent' | 'open';

export type ConversationPriority = 'normal' | 'high' | 'urgent';

export type LeadStatus = 'New Lead' | 'Qualified' | 'Needs Follow-up' | 'Urgent';

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: ChatMessageRole;
  content: string;
  createdAt: string;
  status: ChatMessageStatus;
}

export interface ChatWebhookRequest {
  message: string;
  service?: string;
  location?: string;
  propertyType?: string;
  workType?: string;
  sessionId?: string;
}

export interface ChatWebhookResponse {
  success: boolean;
  reply: string;
}

export type ChatWebhookRawResponse =
  | ChatWebhookResponse
  | { data?: unknown }
  | Array<ChatWebhookResponse | { data?: unknown }>;

export interface QuickActionChip {
  id: string;
  label: string;
  message: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  avatarInitials: string;
  inquiryType: string;
  staffingCategory: string;
  leadStatus: LeadStatus;
  estimatedRequirement: string;
  location: string;
  organizationType: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  customer: CustomerProfile;
  latestMessage: string;
  updatedAt: string;
  unreadCount: number;
  priority: ConversationPriority;
  isOnline: boolean;
  messages: ChatMessage[];
}

export interface ChatErrorState {
  message: string;
  retryMessage: string;
  userMessageId?: string;
}

export type ChatApiErrorCode =
  | 'timeout'
  | 'network'
  | 'server'
  | 'invalid-response'
  | 'empty-response'
  | 'aborted';
