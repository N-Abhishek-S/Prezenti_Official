import type { ExpertInquiryFormValues } from './inquiryValidation';

export interface QuoteDraft {
  quoteId: string;
  customer: ExpertInquiryFormValues;
  createdAt: string;
}

const storageKeyPrefix = 'kargar_quote_';

export function generateQuoteId() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `KARGAR-${Date.now().toString(36).toUpperCase()}${random}`;
}

export function saveQuoteDraft(draft: QuoteDraft) {
  try {
    window.sessionStorage.setItem(`${storageKeyPrefix}${draft.quoteId}`, JSON.stringify(draft));
  } catch {
    // sessionStorage may be unavailable (private browsing, storage full) —
    // the quote still works via in-memory/router state for the current tab.
  }
}

export function loadQuoteDraft(quoteId: string | undefined | null): QuoteDraft | null {
  if (!quoteId) return null;

  try {
    const raw = window.sessionStorage.getItem(`${storageKeyPrefix}${quoteId}`);
    if (!raw) return null;
    return JSON.parse(raw) as QuoteDraft;
  } catch {
    return null;
  }
}

export function clearQuoteDraft(quoteId: string | undefined | null) {
  if (!quoteId) return;

  try {
    window.sessionStorage.removeItem(`${storageKeyPrefix}${quoteId}`);
  } catch {
    // Nothing to clean up if storage isn't available.
  }
}
