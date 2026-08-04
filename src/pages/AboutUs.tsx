import { useEffect } from 'react';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';
import { motion } from 'framer-motion';
import { ComplianceSection } from '../features/website/sections/ComplianceSection';

export function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const pageTitle = "About Prezenti | Facility Management & Staffing in Pune";
  const seoDescription = "Learn about Prezenti's approach to corporate facility management and support staff outsourcing in Pune. Discover our core values and approach to compliance.";

  return (
    <div className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={pageTitle}
        description={seoDescription}
        canonicalUrl="/about" 
        imageUrl="/og-images/og-about.jpg"
        keywords={['about prezenti', 'facility management company profile', 'corporate staffing agency history', 'staffing agency pune']}
      />
      
      <StructuredData
        type="AboutPage"
        data={{
          name: pageTitle,
          description: seoDescription,
          url: `${SEO_CONSTANTS.BASE_URL}/about`,
        }}
      />
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
          >
            About Prezenti
          </motion.h1>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            Corporate facility management and staffing, structured around service planning, workforce coordination, and operational support.
          </p>
        </header>

        <div className="prose prose-lg prose-neutral max-w-none">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
          <p className="mb-6 text-neutral-700 leading-relaxed">
            Founded with a vision to professionalize the unorganized sector of support staff outsourcing, Prezenti provides facility management and staffing for corporate offices and IT parks in Pune. Companies often struggle not just with finding staff, but with finding staff whose screening and compliance requirements are clearly addressed.
          </p>
          <p className="mb-12 text-neutral-700 leading-relaxed">
            Our approach is built around end-to-end service delivery rather than manpower supply alone. Administrative and compliance considerations for deployed staff can be addressed as part of the engagement, so clients can focus on their core business operations.
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Core Values</h2>
          <ul className="space-y-4 text-neutral-700 leading-relaxed list-none pl-0">
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold mt-1">1.</span>
              <span><strong>Compliance First:</strong> We believe that taking shortcuts on compliance is a risk no enterprise should bear. Statutory and legal considerations can be addressed transparently as part of the engagement.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold mt-1">2.</span>
              <span><strong>Dignity of Labor:</strong> Respect and fair, timely compensation for staff is part of how we aim to support a motivated workforce, which we believe supports better service for our clients.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold mt-1">3.</span>
              <span><strong>Operational Excellence:</strong> Service delivery can be structured around site-specific operating procedures and reporting, to help support consistent quality.</span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Leadership & Expertise</h2>
          <p className="mb-12 text-neutral-700 leading-relaxed">
            Prezenti's leadership brings experience across corporate administration, human resources, and facility operations. Area-level coordination and supervisory processes can be structured to support service delivery on the ground.
          </p>

          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200 mt-12">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Partner with the Experts</h3>
            <p className="text-neutral-700 mb-6">
              Experience the difference of working with a genuinely professional facility management and staffing agency. Let us elevate your corporate environment.
            </p>
            <a 
              href="/talk-to-us" 
              className="inline-block bg-primary-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
            >
              Get in Touch Today
            </a>
          </div>
        </div>
      </section>

      <ComplianceSection />
    </div>
  );
}
