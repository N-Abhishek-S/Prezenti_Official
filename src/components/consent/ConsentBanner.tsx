import { useEffect, useState } from 'react';
import { getAnalyticsConsent, setAnalyticsConsent, subscribeToConsentChange } from '../../lib/consent';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getAnalyticsConsent() === null);
    return subscribeToConsentChange((status) => setVisible(status === null));
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie and analytics preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800 bg-neutral-900 px-4 py-5 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)] sm:px-6"
    >
      <div className="desktop-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-white/80">
          We use optional analytics (Google Analytics 4, Microsoft Clarity) to understand how visitors use this site.
          These only run if you allow them. Essential site functionality, including the inquiry form, works either way.
          See our{' '}
          <a href="/privacy-policy" className="font-medium text-white underline underline-offset-2 hover:text-white/90">
            Privacy Policy
          </a>{' '}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setAnalyticsConsent('denied')}
            className="rounded-lg border border-white/25 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setAnalyticsConsent('granted')}
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Allow analytics
          </button>
        </div>
      </div>
    </div>
  );
}
