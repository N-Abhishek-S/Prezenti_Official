import { AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { ChatConversation, ChatErrorState } from '../../types/chat';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface ChatWindowProps {
  conversation: ChatConversation;
  isTyping: boolean;
  errorState: ChatErrorState | null;
  onRetry: () => void;
  onStartConversation: () => void;
}

export function ChatWindow({ conversation, isTyping, errorState, onRetry, onStartConversation }: ChatWindowProps) {
  const scrollTrigger = `${conversation.id}-${conversation.messages.length}-${isTyping}-${errorState?.message ?? ''}`;
  const { scrollAnchorRef } = useAutoScroll(scrollTrigger);
  const hasMessages = conversation.messages.length > 0;

  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,#F8FAFB_0%,#FFFFFF_44%,#F3FAF7_100%)] px-4 py-5 sm:px-6" aria-label="Active conversation">
      {!hasMessages && (
        <div
          className="mx-auto flex min-h-full w-full max-w-lg flex-col items-center justify-center px-4 py-12 text-center"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-primary-800 shadow-[0_22px_55px_rgba(10,42,34,0.12)]">
            <Sparkles size={28} aria-hidden="true" />
          </div>
          <h3 className="w-full max-w-full text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">Talk to Our Staffing Assistant</h3>
          <p className="mx-auto mt-3 w-full max-w-[17.5rem] text-sm leading-6 text-neutral-500 sm:max-w-md">
            Get instant support for manpower, staffing, and facility management requirements.
          </p>
          <Button type="button" size="lg" className="mt-7 rounded-full" onClick={onStartConversation}>
            Start Conversation
          </Button>
        </div>
      )}

      {hasMessages && (
        <ol className="space-y-5" aria-live="polite" aria-relevant="additions">
          {conversation.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ol>
      )}

      {isTyping && (
        <div className="mt-5">
          <TypingIndicator />
        </div>
      )}

      {errorState && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex flex-col gap-3 rounded-2xl border border-warning-100 bg-warning-50 px-4 py-3 text-sm text-neutral-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-warning-600" aria-hidden="true" />
            <span>{errorState.message}</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-800 shadow-card transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20"
            onClick={onRetry}
          >
            <RefreshCw size={13} aria-hidden="true" />
            Retry
          </button>
        </motion.div>
      )}

      <div ref={scrollAnchorRef} />
    </main>
  );
}
