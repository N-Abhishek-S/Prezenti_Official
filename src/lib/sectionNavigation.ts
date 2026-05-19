export const PENDING_SECTION_KEY = 'presenti.pendingSection';

export const publicSections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'quick-guide', label: 'Quick Guide' },
  { id: 'location', label: 'Cities' },
  { id: 'contact', label: 'Contact' },
] as const;

export type PublicSectionId = (typeof publicSections)[number]['id'];

export function scrollToSection(sectionId: PublicSectionId, behavior: ScrollBehavior = 'smooth') {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({ behavior, block: 'start' });
}

export function setPendingSection(sectionId: PublicSectionId) {
  window.sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
}

export function consumePendingSection(): PublicSectionId | null {
  const value = window.sessionStorage.getItem(PENDING_SECTION_KEY) as PublicSectionId | null;
  window.sessionStorage.removeItem(PENDING_SECTION_KEY);

  if (!value || !publicSections.some((section) => section.id === value)) {
    return null;
  }

  return value;
}
