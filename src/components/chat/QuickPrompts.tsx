import { motion } from 'framer-motion';
import type { QuickActionChip } from '../../types/chat';

interface QuickPromptsProps {
  prompts: readonly QuickActionChip[];
  disabled?: boolean;
  onPromptSelect: (message: string) => void;
}

export function QuickPrompts({ prompts, disabled = false, onPromptSelect }: QuickPromptsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden" aria-label="Quick staffing prompts">
      {prompts.map((prompt) => (
        <motion.button
          key={prompt.id}
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="shrink-0 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 shadow-card transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onPromptSelect(prompt.message)}
          disabled={disabled}
        >
          {prompt.label}
        </motion.button>
      ))}
    </div>
  );
}
