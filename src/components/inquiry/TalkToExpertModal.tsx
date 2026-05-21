import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { TalkToExpertForm } from './TalkToExpertForm';
import type { ExpertServiceName } from '../../modules/inquiry/inquiryConfig';

interface TalkToExpertModalProps {
  open: boolean;
  onClose: () => void;
  initialServices?: ExpertServiceName[];
}

export function TalkToExpertModal({
  open,
  onClose,
  initialServices,
}: TalkToExpertModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-neutral-950/48 px-3 py-5 backdrop-blur-sm sm:px-5 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="talk-to-expert-title"
            className="relative w-full max-w-6xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <Button ref={closeButtonRef} type="button" variant="secondary" size="icon" onClick={onClose} aria-label="Close Talk to Expert form">
                <X size={18} />
              </Button>
            </div>
            <h2 id="talk-to-expert-title" className="sr-only">Talk to Expert inquiry form</h2>
            <TalkToExpertForm
              initialServices={initialServices}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
