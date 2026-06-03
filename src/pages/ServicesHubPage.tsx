import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { ServiceCta } from '../components/ui/ServiceCta';
import { servicesData } from '../data/servicesContent';

export function ServicesHubPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const breadcrumbs = [
    { name: 'Services', url: '/services' }
  ];

  const faqs = [
    { question: 'What facility management services do you provide?', answer: 'We provide an integrated suite of services including housekeeping, security, receptionist staffing, office boy support, pantry staff, and comprehensive commercial property management.' },
    { question: 'Do you cater to multiple locations?', answer: 'Yes, our enterprise-grade operations platform is designed specifically for multi-location enterprises, ensuring standard quality and reporting across all your facilities.' },
    { question: 'Are your support staff verified and trained?', answer: 'Absolutely. We conduct rigorous police and background verifications on all staff. They also undergo extensive training before deployment.' },
    { question: 'How can I request a customized quote?', answer: 'You can contact our expert team via the "Get a Quote" or "Talk to Expert" buttons on our website, and we will tailor a solution to your facility needs.' }
  ];

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title="Facility Management Services | Prezenti"
        description="Explore Prezenti's comprehensive suite of enterprise-grade facility management services including housekeeping, security, and specialized staffing."
        canonicalUrl="/services"
      />
      
      <StructuredData type="WebPage" />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />
      <StructuredData type="FAQPage" data={{ faqs }} />

      <article className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mb-16 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
            >
              Facility Management Services by Prezenti
            </motion.h1>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              We empower modern enterprises with world-class facility operations. Our reliable, trained, and verified professionals ensure your environment remains safe, clean, and productive so you can focus on what matters most.
            </p>
          </header>
        </div>

        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(servicesData).map((service) => (
              <Link 
                key={service.slug} 
                to={`/${service.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-primary-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.h1}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {service.seoDescription}
                  </p>
                </div>
                <div className="mt-8 text-primary-600 font-medium text-sm inline-flex items-center">
                  Explore Service <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <ServiceCta 
          title="Ready to elevate your facility?" 
          description="Speak to our experts to configure a service model that perfectly aligns with your corporate standards and budget." 
        />

        <section className="my-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">Services Frequently Asked Questions</h2>
          <FaqAccordion faqs={faqs} />
        </section>
      </article>
    </main>
  );
}
