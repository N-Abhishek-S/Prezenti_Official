import { useMemo, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, MessageSquareText, PhoneCall, Send, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import {
  defaultInquiryType,
  defaultTimePreference,
  inquiryTypeOptions,
  serviceOptions,
  timePreferenceOptions,
  type ExpertServiceName,
  type TimePreference,
} from '../../modules/inquiry/inquiryConfig';
import {
  generateInquiryPreview,
  getTodayDateValue,
  validateInquiryForm,
  type ExpertInquiryFormValues,
  type InquiryFormErrors,
} from '../../modules/inquiry/inquiryValidation';
import { sendExpertInquiry, type SendInquiryResponse } from '../../services/inquiryApi';

interface TalkToExpertFormProps {
  initialServices?: ExpertServiceName[];
  initialTimePreference?: TimePreference;
  compact?: boolean;
  onSubmitted?: () => void;
}

const emptyForm: ExpertInquiryFormValues = {
  name: '',
  phone: '',
  location: '',
  requiredDate: '',
  services: [],
  timePreference: defaultTimePreference,
  inquiryType: defaultInquiryType,
  message: '',
};

function fieldClass(hasError: boolean) {
  return cn(
    'mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:ring-2',
    hasError
      ? 'border-critical-400 focus:border-critical-500 focus:ring-critical-100'
      : 'border-neutral-200 focus:border-primary-600 focus:ring-primary-600/15',
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-semibold text-critical-600">{message}</p>;
}

export function TalkToExpertForm({
  initialServices = [],
  initialTimePreference = defaultTimePreference,
  compact = false,
  onSubmitted,
}: TalkToExpertFormProps) {
  const [form, setForm] = useState<ExpertInquiryFormValues>({
    ...emptyForm,
    services: initialServices,
    timePreference: initialTimePreference,
  });
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<SendInquiryResponse | null>(null);
  const today = getTodayDateValue();
  const preview = useMemo(() => generateInquiryPreview(form), [form]);

  const update = <Key extends keyof ExpertInquiryFormValues>(key: Key, value: ExpertInquiryFormValues[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleService = (service: ExpertServiceName) => {
    update(
      'services',
      form.services.includes(service)
        ? form.services.filter((item) => item !== service)
        : [...form.services, service],
    );
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiryForm(form);

    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Please complete the required details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendExpertInquiry(validation.sanitized);
      setResponse(result);
      setForm(validation.sanitized);

      if (result.success) {
        toast.success('Inquiry sent to the Prezenti team.');
      } else {
        toast.warning('Inquiry was partially sent. Please review the delivery status.');
      }

      onSubmitted?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (response) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn('mx-auto w-full', compact ? 'max-w-3xl' : 'max-w-5xl')}
      >
        <div className="rounded-[28px] border border-success-100 bg-white p-5 shadow-[0_30px_90px_rgba(10,42,34,0.12)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-success-100 text-success-600">
                <CheckCircle2 size={26} />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Inquiry received</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">{response.message}</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-canvas px-4 py-3 text-sm">
              <div className="font-semibold text-neutral-950">Delivery status</div>
              <div className="mt-2 space-y-1 text-neutral-600">
                <div>WhatsApp: {response.channels.whatsapp.sent ? 'Sent' : 'Failed'}</div>
                <div>Email: {response.channels.email.sent ? 'Sent' : 'Failed'}</div>
              </div>
            </div>
          </div>
          <pre className="mt-6 max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl bg-primary-900 p-5 text-sm leading-6 text-white">
            {response.generatedMessage}
          </pre>
          <Button type="button" variant="secondary" size="lg" className="mt-6" onClick={() => setResponse(null)}>
            Send another inquiry
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submitInquiry} className={cn('mx-auto w-full', compact ? 'max-w-3xl' : 'max-w-6xl')}>
      <div className={cn('grid gap-5', compact ? 'lg:grid-cols-1' : 'lg:grid-cols-[0.9fr_1.1fr]')}>
        <div className="rounded-[28px] border border-neutral-200 bg-white p-5 shadow-[0_28px_86px_rgba(10,42,34,0.08)] sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white">
              <PhoneCall size={22} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Talk to Expert</div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">Tell us what support you need</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Share the essentials and our team will receive the same professional inquiry over WhatsApp and email.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-neutral-700">
              Full Name *
              <input
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
                className={fieldClass(Boolean(errors.name))}
                placeholder="Your full name"
              />
              <FieldError message={errors.name} />
            </label>

            <label className="block text-sm font-semibold text-neutral-700">
              Mobile Number *
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => update('phone', event.target.value)}
                className={fieldClass(Boolean(errors.phone))}
                placeholder="8788726752"
              />
              <FieldError message={errors.phone} />
            </label>

            <label className="block text-sm font-semibold text-neutral-700">
              Location / Area *
              <input
                type="text"
                value={form.location}
                onChange={(event) => update('location', event.target.value)}
                className={fieldClass(Boolean(errors.location))}
                placeholder="Baner"
              />
              <FieldError message={errors.location} />
            </label>

            <label className="block text-sm font-semibold text-neutral-700">
              Date service required *
              <span className="relative block">
                <CalendarDays size={16} className="pointer-events-none absolute right-4 top-[18px] text-neutral-400" />
                <input
                  type="date"
                  min={today}
                  value={form.requiredDate}
                  onChange={(event) => update('requiredDate', event.target.value)}
                  className={fieldClass(Boolean(errors.requiredDate))}
                />
              </span>
              <FieldError message={errors.requiredDate} />
            </label>
          </div>

          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between gap-4">
              <label className="text-sm font-semibold text-neutral-700">Service Selection *</label>
              <FieldError message={errors.services} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {serviceOptions.map((service) => {
                const selected = form.services.includes(service);

                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    aria-pressed={selected}
                    className={cn(
                      'flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition',
                      selected
                        ? 'border-primary-800 bg-primary-800 text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-200 hover:bg-primary-50',
                    )}
                  >
                    {service}
                    <span className={cn('h-4 w-4 rounded border', selected ? 'border-white bg-white' : 'border-neutral-300')}>
                      {selected && <CheckCircle2 size={16} className="text-primary-800" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-neutral-700">Time Preference *</legend>
              <div className="grid gap-2">
                {timePreferenceOptions.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-700">
                    <input
                      type="radio"
                      name="timePreference"
                      checked={form.timePreference === option}
                      onChange={() => update('timePreference', option)}
                      className="h-4 w-4 accent-primary-800"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <FieldError message={errors.timePreference} />
            </fieldset>

            <label className="block text-sm font-semibold text-neutral-700">
              Inquiry Type *
              <select
                value={form.inquiryType}
                onChange={(event) => update('inquiryType', event.target.value as ExpertInquiryFormValues['inquiryType'])}
                className={fieldClass(Boolean(errors.inquiryType))}
              >
                {inquiryTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError message={errors.inquiryType} />
            </label>
          </div>

          <label className="mt-7 block text-sm font-semibold text-neutral-700">
            Optional Message
            <textarea
              rows={4}
              value={form.message}
              onChange={(event) => update('message', event.target.value)}
              className={fieldClass(false)}
              placeholder="Tell us your requirement"
            />
          </label>
        </div>

        <div className="flex min-h-full flex-col gap-5">
          <div className="rounded-[28px] border border-neutral-200 bg-primary-900 p-5 text-white shadow-[0_28px_86px_rgba(10,42,34,0.12)] sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <MessageSquareText size={20} />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-100">Generated message</div>
                <div className="mt-0.5 text-sm text-white/70">Preview before sending</div>
              </div>
            </div>
            <pre className="max-h-[34rem] overflow-auto whitespace-pre-wrap rounded-2xl bg-white/8 p-4 text-sm leading-6 text-white">
              {preview}
            </pre>
          </div>

          <div className="rounded-[24px] border border-primary-100 bg-primary-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary-800" />
              <div>
                <h3 className="font-semibold text-primary-900">Private backend delivery</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  Twilio and Gmail credentials stay on the server. The browser only sends the validated inquiry payload.
                </p>
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" size="xl" className="w-full" isLoading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? 'Sending inquiry' : 'Send to Expert'}
            <Send size={17} />
          </Button>
        </div>
      </div>
    </form>
  );
}
