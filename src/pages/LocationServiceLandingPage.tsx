import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { servicesData, generateLocalizedContent } from '../data/servicesContent';
import { locationsData } from '../data/locations';
import type { RouteDefinition } from '../app/routes/routeRegistry';
import { NotFoundPage } from './NotFoundPage';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';
import { SEO_CONSTANTS } from '../seo/constants';
import { housekeepingPuneSEO, housekeepingPuneFAQs } from '../data/pune/housekeeping_pune_content';
import { officeBoyPuneSEO, officeBoyPuneFAQs } from '../data/pune/office_boy_pune_content';
import { pantryStaffPuneSEO, pantryStaffPuneFAQs } from '../data/pune/pantry_staff_pune_content';
import { facilityManagementPuneSEO, facilityManagementPuneFAQs } from '../data/pune/facility_management_pune_content';

interface Props {
  routeDef: RouteDefinition;
}

export function LocationServiceLandingPage({ routeDef }: Props) {
  const service = servicesData[routeDef.serviceKey!];
  const location = locationsData[routeDef.locationKey!];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [routeDef.dataKey]);

  if (!routeDef?.dataKey) {
    return <NotFoundPage />;
  }

  if (!service || !location) {
    return <NotFoundPage />;
  }

  let pageTitle = `${service.h1} ${location.h1Prefix}`;
  let seoTitle = `${service.seoTitle.split('|')[0].trim()} ${location.seoTitlePrefix}`;
  let seoDescription = `${service.seoDescription.replace('.', '')} ${location.seoDescriptionPrefix}`;
  let localFaqs = service.faqs.map(faq => ({
    question: faq.question.includes('?') 
      ? faq.question.replace('?', ` in ${location.name}?`)
      : `${faq.question} in ${location.name}`,
    answer: faq.answer.includes('we provide') 
      ? faq.answer.replace('we provide', `we provide across ${location.name}`)
      : `${faq.answer} We actively serve clients throughout ${location.name}.`
  }));
  if (location.slug === 'pune') {
    if (service.slug === 'housekeeping-services') {
      pageTitle = housekeepingPuneSEO.h1;
      seoTitle = housekeepingPuneSEO.metaTitle;
      seoDescription = housekeepingPuneSEO.metaDescription;
      localFaqs = housekeepingPuneFAQs;
    } else if (service.slug === 'office-boy-services') {
      pageTitle = officeBoyPuneSEO.h1;
      seoTitle = officeBoyPuneSEO.metaTitle;
      seoDescription = officeBoyPuneSEO.metaDescription;
      localFaqs = officeBoyPuneFAQs;
    } else if (service.slug === 'pantry-staff-services') {
      pageTitle = pantryStaffPuneSEO.h1;
      seoTitle = pantryStaffPuneSEO.metaTitle;
      seoDescription = pantryStaffPuneSEO.metaDescription;
      localFaqs = pantryStaffPuneFAQs;
    } else if (service.slug === 'facility-management-services') {
      pageTitle = facilityManagementPuneSEO.h1;
      seoTitle = facilityManagementPuneSEO.metaTitle;
      seoDescription = facilityManagementPuneSEO.metaDescription;
      localFaqs = facilityManagementPuneFAQs;
    }
  }

  const breadcrumbs = [
    { name: 'Services', url: '/services' },
    { name: service.seoTitle.split('|')[0].trim(), url: `/${service.slug}` },
    { name: location.name, url: `/${service.slug}-${location.slug}` }
  ];
  
  const canonicalUrl = `${SEO_CONSTANTS.BASE_URL}/${service.slug}-${location.slug}`;

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={`/${service.slug}-${location.slug}`}
        imageUrl={`/og-images/og-${service.id}.jpg`}
        keywords={[
          pageTitle,
          `${service.h1} in ${location.name}`,
          `${service.slug.replace('-', ' ')} ${location.name}`,
          `corporate facility services ${location.name}`,
        ]}
        noindex
      />

      <StructuredData
        type="Service"
        data={{
          name: pageTitle,
          description: seoDescription,
          serviceType: service.h1,
          url: canonicalUrl,
          areaServed: location.name
        }}
      />
      <StructuredData
        type="LocalBusiness"
        data={{
          name: `${SEO_CONSTANTS.SITE_NAME} - ${location.name}`,
          description: seoDescription,
          url: canonicalUrl,
          city: location.name
        }}
      />
      
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />
      <StructuredData type="FAQPage" data={{ faqs: localFaqs }} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
          >
            {pageTitle}
          </motion.h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            {seoDescription}
          </p>
        </header>

        <div className="prose prose-lg prose-neutral max-w-none">
          {generateLocalizedContent(service.h1, location.name, service.slug, location.slug).map((section, idx) => (
            <section key={idx} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-4">
                {section.title}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="mb-4 text-neutral-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              {section.listItems && (
                <ul className="list-disc pl-6 mb-4 text-neutral-700">
                  {section.listItems.map((li, liIdx) => (
                    <li key={liIdx} className="mb-2" dangerouslySetInnerHTML={{ __html: li }} />
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <ServiceCta 
          title={`Ready to transform your facility in ${location.name}?`} 
          description="Contact our expert local team today for a customized quote tailored to your unique requirements." 
        />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-8">Frequently Asked Questions</h2>
          <FaqAccordion faqs={localFaqs} />
        </section>

        <section className="mt-16 pt-12 border-t border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Explore Related Services in {location.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {service.relatedServices.map((related) => (
              <Link 
                key={related.slug} 
                to={`/${related.slug}-${location.slug}`}
                className="p-6 rounded-xl border border-neutral-200 hover:border-primary-500 hover:shadow-md transition-all group bg-white"
              >
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {related.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
