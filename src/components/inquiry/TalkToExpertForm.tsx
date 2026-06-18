import { useEffect, useId, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CalendarDays, Check, CheckCircle2, Loader2, PhoneCall, School, Send, ShieldCheck, Utensils, Building2, Building, Home, HeartPulse } from 'lucide-react';
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
import { trackContactFormSubmitted, trackTalkToUsSubmitted } from '../../lib/analytics';

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
  services: ['Housekeeping'],
  categories: ['Cafes / Restaurants'],
  additionalRequirement: '',
};

const lockedServiceName = 'Housekeeping';
const categoryOptions = [
  { id: 'Offices / Corporate / Educational Institute', icon: Building2 },
  { id: 'Commercial Buildings', icon: Building },
  { id: 'Residential Buildings', icon: Home },
  { id: 'Hospital / Healthcare', icon: HeartPulse },
  { id: 'Cafes / Restaurants', icon: Utensils },
  { id: 'Pre Schools', icon: School },
] as const;

function labelClass(isComplete: boolean) {
  return cn('block text-sm font-semibold transition-colors duration-200', isComplete ? 'text-success-700' : 'text-neutral-800');
}

function fieldClass(hasError: boolean, isComplete = false) {
  return cn(
    'mt-2 w-full rounded-[14px] border bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:ring-2',
    hasError
      ? 'border-critical-400 focus:border-critical-500 focus:ring-critical-100'
      : isComplete
        ? 'border-success-300 focus:border-success-500 focus:ring-success-500/15'
        : 'border-neutral-200 focus:border-success-500 focus:ring-success-500/15',
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
  partialSuccess,
}: {
  compact: boolean;
  message: string;
  onReset: () => void;
  partialSuccess?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('mx-auto w-full', compact ? 'max-w-3xl' : 'max-w-4xl')}
    >
      <div className={cn("rounded-lg border bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8", partialSuccess ? "border-warning-300" : "border-success-100")}>
        <div className="flex flex-col items-start gap-5 sm:flex-row">
          <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-lg", partialSuccess ? "bg-warning-50 text-warning-600" : "bg-success-50 text-success-600")}>
            {partialSuccess ? <AlertCircle size={26} /> : <CheckCircle2 size={26} />}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
              {partialSuccess ? 'Inquiry saved' : 'Inquiry received'}
            </h2>
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
    services: initialServices.some((service) => service.toLowerCase() === lockedServiceName.toLowerCase())
      ? [lockedServiceName]
      : emptyForm.services,
  });
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<SendInquiryResponse | null>(null);
  const { serviceNames, isLoading: servicesLoading, error: servicesError } = usePublicServiceCatalog();
  const today = getTodayDateValue();

  useEffect(() => {
    if (serviceNames.length === 0) return;

    const hasHousekeeping = serviceNames.some((service) => service.toLowerCase() === lockedServiceName.toLowerCase());
    setForm((current) => ({
      ...current,
      services: hasHousekeeping ? [lockedServiceName] : [],
    }));
  }, [serviceNames]);

  const update = <Key extends keyof ExpertInquiryFormValues>(key: Key, value: ExpertInquiryFormValues[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleCategory = (category: string) => {
    update(
      'categories',
      form.categories.includes(category)
        ? form.categories.filter((item) => item !== category)
        : [...form.categories, category],
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

    const validation = validateInquiryForm(form, [lockedServiceName], categoryOptions.map((category) => category.id));

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please complete the required details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendExpertInquiry(validation.sanitized);
      trackContactFormSubmitted({
        form_name: 'Talk To Expert',
        selected_services: validation.sanitized.services.join(', '),
      });

      if (window.location.pathname === '/talk-to-us') {
        trackTalkToUsSubmitted({
          form_name: 'Talk To Us',
          selected_services: validation.sanitized.services.join(', '),
        });
      }

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
        partialSuccess={response.partialSuccess}
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
          <label className={labelClass(form.fullName.trim().length > 1)} htmlFor={`${formId}-fullName`}>
            Full Name
            <input
              id={`${formId}-fullName`}
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              className={fieldClass(Boolean(errors.fullName), form.fullName.trim().length > 1)}
              placeholder="Your full name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={`${formId}-fullName-error`}
            />
            <FieldError id={`${formId}-fullName-error`} message={errors.fullName} />
          </label>

          <label className={labelClass(form.mobileNumber.trim().length > 0)} htmlFor={`${formId}-mobileNumber`}>
            Mobile Number
            <input
              id={`${formId}-mobileNumber`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.mobileNumber}
              onChange={(event) => update('mobileNumber', event.target.value)}
              className={fieldClass(Boolean(errors.mobileNumber), form.mobileNumber.trim().length > 0)}
              placeholder="Mobile Number"
              aria-invalid={Boolean(errors.mobileNumber)}
              aria-describedby={`${formId}-mobileNumber-error`}
            />
            <FieldError id={`${formId}-mobileNumber-error`} message={errors.mobileNumber} />
          </label>

          <label className={labelClass(form.email.trim().length > 0)} htmlFor={`${formId}-email`}>
            Email
            <input
              id={`${formId}-email`}
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
              className={fieldClass(Boolean(errors.email), form.email.trim().length > 0)}
              placeholder="Email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={`${formId}-email-error`}
            />
            <FieldError id={`${formId}-email-error`} message={errors.email} />
          </label>

          <label className={labelClass(form.companyName.trim().length > 1)} htmlFor={`${formId}-companyName`}>
            Company / Building Name
            <input
              id={`${formId}-companyName`}
              type="text"
              autoComplete="organization"
              value={form.companyName}
              onChange={(event) => update('companyName', event.target.value)}
              className={fieldClass(Boolean(errors.companyName), form.companyName.trim().length > 1)}
              placeholder="Company / Building Name"
              aria-invalid={Boolean(errors.companyName)}
              aria-describedby={`${formId}-companyName-error`}
            />
            <FieldError id={`${formId}-companyName-error`} message={errors.companyName} />
          </label>

          <label className={labelClass(form.location.trim().length > 1)} htmlFor={`${formId}-location`}>
            Location / Area
            <input
              id={`${formId}-location`}
              type="text"
              autoComplete="address-level2"
              value={form.location}
              onChange={(event) => update('location', event.target.value)}
              className={fieldClass(Boolean(errors.location), form.location.trim().length > 1)}
              placeholder="Location / Area"
              aria-invalid={Boolean(errors.location)}
              aria-describedby={`${formId}-location-error`}
            />
            <FieldError id={`${formId}-location-error`} message={errors.location} />
          </label>

          <label className={labelClass(Boolean(form.requiredStartDate))} htmlFor={`${formId}-requiredStartDate`}>
            Required Start Date
            <span className="relative block">
              <CalendarDays size={16} className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-neutral-400" />
              <input
                id={`${formId}-requiredStartDate`}
                type="date"
                min={today}
                value={form.requiredStartDate}
                onChange={(event) => update('requiredStartDate', event.target.value)}
                className={cn(fieldClass(Boolean(errors.requiredStartDate), Boolean(form.requiredStartDate)), 'pr-11')}
                aria-invalid={Boolean(errors.requiredStartDate)}
                aria-describedby={`${formId}-requiredStartDate-error`}
              />
            </span>
            <FieldError id={`${formId}-requiredStartDate-error`} message={errors.requiredStartDate} />
          </label>
        </div>

        <fieldset className="mt-7">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <legend className="text-sm font-semibold text-success-700">Selected Service</legend>
            <FieldError id={`${formId}-services-error`} message={errors.services} />
          </div>

          {servicesLoading && (
            <div className="flex min-h-16 items-center gap-3 rounded-[14px] border border-neutral-200 bg-neutral-50 px-4 text-sm font-semibold text-neutral-500">
              <Loader2 size={16} className="animate-spin" />
              Loading service
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
            <div className="rounded-[14px] border border-success-500 bg-[#ECFDF5] px-4 py-4 shadow-[0_12px_30px_rgba(22,163,74,0.10)]" aria-describedby={`${formId}-services-error`}>
              <label className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3 text-sm font-bold text-neutral-950">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success-500 text-white">
                    <Check size={16} />
                  </span>
                  Housekeeping
                </span>
                <input type="checkbox" checked readOnly aria-label="Housekeeping selected" className="sr-only" />
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-success-700">Active</span>
              </label>
            </div>
          )}
        </fieldset>

        <fieldset className="mt-7">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <legend className={cn('text-sm font-semibold transition-colors duration-200', form.categories.length > 0 ? 'text-success-700' : 'text-neutral-800')}>
              Category Selection
            </legend>
            <FieldError id={`${formId}-categories-error`} message={errors.categories} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2" aria-describedby={`${formId}-categories-error`}>
            {categoryOptions.map((category) => {
              const selected = form.categories.includes(category.id);
              const CategoryIcon = category.icon;

              return (
                <motion.label
                  key={category.id}
                  animate={{ scale: selected ? 1.02 : 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleCategory(category.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      'relative flex min-h-18 items-center justify-between gap-4 overflow-hidden rounded-[14px] border px-4 py-4 text-sm font-semibold transition-all duration-250 peer-focus-visible:ring-2 peer-focus-visible:ring-success-500/25',
                      selected
                        ? 'border-success-500 bg-[#ECFDF5] text-neutral-950 shadow-[0_14px_34px_rgba(22,163,74,0.12)]'
                        : 'border-neutral-200 bg-white text-neutral-800 hover:-translate-y-0.5 hover:border-success-500 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]',
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-success-50 text-success-700">
                        <CategoryIcon size={20} />
                      </span>
                      <span>{category.id}</span>
                    </span>
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-250',
                        selected ? 'border-success-500 bg-success-500 text-white' : 'border-neutral-300 bg-white text-transparent',
                      )}
                      aria-hidden="true"
                    >
                      <Check size={15} />
                    </span>
                    {selected && (
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-[14px] border border-success-400"
                        initial={{ opacity: 0.5, scale: 0.98 }}
                        animate={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.25 }}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </motion.label>
              );
            })}
          </div>
        </fieldset>

        <label className={cn('mt-7', labelClass(form.additionalRequirement.trim().length > 4))} htmlFor={`${formId}-additionalRequirement`}>
          Additional Requirement
          <textarea
            id={`${formId}-additionalRequirement`}
            rows={5}
            value={form.additionalRequirement}
            onChange={(event) => update('additionalRequirement', event.target.value)}
            className={cn(fieldClass(Boolean(errors.additionalRequirement), form.additionalRequirement.trim().length > 4), 'resize-y leading-6')}
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
