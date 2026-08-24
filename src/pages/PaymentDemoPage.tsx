import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, CreditCard, PhoneCall, ShieldAlert, XCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/cn';
import { QuoteSummaryPanel } from '../components/inquiry/QuoteSummaryPanel';
import { CallbackRequestPanel, CallbackSuccessState } from '../components/inquiry/CallbackRequestPanel';
import { clearQuoteDraft, loadQuoteDraft, type QuoteDraft } from '../modules/inquiry/quoteTypes';
import { sendExpertInquiry } from '../services/inquiryApi';
import { SEO } from '../seo/SEO';

type PaymentView = 'form' | 'processing' | 'success' | 'failure' | 'callback' | 'callback-success';

interface CardFields {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

const emptyCard: CardFields = { name: '', number: '', expiry: '', cvv: '' };
const cardFieldOrder: Array<keyof CardFields> = ['name', 'number', 'expiry', 'cvv'];

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16);
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isExpiryValidAndFuture(value: string) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;

  const month = Number(match[1]);
  const year = Number(`20${match[2]}`);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryEnd = new Date(year, month, 0, 23, 59, 59);
  return expiryEnd >= now;
}

function MissingQuoteState() {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-warning-100 bg-warning-50 p-6 text-center sm:p-8">
      <ShieldAlert size={28} className="mx-auto text-warning-600" aria-hidden="true" />
      <h1 className="mt-3 text-xl font-semibold text-neutral-950">No active quote found</h1>
      <p className="mt-2 text-sm leading-6 text-neutral-600">
        We couldn't find quote details for this payment session. Please start a new quote request.
      </p>
      <Link to="/talk-to-us" className="mt-5 inline-flex items-center justify-center rounded-full bg-primary-800 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-900">
        Start a Quote Request
      </Link>
    </div>
  );
}

export function PaymentDemoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const quoteId = (location.state as { quoteId?: string } | null)?.quoteId;
  const [quote] = useState<QuoteDraft | null>(() => loadQuoteDraft(quoteId));

  const [view, setView] = useState<PaymentView>('form');
  const [card, setCard] = useState<CardFields>(emptyCard);
  const [errors, setErrors] = useState<Partial<Record<keyof CardFields, string>>>({});
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const [notifyError, setNotifyError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    // Skip 'processing': it's a transient in-flight state on the same
    // heading text, not a new view — refocusing it would yank focus away
    // from the submit button right as its label changes to "Processing
    // payment", so that change would likely go unannounced.
    if (view === 'processing') return;
    headingRef.current?.focus();
  }, [view]);

  const maskedReference = useMemo(() => quote?.quoteId ?? '', [quote]);

  if (!quote) {
    return (
      <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <MissingQuoteState />
        </section>
      </main>
    );
  }

  const update = (key: keyof CardFields, value: string) => {
    setCard((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validateCard = () => {
    const nextErrors: Partial<Record<keyof CardFields, string>> = {};

    if (card.name.trim().length < 2) {
      nextErrors.name = 'Enter the name on card.';
    }
    if (card.number.replace(/\D/g, '').length !== 16) {
      nextErrors.number = 'Enter a 16-digit card number.';
    }
    if (!isExpiryValidAndFuture(card.expiry)) {
      nextErrors.expiry = 'Enter a valid future expiry (MM/YY).';
    }
    if (!/^\d{3,4}$/.test(card.cvv)) {
      nextErrors.cvv = 'Enter a valid CVV.';
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const notifyTeam = async () => {
    try {
      await sendExpertInquiry(quote.customer, '', {
        requestType: 'PAYMENT_CONFIRMATION',
        quoteId: quote.quoteId,
      });
      setNotifyError(null);
    } catch (error) {
      // The demo payment already "succeeded" from the customer's point of
      // view; a failed team notification shouldn't block that confirmation,
      // but the team may not have been alerted, so we surface it quietly.
      setNotifyError(error instanceof Error ? error.message : 'Unable to notify our team automatically.');
    }
  };

  const submitPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateCard();
    const firstInvalidKey = cardFieldOrder.find((key) => nextErrors[key]);

    if (firstInvalidKey) {
      toast.error('Please correct the highlighted card details.');
      document.getElementById(`${formId}-${firstInvalidKey}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setView('processing');

    // Simulated gateway latency — no network call is made with card data.
    await new Promise((resolve) => window.setTimeout(resolve, 1400));

    const normalizedNumber = card.number.replace(/\D/g, '');
    // Demo-only test card: ending in 0002 deterministically simulates a
    // declined payment, mirroring common test-gateway conventions, so the
    // failure/retry path can be exercised without randomness.
    const shouldFail = normalizedNumber.endsWith('0002');

    if (shouldFail) {
      setFailureReason('Your demo card was declined by the test gateway.');
      setView('failure');
      setIsSubmitting(false);
      return;
    }

    await notifyTeam();
    clearQuoteDraft(quote.quoteId);
    setView('success');
    setIsSubmitting(false);
  };

  return (
    <>
      <SEO
        title="Demo Payment | Kargar"
        description="Complete a demo payment for your Kargar service quote. Test mode only — no real payment is processed."
        canonicalUrl="/payment-demo"
      />
      <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
        <section className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-5 flex items-center justify-center gap-2 rounded-full border border-warning-200 bg-warning-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-warning-700">
            <ShieldAlert size={14} aria-hidden="true" />
            Test Mode &mdash; Demo Payment, No Real Charge
          </div>

          {view === 'callback' && (
            <CallbackRequestPanel
              quote={quote}
              headingLevel="h1"
              onBack={() => setView('failure')}
              onSubmitted={() => setView('callback-success')}
            />
          )}

          {view === 'callback-success' && <CallbackSuccessState quote={quote} headingLevel="h1" />}

          {(view === 'form' || view === 'processing') && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
              <div className="flex items-start gap-4 border-b border-neutral-100 pb-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-800 text-white">
                  <CreditCard size={20} aria-hidden="true" />
                </span>
                <div>
                  <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none">
                    Demo Payment
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
                    This is a temporary verification page. No real payment gateway is connected and card details are never
                    stored or transmitted.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <QuoteSummaryPanel quote={quote} headingLevel="h2" />
              </div>

              <form onSubmit={submitPayment} aria-busy={view === 'processing'} className="mt-7 grid gap-5">
                <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-name`}>
                  Name on Card
                  <input
                    id={`${formId}-name`}
                    type="text"
                    autoComplete="cc-name"
                    value={card.name}
                    onChange={(event) => update('name', event.target.value)}
                    disabled={view === 'processing'}
                    className="mt-2 w-full rounded-[14px] border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-success-500 focus:ring-2 focus:ring-success-500/15 disabled:bg-neutral-50"
                    placeholder="As printed on card"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                  />
                  {errors.name && <p id={`${formId}-name-error`} className="mt-1.5 text-xs font-semibold text-critical-600">{errors.name}</p>}
                </label>

                <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-number`}>
                  Card Number (Demo)
                  <input
                    id={`${formId}-number`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={card.number}
                    onChange={(event) => update('number', formatCardNumber(event.target.value))}
                    disabled={view === 'processing'}
                    className="mt-2 w-full rounded-[14px] border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-success-500 focus:ring-2 focus:ring-success-500/15 disabled:bg-neutral-50"
                    placeholder="4111 1111 1111 1111"
                    aria-invalid={Boolean(errors.number)}
                    aria-describedby={[`${formId}-number-hint`, errors.number ? `${formId}-number-error` : ''].filter(Boolean).join(' ')}
                  />
                  <span id={`${formId}-number-hint`} className="mt-1 block text-xs text-neutral-400">
                    Demo only &mdash; any 16-digit number works. Ends in 0002 to test a declined payment.
                  </span>
                  {errors.number && <p id={`${formId}-number-error`} className="mt-1 text-xs font-semibold text-critical-600">{errors.number}</p>}
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-expiry`}>
                    Expiry (MM/YY)
                    <input
                      id={`${formId}-expiry`}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={card.expiry}
                      onChange={(event) => update('expiry', formatExpiry(event.target.value))}
                      disabled={view === 'processing'}
                      className="mt-2 w-full rounded-[14px] border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-success-500 focus:ring-2 focus:ring-success-500/15 disabled:bg-neutral-50"
                      placeholder="12/28"
                      aria-invalid={Boolean(errors.expiry)}
                      aria-describedby={errors.expiry ? `${formId}-expiry-error` : undefined}
                    />
                    {errors.expiry && <p id={`${formId}-expiry-error`} className="mt-1.5 text-xs font-semibold text-critical-600">{errors.expiry}</p>}
                  </label>

                  <label className="block text-sm font-semibold text-neutral-800" htmlFor={`${formId}-cvv`}>
                    CVV
                    <input
                      id={`${formId}-cvv`}
                      type="password"
                      inputMode="numeric"
                      autoComplete="off"
                      value={card.cvv}
                      onChange={(event) => update('cvv', event.target.value.replace(/\D/g, '').slice(0, 4))}
                      disabled={view === 'processing'}
                      className="mt-2 w-full rounded-[14px] border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-success-500 focus:ring-2 focus:ring-success-500/15 disabled:bg-neutral-50"
                      placeholder="123"
                      aria-invalid={Boolean(errors.cvv)}
                      aria-describedby={errors.cvv ? `${formId}-cvv-error` : undefined}
                    />
                    {errors.cvv && <p id={`${formId}-cvv-error`} className="mt-1.5 text-xs font-semibold text-critical-600">{errors.cvv}</p>}
                  </label>
                </div>

                <span role="status" aria-live="polite" className="sr-only">
                  {view === 'processing' ? 'Processing your payment, please wait.' : ''}
                </span>

                <Button type="submit" variant="primary" size="xl" className="mt-2 w-full" isLoading={view === 'processing'} disabled={view === 'processing'}>
                  {view === 'processing' ? 'Processing payment' : 'Pay Now (Demo)'}
                </Button>
                <p className="text-center text-xs text-neutral-400">
                  Demo Payment &mdash; no real money is charged. Card details are not saved.
                </p>
              </form>
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-success-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
              <div className="flex flex-col items-start gap-5 sm:flex-row">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-success-50 text-success-600">
                  <CheckCircle2 size={26} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none">
                    Payment Successful
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                    Thank you. Your demo payment has been recorded and our team has been notified to begin processing
                    your request.
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    Request Reference: <span className="text-neutral-900">{maskedReference}</span>
                  </p>
                  {notifyError && (
                    <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-warning-100 bg-warning-50 px-4 py-3 text-sm font-semibold text-warning-700">
                      <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>Payment recorded, but we couldn't reach our notification service automatically. Please keep your reference number handy if you contact us.</span>
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/')}>
                      Back to Home
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'failure' && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-critical-100 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
              <div className="flex flex-col items-start gap-5 sm:flex-row">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-critical-50 text-critical-600">
                  <XCircle size={26} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none">
                    Payment Failed
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                    {failureReason || 'We could not process your demo payment.'} Your quote details are still saved, so you
                    can try again or ask the Kargar team to call you instead.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button type="button" variant="primary" size="lg" onClick={() => setView('form')}>
                      Try Again
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={() => setView('callback')}
                      className={cn('gap-2')}
                    >
                      <PhoneCall size={16} aria-hidden="true" /> Request a Call Instead
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </main>
    </>
  );
}
