import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';
import { legalConfig } from '../content/legalConfig';

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg border border-primary-200 bg-primary-50/60 px-5 py-4 text-sm leading-6 text-neutral-800">
      {children}
    </div>
  );
}

export function RefundPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO
        title="Refund Policy | Prezenti"
        description="How Prezenti handles refunds for staffing and facility-management engagements, from inquiry through signed service agreements."
        canonicalUrl="/refund-policy"
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Refund Policy',
          description: "Prezenti's refund policy for staffing and facility-management service engagements.",
          url: `${SEO_CONSTANTS.BASE_URL}/refund-policy`,
        }}
      />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 prose prose-neutral">
        <h1>Refund Policy</h1>
        <p className="text-sm text-neutral-500">
          Effective date: {legalConfig.effectiveDate} &middot; Last updated: {legalConfig.lastUpdated} &middot; Version {legalConfig.version}
        </p>

        <p>
          Prezenti provides staffing and facility-management services (housekeeping, receptionist, office
          support, pantry staff, facility management, and property management) to corporate and institutional clients.
          We do not sell services through an online checkout on this Website. Every engagement follows an inquiry,
          requirement review, custom quotation, and a mutually signed service agreement or work order before any billing
          begins. This policy explains, at a general level, how refund requests are handled across that process. Where
          your specific service agreement contains refund terms, those agreed terms govern your engagement.
        </p>

        <h2>A. Inquiry / Quotation Stage</h2>
        <p>
          Submitting an inquiry through this Website or requesting a quotation does not involve any payment. No refund
          question arises at this stage because no charge has been made.
        </p>

        <h2>B. Advance Payment</h2>
        <p>
          If your service agreement includes an advance payment, its treatment &mdash; including whether and under what
          conditions it is refundable &mdash; is set out in that specific agreement. Contact your Prezenti point of
          contact, or write to us at <a href={`mailto:${legalConfig.supportEmail}`}>{legalConfig.supportEmail}</a>, to
          confirm the advance-payment terms applicable to your engagement.
        </p>

        <h2>C. Service Already Delivered</h2>
        <p>
          Amounts corresponding to services already rendered for a completed billing period are generally not
          refundable, in line with standard staffing/facility-management practice, except where a verified service
          failure is established under Section E below.
        </p>

        <h2>D. Partial Service</h2>
        <p>
          If a service was only partially delivered during a billing period (for example, due to a delayed start or an
          interruption attributable to Prezenti), any resulting adjustment will be calculated in line with the terms of
          your service agreement and confirmed with you in writing.
        </p>

        <h2>E. Service Failure / Quality Disputes</h2>
        <p>To raise a service-quality concern:</p>
        <ol>
          <li>Contact your Prezenti point of contact, or email <a href={`mailto:${legalConfig.supportEmail}`}>{legalConfig.supportEmail}</a>, describing the issue and the affected site/dates.</li>
          <li>Our operations team will review the concern against the agreed scope of work.</li>
          <li>Where a failure is confirmed, resolution may include remedial deployment, a service credit, or a partial adjustment, as mutually agreed and consistent with your service agreement.</li>
        </ol>

        <h2>F. Duplicate Payment</h2>
        <p>
          If you believe you have been charged twice for the same invoice, contact us with both payment references. Once
          verified, the duplicate amount will be refunded to the original payment method.
        </p>

        <h2>G. Failed Payment</h2>
        <p>
          This Website does not currently process payments through an integrated online payment gateway. Where a payment
          is attempted through your bank or another payment channel and fails, its handling follows that bank's or
          payment processor's standard procedure for failed transactions. If Prezenti introduces an online payment
          gateway in the future, this section will be updated to reference that gateway's failed-transaction process.
        </p>

        <h2>H. Unauthorized Transaction</h2>
        <p>
          If you believe a payment was made on your account without authorization, report it immediately to{' '}
          <a href={`mailto:${legalConfig.supportEmail}`}>{legalConfig.supportEmail}</a> or{' '}
          <a href={`tel:${legalConfig.phone.replace(/\s+/g, '')}`}>{legalConfig.phone}</a>, and also notify your bank or
          card issuer, since they are best placed to freeze or reverse an unauthorized charge.
        </p>

        <h2>I. Refund Method</h2>
        <p>
          Where a refund is approved, it will normally be returned through the original payment method used, where
          technically and legally possible.
        </p>

        <h2>J. Refund Timeline</h2>
        <p>
          Prezenti has not yet published a company-wide refund processing timeline. When a refund is approved, we will
          confirm the expected timeline to you in writing at that time. If your service agreement specifies a refund
          timeline, that timeline applies to your engagement.
        </p>

        <h2>K. Non-Refundable Items</h2>
        <p>
          Costs that have already been incurred and become payable to third parties or statutory authorities on your
          behalf prior to a cancellation or refund request (where applicable under your agreement) are generally
          non-refundable. No other blanket exclusions apply beyond what your specific service agreement states.
        </p>

        <Callout>
          Prezenti has not yet approved a single, company-wide refund percentage, deadline, or fee schedule that applies
          to every engagement. These are being finalized by management and finance; until then, the terms in your signed
          service agreement take precedence over this general page.
        </Callout>

        <p className="text-sm text-neutral-500">
          Related: <Link to="/pricing">Pricing &amp; Payment</Link>, <Link to="/cancellation-policy">Cancellation Policy</Link>,{' '}
          <Link to="/privacy-policy">Privacy Policy</Link>, <Link to="/terms-and-conditions">Terms and Conditions</Link>.
        </p>
      </article>
    </main>
  );
}
