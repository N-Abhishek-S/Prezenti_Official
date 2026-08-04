import { useEffect } from 'react';
import { Container } from '../components/ui/Container';
import type { RouteDefinition } from '../app/routes/routeRegistry';
import { pricingData } from '../content/knowledge/pricingData';
import { trustData } from '../content/knowledge/trustData';
import { comparisonData } from '../content/comparisons/comparisonData';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { SEO } from '../seo/SEO';
import { SEO_CONSTANTS } from '../seo/constants';
import { StructuredData } from '../seo/StructuredData';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { motion } from 'framer-motion';
import { AiSummaryBlock } from '../components/seo/AiSummaryBlock';
import { RelatedContentWidget } from '../components/seo/RelatedContentWidget';
import { FaqAccordion } from '../components/ui/FaqAccordion';

interface KnowledgePageProps {
  routeDef: RouteDefinition;
}

export function KnowledgePage({ routeDef }: KnowledgePageProps) {
  let data = null;
  if (routeDef?.type === 'KNOWLEDGE') {
    data = pricingData[routeDef.dataKey] || trustData[routeDef.dataKey];
  } else if (routeDef?.type === 'COMPARISON') {
    data = comparisonData[routeDef.dataKey];
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [routeDef?.dataKey]);

  if (!routeDef?.dataKey || !data) {
    return <NotFoundPage />;
  }

  const breadcrumbs = [
    { name: data.category, url: '/' },
    { name: data.h1, url: `/${data.slug}` }
  ];

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={data.seoTitle}
        description={data.seoDescription}
        canonicalUrl={`/${data.slug}`}
        keywords={[data.h1, data.category]}
      />
      <StructuredData
        type="Article"
        data={{
          headline: data.h1,
          description: data.seoDescription,
          url: `${SEO_CONSTANTS.BASE_URL}/${data.slug}`,
          author: { "@type": "Organization", name: "Prezenti Facility Management" }
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />
      {data.faqs && <StructuredData type="FAQPage" data={{ faqs: data.faqs }} />}

      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          <article className="lg:w-2/3">
            <header className="mb-12">
              <span className="inline-block px-3 py-1 mb-6 text-sm font-semibold rounded-full bg-brand-accent/20 text-brand-accent">
                {data.category} Guide
              </span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-dark mb-6"
              >
                {data.h1}
              </motion.h1>
              <p className="text-xl text-brand-muted leading-relaxed border-l-4 border-brand-accent pl-4 mb-8">
                {data.seoDescription}
              </p>
            </header>

            <AiSummaryBlock 
              title={`${data.h1} - Executive Summary`}
              summary={data.seoDescription}
              entities={[data.category, ...(data.relatedServices || [])]}
            />

            <div className="prose prose-lg max-w-none text-brand-dark mb-12 space-y-12">
              {data.contentBlocks.map((block, idx) => {
                if (block.type === 'markdown') {
                  return (
                    <section key={idx}>
                      {block.title && <h2 className="text-3xl font-bold text-brand-dark mb-6">{block.title}</h2>}
                      <p className="text-brand-dark/80 leading-relaxed whitespace-pre-wrap">{block.content}</p>
                    </section>
                  );
                }
                
                if (block.type === 'factors') {
                  return (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-accent/10">
                      <h2 className="text-3xl font-bold text-brand-dark mb-8">{block.title}</h2>
                      <div className="grid gap-6 md:grid-cols-2">
                        {block.items?.map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-brand-dark text-lg mb-2">{item.name}</h3>
                              <p className="text-brand-dark/70 leading-relaxed text-base">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (block.type === 'table') {
                  return (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-accent/10 overflow-hidden">
                      <h2 className="text-3xl font-bold text-brand-dark mb-8">{block.title}</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-brand-dark/5">
                              <th className="p-4 font-semibold text-brand-dark border-b">Feature</th>
                              <th className="p-4 font-semibold text-brand-dark border-b">Facility Management</th>
                              <th className="p-4 font-semibold text-brand-dark border-b">Housekeeping</th>
                            </tr>
                          </thead>
                          <tbody>
                            {block.items?.map((item, i) => (
                              <tr key={i} className="border-b last:border-0 hover:bg-brand-dark/5 transition-colors text-base">
                                <td className="p-4 font-medium text-brand-dark">{item.feature}</td>
                                <td className="p-4 text-brand-dark/80">{item.fm}</td>
                                <td className="p-4 text-brand-dark/80">{item.hk}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                }

                if (block.type === 'trust-signals') {
                  return (
                    <div key={idx} className="bg-brand-dark text-white p-8 rounded-2xl">
                      <div className="flex items-center gap-4 mb-6">
                        <Shield className="w-8 h-8 text-brand-accent" />
                        <h2 className="text-2xl font-bold text-white mb-0">{block.title}</h2>
                      </div>
                      <p className="text-brand-muted/80 text-base m-0">
                        Statutory and compliance considerations for your engagement can be addressed transparently as part of the contract structure.
                      </p>
                    </div>
                  );
                }

                if (block.type === 'cta') {
                  return (
                    <div key={idx} className="bg-brand-accent text-white p-10 rounded-2xl text-center">
                      <h2 className="text-3xl font-bold text-white mb-4">{block.title}</h2>
                      <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">{block.content}</p>
                      <Link
                        to="/talk-to-us"
                        className="inline-flex items-center gap-2 bg-white text-brand-accent px-8 py-4 rounded-xl font-bold hover:bg-brand-light transition-all hover:scale-105 no-underline"
                      >
                        Speak to an Expert
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {data.faqs && data.faqs.length > 0 && (
              <section className="my-16">
                <h2 className="text-3xl font-bold text-brand-dark mb-8">Frequently Asked Questions</h2>
                <FaqAccordion faqs={data.faqs} />
              </section>
            )}
          </article>
          
          <aside className="lg:w-1/3">
            <RelatedContentWidget 
              title="Related Guides & Services"
              relationships={{
                service: data.relatedServices || [],
                knowledge: data.relatedKnowledge || [],
                industry: [],
                pricing: [],
                siblings: [],
                children: [],
                comparison: [],
                location: []
              }} 
            />
          </aside>
        </div>
      </Container>
    </main>
  );
}
