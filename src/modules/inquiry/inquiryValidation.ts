export interface ExpertInquiryFormValues {
  fullName: string;
  mobileNumber: string;
  email: string;
  companyName: string;
  location: string;
  requiredStartDate: string;
  services: string[];
  categories: string[];
  additionalRequirement: string;
}

export type InquiryFormErrors = Partial<Record<keyof ExpertInquiryFormValues, string>>;

export function getTodayDateValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 10);
}

export function sanitizeText(value: string) {
  let output = '';

  for (const char of value) {
    const code = char.charCodeAt(0);
    output += code < 32 || code === 127 ? ' ' : char;
  }

  return output
    .replace(/[<>]/g, '')
    .trim();
}

export function sanitizeMultilineText(value: string) {
  let output = '';

  for (const char of value) {
    const code = char.charCodeAt(0);
    const allowedWhitespace = char === '\n' || char === '\r' || char === '\t';
    output += code < 32 || code === 127 ? (allowedWhitespace ? char : ' ') : char;
  }

  return output
    .replace(/[<>]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function normalizeIndianMobile(value: string) {
  return value.replace(/[\s()-]/g, '').trim();
}

export function isValidIndianMobile(value: string) {
  return /^(?:\+91|91)?[6-9]\d{9}$/.test(normalizeIndianMobile(value));
}

export function sanitizeInquiryForm(values: ExpertInquiryFormValues): ExpertInquiryFormValues {
  return {
    fullName: sanitizeText(values.fullName).replace(/\s+/g, ' '),
    mobileNumber: normalizeIndianMobile(values.mobileNumber),
    email: sanitizeText(values.email).replace(/\s+/g, '').toLowerCase(),
    companyName: sanitizeText(values.companyName).replace(/\s+/g, ' '),
    location: sanitizeText(values.location).replace(/\s+/g, ' '),
    requiredStartDate: values.requiredStartDate.trim(),
    services: values.services.map((service) => sanitizeText(service).replace(/\s+/g, ' ')).filter(Boolean).slice(0, 8),
    categories: values.categories.map((category) => sanitizeText(category).replace(/\s+/g, ' ')).filter(Boolean).slice(0, 4),
    additionalRequirement: sanitizeMultilineText(values.additionalRequirement),
  };
}

export function validateInquiryForm(
  values: ExpertInquiryFormValues,
  availableServices: string[] = [],
  availableCategories: string[] = [],
) {
  const sanitized = sanitizeInquiryForm(values);
  const errors: InquiryFormErrors = {};
  const activeServiceNames = new Set(availableServices.map((service) => service.toLowerCase()));
  const activeCategoryNames = new Set(availableCategories.map((category) => category.toLowerCase()));

  if (sanitized.fullName.length < 2) {
    errors.fullName = 'Enter full name.';
  }

  if (!isValidIndianMobile(sanitized.mobileNumber)) {
    errors.mobileNumber = 'Enter a valid Indian mobile number.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (sanitized.companyName.length < 2) {
    errors.companyName = 'Enter company name.';
  }

  if (sanitized.location.length < 2) {
    errors.location = 'Enter location or area.';
  }

  if (!sanitized.requiredStartDate) {
    errors.requiredStartDate = 'Select required start date.';
  } else if (sanitized.requiredStartDate < getTodayDateValue()) {
    errors.requiredStartDate = 'Date cannot be in the past.';
  }

  if (sanitized.services.length === 0) {
    errors.services = 'Select at least one service.';
  } else if (activeServiceNames.size > 0 && sanitized.services.some((service) => !activeServiceNames.has(service.toLowerCase()))) {
    errors.services = 'Choose a currently active service.';
  }

  if (sanitized.categories.length === 0) {
    errors.categories = 'Select at least one category.';
  } else if (activeCategoryNames.size > 0 && sanitized.categories.some((category) => !activeCategoryNames.has(category.toLowerCase()))) {
    errors.categories = 'Choose a supported category.';
  }

  if (sanitized.additionalRequirement.length < 5) {
    errors.additionalRequirement = 'Add a short requirement.';
  }

  return { sanitized, errors, isValid: Object.keys(errors).length === 0 };
}
