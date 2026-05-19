import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MessageCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import type { TrustPackage } from '../../modules/catalog/types';

interface WorkTypeComparisonCardsProps {
  packages: TrustPackage[];
  selectedId?: string;
  onSelect: (packageId: string) => void;
  onTalkToExpert: () => void;
  onWhatsApp: (selectedPackage: TrustPackage) => void;
}

export function WorkTypeComparisonCards({
  packages,
  selectedId,
  onSelect,
  onTalkToExpert,
  onWhatsApp,
}: WorkTypeComparisonCardsProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {packages.map((selectedPackage) => {
        const isSelected = selectedId === selectedPackage.id;
        const isFullTime = selectedPackage.workType === 'Full Time';

        return (
          <motion.article
            key={selectedPackage.id}
            layout
            whileHover={{ y: -4 }}
            className={cn(
              'overflow-hidden rounded-[26px] border bg-white shadow-[0_24px_70px_rgba(10,42,34,0.08)] transition-all duration-200',
              isSelected ? 'border-primary-800 ring-4 ring-primary-100' : 'border-neutral-200 hover:border-primary-200',
            )}
          >
            <div className={cn('p-5 sm:p-6', isFullTime ? 'bg-primary-800 text-white' : 'bg-[linear-gradient(135deg,#F8FAFB,#EDFAF9)] text-neutral-950')}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={cn('text-xs font-semibold uppercase tracking-[0.18em]', isFullTime ? 'text-white/70' : 'text-primary-700')}>
                    Work package
                  </div>
                  <h5 className="mt-2 text-2xl font-semibold tracking-tight">{selectedPackage.workType}</h5>
                </div>
                <span
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold',
                    isFullTime ? 'bg-white text-primary-800' : 'bg-primary-50 text-primary-800',
                  )}
                >
                  {selectedPackage.hours} Hours
                </span>
              </div>
              <p className={cn('mt-4 text-sm leading-6', isFullTime ? 'text-white/76' : 'text-neutral-500')}>{selectedPackage.description}</p>
            </div>

            <div className="grid gap-6 p-5 sm:p-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-success-600">Included Services</div>
                <div className="mt-4 space-y-3">
                  {selectedPackage.includedServices.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Not Included / Extra</div>
                <div className="mt-4 space-y-3">
                  {selectedPackage.excludedServices.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
                      <XCircle size={16} className="mt-0.5 shrink-0 text-critical-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <Button type="button" variant={isFullTime ? 'primary' : 'secondary'} size="lg" className="w-full" onClick={() => onSelect(selectedPackage.id)}>
                  {selectedPackage.primaryCtaLabel}
                  <ArrowRight size={16} />
                </Button>
                <Button type="button" variant="outline" size="lg" className="w-full" onClick={onTalkToExpert}>
                  <MessageCircle size={16} />
                  {selectedPackage.secondaryCtaLabel}
                </Button>
                <Button type="button" variant="teal" size="lg" className="w-full sm:col-span-2" onClick={() => onWhatsApp(selectedPackage)}>
                  <MessageCircle size={16} />
                  {selectedPackage.whatsappCtaLabel}
                </Button>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
