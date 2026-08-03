import { useEffect } from 'react';

import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { servicesData } from '../data/servicesContent';
import type { RouteDefinition } from '../app/routes/routeRegistry';
import { NotFoundPage } from './NotFoundPage';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';
import { SEO_CONSTANTS } from '../seo/constants';
import { LocationSection } from '../features/website/sections/LocationSection';
import { ComplianceSection } from '../features/website/sections/ComplianceSection';
import { RelatedContentWidget } from '../components/seo/RelatedContentWidget';
import { AiSummaryBlock } from '../components/seo/AiSummaryBlock';
import { Container } from '../components/ui/Container';

export function ServiceLandingPage({ routeDef }: { routeDef: RouteDefinition }) {
  const service = servicesData[routeDef.dataKey];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [routeDef.dataKey]);

  if (!routeDef?.dataKey) {
    return <NotFoundPage />;
  }

  if (!service) {
    return <NotFoundPage />;
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
        canonicalUrl={canonicalUrl}
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

      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          <article className="lg:w-2/3">
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

        <AiSummaryBlock 
          title={`${service.h1} - Quick Definition`}
          summary={`Prezenti provides enterprise-grade ${service.h1.toLowerCase()} across Pune. All staff are 100% PF and ESIC compliant, police-verified, and fully trained for corporate environments.`}
          entities={['PF Compliant', 'ESIC Compliant', 'ISO Standards', 'Background Verified', 'Corporate Soft Services']}
        />

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
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Frequently Asked Questions</h2>
            <FaqAccordion faqs={service.faqs} />
          </section>
          </article>
          
          <aside className="lg:w-1/3">
            {service.relationships ? (
              <RelatedContentWidget relationships={service.relationships} title={`${service.h1} Ecosystem`} />
            ) : (
              <RelatedContentWidget 
                title={`${service.h1} Ecosystem`}
                relationships={{
                  service: service.relatedServices.map(s => s.slug),
                  industry: ['it-companies', 'hospitals', 'manufacturing'],
                  pricing: [],
                  siblings: [],
                  children: [],
                  knowledge: ['pf-compliance'],
                  comparison: ['fm-vs-housekeeping'],
                  location: ['pune', 'hinjawadi', 'kharadi']
                }} 
              />
            )}
          </aside>
        </div>
      </Container>

      {/* Trust & Compliance Signals */}
      <ComplianceSection />
      
      {/* Local SEO Targets */}
      <LocationSection />
    </main>
  );
}
