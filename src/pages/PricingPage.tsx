import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';
import { buttonVariants } from '../components/ui/buttonVariants';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { durationPlans, planRecommendations, pricingFaqs } from '../content/pricing/durationPlans';
import { serviceCatalog } from '../content/services/serviceCatalog';
import { cn } from '../lib/cn';

const factors = [
  { name: 'Service type', description: 'Housekeeping, receptionist, office support, pantry staff, facility management, or property management.' },
  { name: 'Number of personnel', description: 'How many staff are required per site, role, and shift.' },
  { name: 'Shift structure', description: 'Full-time (8 hour) or half-time (4 hour) coverage, and whether round-the-clock rotation is needed.' },
  { name: 'Location', description: 'Site location and accessibility within our current service areas.' },
  { name: 'Facility type', description: 'Corporate office, commercial building, residential building, healthcare facility, cafe/restaurant, or pre-school, each with different operational requirements.' },
  { name: 'Statutory considerations', description: 'PF, ESIC, professional tax, and minimum-wage considerations relevant to the roles engaged.' },
  { name: 'Equipment and consumables', description: 'Whether the engagement is manpower-only or includes consumables/machinery.' },
  { name: 'Contract duration', description: 'Length and terms of the service engagement.' },
];

const steps = [
  { title: 'Tell us your requirement', description: 'Share your service, site, and staffing needs through our inquiry form.' },
  { title: 'Requirement review', description: 'Our team reviews your requirement and, where useful, discusses your site details with you.' },
  { title: 'Custom quotation', description: 'We prepare a quotation reflecting the factors above for your specific engagement.' },
  { title: 'Your approval', description: 'You review the quotation and confirm whether you would like to proceed.' },
  { title: 'Agreement / work order', description: 'On approval, we formalize the engagement in a signed service agreement or work order.' },
  { title: 'Deployment', description: 'Staff are deployed to your site as per the agreed start date and shift structure.' },
  { title: 'Billing', description: 'Invoicing follows the terms set out in your signed agreement.' },
];

export function PricingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO
        title="Housekeeping Staffing Pricing | Prezenti"
        description="Starting prices for Prezenti housekeeping staffing across Pune — hourly, daily, weekly and monthly. See what determines your final quote and request a tailored quotation."
        canonicalUrl="/pricing"
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Housekeeping Staffing Pricing',
          description: 'Starting prices for duration-based housekeeping staffing and how Prezenti pricing and quotations work.',
          url: `${SEO_CONSTANTS.BASE_URL}/pricing`,
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{ faqs: pricingFaqs }}
      />

      {/* Hero */}
      <section className="mx-auto mb-14 max-w-4xl px-4 text-center sm:px-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Pricing</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
          Housekeeping Staffing That Fits Your Schedule
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-600">
          Reliable housekeeping staff for offices, commercial spaces, residential properties and short-term
          requirements &mdash; available by the hour, day, week or month.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/talk-to-us" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
            Get a Quote
          </Link>
          <Link to="/talk-to-us" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
            Talk to Our Team
          </Link>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Duration plans */}
        <section className="mb-14">
          <h2 className="sr-only">Staffing duration options</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {durationPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  'flex flex-col rounded-2xl border bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition-shadow duration-200 hover:shadow-[0_18px_44px_rgba(15,23,42,0.09)]',
                  plan.popular ? 'border-primary-400 ring-1 ring-primary-200' : 'border-neutral-200',
                )}
              >
                {plan.popular && (
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                    {plan.popularLabel}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-neutral-950">{plan.name}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-500">{plan.tagline}</p>

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600">Starting from</p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-primary-800">{plan.price}</span>
                  <span className="text-sm font-medium text-neutral-500">{plan.unit}</span>
                </p>
                {plan.minimumDuration && (
                  <p className="mt-1 text-xs font-medium text-neutral-600">{plan.minimumDuration}</p>
                )}
                {plan.totalNote && (
                  <p className="mt-0.5 text-xs text-neutral-500">{plan.totalNote}</p>
                )}

                <ul className="mt-4 flex flex-col gap-2 border-t border-neutral-100 pt-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-neutral-700">
                      <Check aria-hidden="true" size={15} className="mt-1 shrink-0 text-primary-700" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-neutral-600">Suitable for</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">{plan.suitableFor.join(', ')}</p>

                <Link
                  to="/talk-to-us"
                  className={buttonVariants({ variant: plan.popular ? 'primary' : 'secondary', size: 'md', className: 'mt-5 w-full' })}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-neutral-600">
            Starting prices are indicative. Final pricing may vary based on staffing requirements, shift duration,
            location, scope of work, working hours and service frequency.
          </p>
        </section>

        {/* Which plan */}
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">Which Staffing Plan Is Right for You?</h2>

          <div className="hidden overflow-hidden rounded-lg border border-neutral-200 bg-white sm:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th scope="col" className="px-5 py-3 font-semibold text-neutral-950">Requirement</th>
                  <th scope="col" className="px-5 py-3 font-semibold text-neutral-950">Recommended</th>
                </tr>
              </thead>
              <tbody>
                {planRecommendations.map((row) => (
                  <tr key={row.requirement} className="border-b border-neutral-100 last:border-b-0">
                    <td className="px-5 py-4 text-neutral-700">{row.requirement}</td>
                    <td className="px-5 py-4 font-semibold text-primary-800">{row.recommended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:hidden">
            {planRecommendations.map((row) => (
              <div key={row.requirement} className="rounded-lg border border-neutral-200 bg-white p-4">
                <p className="text-sm text-neutral-600">{row.requirement}</p>
                <p className="mt-1 text-sm font-semibold text-primary-800">{row.recommended}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What affects price */}
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold text-neutral-950">Your Requirement Determines the Final Quote</h2>
          <p className="mb-4 text-sm leading-6 text-neutral-600">
            The amounts above are starting prices. Your final quotation reflects your actual requirement across the
            factors below.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {factors.map((factor) => (
              <div key={factor.name} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <h3 className="text-sm font-semibold text-neutral-950">{factor.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-neutral-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">How a Quotation Is Prepared</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-800 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-neutral-950">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">Commercial Model</h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <tbody>
                <tr className="border-b border-neutral-100">
                  <th scope="row" className="w-56 px-5 py-4 align-top font-semibold text-neutral-950">Pricing model</th>
                  <td className="px-5 py-4 text-neutral-700">Published starting prices per staffing duration; your final quotation reflects your specific engagement.</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-neutral-950">How to buy</th>
                  <td className="px-5 py-4 text-neutral-700">
                    Inquiry &rarr; requirement review &rarr; quotation &rarr; signed service agreement / work order &rarr; deployment &rarr; billing. There is no online checkout on this Website.
                  </td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-neutral-950">Online payment</th>
                  <td className="px-5 py-4 text-neutral-700">Not currently available on this Website. Billing and payment terms are agreed as part of your service agreement.</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-neutral-950">Taxes</th>
                  <td className="px-5 py-4 text-neutral-700">Applicable taxes (e.g. GST) and whether a quoted figure is inclusive or exclusive of tax will be stated clearly on your quotation/invoice.</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-neutral-950">Invoice structure</th>
                  <td className="px-5 py-4 text-neutral-700">
                    Service Charges + Applicable Taxes + any Approved Additional Charges = Total Invoice Amount, as itemized on the invoice we issue.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-600">
            A quotation is an estimate prepared for your stated requirement; it becomes a final, binding commercial term
            only once reflected in a signed service agreement or work order.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="mb-2 text-xl font-semibold text-neutral-950 text-center sm:text-left">Frequently Asked Questions</h2>
          <FaqAccordion faqs={pricingFaqs} />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">Explore Services</h2>
          <div className="flex flex-wrap gap-2">
            {serviceCatalog.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-600 hover:text-primary-800"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-primary-200 bg-primary-50/60 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-neutral-950">Get a Custom Quote</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-700">
            Tell us about your site and staffing requirement and our team will prepare a quotation reflecting your
            specific needs.
          </p>
          <Link to="/talk-to-us" className={buttonVariants({ variant: 'primary', size: 'lg', className: 'mt-5 inline-flex' })}>
            Talk to an Expert
          </Link>
        </section>

        <p className="mt-10 text-sm text-neutral-500">
          Related: <Link to="/refund-policy">Refund Policy</Link>, <Link to="/cancellation-policy">Cancellation Policy</Link>,{' '}
          <Link to="/terms-and-conditions">Terms and Conditions</Link>, <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </article>
    </main>
  );
}
