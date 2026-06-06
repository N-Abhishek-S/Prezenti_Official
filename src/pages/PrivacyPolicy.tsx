import { useEffect } from 'react';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title="Privacy Policy | Prezenti"
        description="Read Prezenti's privacy policy for website inquiries, staffing requests, service communications, and personal information protection."
        canonicalUrl="/privacy-policy"
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Privacy Policy',
          description: "Read Prezenti's privacy policy for website inquiries, staffing requests, and personal information protection.",
          url: `${SEO_CONSTANTS.BASE_URL}/privacy-policy`,
        }}
      />
      
      <article className="mx-auto max-w-4xl px-4 sm:px-6 prose prose-neutral">
        <h1>Privacy Policy</h1>
        <p>Last updated: June 2026</p>
        <p>This Privacy Policy describes how Prezenti collects, uses, and protects your information when you use our website and services.</p>
        <h2>1. Information We Collect</h2>
        <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.</p>
        <h2>2. How We Use Collected Information</h2>
        <p>Prezenti may collect and use Users personal information for the following purposes:</p>
        <ul>
          <li>To improve customer service</li>
          <li>To personalize user experience</li>
          <li>To send periodic emails</li>
        </ul>
        <h2>3. How We Protect Your Information</h2>
        <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information.</p>
        <h2>4. Contacting Us</h2>
        <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.</p>
      </article>
    </main>
  );
}
