export type ConsentStatus = 'granted' | 'denied';

const STORAGE_KEY = 'prezenti_analytics_consent';
const CONSENT_EVENT = 'prezenti:consent-change';

function isBrowser() {
  return typeof window !== 'undefined';
}

/** Non-essential analytics (GA4, Microsoft Clarity) consent decision. `null` means the visitor has not decided yet. */
export function getAnalyticsConsent(): ConsentStatus | null {
  if (!isBrowser()) return null;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'granted' || stored === 'denied' ? stored : null;
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === 'granted';
}

export function setAnalyticsConsent(status: ConsentStatus) {
  if (!isBrowser()) return;

  window.localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(new CustomEvent<ConsentStatus>(CONSENT_EVENT, { detail: status }));
}

/** Clears the stored decision so the consent banner is shown again (used by "manage cookie preferences"). */
export function resetAnalyticsConsent() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

export function subscribeToConsentChange(callback: (status: ConsentStatus | null) => void) {
  if (!isBrowser()) return () => undefined;

  const listener = (event: Event) => {
    callback((event as CustomEvent<ConsentStatus | null>).detail ?? getAnalyticsConsent());
  };

  window.addEventListener(CONSENT_EVENT, listener);
  return () => window.removeEventListener(CONSENT_EVENT, listener);
}
