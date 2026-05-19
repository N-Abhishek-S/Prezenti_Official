import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, RefreshCw, Send, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ServiceSelectionContext } from '../../modules/catalog/types';

interface ServiceResultCardProps {
  selection: ServiceSelectionContext;
  autoMessage: string;
  onGetQuote: () => void;
  onTalkToExpert: () => void;
  onWhatsApp: (selection: ServiceSelectionContext) => void;
  onSubmitLead: (lead: { fullName: string; phone: string; email: string }) => Promise<void>;
  onReset: () => void;
}

const emptyLeadForm = {
  fullName: '',
  phone: '',
  email: '',
};

export function ServiceResultCard({
  selection,
  autoMessage,
  onGetQuote,
  onTalkToExpert,
  onWhatsApp,
  onSubmitLead,
  onReset,
}: ServiceResultCardProps) {
  const Icon = selection.service.icon;
  const [leadForm, setLeadForm] = useState(emptyLeadForm);
  const [status, setStatus] = useState('');

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmitLead(leadForm);
    setLeadForm(emptyLeadForm);
    setStatus('Lead captured. Our team will contact you shortly.');
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(10,42,34,0.1)]">
      <div className="bg-[linear-gradient(135deg,rgba(224,242,229,0.78),rgba(237,250,249,0.64))] p-5 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-800 text-white shadow-[0_18px_38px_rgba(18,63,53,0.2)]">
              <Icon size={24} />
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Configured service</div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">{selection.service.name}</h3>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">{selection.service.description}</p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/80 bg-white/78 px-4 text-sm font-semibold text-primary-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
          >
            <RefreshCw size={15} />
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-0 border-y border-neutral-100 sm:grid-cols-3">
        <div className="border-b border-neutral-100 p-5 sm:border-b-0 sm:border-r">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Work Type</div>
          <div className="mt-2 text-lg font-semibold text-neutral-950">{selection.package.workType}</div>
          <div className="mt-1 text-sm text-neutral-500">{selection.package.hours} Hours</div>
        </div>
        <div className="border-b border-neutral-100 p-5 sm:border-b-0 sm:border-r">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Location</div>
          <div className="mt-2 text-lg font-semibold text-neutral-950">{selection.area.name}</div>
          <div className="mt-1 text-sm text-neutral-500">{selection.city.name}</div>
        </div>
        <div className="p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Pricing</div>
          <div className="mt-2 text-lg font-semibold text-neutral-950">Custom quote</div>
          <div className="mt-1 text-sm text-neutral-500">{selection.package.pricingPlaceholder}</div>
        </div>
      </div>

      <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Staffing Details</h4>
          <div className="mt-4 space-y-3">
            {[
              selection.package.propertyType ?? 'Standard office site',
              'Verified staffing deployment',
              'Service scope captured in lead payload',
            ].map((detail) => (
              <div key={detail} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary-600" />
                {detail}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-neutral-200 bg-canvas p-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-success-600">Included Services</h4>
          <div className="mt-4 space-y-3">
            {selection.package.includedServices.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-neutral-200 bg-canvas p-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Not Included / Extra</h4>
          <div className="mt-4 space-y-3">
            {selection.package.excludedServices.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                <XCircle size={16} className="mt-0.5 shrink-0 text-critical-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-neutral-200 bg-canvas p-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Quote Notes</h4>
          <div className="mt-4 space-y-3">
            {[
              'Final quote is prepared after reviewing site size and duty scope.',
              'The generated message below is used for lead, chat, and WhatsApp handoff.',
            ].map((note) => (
              <div key={note} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-700" />
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={submitLead} className="border-t border-neutral-100 p-5 sm:p-6">
        <div className="mb-5 grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-medium text-neutral-700">
            Full Name
            <input
              required
              value={leadForm.fullName}
              onChange={(event) => setLeadForm((current) => ({ ...current, fullName: event.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              placeholder="Your name"
            />
          </label>
          <label className="text-sm font-medium text-neutral-700">
            Phone
            <input
              required
              value={leadForm.phone}
              onChange={(event) => setLeadForm((current) => ({ ...current, phone: event.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              placeholder="8788726752"
            />
          </label>
          <label className="text-sm font-medium text-neutral-700">
            Email
            <input
              type="email"
              required
              value={leadForm.email}
              onChange={(event) => setLeadForm((current) => ({ ...current, email: event.target.value }))}
              className="mt-1.5 w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15"
              placeholder="you@company.com"
            />
          </label>
        </div>
        <label className="block text-sm font-medium text-neutral-700">
          Auto-generated requirement
          <textarea
            readOnly
            rows={3}
            value={autoMessage}
            className="mt-1.5 w-full resize-none rounded-lg border border-primary-100 bg-primary-50 px-3 py-2.5 text-sm leading-6 text-primary-900 outline-none"
          />
        </label>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" variant="primary" size="lg">
            Submit Lead
            <Send size={16} />
          </Button>
          {status && <span className="text-sm font-semibold text-primary-800">{status}</span>}
        </div>
      </form>

      <div className="grid gap-3 border-t border-neutral-100 p-5 sm:grid-cols-3 sm:p-6">
        <Button type="button" variant="primary" size="lg" className="w-full" onClick={onGetQuote}>
          Get Quote
          <ArrowRight size={16} />
        </Button>
        <Button type="button" variant="secondary" size="lg" className="w-full" onClick={onTalkToExpert}>
          <MessageCircle size={16} />
          Talk to Expert
        </Button>
        <Button type="button" variant="teal" size="lg" className="w-full" onClick={() => onWhatsApp(selection)}>
          <MessageCircle size={16} />
          WhatsApp Us
        </Button>
      </div>
    </div>
  );
}
