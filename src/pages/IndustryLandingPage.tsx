import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { industriesData } from '../data/industries';
import { servicesData } from '../data/servicesContent';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';
import { SEO_CONSTANTS } from '../seo/constants';

export function IndustryLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? industriesData[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  if (!industry) {
    return <Navigate to="/" replace />;
  }

  const breadcrumbs = [
    { name: 'Industries', url: '/' }, // No Industries hub yet, back to home
    { name: industry.name, url: `/industries/${industry.slug}` }
  ];
  
  const canonicalUrl = `${SEO_CONSTANTS.BASE_URL}/industries/${industry.slug}`;

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={industry.seoTitle}
        description={industry.seoDescription}
        canonicalUrl={`/industries/${industry.slug}`}
        keywords={[
          industry.h1,
          `facility management ${industry.name}`,
          `housekeeping ${industry.name}`,
          `staffing for ${industry.name}`,
        ]}
      />
      
      <StructuredData
        type="WebPage"
        data={{
          name: industry.h1,
          description: industry.seoDescription,
          url: canonicalUrl,
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
            {industry.h1}
          </motion.h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            {industry.overview}
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Relevant Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(servicesData).map((service) => (
              <div 
                key={service.slug} 
                className="p-6 rounded-xl border border-neutral-200 bg-white"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {service.h1}
                </h3>
                <p className="text-neutral-600">
                  Customized {service.h1.toLowerCase()} protocols explicitly designed for the {industry.name} sector.
                </p>
              </div>
            ))}
          </div>
        </section>

        <ServiceCta 
          title={`Upgrade your ${industry.name} facilities today.`} 
          description="Speak to our industry experts to craft a specialized staffing and facility management plan." 
        />
      </article>
    </main>
  );
}
