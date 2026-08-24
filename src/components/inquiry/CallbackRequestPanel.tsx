import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import type { QuoteDraft } from '../../modules/inquiry/quoteTypes';
import { sendExpertInquiry } from '../../services/inquiryApi';
import { trackContactFormSubmitted } from '../../lib/analytics';

const contactTimeOptions = ['Anytime', 'Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 4 PM)', 'Evening (4 PM - 7 PM)'];

interface CallbackRequestPanelProps {
  quote: QuoteDraft;
  onSubmitted: () => void;
  onBack: () => void;
  /** Heading level for "Request a Call" — h1 when this is the page's top-level content, h2 when nested under another heading. */
  headingLevel?: 'h1' | 'h2';
}

export function CallbackRequestPanel({ quote, onSubmitted, onBack, headingLevel = 'h2' }: CallbackRequestPanelProps) {
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Heading = headingLevel;
  const [preferredContactTime, setPreferredContactTime] = useState(contactTimeOptions[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const submit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await sendExpertInquiry(quote.customer, '', {
        requestType: 'CALL_BACK',
        quoteId: quote.quoteId,
        preferredContactTime,
      });

      trackContactFormSubmitted({
        form_name: 'Request a Call from Kargar',
        selected_services: quote.customer.services.join(', '),
      });

      onSubmitted();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-800 text-white">
          <PhoneCall size={20} aria-hidden="true" />
        </span>
        <div>
          <Heading ref={headingRef} tabIndex={-1} className="text-xl font-semibold tracking-tight text-neutral-950 outline-none sm:text-2xl">
            Request a Call
          </Heading>
          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
            Tell us the best time to reach you. We already have your details from the quote request &mdash; no need to enter them again.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-preferredTime`}>
          Preferred Contact Time
          <select
            id={`${formId}-preferredTime`}
            value={preferredContactTime}
            onChange={(event) => setPreferredContactTime(event.target.value)}
            disabled={isSubmitting}
            className="mt-2 w-full rounded-[14px] border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-success-500 focus:ring-2 focus:ring-success-500/15 disabled:bg-neutral-50"
          >
            {contactTimeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {isSubmitting ? 'Submitting your callback request, please wait.' : ''}
      </span>

      {error && (
        <div role="alert" className="mt-5 flex items-start gap-2 rounded-lg border border-critical-100 bg-critical-50 px-4 py-3 text-sm font-semibold text-critical-600">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className={cn('text-sm font-semibold text-neutral-600 hover:text-neutral-900', isSubmitting && 'opacity-50')}
        >
          Back
        </button>
        <Button
          type="button"
          variant="primary"
          size="xl"
          className="w-full sm:w-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onClick={submit}
        >
          {isSubmitting ? 'Submitting' : 'Request a Call'}
          {!isSubmitting && <CheckCircle2 size={17} aria-hidden="true" />}
        </Button>
      </div>
    </motion.div>
  );
}

interface CallbackSuccessStateProps {
  quote: QuoteDraft;
  /** Heading level for "Request Submitted" — h1 when this is the page's top-level content, h2 when nested under another heading. */
  headingLevel?: 'h1' | 'h2';
}

export function CallbackSuccessState({ quote, headingLevel = 'h2' }: CallbackSuccessStateProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Heading = headingLevel;
  const navigate = useNavigate();

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-success-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-success-50 text-success-600">
          <CheckCircle2 size={26} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <Heading ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none">
            Request Submitted
          </Heading>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Thank you for your interest in Kargar. Your request has been received successfully. Our team will contact you
            to discuss your requirements and provide more information.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Request Reference: <span className="text-neutral-900">{quote.quoteId}</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
