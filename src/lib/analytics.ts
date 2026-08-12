import { hasAnalyticsConsent } from './consent';

type GtagCommand = 'config' | 'event' | 'js' | 'set';

type Gtag = (
  command: GtagCommand,
  targetIdOrEventName: string | Date | Record<string, unknown>,
  config?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>;

const FILE_DOWNLOAD_EXTENSIONS = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|7z|csv|txt|rtf|mp3|mp4|mov|avi|webm|png|jpe?g|gif|svg)$/i;
const GA_SCRIPT_ID = 'ga4-script';
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let initialized = false;

export function isAnalyticsEnabled() {
  return Boolean(import.meta.env.PROD && measurementId);
}

export function isAnalyticsDebugEnabled() {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  return params.get('ga_debug') === '1' || window.localStorage.getItem('ga_debug') === '1';
}

function withDebugParams(params: AnalyticsEventParams = {}) {
  return isAnalyticsDebugEnabled() ? { ...params, debug_mode: true } : params;
}

export function initializeAnalytics() {
  if (!isAnalyticsEnabled() || !hasAnalyticsConsent() || initialized || typeof window === 'undefined') {
    return initialized;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId!, {
    // React Router sends page_view events explicitly so GA4 never records duplicates.
    send_page_view: false,
    ...(isAnalyticsDebugEnabled() ? { debug_mode: true } : {}),
  });

  initialized = true;
  return true;
}

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}) {
  if (!isAnalyticsEnabled() || !hasAnalyticsConsent() || !window.gtag) return;

  window.gtag('event', eventName, withDebugParams(params));
}

export function trackPageView(path: string, title = document.title) {
  trackEvent('page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: path,
  });
}

export function trackFormSubmission(formName: string, params: AnalyticsEventParams = {}) {
  trackEvent('form_submit', {
    form_name: formName,
    event_label: `${formName} Submitted`,
    ...params,
  });
}

export function trackCTA(ctaName: string, params: AnalyticsEventParams = {}) {
  trackEvent(`${ctaName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}_clicked`, {
    cta_name: ctaName,
    event_label: `${ctaName} Clicked`,
    ...params,
  });
}

export function trackContactClick(contactType: 'call' | 'whatsapp' | 'email', params: AnalyticsEventParams = {}) {
  const eventNames = {
    call: 'call_button_clicked',
    whatsapp: 'whatsapp_button_clicked',
    email: 'email_clicked',
  };

  trackEvent(eventNames[contactType], {
    contact_type: contactType,
    event_label: contactType === 'email' ? 'Email Clicked' : `${contactType[0].toUpperCase()}${contactType.slice(1)} Button Clicked`,
    ...params,
  });
}

export function trackTalkToUsSubmitted(params: AnalyticsEventParams = {}) {
  trackEvent('talk_to_us_submitted', {
    event_label: 'Talk To Us Submitted',
    ...params,
  });
}

export function trackContactFormSubmitted(params: AnalyticsEventParams = {}) {
  trackEvent('contact_form_submitted', {
    event_label: 'Contact Form Submitted',
    ...params,
  });
}

export function getOutboundOrDownloadEvent(link: HTMLAnchorElement) {
  const href = link.href;
  if (!href) return null;

  const url = new URL(href, window.location.href);
  const linkText = link.textContent?.trim() || link.getAttribute('aria-label') || undefined;

  if (url.protocol === 'mailto:') {
    return { name: 'email_clicked', params: { link_url: href, link_text: linkText, event_label: 'Email Clicked' } };
  }

  if (url.protocol === 'tel:') {
    return { name: 'call_button_clicked', params: { link_url: href, link_text: linkText, event_label: 'Call Button Clicked' } };
  }

  if (url.hostname.includes('wa.me') || url.hostname.includes('whatsapp.com')) {
    return { name: 'whatsapp_button_clicked', params: { link_url: href, link_text: linkText, event_label: 'WhatsApp Button Clicked' } };
  }

  if (FILE_DOWNLOAD_EXTENSIONS.test(url.pathname)) {
    return {
      name: 'file_download',
      params: {
        file_name: url.pathname.split('/').pop(),
        file_extension: url.pathname.split('.').pop(),
        link_url: href,
        link_text: linkText,
      },
    };
  }

  if (url.hostname !== window.location.hostname && url.protocol.startsWith('http')) {
    return { name: 'outbound_click', params: { link_url: href, link_domain: url.hostname, link_text: linkText } };
  }

  return null;
}
