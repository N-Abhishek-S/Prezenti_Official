import { useCallback, useMemo, useRef, useState } from 'react';
import { getChatApiErrorMessage, sendStaffingChatMessage } from '../services/chatApi';
import type {
  ChatConversation,
  ChatErrorState,
  ChatMessage,
  ChatMessageRole,
  ChatMessageStatus,
  ConnectionStatus,
  ConversationFilter,
  QuickActionChip,
} from '../types/chat';

const now = Date.now();

const quickPrompts: QuickActionChip[] = [
  { id: 'housekeeping', label: 'Need housekeeping staff', message: 'Need housekeeping staff for my facility.' },
  { id: 'receptionist', label: 'Need receptionist', message: 'Need receptionist support for my front desk.' },
  { id: 'office-boy', label: 'Need office boy', message: 'Need an office boy for daily office operations.' },
  { id: 'pantry', label: 'Need pantry staff', message: 'Need pantry staff for my office.' },
  { id: 'security', label: 'Need security guard', message: 'Need security guards for my building.' },
  { id: 'facility-manager', label: 'Need facility manager', message: 'Need a facility manager for site operations.' },
  { id: 'quote', label: 'Request staffing quote', message: 'I want to request a staffing quote.' },
  { id: 'urgent', label: 'Need urgent manpower', message: 'Need urgent manpower support as soon as possible.' },
];

function minutesAgo(minutes: number) {
  return new Date(now - minutes * 60_000).toISOString();
}

function createMessage(
  conversationId: string,
  role: ChatMessageRole,
  content: string,
  status: ChatMessageStatus = 'sent',
): ChatMessage {
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${conversationId}-${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return {
    id,
    conversationId,
    role,
    content,
    createdAt: new Date().toISOString(),
    status,
  };
}

const demoConversations: ChatConversation[] = [
  {
    id: 'housekeeping-inquiry',
    title: 'Housekeeping Inquiry',
    latestMessage: 'Ready to discuss housekeeping staffing needs.',
    updatedAt: minutesAgo(4),
    unreadCount: 2,
    priority: 'high',
    isOnline: true,
    customer: {
      id: 'lead-1',
      name: 'Housekeeping Inquiry',
      phone: '+91 98765 43021',
      avatarInitials: 'HI',
      inquiryType: 'New staffing request',
      staffingCategory: 'Housekeeping',
      leadStatus: 'New Lead',
      estimatedRequirement: '2-4 staff',
      location: 'Pune office',
      organizationType: 'Corporate office',
    },
    messages: [],
  },
  {
    id: 'reception-staffing',
    title: 'Reception Staffing',
    latestMessage: 'Need a trained receptionist for day shift.',
    updatedAt: minutesAgo(18),
    unreadCount: 0,
    priority: 'normal',
    isOnline: true,
    customer: {
      id: 'lead-2',
      name: 'Reception Staffing',
      phone: '+91 98230 11876',
      avatarInitials: 'RS',
      inquiryType: 'Front desk support',
      staffingCategory: 'Receptionist',
      leadStatus: 'Qualified',
      estimatedRequirement: '1 receptionist',
      location: 'Hinjewadi',
      organizationType: 'Business center',
    },
    messages: [
      {
        id: 'rs-1',
        conversationId: 'reception-staffing',
        role: 'user',
        content: 'Need a trained receptionist for day shift.',
        createdAt: minutesAgo(21),
        status: 'read',
      },
      {
        id: 'rs-2',
        conversationId: 'reception-staffing',
        role: 'assistant',
        content: 'Sure. Please share the office location, working days, and language preference.',
        createdAt: minutesAgo(18),
        status: 'delivered',
      },
    ],
  },
  {
    id: 'school-support-staff',
    title: 'School Support Staff',
    latestMessage: 'Looking for office boys and housekeeping for a school.',
    updatedAt: minutesAgo(42),
    unreadCount: 1,
    priority: 'normal',
    isOnline: false,
    customer: {
      id: 'lead-3',
      name: 'School Support Staff',
      phone: '+91 97654 22190',
      avatarInitials: 'SS',
      inquiryType: 'Education support staffing',
      staffingCategory: 'Office Boy + Housekeeping',
      leadStatus: 'Needs Follow-up',
      estimatedRequirement: '5-7 staff',
      location: 'PCMC',
      organizationType: 'School',
    },
    messages: [
      {
        id: 'ss-1',
        conversationId: 'school-support-staff',
        role: 'user',
        content: 'Looking for office boys and housekeeping for a school.',
        createdAt: minutesAgo(43),
        status: 'read',
      },
    ],
  },
  {
    id: 'hospital-manpower',
    title: 'Hospital Manpower',
    latestMessage: 'Need reliable support staff for hospital shifts.',
    updatedAt: minutesAgo(67),
    unreadCount: 3,
    priority: 'urgent',
    isOnline: true,
    customer: {
      id: 'lead-4',
      name: 'Hospital Manpower',
      phone: '+91 99887 44120',
      avatarInitials: 'HM',
      inquiryType: 'Urgent manpower',
      staffingCategory: 'Housekeeping + Support Staff',
      leadStatus: 'Urgent',
      estimatedRequirement: '8-12 staff',
      location: 'Baner',
      organizationType: 'Hospital',
    },
    messages: [
      {
        id: 'hm-1',
        conversationId: 'hospital-manpower',
        role: 'user',
        content: 'Need reliable support staff for hospital shifts.',
        createdAt: minutesAgo(68),
        status: 'read',
      },
      {
        id: 'hm-2',
        conversationId: 'hospital-manpower',
        role: 'assistant',
        content: 'We can help. Please confirm the required roles, shift timings, and deployment date.',
        createdAt: minutesAgo(67),
        status: 'delivered',
      },
    ],
  },
  {
    id: 'office-boy-requirement',
    title: 'Office Boy Requirement',
    latestMessage: 'Need one office boy for courier and pantry coordination.',
    updatedAt: minutesAgo(124),
    unreadCount: 0,
    priority: 'normal',
    isOnline: false,
    customer: {
      id: 'lead-5',
      name: 'Office Boy Requirement',
      phone: '+91 98900 76543',
      avatarInitials: 'OB',
      inquiryType: 'Office operations support',
      staffingCategory: 'Office Boy',
      leadStatus: 'Qualified',
      estimatedRequirement: '1 staff',
      location: 'Kharadi',
      organizationType: 'Small business',
    },
    messages: [
      {
        id: 'ob-1',
        conversationId: 'office-boy-requirement',
        role: 'user',
        content: 'Need one office boy for courier and pantry coordination.',
        createdAt: minutesAgo(130),
        status: 'read',
      },
      {
        id: 'ob-2',
        conversationId: 'office-boy-requirement',
        role: 'assistant',
        content: 'Understood. Please share office timing, weekly off, and expected joining date.',
        createdAt: minutesAgo(124),
        status: 'delivered',
      },
    ],
  },
];

function getOnlineStatus(): ConnectionStatus {
  if (typeof navigator === 'undefined') return 'online';
  return navigator.onLine ? 'online' : 'offline';
}

export function useChat() {
  const [conversations, setConversations] = useState<ChatConversation[]>(demoConversations);
  const [activeConversationId, setActiveConversationId] = useState(demoConversations[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<ConversationFilter>('all');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCustomerPanelOpen, setIsCustomerPanelOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(getOnlineStatus);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [errorState, setErrorState] = useState<ChatErrorState | null>(null);
  const [messageQueue, setMessageQueue] = useState<ChatMessage[]>([]);
  const lastSubmissionRef = useRef<{ message: string; at: number } | null>(null);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0],
    [activeConversationId, conversations],
  );

  const filteredConversations = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const matchesSearch = !normalizedSearch
        || conversation.title.toLowerCase().includes(normalizedSearch)
        || conversation.customer.staffingCategory.toLowerCase().includes(normalizedSearch)
        || conversation.latestMessage.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        filter === 'all'
        || (filter === 'unread' && conversation.unreadCount > 0)
        || (filter === 'urgent' && conversation.priority === 'urgent')
        || (filter === 'open' && conversation.customer.leadStatus !== 'Qualified');

      return matchesSearch && matchesFilter;
    });
  }, [conversations, filter, searchQuery]);

  const patchConversation = useCallback((conversationId: string, updater: (conversation: ChatConversation) => ChatConversation) => {
    setConversations((currentConversations) =>
      currentConversations.map((conversation) => (conversation.id === conversationId ? updater(conversation) : conversation)),
    );
  }, []);

  const markMessageStatus = useCallback(
    (conversationId: string, messageId: string | undefined, status: ChatMessageStatus) => {
      if (!messageId) return;

      patchConversation(conversationId, (conversation) => ({
        ...conversation,
        messages: conversation.messages.map((message) => (message.id === messageId ? { ...message, status } : message)),
      }));
    },
    [patchConversation],
  );

  const selectConversation = useCallback((conversationId: string) => {
    setActiveConversationId(conversationId);
    setIsMobileSidebarOpen(false);
    setErrorState(null);
    patchConversation(conversationId, (conversation) => ({ ...conversation, unreadCount: 0 }));
  }, [patchConversation]);

  const sendMessage = useCallback(
    async (rawMessage: string, options: { bypassDuplicateCheck?: boolean; existingUserMessageId?: string } = {}) => {
      const messageText = rawMessage.trim();
      const conversationId = activeConversation.id;

      if (!messageText || isSending) return;

      if (connectionStatus === 'offline') {
        setErrorState({
          message: 'You appear to be offline. Reconnect and retry your staffing request.',
          retryMessage: messageText,
          userMessageId: options.existingUserMessageId,
        });
        return;
      }

      const nowTime = Date.now();
      const lastSubmission = lastSubmissionRef.current;

      if (
        !options.bypassDuplicateCheck
        && lastSubmission?.message === messageText
        && nowTime - lastSubmission.at < 1500
      ) {
        return;
      }

      lastSubmissionRef.current = { message: messageText, at: nowTime };
      setErrorState(null);
      setIsSending(true);
      setIsTyping(true);
      setConnectionStatus('connecting');

      const userMessage = options.existingUserMessageId
        ? undefined
        : createMessage(conversationId, 'user', messageText, 'sending');

      if (userMessage) {
        patchConversation(conversationId, (conversation) => ({
          ...conversation,
          latestMessage: messageText,
          updatedAt: userMessage.createdAt,
          messages: [...conversation.messages, userMessage],
        }));
        setMessageQueue((currentQueue) => [...currentQueue, userMessage]);
      } else {
        markMessageStatus(conversationId, options.existingUserMessageId, 'sending');
      }

      try {
        const response = await sendStaffingChatMessage({
          message: messageText,
          service: activeConversation.customer.staffingCategory,
          location: activeConversation.customer.location,
        });
        const assistantMessage = createMessage(conversationId, 'assistant', response.reply, 'delivered');

        if (userMessage) {
          markMessageStatus(conversationId, userMessage.id, 'delivered');
        } else {
          markMessageStatus(conversationId, options.existingUserMessageId, 'delivered');
        }

        patchConversation(conversationId, (conversation) => ({
          ...conversation,
          latestMessage: response.reply,
          updatedAt: assistantMessage.createdAt,
          messages: [...conversation.messages, assistantMessage],
        }));
        setConnectionStatus('online');
      } catch (error) {
        const failedMessageId = userMessage?.id ?? options.existingUserMessageId;
        markMessageStatus(conversationId, failedMessageId, 'error');
        setErrorState({
          message: getChatApiErrorMessage(error),
          retryMessage: messageText,
          userMessageId: failedMessageId,
        });
        setConnectionStatus(getOnlineStatus() === 'offline' ? 'offline' : 'error');
      } finally {
        setIsSending(false);
        setIsTyping(false);
        setMessageQueue((currentQueue) => currentQueue.filter((queuedMessage) => queuedMessage.id !== userMessage?.id));
      }
    },
    [activeConversation.id, connectionStatus, isSending, markMessageStatus, patchConversation],
  );

  const retryLastMessage = useCallback(() => {
    if (!errorState) return;

    void sendMessage(errorState.retryMessage, {
      bypassDuplicateCheck: true,
      existingUserMessageId: errorState.userMessageId,
    });
  }, [errorState, sendMessage]);

  const handleOnline = useCallback(() => setConnectionStatus('online'), []);
  const handleOffline = useCallback(() => setConnectionStatus('offline'), []);

  return {
    activeConversation,
    activeConversationId,
    connectionStatus,
    conversations,
    errorState,
    filter,
    filteredConversations,
    handleOffline,
    handleOnline,
    isCustomerPanelOpen,
    isMobileSidebarOpen,
    isSending,
    isSidebarCollapsed,
    isTyping,
    messageQueue,
    quickPrompts,
    retryLastMessage,
    searchQuery,
    selectConversation,
    sendMessage,
    setFilter,
    setIsCustomerPanelOpen,
    setIsMobileSidebarOpen,
    setIsSidebarCollapsed,
    setSearchQuery,
  };
}
