const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api/v1';

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PricingFeature {
  id: string;
  label: string;
  description?: string | null;
  isHighlighted: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  isActive: boolean;
  displayOrder: number;
}

export interface PricingPlan {
  id: string;
  categoryId: string;
  category?: ServiceCategory;
  name: string;
  slug: string;
  monthlyPrice: number;
  currency: string;
  shiftTiming?: string | null;
  workingHours?: string | null;
  overtimeCharges?: number | null;
  replacementGuarantee?: string | null;
  availabilitySla?: string | null;
  trialPeriod?: string | null;
  trainingIncluded: boolean;
  emergencyReplacement: boolean;
  transportIncluded: boolean;
  customNotes?: string | null;
  isActive: boolean;
  displayOrder: number;
  features: PricingFeature[];
}

export async function apiGet<T>(path: string, token?: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`);
  }

  return response.json() as Promise<ApiEnvelope<T>>;
}

export async function apiSend<T>(path: string, method: 'POST' | 'PATCH' | 'DELETE', body?: unknown, token?: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`);
  }

  return response.json() as Promise<ApiEnvelope<T>>;
}
