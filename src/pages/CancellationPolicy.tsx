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

const stages: { title: string; body: string }[] = [
  {
    title: '1. Inquiry Cancellation',
    body: "You can stop or withdraw an inquiry submitted through this Website at any time, free of charge, simply by informing us or by not proceeding further. No agreement exists at this stage, so no cancellation charge applies.",
  },
  {
    title: '2. Cancellation Before Quotation Acceptance',
    body: 'If we have shared a quotation but you have not yet accepted it, you may decline or withdraw from the process at no cost. No service agreement exists until a quotation is accepted.',
  },
  {
    title: '3. Cancellation After Quotation Acceptance (Before a Signed Agreement)',
    body: 'Where a quotation has been accepted but a formal service agreement or work order has not yet been signed, either party may withdraw before signing. Any costs Prezenti has already committed on your behalf in preparation (for example, candidate screening already underway) will be discussed and settled in good faith.',
  },
  {
    title: '4. Cancellation After Contract Signing (Before Deployment)',
    body: 'Once a service agreement or work order is signed but staff have not yet been deployed, cancellation terms — including any notice period or pre-deployment charge — are governed by the specific clauses of that signed agreement.',
  },
  {
    title: '5. Cancellation After Deployment',
    body: 'Once staff have been deployed to your site and service has commenced, cancellation is governed by the notice period and billing terms in your signed service agreement. Services already delivered up to the effective cancellation date are payable as per that agreement.',
  },
  {
    title: '6. Cancellation During an Active Service Period',
    body: 'For ongoing engagements, either party may terminate in accordance with the notice period and terms set out in the signed service agreement. We recommend written notice to your Prezenti point of contact to begin an orderly handover.',
  },
  {
    title: '7. Cancellation Due to Service Provider (Prezenti) Failure',
    body: 'If Prezenti fails to meet a material, agreed obligation, you may raise this under the dispute-resolution/quality-escalation process in your service agreement, or contact us directly (see Section 10). Remedies will be handled in line with that agreement.',
  },
  {
    title: '8. Cancellation Due to Client Breach',
    body: "Where a client breaches a material term of the service agreement (for example, non-payment), Prezenti's right to suspend or terminate services is governed by the breach and remedy clauses of that agreement.",
  },
  {
    title: '9. Emergency Termination',
    body: 'Either party may need to terminate on shorter notice in genuine emergency circumstances (for example, safety risk to deployed staff). Any such termination will be handled as provided for in the signed service agreement, or in its absence, in good-faith consultation between the parties.',
  },
  {
    title: '10. Force Majeure',
    body: 'Neither party is liable for a delay or failure to perform caused by events beyond its reasonable control (for example, natural disasters, government action, or widespread public-health restrictions), to the extent addressed in your service agreement.',
  },
];

export function CancellationPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO
        title="Cancellation Policy | Prezenti"
        description="How service cancellations are handled at each stage of a Prezenti staffing or facility-management engagement, from inquiry through active deployment."
        canonicalUrl="/cancellation-policy"
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Cancellation Policy',
          description: "Prezenti's cancellation policy across the inquiry, quotation, contract, and deployment stages.",
          url: `${SEO_CONSTANTS.BASE_URL}/cancellation-policy`,
        }}
      />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 prose prose-neutral">
        <h1>Cancellation Policy</h1>
        <p className="text-sm text-neutral-500">
          Effective date: {legalConfig.effectiveDate} &middot; Last updated: {legalConfig.lastUpdated} &middot; Version {legalConfig.version}
        </p>

        <p>
          Prezenti engagements move through an inquiry, requirement review, quotation, and a signed service agreement or
          work order before deployment. Cancellation terms differ depending on which stage your engagement has reached.
          This page explains the general process at each stage; the specific notice periods, pre-deployment charges, and
          post-deployment billing treatment for your engagement are defined in your signed service agreement, since
          these vary by contract size, role, and site.
        </p>

        {stages.map((stage) => (
          <section key={stage.title}>
            <h2>{stage.title}</h2>
            <p>{stage.body}</p>
          </section>
        ))}

        <Callout>
          Prezenti has not yet approved a single, company-wide cancellation notice period or cancellation-charge
          schedule that applies to every engagement. These commercial terms are set out in each client's signed service
          agreement rather than as a fixed rule on this page. Contact your Prezenti point of contact to confirm the
          terms that apply to your engagement.
        </Callout>

        <h2>How to Request a Cancellation</h2>
        <p>
          Contact your Prezenti point of contact directly, or write to{' '}
          <a href={`mailto:${legalConfig.supportEmail}`}>{legalConfig.supportEmail}</a> or call{' '}
          <a href={`tel:${legalConfig.phone.replace(/\s+/g, '')}`}>{legalConfig.phone}</a> with your company name, site
          location, and the effective date you are requesting. We will confirm the applicable notice period and any
          charges based on your signed agreement.
        </p>

        <p className="text-sm text-neutral-500">
          Related: <Link to="/refund-policy">Refund Policy</Link>, <Link to="/pricing">Pricing &amp; Payment</Link>,{' '}
          <Link to="/terms-and-conditions">Terms and Conditions</Link>, <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
      </article>
    </main>
  );
}
