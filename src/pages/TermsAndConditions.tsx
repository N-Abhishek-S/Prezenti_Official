import { useEffect } from 'react';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';

export function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title="Terms and Conditions | Prezenti"
        description="Read the terms and conditions for using Prezenti facility management services and platform."
        canonicalUrl="/terms-and-conditions"
      />
      <StructuredData type="WebPage" />
      
      <article className="mx-auto max-w-4xl px-4 sm:px-6 prose prose-neutral">
        <h1>Terms and Conditions</h1>
        <p>Last updated: June 2026</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Prezenti if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h2>1. License</h2>
        <p>Unless otherwise stated, Prezenti and/or its licensors own the intellectual property rights for all material on Prezenti. All intellectual property rights are reserved.</p>
        <h2>2. User Comments</h2>
        <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Prezenti does not filter, edit, publish or review Comments prior to their presence on the website.</p>
        <h2>3. Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.</p>
        <h2>4. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts.</p>
      </article>
    </main>
  );
}
