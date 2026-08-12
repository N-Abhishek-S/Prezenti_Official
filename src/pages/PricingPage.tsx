import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';
import { buttonVariants } from '../components/ui/buttonVariants';

const factors = [
  { name: 'Service type', description: 'Housekeeping, security, receptionist, office support, pantry staff, facility management, or property management.' },
  { name: 'Number of personnel', description: 'How many staff are required per site, role, and shift.' },
  { name: 'Shift structure', description: 'Full-time (8 hour) or half-time (4 hour) coverage, and whether round-the-clock rotation is needed.' },
  { name: 'Location', description: 'Site location and accessibility within our current service areas.' },
  { name: 'Facility type', description: 'Corporate office, commercial building, residential building, healthcare facility, cafe/restaurant, or pre-school, each with different operational requirements.' },
  { name: 'Statutory considerations', description: 'PF, ESIC, professional tax, and minimum-wage considerations relevant to the roles engaged.' },
  { name: 'Equipment and consumables', description: 'Whether the engagement is manpower-only or includes consumables/machinery.' },
  { name: 'Contract duration', description: 'Length and terms of the service engagement.' },
];

const services = [
  { name: 'Housekeeping', href: '/housekeeping-services' },
  { name: 'Security', href: '/security-services' },
  { name: 'Receptionist', href: '/receptionist-staffing-services' },
  { name: 'Office Boy / Office Support', href: '/office-boy-services' },
  { name: 'Pantry Staff', href: '/pantry-staff-services' },
  { name: 'Facility Management', href: '/facility-management-services' },
  { name: 'Property Management', href: '/property-management-services' },
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
        title="Pricing & Payment | Prezenti"
        description="Prezenti staffing and facility-management pricing is customized per site. See what determines your quote and how the commercial process works."
        canonicalUrl="/pricing"
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Pricing & Payment',
          description: 'How Prezenti pricing and quotations work for staffing and facility-management engagements.',
          url: `${SEO_CONSTANTS.BASE_URL}/pricing`,
        }}
      />

      <article className="mx-auto max-w-4xl px-4 sm:px-6">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Pricing &amp; Payment</h1>
          <p className="mt-3 text-base leading-7 text-neutral-600">
            Prezenti does not publish fixed, one-size-fits-all prices. Staffing and facility-management costs depend on
            your site, roles, shift structure, and compliance requirements, so every engagement receives a custom
            quotation. This page explains what determines your quote and how the commercial process works, rather than
            listing prices that would not reflect your actual requirement.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">What Affects Your Quote</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {factors.map((factor) => (
              <div key={factor.name} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <h3 className="text-sm font-semibold text-neutral-950">{factor.name}</h3>
                <p className="mt-1.5 text-sm leading-6 text-neutral-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">How a Quotation Is Prepared</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-800 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-neutral-950">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">Commercial Model</h2>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <tbody>
                <tr className="border-b border-neutral-100">
                  <th scope="row" className="w-56 px-5 py-4 align-top font-semibold text-neutral-950">Pricing model</th>
                  <td className="px-5 py-4 text-neutral-700">Custom quotation per engagement &mdash; not a fixed public price list.</td>
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
          <p className="mt-3 text-xs text-neutral-500">
            A quotation is an estimate prepared for your stated requirement; it becomes a final, binding commercial term
            only once reflected in a signed service agreement or work order.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-neutral-950">Explore Services</h2>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
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
