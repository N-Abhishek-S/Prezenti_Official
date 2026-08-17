import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, X } from 'lucide-react';
import { buttonVariants } from '../ui/buttonVariants';
import { serviceCatalog } from '../../content/services/serviceCatalog';
import { getLocationDetails } from '../../modules/catalog/locationDetails';
import type { Area } from '../../modules/catalog/locationData';

interface LocationDetailsModalProps {
  area: Area | null;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Dynamic "Now Serving → Location" modal. Content is derived per-area from
 * getLocationDetails — there is one component, not one modal per locality.
 * True modal semantics (unlike ServiceAreasPopover, which is a non-modal
 * disclosure): backdrop, focus trap, Escape/backdrop-click close, and focus
 * restored to whatever triggered it on close.
 */
export function LocationDetailsModal({ area, onClose }: LocationDetailsModalProps) {
  const headingId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  // Latest-callback ref: onClose is a fresh function on every parent
  // render (e.g. the navbar's scroll-shadow state), which must not
  // re-trigger this effect — that would re-run the focus-restore cleanup
  // and steal focus back to the trigger while the modal is still open.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const open = area !== null;

  useEffect(() => {
    if (!open) return undefined;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // Focus the first focusable element (the close button), not the dialog
    // container — the container isn't part of FOCUSABLE_SELECTOR, so
    // starting there made the very first Shift+Tab fall through the trap
    // and escape into the page behind the modal.
    const initialFocusable = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (initialFocusable ?? dialogRef.current)?.focus({ preventScroll: true });

    // Hide the rest of the app from assistive tech and keyboard tab order
    // while the modal is open — aria-modal alone isn't reliably honored.
    const appRoot = document.getElementById('root');
    appRoot?.setAttribute('inert', '');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || active === dialogRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || active === dialogRef.current)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      appRoot?.removeAttribute('inert');
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const details = area ? getLocationDetails(area) : null;

  // Portaled to document.body: the navbar has `backdrop-blur-xl`
  // (backdrop-filter), which makes it a new containing block for
  // `position: fixed` descendants — without the portal, this modal would
  // center itself relative to the 72px-tall navbar instead of the viewport.
  return createPortal(
    <AnimatePresence>
      {open && details && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_32px_80px_rgba(10,42,34,0.25)] focus:outline-none sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
                  <MapPin aria-hidden="true" size={20} />
                </span>
                <div>
                  <h2 id={headingId} className="text-lg font-semibold leading-tight tracking-tight text-neutral-950 sm:text-xl">
                    {details.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-neutral-500">{details.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close location details"
                className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>

            <span className="mt-4 inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
              {details.badge}
            </span>

            <p id={descriptionId} className="mt-4 text-sm leading-6 text-neutral-700">
              {details.description}
            </p>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Services</p>
              <ul className="flex flex-wrap gap-1.5">
                {serviceCatalog.map((service) => (
                  <li
                    key={service.href}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700"
                  >
                    {service.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Flexible Staffing Options</p>
              <p className="text-sm leading-6 text-neutral-700">{details.staffingOptions.join(' · ')}</p>
            </div>

            <p className="mt-5 text-xs leading-5 text-neutral-500">
              Service availability depends on staffing requirements, location and scheduling.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/talk-to-us"
                onClick={onClose}
                className={buttonVariants({ variant: 'primary', size: 'md', className: 'w-full sm:w-auto' })}
              >
                Request Staff
              </Link>
              <Link
                to="/services"
                onClick={onClose}
                className={buttonVariants({ variant: 'secondary', size: 'md', className: 'w-full sm:w-auto' })}
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
