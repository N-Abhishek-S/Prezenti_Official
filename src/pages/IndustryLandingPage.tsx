import { useEffect } from 'react';
import { SEO } from '../seo/SEO';
import { StructuredData } from '../seo/StructuredData';
import { industryData } from '../content/industries/industryData';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ServiceCta } from '../components/ui/ServiceCta';
import { motion } from 'framer-motion';
import { RelatedContentWidget } from '../components/seo/RelatedContentWidget';
import { AiSummaryBlock } from '../components/seo/AiSummaryBlock';
import { Container } from '../components/ui/Container';
import type { RouteDefinition } from '../app/routes/routeRegistry';
import { NotFoundPage } from './NotFoundPage';

interface IndustryLandingPageProps {
  routeDef: RouteDefinition;
}

export function IndustryLandingPage({ routeDef }: IndustryLandingPageProps) {
  const industry = industryData[routeDef.dataKey];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [routeDef.dataKey]);

  if (!routeDef?.dataKey || !industry) {
    return <NotFoundPage />;
  }

  const breadcrumbs = [
    { name: 'Industries', url: '/' }, // To be replaced when industries hub is built
    { name: industry.industryName, url: `/industries/${industry.slug}` }
  ];
  
  const canonicalUrl = industry.seo.canonical;

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={industry.title}
        description={industry.description}
        canonicalUrl={`/industries/${industry.slug}`}
        keywords={industry.seo.keywords}
      />
      
      <StructuredData
        type="WebPage"
        data={{
          name: industry.title,
          description: industry.description,
          url: canonicalUrl,
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />

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
                {industry.title}
              </motion.h1>
              <p className="text-xl text-brand-muted leading-relaxed border-l-4 border-brand-accent pl-4 mb-8">
                {industry.overview}
              </p>

              <AiSummaryBlock 
                title={`${industry.industryName} Facility Management Definition`}
                summary={industry.overview}
                entities={[industry.industryName, ...industry.complianceRequirements]}
              />
            </header>

            <section className="mb-12 prose prose-lg max-w-none text-brand-dark">
              <h2 className="text-3xl font-bold mb-6">Industry Challenges & Facility Problems</h2>
              <ul className="space-y-3">
                {industry.challenges.concat(industry.facilityProblems).map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-accent font-bold mt-1">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-12 prose prose-lg max-w-none text-brand-dark">
              <h2 className="text-3xl font-bold mb-6">Compliance & SLA Standards</h2>
              <ul className="space-y-3">
                {industry.complianceRequirements.concat(industry.slas).map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-brand-accent font-bold mt-1">✓</span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="mb-12 prose prose-lg max-w-none text-brand-dark">
              <h2 className="text-3xl font-bold mb-6">Service Process & Benefits</h2>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-brand-accent/10">
                <ol className="list-decimal list-inside space-y-4">
                  {industry.serviceProcess.map((step, i) => (
                    <li key={i} className="font-semibold text-brand-dark">{step}</li>
                  ))}
                </ol>
              </div>
            </section>

            <ServiceCta 
              title={`Upgrade your ${industry.industryName} facilities today.`} 
              description="Speak to our industry experts to craft a specialized staffing and facility management plan." 
            />
          </article>
          
          <aside className="lg:w-1/3">
            <RelatedContentWidget relationships={industry.relationships} title={`${industry.industryName} Ecosystem`} />
          </aside>
        </div>
      </Container>
    </main>
  );
}
