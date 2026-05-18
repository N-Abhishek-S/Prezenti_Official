import { AlertCircle, Check, CheckCheck, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import type { ChatMessage } from '../../types/chat';

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: '2-digit',
});

interface MessageBubbleProps {
  message: ChatMessage;
}

function MessageStatusIcon({ message }: { message: ChatMessage }) {
  if (message.role !== 'user') return null;

  if (message.status === 'error') {
    return <AlertCircle size={13} className="text-critical-500" aria-label="Message failed" />;
  }

  if (message.status === 'sending' || message.status === 'queued') {
    return <Clock3 size={13} className="text-white/70" aria-label="Message sending" />;
  }

  if (message.status === 'read' || message.status === 'delivered') {
    return <CheckCheck size={14} className="text-teal-200" aria-label="Message delivered" />;
  }

  return <Check size={13} className="text-white/70" aria-label="Message sent" />;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const messageTime = timeFormatter.format(new Date(message.createdAt));

  if (isSystem) {
    return (
      <li className="flex justify-center">
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">{message.content}</span>
      </li>
    );
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
    >
      <div className={cn('max-w-[86%] sm:max-w-[70%] lg:max-w-[62%]', isUser && 'text-right')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-card',
            isUser
              ? 'rounded-br-md bg-primary-800 text-white shadow-[0_14px_32px_rgba(18,63,53,0.18)]'
              : 'rounded-bl-md border border-neutral-200 bg-white text-neutral-800',
            message.status === 'error' && 'border-critical-100 bg-critical-50 text-critical-600',
          )}
        >
          {message.content}
        </div>
        <div className={cn('mt-1.5 flex items-center gap-1.5 text-[11px] text-neutral-400', isUser && 'justify-end')}>
          <time dateTime={message.createdAt}>{messageTime}</time>
          <MessageStatusIcon message={message} />
          {message.status === 'error' && <span>Retry available</span>}
        </div>
      </div>
    </motion.li>
  );
}
