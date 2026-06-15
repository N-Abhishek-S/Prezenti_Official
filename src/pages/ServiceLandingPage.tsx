import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import type { ServiceData } from '../data/servicesContent';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';
import { SEO_CONSTANTS } from '../seo/constants';

export function ServiceLandingPage({ service }: { service: ServiceData }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [service.slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const breadcrumbs = [
    { name: 'Services', url: '/services' },
    { name: service.seoTitle.split('|')[0].trim(), url: `/${service.slug}` }
  ];
  const canonicalUrl = `${SEO_CONSTANTS.BASE_URL}/${service.slug}`;

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={service.seoTitle}
        description={service.seoDescription}
        canonicalUrl={`/${service.slug}`}
        imageUrl={`/og-images/og-${service.id}.jpg`}
        keywords={[
          service.h1,
          `${service.h1} Pune`,
          'verified support staff',
          'corporate facility services',
          'managed workplace staffing',
        ]}
      />
      

      <StructuredData
        type="Service"
        data={{
          name: service.h1,
          description: service.seoDescription,
          serviceType: service.h1,
          url: canonicalUrl,
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />
      <StructuredData type="FAQPage" data={{ faqs: service.faqs }} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
          >
            {service.h1}
          </motion.h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            {service.seoDescription}
          </p>
        </header>

        <div className="prose prose-lg prose-neutral max-w-none">
          {service.sections.map((section, idx) => (
            <section key={idx} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-4">{section.title}</h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="mb-4 text-neutral-700 leading-relaxed">{p}</p>
              ))}
              {section.listItems && (
                <ul className="list-disc pl-6 mb-4 text-neutral-700">
                  {section.listItems.map((li, liIdx) => (
                    <li key={liIdx} className="mb-2">{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <ServiceCta 
          title={`Ready to transform your ${service.h1.toLowerCase()}?`} 
          description="Contact our expert team today for a customized quote tailored to your facility's unique requirements." 
        />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">Frequently Asked Questions</h2>
          <FaqAccordion faqs={service.faqs} />
        </section>

        <section className="mt-16 pt-12 border-t border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Explore Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {service.relatedServices.map((related) => (
              <Link 
                key={related.slug} 
                to={`/${related.slug}`}
                className="p-6 rounded-xl border border-neutral-200 hover:border-primary-500 hover:shadow-md transition-all group bg-white"
              >
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {related.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services" className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              <span className="mr-2">←</span> View All Services
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
