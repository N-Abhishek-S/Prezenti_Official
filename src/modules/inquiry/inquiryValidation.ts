import type { ExpertServiceName, InquiryType, TimePreference } from './inquiryConfig';
import { inquiryTypeOptions, serviceOptions, timePreferenceOptions } from './inquiryConfig';

export interface ExpertInquiryFormValues {
  name: string;
  phone: string;
  location: string;
  requiredDate: string;
  services: ExpertServiceName[];
  timePreference: TimePreference;
  inquiryType: InquiryType;
  message: string;
}

export type InquiryFormErrors = Partial<Record<keyof ExpertInquiryFormValues, string>>;

export function getTodayDateValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const localDate = new Date(today.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 10);
}

export function sanitizeText(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
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
    name: sanitizeText(values.name).replace(/\s+/g, ' '),
    phone: normalizeIndianMobile(values.phone),
    location: sanitizeText(values.location).replace(/\s+/g, ' '),
    requiredDate: values.requiredDate.trim(),
    services: values.services.filter((service): service is ExpertServiceName => serviceOptions.includes(service)),
    timePreference: timePreferenceOptions.includes(values.timePreference) ? values.timePreference : timePreferenceOptions[0],
    inquiryType: inquiryTypeOptions.includes(values.inquiryType) ? values.inquiryType : inquiryTypeOptions[0],
    message: sanitizeText(values.message),
  };
}

export function validateInquiryForm(values: ExpertInquiryFormValues) {
  const sanitized = sanitizeInquiryForm(values);
  const errors: InquiryFormErrors = {};

  if (sanitized.name.length < 2) {
    errors.name = 'Enter full name.';
  }

  if (!isValidIndianMobile(sanitized.phone)) {
    errors.phone = 'Enter a valid Indian mobile number.';
  }

  if (sanitized.location.length < 2) {
    errors.location = 'Enter location or area.';
  }

  if (!sanitized.requiredDate) {
    errors.requiredDate = 'Select service start date.';
  } else if (sanitized.requiredDate < getTodayDateValue()) {
    errors.requiredDate = 'Date cannot be in the past.';
  }

  if (sanitized.services.length === 0) {
    errors.services = 'Select at least one service.';
  }

  if (!timePreferenceOptions.includes(sanitized.timePreference)) {
    errors.timePreference = 'Select time preference.';
  }

  if (!inquiryTypeOptions.includes(sanitized.inquiryType)) {
    errors.inquiryType = 'Select inquiry type.';
  }

  return { sanitized, errors, isValid: Object.keys(errors).length === 0 };
}

export function generateInquiryPreview(values: ExpertInquiryFormValues) {
  const sanitized = sanitizeInquiryForm(values);

  return [
    'New Service Inquiry - Prezenti',
    '',
    'Customer Details:',
    `Name: ${sanitized.name || '{name}'}`,
    `Mobile: ${sanitized.phone || '{phone}'}`,
    `Location/Area: ${sanitized.location || '{location}'}`,
    `Service Start Date: ${sanitized.requiredDate || '{date}'}`,
    '',
    'Selected Services:',
    sanitized.services.length > 0 ? sanitized.services.map((service) => `- ${service}`).join('\n') : '{service list}',
    '',
    'Time Preference:',
    sanitized.timePreference,
    '',
    'Inquiry Type:',
    sanitized.inquiryType,
    '',
    'Additional Requirement:',
    sanitized.message || 'None',
    '',
    'Please contact this customer as soon as possible.',
  ].join('\n');
}
