import { useEffect } from 'react';
import { Container } from '../components/ui/Container';
import type { RouteDefinition } from '../app/routes/routeRegistry';
import { resolveRoutePath } from '../app/routes/routeRegistry';
import { allBlogsMetadata } from '../app/routes/blogRoutes';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { NotFoundPage } from './NotFoundPage';
import { SEO } from '../seo/SEO';
import { SEO_CONSTANTS } from '../seo/constants';
import { StructuredData } from '../seo/StructuredData';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { motion } from 'framer-motion';
import { AiSummaryBlock } from '../components/seo/AiSummaryBlock';

interface BlogPostPageProps {
  routeDef: RouteDefinition;
}

export function BlogPostPage({ routeDef }: BlogPostPageProps) {
  const meta = allBlogsMetadata[routeDef.dataKey];
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [routeDef?.dataKey]);

  if (!routeDef?.dataKey || !meta) {
    return <NotFoundPage />;
  }

  const breadcrumbs = [
    { name: 'Blog', url: '/blog' },
    { name: meta.title, url: `/blog/${meta.slug}` }
  ];

  return (
    <main className="bg-canvas pt-24 pb-14 sm:pt-28 lg:pb-20">
      <SEO 
        title={`${meta.title} | Prezenti Facility Management`}
        description={meta.aiSearch.summary}
        canonicalUrl={`/blog/${meta.slug}`}
        keywords={[meta.title, meta.category]}
      />
      <StructuredData
        type="BlogPosting"
        data={{
          headline: meta.title,
          description: meta.aiSearch.summary,
          url: `${SEO_CONSTANTS.BASE_URL}/blog/${meta.slug}`,
          author: { "@type": "Organization", name: meta.author },
          datePublished: meta.history.createdAt,
          dateModified: meta.history.updatedAt
        }}
      />
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />

      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          
          <article className="lg:w-2/3">
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-brand-muted font-medium">
                <span className="bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full font-semibold">
                  {meta.category}
                </span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(meta.history.createdAt).toLocaleDateString('en-IN')}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {meta.readingTime} min read</span>
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {meta.author}</span>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-dark mb-6"
              >
                {meta.title}
              </motion.h1>
              <p className="text-xl text-brand-muted leading-relaxed border-l-4 border-brand-accent pl-4 mb-8">
                {meta.aiSearch.summary}
              </p>
            </header>

            <AiSummaryBlock 
              title="Article Summary"
              summary={meta.aiSearch.summary}
              entities={meta.keywords.entities.map(e => e.replace('ent-', ''))}
            />

            <div className="prose prose-lg max-w-none text-brand-dark mb-12">
              {/* Content will be injected here dynamically by rendering content.md */}
              <p className="italic text-brand-muted">The markdown content will be rendered here.</p>
            </div>

            <div className="mt-12 p-10 bg-brand-accent rounded-2xl text-white text-center">
              <h3 className="text-3xl font-bold text-white mb-4">{meta.conversion.primaryCTA}</h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">Get a tailored quote for your facility today.</p>
              <Link to="/talk-to-us" className="inline-flex items-center gap-2 bg-white text-brand-accent px-8 py-4 rounded-xl font-bold hover:bg-brand-light transition-all hover:scale-105 no-underline">
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </article>

          <aside className="lg:w-1/3 space-y-8">
            
            {(() => {
              const relatedServices = meta.relationships.service
                .map(service => ({ service, path: resolveRoutePath('SERVICE', service) }))
                .filter((entry): entry is { service: string; path: string } => Boolean(entry.path));
              if (relatedServices.length === 0) return null;
              return (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-accent/10">
                  <h3 className="text-xl font-bold text-brand-dark mb-6 border-b pb-4">Related Services</h3>
                  <ul className="space-y-4">
                    {relatedServices.map(({ service, path }) => (
                      <li key={service}>
                        <Link to={path} className="flex items-center gap-3 text-brand-dark font-medium hover:text-brand-accent transition-colors">
                          <ArrowRight className="w-5 h-5 text-brand-accent" />
                          {service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {(() => {
              const relatedGuides = meta.relationships.pricing
                .map(guide => ({ guide, path: resolveRoutePath('KNOWLEDGE', guide) }))
                .filter((entry): entry is { guide: string; path: string } => Boolean(entry.path));
              if (relatedGuides.length === 0) return null;
              return (
                <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/20 pb-4">Pricing & Cost Guides</h3>
                  <ul className="space-y-4">
                    {relatedGuides.map(({ guide, path }) => (
                      <li key={guide}>
                        <Link to={path} className="flex items-center gap-3 text-brand-muted/90 hover:text-white transition-colors">
                          <Tag className="w-5 h-5 text-brand-accent" />
                          {guide.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </aside>
        </div>
      </Container>
    </main>
  );
}
