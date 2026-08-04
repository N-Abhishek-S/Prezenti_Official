import { useEffect } from 'react';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { locationData } from '../content/locations/locationData';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';
import { RelatedContentWidget } from '../components/seo/RelatedContentWidget';
import { AiSummaryBlock } from '../components/seo/AiSummaryBlock';
import { Container } from '../components/ui/Container';
import type { RouteDefinition } from '../app/routes/routeRegistry';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { NotFoundPage } from './NotFoundPage';

interface LocationLandingPageProps {
  routeDef: RouteDefinition;
}

export function LocationLandingPage({ routeDef }: LocationLandingPageProps) {
  const location = locationData[routeDef.dataKey];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [routeDef.dataKey]);

  if (!routeDef?.dataKey || !location) {
    return <NotFoundPage />;
  }

  const breadcrumbs = [
    { name: 'Locations', url: '/' }, // To be replaced when locations hub is built
    { name: location.locationName, url: `/locations/${location.slug}` }
  ];
  
  const canonicalUrl = location.seo.canonical;

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={location.title}
        description={location.description}
        canonicalUrl={`/locations/${location.slug}`}
        keywords={location.seo.keywords}
      />
      
      <StructuredData
        type="WebPage"
        data={{
          name: location.title,
          description: location.description,
          url: canonicalUrl,
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />
      {/* Inject LocalBusiness Schema for Location Pages */}
      <StructuredData 
        type="LocalBusiness" 
        data={{
          name: `Prezenti Facility Management ${location.locationName}`,
          description: location.description,
          url: canonicalUrl,
          areaServed: location.locationName
        }} 
      />

      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          <article className="lg:w-2/3">
            <header className="mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-dark mb-6"
              >
                {location.title}
              </motion.h1>
              <p className="text-xl text-brand-muted leading-relaxed border-l-4 border-brand-accent pl-4 mb-8">
                {location.overview}
              </p>

              <AiSummaryBlock
                title={`${location.locationName} Facility Management Definition`}
                summary={`Prezenti provides facility management and corporate staffing for ${location.locationName}, with service scope and delivery structured around the needs of each site.`}
                entities={['Facility Management', 'Corporate Staffing', 'Site-Specific Deployment', location.locationName]}
              />
            </header>

            <section className="mb-12 prose prose-lg max-w-none text-brand-dark">
              <h2 className="text-3xl font-bold mb-6">Business Hubs & Commercial Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-brand-accent/10 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-brand-accent">Major IT Parks & Estates</h3>
                  <ul className="space-y-2">
                    {location.businessHubs.concat(location.nearbyItParks).map((hub, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-medium">
                        <span className="text-brand-accent font-bold mt-1">•</span>
                        {hub}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-brand-accent/10 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-brand-accent">Nearby Areas Served</h3>
                  <ul className="space-y-2">
                    {location.nearbyAreas.map((area, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-medium">
                        <span className="text-brand-accent font-bold mt-1">•</span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12 prose prose-lg max-w-none text-brand-dark">
              <h2 className="text-3xl font-bold mb-6">Local Challenges & Solutions</h2>
              <ul className="space-y-3 bg-brand-light p-6 rounded-xl border border-brand-accent/20">
                {location.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-accent font-bold mt-1">✓</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="my-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">Frequently Asked Questions ({location.locationName})</h2>
              <FaqAccordion faqs={location.faqs} />
            </section>

            <ServiceCta 
              title={`Secure reliable facility management in ${location.locationName}.`} 
              description="Contact our local operations team today for a rapid site audit and customized staffing plan." 
            />
          </article>
          
          <aside className="lg:w-1/3">
            <RelatedContentWidget relationships={location.relationships} title={`${location.locationName} Hub`} />
          </aside>
        </div>
      </Container>
    </main>
  );
}
