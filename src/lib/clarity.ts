type ClarityCommand = 'consent' | 'event' | 'identify' | 'set' | 'upgrade';

type Clarity = (command: ClarityCommand, ...args: Array<string | boolean | string[] | null | undefined>) => void;

declare global {
  interface Window {
    clarity?: Clarity & { q?: unknown[] };
  }
}

const CLARITY_SCRIPT_ID = 'microsoft-clarity-script';
const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined;

let initialized = false;
let lastTrackedPath = '';

export function isClarityEnabled() {
  return Boolean(import.meta.env.PROD && projectId);
}

export function initializeClarity() {
  if (!isClarityEnabled() || initialized || typeof window === 'undefined') {
    return initialized;
  }

  // This lightweight queue matches Microsoft's snippet and lets Clarity accept
  // commands immediately while the async recorder script downloads.
  window.clarity = window.clarity ?? function clarity(...args: Parameters<Clarity>) {
    (window.clarity!.q = window.clarity!.q ?? []).push(args);
  };

  if (!document.getElementById(CLARITY_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = CLARITY_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${projectId}`;
    document.head.appendChild(script);
  }

  initialized = true;
  return true;
}

export function trackClarityPageView(path: string, title = document.title) {
  if (!isClarityEnabled() || !window.clarity || path === lastTrackedPath) {
    return;
  }

  lastTrackedPath = path;

  // Clarity records SPA sessions through the history API; these custom tags and
  // event markers make route changes easy to segment in recordings and heatmaps.
  window.clarity('set', 'page_path', path);
  window.clarity('set', 'page_title', title);
  window.clarity('event', 'spa_page_view');
}
