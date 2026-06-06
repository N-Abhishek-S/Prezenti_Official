import { useEffect } from 'react';
import type { router } from '../app/router';
import { initializeClarity, isClarityEnabled, trackClarityPageView } from '../lib/clarity';

type AppRouter = typeof router;

function currentPagePath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function Clarity({ router }: { router: AppRouter }) {
  useEffect(() => {
    if (!isClarityEnabled() || !initializeClarity()) {
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
  }, [router]);

  return null;
}
