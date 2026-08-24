import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, PhoneCall, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { QuoteSummaryPanel } from './QuoteSummaryPanel';
import { CallbackRequestPanel, CallbackSuccessState } from './CallbackRequestPanel';
import type { QuoteDraft } from '../../modules/inquiry/quoteTypes';
import { saveQuoteDraft } from '../../modules/inquiry/quoteTypes';
import { trackCTA } from '../../lib/analytics';

type DecisionView = 'decision' | 'callback' | 'callback-success';

export function QuoteDecisionStep({ quote }: { quote: QuoteDraft }) {
  const [view, setView] = useState<DecisionView>('decision');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    saveQuoteDraft(quote);
  }, [quote]);

  useEffect(() => {
    if (view === 'decision') {
      headingRef.current?.focus();
    }
  }, [view]);

  if (view === 'callback') {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <CallbackRequestPanel
          quote={quote}
          onBack={() => setView('decision')}
          onSubmitted={() => setView('callback-success')}
        />
      </div>
    );
  }

  if (view === 'callback-success') {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <CallbackSuccessState quote={quote} />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-4xl">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-neutral-950 outline-none sm:text-3xl">
          How would you like to continue?
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          Your quote details are saved below. Choose whichever works best &mdash; paying now is not required to submit
          your interest.
        </p>

        <div className="mt-6">
          <QuoteSummaryPanel quote={quote} />
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="flex h-full flex-col rounded-[16px] border border-neutral-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-800">
              <CreditCard size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-neutral-950">Ready to proceed?</h3>
            <p className="mt-1.5 flex-1 text-sm leading-6 text-neutral-600">
              Complete your payment securely to continue with your request.
            </p>
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="mt-5 w-full"
              onClick={() => {
                trackCTA('Proceed with Payment', { cta_location: 'quote_decision' });
                saveQuoteDraft(quote);
                navigate('/payment-demo', { state: { quoteId: quote.quoteId } });
              }}
            >
              Proceed with Payment <ArrowRight size={16} />
            </Button>
          </div>

          <div className="flex h-full flex-col rounded-[16px] border border-neutral-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success-50 text-success-700">
              <PhoneCall size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-neutral-950">Need more information?</h3>
            <p className="mt-1.5 flex-1 text-sm leading-6 text-neutral-600">
              Talk to the Kargar team about your requirements before making a payment.
            </p>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="mt-5 w-full"
              onClick={() => {
                trackCTA('Request a Call from Kargar', { cta_location: 'quote_decision' });
                setView('callback');
              }}
            >
              Request a Call from Kargar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
