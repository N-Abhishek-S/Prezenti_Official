import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface ConfiguratorOption {
  id: string;
  label: string;
  meta?: string;
  description?: string;
}

interface OptionSelectorProps {
  options: ConfiguratorOption[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
}

export function OptionSelector({ options, selectedId, onSelect }: OptionSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = selectedId === option.id;

        return (
          <motion.button
            key={option.id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className={cn(
              'relative min-h-32 rounded-[20px] border p-5 text-left transition-all duration-200',
              isSelected
                ? 'border-primary-800 bg-primary-800 text-white shadow-[0_22px_60px_rgba(18,63,53,0.18)]'
                : 'border-neutral-200 bg-white text-neutral-950 shadow-card hover:border-primary-200 hover:bg-primary-50/50',
            )}
            aria-pressed={isSelected}
          >
            <span
              className={cn(
                'absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border',
                isSelected ? 'border-white/30 bg-white text-primary-800' : 'border-neutral-200 bg-white text-transparent',
              )}
            >
              <Check size={14} />
            </span>
            {option.meta && (
              <span className={cn('text-xs font-semibold uppercase tracking-[0.16em]', isSelected ? 'text-white/70' : 'text-primary-700')}>
                {option.meta}
              </span>
            )}
            <span className="mt-2 block pr-10 text-lg font-semibold leading-tight">{option.label}</span>
            {option.description && <span className={cn('mt-3 block text-sm leading-6', isSelected ? 'text-white/76' : 'text-neutral-500')}>{option.description}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
