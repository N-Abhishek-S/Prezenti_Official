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

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO
        title="Privacy Policy | Prezenti Business Services Pvt. Ltd."
        description="Learn what personal information Prezenti Business Services Pvt. Ltd. collects through its website inquiry forms, why it is collected, which service providers process it, and how to exercise your privacy rights."
        canonicalUrl="/privacy-policy"
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Privacy Policy',
          description: "Prezenti Business Services Pvt. Ltd.'s privacy policy for website inquiries, staffing requests, and personal information handling.",
          url: `${SEO_CONSTANTS.BASE_URL}/privacy-policy`,
        }}
      />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 prose prose-neutral">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-neutral-500">
          Effective date: {legalConfig.effectiveDate} &middot; Last updated: {legalConfig.lastUpdated} &middot; Version {legalConfig.version}
        </p>

        <p>
          This Privacy Policy explains how {legalConfig.companyName} ("we", "us", "our") collects, uses, shares,
          and protects personal information when you visit {legalConfig.website} (the "Website") or submit an inquiry
          through our forms. It applies to the public Website and to inquiry/quotation communications with our team. It
          does not apply to information you may separately provide to us in a signed service agreement, which is governed
          by the terms of that agreement.
        </p>

        <Callout>
          <strong>Legal Entity & Registered Address:</strong> {legalConfig.companyName}, {legalConfig.registeredAddress}.
        </Callout>

        <h2>1. Information We Collect</h2>
        <h3>1.1 Information you provide directly</h3>
        <p>
          When you submit the "Talk to Expert" / inquiry form on this Website, we collect exactly the fields present on
          that form:
        </p>
        <ul>
          <li>Full name</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Company or building name</li>
          <li>Location / area</li>
          <li>Required service start date</li>
          <li>Selected service(s) and facility category</li>
          <li>Any additional requirement or message you type into the form</li>
        </ul>
        <p>
          We do not currently operate user accounts, logins, file uploads, newsletter sign-ups, or online payment forms
          on this Website, so we do not collect information through those channels.
        </p>

        <h3>1.2 Information collected automatically</h3>
        <p>
          Like most websites, our hosting infrastructure (Vercel) automatically logs standard technical information for
          every request, such as IP address, browser/device information, and timestamps, for security and operational
          purposes. Separately, if your browser executes our analytics scripts, Google Analytics 4 and Microsoft Clarity
          may set cookies or similar identifiers and collect information about pages viewed, interactions, and
          approximate technical/device details, as described in Section 6 (Cookies).
        </p>

        <h3>1.3 Information from third parties</h3>
        <p>
          We do not currently purchase or receive personal information about you from third-party data brokers or
          partner companies. If this changes, this section will be updated.
        </p>

        <h2>2. Purpose of Processing</h2>
        <table>
          <thead>
            <tr>
              <th>Category of information</th>
              <th>Why we process it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inquiry form details (name, contact info, requirement)</td>
              <td>To respond to your inquiry, prepare a service quotation, and coordinate deployment if you proceed</td>
            </tr>
            <tr>
              <td>Contact details</td>
              <td>Customer support and follow-up communication about your inquiry or active engagement</td>
            </tr>
            <tr>
              <td>Technical/log data</td>
              <td>Website security, abuse prevention, and diagnosing technical issues</td>
            </tr>
            <tr>
              <td>Analytics identifiers/cookies</td>
              <td>Understanding aggregate website usage to improve content and site performance</td>
            </tr>
          </tbody>
        </table>
        <p>We do not use your information for automated decision-making or profiling that produces legal effects.</p>

        <h2>3. Legal / Processing Basis</h2>
        <p>Depending on the activity, our basis for processing is one of the following:</p>
        <ul>
          <li><strong>Consent</strong> &mdash; for non-essential analytics scripts (Google Analytics 4, Microsoft Clarity) that run in your browser.</li>
          <li><strong>Pre-contractual / contractual steps</strong> &mdash; for processing inquiry-form data to respond to your request and prepare a quotation or service agreement.</li>
          <li><strong>Legitimate operational interest</strong> &mdash; for basic security and technical logging necessary to operate the Website safely.</li>
          <li><strong>Legal obligation</strong> &mdash; where processing is required to comply with applicable law or a lawful authority request.</li>
        </ul>
        <p>
          Not every processing activity described in this policy relies on consent; the table above indicates the basis
          that applies to each category.
        </p>

        <h2>4. Consent</h2>
        <p>
          This policy uses two distinct consent models, because they cover different kinds of processing:
        </p>
        <ul>
          <li>
            <strong>Inquiry form submissions</strong> are processed because they are necessary to respond to the request
            you are actively making (a pre-contractual step, see Section 3) &mdash; not because submitting the form is
            treated as blanket consent to everything in this policy. The form links to this Privacy Policy so you know
            how that specific data will be used before you submit it.
          </li>
          <li>
            <strong>Non-essential analytics</strong> (Google Analytics 4, Microsoft Clarity) require your separate,
            affirmative consent, collected through the cookie banner shown on your first visit. Nothing is pre-selected;
            analytics scripts do not load until you choose "Allow analytics," and all core site functionality &mdash;
            including browsing, reading service pages, and submitting the inquiry form &mdash; works identically whether
            you allow or decline analytics.
          </li>
        </ul>
        <p>
          You can change your analytics decision at any time via the "Cookie Preferences" link in the site footer, which
          reopens the banner. Your choice is stored in your browser (not tied to your identity) until you change it.
        </p>

        <h2>5. Cookies and Similar Technologies</h2>
        <p>
          This Website does not use cookies for online checkout, shopping carts, or advertising retargeting, because
          those features do not exist on the site today. The only cookies/identifiers set are from the analytics
          providers below, and only after you allow analytics through the cookie banner described in Section 4:
        </p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Analytics 4</td>
              <td>Aggregate traffic and usage analytics</td>
              <td>Analytics (non-essential, consent-gated)</td>
            </tr>
            <tr>
              <td>Microsoft Clarity</td>
              <td>Session behavior analytics (e.g. interaction patterns, session recordings)</td>
              <td>Analytics (non-essential, consent-gated)</td>
            </tr>
          </tbody>
        </table>
        <p>
          You can decline or withdraw analytics consent at any time using the cookie banner or the "Cookie Preferences"
          footer link (Section 4), in addition to your browser's own cookie controls. Declining or blocking these
          scripts does not affect your ability to submit an inquiry or browse the Website.
        </p>

        <h2>6. How We Share Information</h2>
        <p>We do not sell personal information. We share it only with the following categories of recipients:</p>
        <ul>
          {legalConfig.dataProcessors.map((processor) => (
            <li key={processor.name}>
              <strong>{processor.name}</strong> &mdash; {processor.purpose}
            </li>
          ))}
        </ul>
        <p>
          We may also disclose information where required to comply with a legal obligation, court order, or lawful
          request from a government or regulatory authority, or to protect the rights, property, or safety of {legalConfig.companyName},
          our clients, or others.
        </p>

        <h2>7. Data Security</h2>
        <p>
          We apply reasonable technical and organizational measures appropriate to the information we hold, including
          transport encryption (HTTPS/HSTS) for all Website traffic, restricted access to the mailbox and messaging
          credentials used to receive inquiry notifications, and server-side input validation on our inquiry API. No
          method of transmission or storage is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain inquiry information for as long as reasonably necessary to respond to your inquiry, progress a
          quotation, deliver contracted services, and meet legal or accounting requirements. {legalConfig.companyName} has not yet
          finalized a formal retention schedule for each data category; this section will be updated with specific
          retention periods once approved by management. If you would like your inquiry data deleted sooner, contact us
          using Section 13 below.
        </p>

        <h2>9. Your Rights</h2>
        <p>Subject to applicable law, you may:</p>
        <ul>
          <li>Ask us to confirm what personal information we hold about you and request a copy of it.</li>
          <li>Ask us to correct inaccurate or incomplete information.</li>
          <li>Ask us to delete your information, subject to any legal, contractual, or accounting retention requirement.</li>
          <li>Withdraw consent for non-essential analytics at any time (see Section 4).</li>
          <li>Raise a grievance about how we have handled your information (see Section 13).</li>
        </ul>
        <p>
          This section is written to be compatible with India's Digital Personal Data Protection Act, 2023 framework as
          it comes into force; specific statutory timelines will be reflected here once they apply to our processing
          activities.
        </p>

        <h2>10. Correction and Deletion Requests</h2>
        <p>
          To request correction, updating, or deletion of your information, email us at{' '}
          <a href={`mailto:${legalConfig.privacyEmail}`}>{legalConfig.privacyEmail}</a> with enough detail (e.g. the name,
          email, or mobile number you used) for us to locate your submission. We will respond within a reasonable time.
        </p>

        <h2>11. Children's Privacy</h2>
        <p>
          This Website and our services are intended for business/institutional use and are not directed at children.
          We do not knowingly collect personal information from children, and we do not operate age-verification on the
          inquiry form.
        </p>

        <h2>12. International Data Transfers</h2>
        <p>
          Some of the third-party providers listed in Section 6 (for example Google and Microsoft) operate global
          infrastructure and may process data on servers located outside India as part of their standard service
          delivery. We have not made a separate data-residency commitment beyond what these providers publish in their
          own privacy terms.
        </p>

        <h2>13. Privacy / Grievance Contact</h2>
        <p>
          For any privacy question, correction request, or grievance, contact:
          <br />
          <strong>{legalConfig.companyName}</strong>
          <br />
          Registered Office Address: {legalConfig.registeredAddress}
          <br />
          Email: <a href={`mailto:${legalConfig.privacyEmail}`}>{legalConfig.privacyEmail}</a>
          <br />
          Phone: <a href={`tel:${legalConfig.phone.replace(/\s+/g, '')}`}>{legalConfig.phone}</a>
        </p>
        <p className="text-sm text-neutral-500">
          A dedicated Grievance Officer contact has not yet been designated separately from this general inbox; this
          section will be updated once one is appointed.
        </p>

        <h2>14. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as our Website, services, or applicable law change. The "Last updated" date
          at the top of this page reflects the most recent revision. Material changes affecting how we handle previously
          collected information will be communicated through this page.
        </p>

        <p className="text-sm text-neutral-500">
          Related: <Link to="/terms-and-conditions">Terms and Conditions</Link>, <Link to="/pricing">Pricing &amp; Payment</Link>,{' '}
          <Link to="/refund-policy">Refund Policy</Link>, <Link to="/cancellation-policy">Cancellation Policy</Link>.
        </p>
      </article>
    </main>
  );
}
