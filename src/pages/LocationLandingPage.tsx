import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import type { LocationData } from '../data/locations';
import { servicesData } from '../data/servicesContent';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';
import { SEO_CONSTANTS } from '../seo/constants';

export function LocationLandingPage({ location }: { location: LocationData }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.slug]);

  if (!location) {
    return <Navigate to="/" replace />;
  }

  const pageTitle = `Facility Management & Corporate Staffing ${location.h1Prefix}`;
  const seoTitle = `Top Facility Management & Staffing ${location.seoTitlePrefix}`;
  const seoDescription = location.shortDescription;
  
  const breadcrumbs = [
    { name: 'Locations', url: '/' }, // No Locations hub yet, so back to home
    { name: location.name, url: `/${location.slug}` }
  ];
  
  const canonicalUrl = `${SEO_CONSTANTS.BASE_URL}/${location.slug}`;

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={`/${location.slug}`}
        keywords={[
          pageTitle,
          `facility management ${location.name}`,
          `corporate staffing ${location.name}`,
          `housekeeping services ${location.name}`,
        ]}
      />
      
      <StructuredData
        type="WebPage"
        data={{
          name: pageTitle,
          description: seoDescription,
          url: canonicalUrl,
        }}
      />
      <StructuredData
        type="LocalBusiness"
        data={{
          name: 'Prezenti',
          description: seoDescription,
          url: canonicalUrl,
          areaServed: location.name
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />

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
          <p className="text-xl text-neutral-600 leading-relaxed font-medium">
            {location.shortDescription} Whether you run an IT park, corporate office, or manufacturing facility, Prezenti is your trusted partner for integrated facility management in {location.name}.
          </p>
        </header>

        <div className="prose prose-lg prose-neutral max-w-none mb-16">
          {location.detailedContent.map((section, idx) => (
            <section key={idx} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-6">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="mb-4 text-neutral-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Our Services in {location.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(servicesData).map((service) => (
              <Link 
                key={service.slug} 
                to={`/${service.slug}-${location.slug}`}
                className="p-6 rounded-xl border border-neutral-200 hover:border-primary-500 hover:shadow-md transition-all group bg-white flex flex-col"
              >
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-3">
                  {service.h1}
                </h3>
                <p className="text-neutral-600 grow">
                  Professional {service.h1.toLowerCase()} tailored for {location.name} businesses.
                </p>
                <span className="mt-4 font-semibold text-primary-600 group-hover:text-primary-700 inline-flex items-center">
                  Learn more <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <ServiceCta 
          title={`Need dedicated staffing in ${location.name}?`} 
          description="Get in touch with our local team for a quick site audit and customized proposal." 
        />
      </article>
    </main>
  );
}
