import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { ServiceOfferingView } from '../../modules/catalog/types';

interface ServiceStepCardProps {
  service: ServiceOfferingView;
  isSelected: boolean;
  onSelect: (service: ServiceOfferingView) => void;
}

export function ServiceStepCard({ service, isSelected, onSelect }: ServiceStepCardProps) {
  const Icon = service.icon;

  return (
    <motion.button
      type="button"
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(service)}
      className={cn(
        'group flex min-h-46 flex-col justify-between rounded-[22px] border bg-white p-5 text-left transition-all duration-200',
        'shadow-[0_18px_54px_rgba(10,42,34,0.06)] hover:border-primary-200 hover:shadow-[0_24px_70px_rgba(10,42,34,0.1)]',
        isSelected && 'border-primary-800 bg-primary-800 text-white shadow-[0_28px_80px_rgba(18,63,53,0.2)]',
        !isSelected && 'border-neutral-200 text-neutral-950',
      )}
      aria-pressed={isSelected}
    >
      <span className="flex items-start justify-between gap-4">
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-200',
            isSelected ? 'bg-white/14 text-white' : 'bg-primary-50 text-primary-800 group-hover:bg-primary-800 group-hover:text-white',
          )}
        >
          <Icon size={22} />
        </span>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-semibold',
            isSelected ? 'bg-white/12 text-white' : 'bg-neutral-100 text-neutral-600',
          )}
        >
          {service.type === 'property' ? 'Property based' : 'Direct booking'}
        </span>
      </span>

      <span className="mt-6 block">
        <span className={cn('text-xs font-semibold uppercase tracking-[0.16em]', isSelected ? 'text-white/70' : 'text-primary-700')}>
          {service.type === 'property' ? 'Facility Scope' : 'Staffing Role'}
        </span>
        <span className="mt-2 block text-lg font-semibold leading-tight">{service.name}</span>
        <span className={cn('mt-3 block text-sm leading-6', isSelected ? 'text-white/76' : 'text-neutral-500')}>{service.description}</span>
      </span>

      <span className={cn('mt-5 inline-flex items-center gap-2 text-sm font-semibold', isSelected ? 'text-white' : 'text-primary-800')}>
        Configure
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </motion.button>
  );
}
