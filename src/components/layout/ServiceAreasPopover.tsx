import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { SEO_CONSTANTS } from '../../seo/constants';
import { buttonVariants } from '../ui/buttonVariants';

const primaryServiceAreas = [
  'Baner',
  'Balewadi',
  'Aundh',
  'Pashan',
  'Wakad',
  'Hinjawadi',
  'Bavdhan',
  'Kothrud',
  'Shivajinagar',
  'Pune City',
];

interface ServiceAreasPopoverProps {
  /** Visual tone of the trigger button — match the surface it sits on. */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Click-to-open (desktop and mobile alike — deliberately not hover-only)
 * panel that surfaces the registered address and the Pune-area service
 * coverage. Triggered from the address wherever it appears (footer, contact
 * page). Keyboard accessible: Escape and outside-click close it, focus
 * returns to the trigger on close.
 */
export function ServiceAreasPopover({ tone = 'dark', className }: ServiceAreasPopoverProps) {
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const panelId = useId();
  const headingId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Positions the panel relative to the viewport (not just the trigger) so
  // it never runs off-screen — the trigger can sit anywhere on the page
  // (left-aligned in the footer, centered on the contact page).
  useLayoutEffect(() => {
    if (!open) return undefined;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      const triggerRect = trigger.getBoundingClientRect();
      const margin = 16;
      const gap = 8;
      const panelWidth = panel.offsetWidth;
      const panelHeight = panel.offsetHeight;
      const maxLeft = window.innerWidth - panelWidth - margin;
      const left = Math.max(margin, Math.min(triggerRect.left, maxLeft));

      // Flip above the trigger when there isn't room below (e.g. the
      // trigger sits near the bottom of a short mobile viewport) —
      // otherwise the panel's own CTA can end up unreachable without
      // first scrolling the page behind it.
      const spaceBelow = window.innerHeight - triggerRect.bottom - margin;
      const spaceAbove = triggerRect.top - margin;
      const top = panelHeight <= spaceBelow || spaceBelow >= spaceAbove
        ? triggerRect.bottom + gap
        : Math.max(margin, triggerRect.top - panelHeight - gap);

      setPanelStyle({ position: 'fixed', top, left, maxHeight: `calc(100vh - ${margin * 2}px)` });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // Closing on scroll avoids the panel visually detaching from its
    // trigger — simpler and more robust than continuously repositioning.
    const handleScroll = () => setOpen(false);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    // preventScroll: focusing the panel must not itself trigger a browser
    // scroll-into-view — that scroll would immediately fire handleScroll
    // below and close the panel the instant it opens.
    panelRef.current?.focus({ preventScroll: true });
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  const isDark = tone === 'dark';

  return (
    <div ref={containerRef} className={cn('relative inline-block text-left', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'group inline-flex items-start gap-2 rounded-md text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
          isDark ? 'text-white/60 hover:text-white' : 'text-neutral-600 hover:text-primary-800',
        )}
      >
        <MapPin aria-hidden="true" size={16} className={cn('mt-0.5 shrink-0 transition-colors', isDark ? 'text-white/40 group-hover:text-white/70' : 'text-neutral-400 group-hover:text-primary-700')} />
        <span className="text-sm underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
          {SEO_CONSTANTS.ADDRESS.LINE1}, {SEO_CONSTANTS.ADDRESS.CITY} &ndash; {SEO_CONSTANTS.ADDRESS.POSTAL_CODE}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            ref={panelRef}
            role="region"
            aria-labelledby={headingId}
            tabIndex={-1}
            style={panelStyle}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="z-50 w-[min(22rem,calc(100vw-2.5rem))] origin-top-left overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-5 text-left text-neutral-900 shadow-[0_24px_60px_rgba(10,42,34,0.18)] focus:outline-none sm:w-88"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id={headingId} className="text-base font-semibold tracking-tight text-neutral-950">Our Service Areas</h3>
                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Professional housekeeping staffing support across Pune and nearby business locations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close service areas panel"
                className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
              >
                <X aria-hidden="true" size={16} />
              </button>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-neutral-50 p-3.5">
              <MapPin aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-primary-700" />
              <div className="text-sm leading-6 text-neutral-700">
                <p className="font-semibold text-neutral-950">Prezenti Staffing Services</p>
                <p>{SEO_CONSTANTS.ADDRESS.LINE1}</p>
                <p>{SEO_CONSTANTS.ADDRESS.LINE2}</p>
                <p>
                  {SEO_CONSTANTS.ADDRESS.DISTRICT}, {SEO_CONSTANTS.ADDRESS.CITY}, {SEO_CONSTANTS.ADDRESS.STATE} &ndash; {SEO_CONSTANTS.ADDRESS.POSTAL_CODE}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Coverage</p>
              <ul className="flex flex-wrap gap-1.5">
                {primaryServiceAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-5 text-neutral-500">
                Service availability depends on staffing requirements and location.
              </p>
            </div>

            <Link
              to="/talk-to-us"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: 'primary', size: 'md', className: 'mt-5 w-full' })}
            >
              Request Staff
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
