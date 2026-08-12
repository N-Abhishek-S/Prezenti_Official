import { useEffect, useState } from 'react';
import type { router } from '../app/router';
import { initializeClarity, isClarityEnabled, trackClarityPageView } from '../lib/clarity';
import { hasAnalyticsConsent, subscribeToConsentChange } from '../lib/consent';

type AppRouter = typeof router;

function currentPagePath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function Clarity({ router }: { router: AppRouter }) {
  const [consentGranted, setConsentGranted] = useState(hasAnalyticsConsent());

  useEffect(() => subscribeToConsentChange(() => setConsentGranted(hasAnalyticsConsent())), []);

  useEffect(() => {
    if (!isClarityEnabled() || !consentGranted || !initializeClarity()) {
      return undefined;
    }

    trackClarityPageView(currentPagePath());

    const unsubscribe = router.subscribe(() => {
      window.requestAnimationFrame(() => {
        trackClarityPageView(currentPagePath());
      });
    });

    return () => {
      unsubscribe();
    };
  }, [router, consentGranted]);

  return null;
}
