import { useEffect } from 'react';
import type { router } from '../app/router';
import {
  getOutboundOrDownloadEvent,
  initializeAnalytics,
  isAnalyticsEnabled,
  trackEvent,
  trackPageView,
} from '../lib/analytics';

type AppRouter = typeof router;

let lastTrackedPage = '';
let scrollTrackedForPage = false;

function currentPagePath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function trackCurrentPage() {
  const pagePath = currentPagePath();

  if (pagePath === lastTrackedPage) {
    return;
  }

  lastTrackedPage = pagePath;
  scrollTrackedForPage = false;
  trackPageView(pagePath);
}

export function Analytics({ router }: { router: AppRouter }) {
  useEffect(() => {
    if (!isAnalyticsEnabled() || !initializeAnalytics()) {
      return undefined;
    }

    // Initial page view plus SPA navigations are sent manually because GA config
    // is initialized with send_page_view: false to prevent duplicate page_view hits.
    trackCurrentPage();

    const unsubscribe = router.subscribe(() => {
      window.requestAnimationFrame(trackCurrentPage);
    });

    const handleScroll = () => {
      if (scrollTrackedForPage) return;

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const scrollDepth = (window.scrollY / scrollableHeight) * 100;
      if (scrollDepth >= 90) {
        scrollTrackedForPage = true;
        trackEvent('scroll', {
          percent_scrolled: 90,
          page_path: currentPagePath(),
        });
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a') : null;
      if (!(target instanceof HTMLAnchorElement)) return;

      const analyticsEvent = getOutboundOrDownloadEvent(target);
      if (!analyticsEvent) return;

      trackEvent(analyticsEvent.name, analyticsEvent.params);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick, true);

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick, true);
    };
  }, [router]);

  return null;
}
