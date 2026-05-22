import { useEffect, useId, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Check, CheckCircle2, Loader2, PhoneCall, Send, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import type { ExpertServiceName } from '../../modules/inquiry/inquiryConfig';
import { usePublicServiceCatalog } from '../../modules/inquiry/usePublicServiceCatalog';
import {
  getTodayDateValue,
  validateInquiryForm,
  type ExpertInquiryFormValues,
  type InquiryFormErrors,
} from '../../modules/inquiry/inquiryValidation';
import { sendExpertInquiry, type SendInquiryResponse } from '../../services/inquiryApi';

interface TalkToExpertFormProps {
  initialServices?: ExpertServiceName[];
  compact?: boolean;
  onSubmitted?: () => void;
}

const emptyForm: ExpertInquiryFormValues = {
  fullName: '',
  mobileNumber: '',
  email: '',
  companyName: '',
  location: '',
  requiredStartDate: '',
  services: [],
  additionalRequirement: '',
};

function fieldClass(hasError: boolean) {
  return cn(
    'mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:ring-2',
    hasError
      ? 'border-critical-400 focus:border-critical-500 focus:ring-critical-100'
      : 'border-neutral-200 focus:border-primary-700 focus:ring-primary-700/15',
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-semibold text-critical-600">
      {message}
    </p>
  );
}

function SuccessState({
  compact,
  message,
  onReset,
}: {
  compact: boolean;
  message: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('mx-auto w-full', compact ? 'max-w-3xl' : 'max-w-4xl')}
    >
      <div className="rounded-lg border border-success-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-success-50 text-success-600">
            <CheckCircle2 size={26} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Inquiry received</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">{message}</p>
            <Button type="button" variant="secondary" size="lg" className="mt-6" onClick={onReset}>
              Send another inquiry
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TalkToExpertForm({
  initialServices = [],
  compact = false,
  onSubmitted,
}: TalkToExpertFormProps) {
  const formId = useId();
  const [form, setForm] = useState<ExpertInquiryFormValues>({
    ...emptyForm,
    services: initialServices,
  });
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<SendInquiryResponse | null>(null);
  const { serviceNames, isLoading: servicesLoading, error: servicesError } = usePublicServiceCatalog();
  const today = getTodayDateValue();

  useEffect(() => {
    if (serviceNames.length === 0) return;

    const activeServiceNames = new Set(serviceNames.map((service) => service.toLowerCase()));
    setForm((current) => ({
      ...current,
      services: current.services.filter((service) => activeServiceNames.has(service.toLowerCase())),
    }));
  }, [serviceNames]);

  const update = <Key extends keyof ExpertInquiryFormValues>(key: Key, value: ExpertInquiryFormValues[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleService = (service: string) => {
    update(
      'services',
      form.services.includes(service)
        ? form.services.filter((item) => item !== service)
        : [...form.services, service],
    );
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (servicesLoading) {
      toast.error('Service options are still loading.');
      return;
    }

    if (serviceNames.length === 0) {
      setErrors((current) => ({ ...current, services: 'No active services are available.' }));
      toast.error('No active services are available.');
      return;
    }

    const validation = validateInquiryForm(form, serviceNames);

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please complete the required details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendExpertInquiry(validation.sanitized);
      setResponse(result);
      setForm({ ...emptyForm });
      toast.success(result.message);
      onSubmitted?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (response) {
    return (
      <SuccessState
        compact={compact}
        message={response.message}
        onReset={() => setResponse(null)}
      />
    );
  }

  return (
    <form onSubmit={submitInquiry} className={cn('mx-auto w-full', compact ? 'max-w-3xl' : 'max-w-4xl')}>
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-7 lg:p-8">
        <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-start">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-800 text-white">
            <PhoneCall size={22} />
          </span>
          <div className="min-w-0">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">Talk To Expert</div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Service inquiry details
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Share the details our operations team needs to review your staffing requirement and respond with the right next step.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-fullName`}>
            Full Name
            <input
              id={`${formId}-fullName`}
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              className={fieldClass(Boolean(errors.fullName))}
              placeholder="Your full name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={`${formId}-fullName-error`}
            />
            <FieldError id={`${formId}-fullName-error`} message={errors.fullName} />
          </label>

          <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-mobileNumber`}>
            Mobile Number
            <input
              id={`${formId}-mobileNumber`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.mobileNumber}
              onChange={(event) => update('mobileNumber', event.target.value)}
              className={fieldClass(Boolean(errors.mobileNumber))}
              placeholder="+91 98765 43210"
              aria-invalid={Boolean(errors.mobileNumber)}
              aria-describedby={`${formId}-mobileNumber-error`}
            />
            <FieldError id={`${formId}-mobileNumber-error`} message={errors.mobileNumber} />
          </label>

          <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-email`}>
            Email
            <input
              id={`${formId}-email`}
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
              className={fieldClass(Boolean(errors.email))}
              placeholder="name@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={`${formId}-email-error`}
            />
            <FieldError id={`${formId}-email-error`} message={errors.email} />
          </label>

          <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-companyName`}>
            Company Name
            <input
              id={`${formId}-companyName`}
              type="text"
              autoComplete="organization"
              value={form.companyName}
              onChange={(event) => update('companyName', event.target.value)}
              className={fieldClass(Boolean(errors.companyName))}
              placeholder="Company or site name"
              aria-invalid={Boolean(errors.companyName)}
              aria-describedby={`${formId}-companyName-error`}
            />
            <FieldError id={`${formId}-companyName-error`} message={errors.companyName} />
          </label>

          <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-location`}>
            Location / Area
            <input
              id={`${formId}-location`}
              type="text"
              autoComplete="address-level2"
              value={form.location}
              onChange={(event) => update('location', event.target.value)}
              className={fieldClass(Boolean(errors.location))}
              placeholder="Baner, Pune"
              aria-invalid={Boolean(errors.location)}
              aria-describedby={`${formId}-location-error`}
            />
            <FieldError id={`${formId}-location-error`} message={errors.location} />
          </label>

          <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-requiredStartDate`}>
            Required Start Date
            <span className="relative block">
              <CalendarDays size={16} className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-neutral-400" />
              <input
                id={`${formId}-requiredStartDate`}
                type="date"
                min={today}
                value={form.requiredStartDate}
                onChange={(event) => update('requiredStartDate', event.target.value)}
                className={cn(fieldClass(Boolean(errors.requiredStartDate)), 'pr-11')}
                aria-invalid={Boolean(errors.requiredStartDate)}
                aria-describedby={`${formId}-requiredStartDate-error`}
              />
            </span>
            <FieldError id={`${formId}-requiredStartDate-error`} message={errors.requiredStartDate} />
          </label>
        </div>

        <fieldset className="mt-7">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <legend className="text-sm font-semibold text-neutral-800">Service Selection</legend>
            <FieldError id={`${formId}-services-error`} message={errors.services} />
          </div>

          {servicesLoading && (
            <div className="grid gap-3 sm:grid-cols-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="flex min-h-14 items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 text-sm font-semibold text-neutral-500">
                  <Loader2 size={16} className="animate-spin" />
                  Loading service
                </div>
              ))}
            </div>
          )}

          {!servicesLoading && servicesError && (
            <div className="rounded-lg border border-critical-100 bg-critical-50 px-4 py-3 text-sm font-semibold text-critical-600">
              {servicesError}
            </div>
          )}

          {!servicesLoading && !servicesError && serviceNames.length === 0 && (
            <div className="rounded-lg border border-warning-100 bg-warning-50 px-4 py-3 text-sm font-semibold text-warning-600">
              No active services are available.
            </div>
          )}

          {!servicesLoading && !servicesError && serviceNames.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2" aria-describedby={`${formId}-services-error`}>
              {serviceNames.map((service) => {
                const selected = form.services.includes(service);

                return (
                  <label key={service} className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleService(service)}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        'flex min-h-14 items-center justify-between gap-4 rounded-lg border px-4 py-3 text-sm font-semibold transition peer-focus-visible:ring-2 peer-focus-visible:ring-primary-700/20',
                        selected
                          ? 'border-primary-800 bg-primary-800 text-white'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-primary-200 hover:bg-primary-50',
                      )}
                    >
                      <span>{service}</span>
                      <span
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded border transition',
                          selected ? 'border-white bg-white text-primary-800' : 'border-neutral-300 bg-white text-white',
                        )}
                        aria-hidden="true"
                      >
                        <Check size={14} />
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </fieldset>

        <label className="mt-7 block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-additionalRequirement`}>
          Additional Requirement
          <textarea
            id={`${formId}-additionalRequirement`}
            rows={5}
            value={form.additionalRequirement}
            onChange={(event) => update('additionalRequirement', event.target.value)}
            className={cn(fieldClass(Boolean(errors.additionalRequirement)), 'resize-y leading-6')}
            placeholder="Tell us about shift expectations, site size, preferred timing, or any operational details."
            aria-invalid={Boolean(errors.additionalRequirement)}
            aria-describedby={`${formId}-additionalRequirement-error`}
          />
          <FieldError id={`${formId}-additionalRequirement-error`} message={errors.additionalRequirement} />
        </label>

        <div className="mt-7 flex flex-col gap-4 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-sm leading-6 text-neutral-600">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary-800" />
            <span>Your inquiry is sent through email and WhatsApp.</span>
          </div>
          <Button type="submit" variant="primary" size="xl" className="w-full sm:w-auto" isLoading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? 'Sending inquiry' : 'Send Inquiry'}
            {!isSubmitting && <Send size={17} />}
          </Button>
        </div>
      </div>
    </form>
  );
}
