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

  const pageTitle = "About Prezenti | Premium Facility Management & Staffing in Maharashtra";
  const seoDescription = "Learn about Prezenti's mission to elevate corporate facility management and support staff outsourcing across Pune, Mumbai, and Maharashtra. Discover our core values, leadership, and commitment to compliance.";

  return (
    <div className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={pageTitle}
        description={seoDescription}
        canonicalUrl="/about" 
        imageUrl="/og-images/og-about.jpg"
        keywords={['about prezenti', 'facility management company profile', 'corporate staffing agency history', 'trusted staffing maharashtra']}
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
            Redefining integrated facility management and corporate staffing through rigorous training, strict compliance, and unwavering reliability.
          </p>
        </header>

        <div className="prose prose-lg prose-neutral max-w-none">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Story</h2>
          <p className="mb-6 text-neutral-700 leading-relaxed">
            Founded with a vision to professionalize the unorganized sector of support staff outsourcing, Prezenti has rapidly grown to become the trusted facility management partner for leading enterprises, IT parks, and corporate offices across Maharashtra. We recognized early on that companies were struggling not just with finding staff, but with finding <em>reliable, verified, and compliant</em> staff.
          </p>
          <p className="mb-12 text-neutral-700 leading-relaxed">
            Our approach fundamentally shifted the paradigm from mere manpower supply to end-to-end service delivery. By acting as the principal employer, we absorb the administrative and compliance burdens of our clients, allowing them to focus entirely on their core business operations.
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Our Core Values</h2>
          <ul className="space-y-4 text-neutral-700 leading-relaxed list-none pl-0">
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold mt-1">1.</span>
              <span><strong>Compliance First:</strong> We believe that taking shortcuts on compliance is a risk no enterprise should bear. We handle all legalities transparently.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold mt-1">2.</span>
              <span><strong>Dignity of Labor:</strong> We train, respect, and pay our staff on time. A happy workforce translates directly to excellent service for our clients.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-600 font-bold mt-1">3.</span>
              <span><strong>Operational Excellence:</strong> Through tech-enabled tracking and rigorous SOPs, we deliver consistent quality every single day.</span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Leadership & Expertise</h2>
          <p className="mb-12 text-neutral-700 leading-relaxed">
            Prezenti is spearheaded by industry veterans with decades of combined experience in corporate administration, human resources, and heavy-duty facility operations. Our leadership team is supported by a robust network of area managers, quality auditors, and site supervisors who ensure that our high standards are consistently met on the ground, 24/7.
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
