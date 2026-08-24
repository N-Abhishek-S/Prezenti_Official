import type { QuoteDraft } from '../../modules/inquiry/quoteTypes';

function formatDisplayDate(value: string) {
  if (!value) return 'Not specified';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

interface QuoteSummaryPanelProps {
  quote: QuoteDraft;
  /** Heading level for "Quote Summary" — pick whatever is next after the parent's own heading. */
  headingLevel?: 'h2' | 'h3';
}

export function QuoteSummaryPanel({ quote, headingLevel = 'h3' }: QuoteSummaryPanelProps) {
  const { customer } = quote;
  const Heading = headingLevel;

  const rows: Array<[string, string]> = [
    ['Name', customer.fullName],
    ['Mobile Number', customer.mobileNumber],
    ['Email', customer.email],
    ['Company / Building', customer.companyName],
    ['Location', customer.location],
    ['Required Start Date', formatDisplayDate(customer.requiredStartDate)],
    ['Service', customer.services.join(', ') || 'Not specified'],
    ['Category', customer.categories.join(', ') || 'Not specified'],
    ...(customer.additionalRequirement ? ([['Additional Requirement', customer.additionalRequirement]] as Array<[string, string]>) : []),
  ];

  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Heading className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-600">Quote Summary</Heading>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-neutral-700 ring-1 ring-neutral-200">
          Ref: {quote.quoteId}
        </span>
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className={label === 'Additional Requirement' ? 'sm:col-span-2' : undefined}>
            <dt className="text-xs font-semibold text-neutral-500">{label}</dt>
            <dd className="mt-0.5 whitespace-pre-line break-words text-sm font-medium text-neutral-900">{value || 'Not specified'}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
