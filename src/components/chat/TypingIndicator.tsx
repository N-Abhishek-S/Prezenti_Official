import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

interface TypingIndicatorProps {
  compact?: boolean;
}

const dotTransition = {
  duration: 0.7,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut' as const,
};

export function TypingIndicator({ compact = false }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-3"
      role="status"
      aria-live="polite"
      aria-label="AI agent is typing"
    >
      {!compact && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-800">
          <Bot size={18} aria-hidden="true" />
        </div>
      )}
      <div className={cn('rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-4 py-3 shadow-card', compact && 'px-3 py-2')}>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-2 w-2 rounded-full bg-primary-600"
              animate={{ opacity: [0.35, 1], y: [0, -3] }}
              transition={{ ...dotTransition, delay: dot * 0.12 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
