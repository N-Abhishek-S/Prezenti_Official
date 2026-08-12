import { useEffect } from 'react';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';

export function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title="Terms and Conditions | Prezenti"
        description="Review Prezenti's website and service terms for facility staffing inquiries, workplace support services, and platform usage."
        canonicalUrl="/terms-and-conditions"
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Terms and Conditions',
          description: "Review Prezenti's website and service terms for facility staffing inquiries and platform usage.",
          url: `${SEO_CONSTANTS.BASE_URL}/terms-and-conditions`,
        }}
      />
      
      <article className="mx-auto max-w-4xl px-4 sm:px-6 prose prose-neutral">
        <h1>Terms and Conditions</h1>
        <p>Last updated: June 2026</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Prezenti if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h2>1. License</h2>
        <p>Unless otherwise stated, Prezenti and/or its licensors own the intellectual property rights for all material on Prezenti. All intellectual property rights are reserved.</p>
        <h2>2. Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.</p>
        <h2>3. Governing Law</h2>
        <p>
          These terms and conditions are governed by the laws of India. The specific city/courts with exclusive
          jurisdiction over disputes will be confirmed here once approved by Prezenti management/legal counsel.
        </p>
      </article>
    </main>
  );
}
