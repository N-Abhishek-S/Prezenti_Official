import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TalkToExpertForm } from '../components/inquiry/TalkToExpertForm';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { SEO_CONSTANTS } from '../seo/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function TalkToUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <SEO 
        title="Contact Prezenti | Facility Staffing in Pune"
        description="Contact Prezenti to hire verified housekeeping, office boy, receptionist, pantry, security, and facility support staff for Pune workplaces."
        canonicalUrl="/talk-to-us" 
        keywords={[
          'contact facility staffing Pune',
          'hire housekeeping staff Pune',
          'verified support staff',
          'facility management quote',
        ]}
      />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Contact Prezenti',
          description: 'Request a callback for verified workplace staffing and facility services in Pune.',
          url: `${SEO_CONSTANTS.BASE_URL}/talk-to-us`,
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{ breadcrumbs: [{ name: 'Talk to Us', url: '/talk-to-us' }] }}
      />
      <StructuredData
        type="ContactPage"
        data={{
          name: 'Contact Prezenti | Enterprise Staffing',
          description: 'Get in touch for enterprise-grade facility management and corporate staffing in Pune.',
          url: `${SEO_CONSTANTS.BASE_URL}/talk-to-us`,
        }}
      />
      <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mb-9 max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Talk to Expert</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            Share your staffing requirement with the Prezenti team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            Complete the inquiry form and our operations team will review your service requirement.
          </p>
        </motion.div>

        <TalkToExpertForm />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mt-16 max-w-3xl text-center border-t border-neutral-200 pt-10">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4">Why Businesses Trust Prezenti</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-neutral-600">
            <div>
              <div className="font-semibold text-neutral-900 mb-1">100% Compliant</div>
              <p>Strict adherence to labor laws, PF, ESIC, and background verifications.</p>
            </div>
            <div>
              <div className="font-semibold text-neutral-900 mb-1">Dedicated Support</div>
              <p>Assigned Key Account Managers to oversee your facility operations.</p>
            </div>
            <div>
              <div className="font-semibold text-neutral-900 mb-1">Rapid Deployment</div>
              <p>Quick turnaround times with a pipeline of pre-trained support staff.</p>
            </div>
          </div>
          
          <div className="mt-8 text-neutral-500">
            <p className="mb-2 font-medium">Corporate Contact Information:</p>
            <p>Email: <a href="mailto:bd@kargar.co.in" className="text-primary-600 hover:underline">bd@kargar.co.in</a></p>
            <p>Location: Pune, Maharashtra, India</p>
          </div>
        </motion.div>
      </section>
    </main>
    </>
  );
}
