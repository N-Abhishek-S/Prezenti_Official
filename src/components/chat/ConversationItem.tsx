import { motion } from 'framer-motion';
import { AlertTriangle, Circle } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { ChatConversation } from '../../types/chat';

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: '2-digit',
});

interface ConversationItemProps {
  conversation: ChatConversation;
  active?: boolean;
  collapsed?: boolean;
  onSelect: (conversationId: string) => void;
}

export function ConversationItem({ conversation, active = false, collapsed = false, onSelect }: ConversationItemProps) {
  const timestamp = timeFormatter.format(new Date(conversation.updatedAt));

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ x: collapsed ? 0 : 2 }}
      onClick={() => onSelect(conversation.id)}
      className={cn(
        'group relative flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20',
        active ? 'bg-primary-800 text-white shadow-[0_18px_42px_rgba(18,63,53,0.2)]' : 'text-neutral-800 hover:bg-neutral-100',
        collapsed && 'justify-center px-2',
      )}
      aria-current={active ? 'true' : undefined}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-sm font-bold text-primary-800">
        {conversation.customer.avatarInitials}
        <span
          className={cn(
            'absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2',
            active ? 'border-primary-800' : 'border-white',
            conversation.isOnline ? 'bg-success-400' : 'bg-neutral-300',
          )}
        />
      </span>

      {!collapsed && (
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-3">
            <span className="truncate text-sm font-semibold">{conversation.title}</span>
            <span className={cn('shrink-0 text-[11px]', active ? 'text-white/70' : 'text-neutral-400')}>{timestamp}</span>
          </span>
          <span className={cn('mt-1 flex items-center gap-1.5 text-xs', active ? 'text-white/72' : 'text-neutral-500')}>
            {conversation.priority === 'urgent' ? <AlertTriangle size={12} className="shrink-0 text-warning-400" /> : <Circle size={8} className="shrink-0 fill-current" />}
            <span className="truncate">{conversation.latestMessage}</span>
          </span>
        </span>
      )}

      {conversation.unreadCount > 0 && (
        <span
          className={cn(
            'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold',
            active ? 'bg-white text-primary-800' : 'bg-primary-800 text-white',
            collapsed && 'absolute right-1 top-1',
          )}
        >
          {conversation.unreadCount}
        </span>
      )}
    </motion.button>
  );
}
