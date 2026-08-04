import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Briefcase, Info, Tag } from 'lucide-react';
import type { ContentRelationships } from '../../content/blogs/blogTypes';
import { resolveRoutePath } from '../../app/routes/routeRegistry';

// This widget receives a relationships object and automatically pulls in related assets
interface RelatedContentWidgetProps {
  relationships: ContentRelationships;
  title?: string;
  theme?: 'light' | 'dark';
}

function resolveEntries(slugs: string[] | undefined, resolve: (slug: string) => string | null) {
  if (!slugs?.length) return [];
  return slugs
    .map(slug => ({ slug, path: resolve(slug) }))
    .filter((entry): entry is { slug: string; path: string } => Boolean(entry.path));
}

function labelFor(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function RelatedContentWidget({ relationships, title = "Related Resources", theme = 'light' }: RelatedContentWidgetProps) {
  const isDark = theme === 'dark';

  const cardClasses = isDark
    ? 'bg-brand-dark border-brand-accent/20 text-white'
    : 'bg-white border-brand-accent/10 text-brand-dark';
  const headingClasses = isDark ? 'text-white border-white/20' : 'text-brand-dark border-brand-dark/10';
  const linkClasses = isDark ? 'text-brand-muted/90 hover:text-white' : 'text-brand-accent hover:underline';

  const services = resolveEntries(relationships.service, slug => resolveRoutePath('SERVICE', slug));
  const industries = resolveEntries(relationships.industry, slug => resolveRoutePath('INDUSTRY', slug));
  const pricing = resolveEntries(relationships.pricing, slug => resolveRoutePath('KNOWLEDGE', slug));
  // "siblings" means different things depending on the source content type
  // (other blog posts, other industries, or other locations), so try each
  // route type in turn and only link if the slug actually resolves to a
  // registered route.
  const siblings = resolveEntries(
    relationships.siblings,
    slug => resolveRoutePath('LOCATION', slug) || resolveRoutePath('INDUSTRY', slug) || resolveRoutePath('BLOG', slug)
  );
  const knowledge = resolveEntries(relationships.knowledge, slug => resolveRoutePath('KNOWLEDGE', slug));
  const locations = resolveEntries(relationships.location, slug => resolveRoutePath('LOCATION', slug));

  return (
    <div className={`space-y-8 rounded-2xl p-6 border shadow-sm ${cardClasses}`}>
      <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${headingClasses}`}>{title}</h3>

      {/* Services */}
      {services.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Core Services
          </h4>
          <ul className="space-y-3">
            {services.map(({ slug, path }) => (
              <li key={slug}>
                <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                  {labelFor(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Industries */}
      {industries.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Industries
          </h4>
          <ul className="space-y-3">
            {industries.map(({ slug, path }) => (
              <li key={slug}>
                <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                  {labelFor(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pricing / Knowledge */}
      {pricing.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Tag className="w-4 h-4" /> Pricing & Cost Guides
          </h4>
          <ul className="space-y-3">
            {pricing.map(({ slug, path }) => (
              <li key={slug}>
                <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                  {labelFor(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Blogs / Sibling Pages */}
      {siblings.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Further Reading
          </h4>
          <ul className="space-y-3">
            {siblings.map(({ slug, path }) => (
              <li key={slug}>
                <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                  {labelFor(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Knowledge Base */}
      {knowledge.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Info className="w-4 h-4" /> Knowledge Base
          </h4>
          <ul className="space-y-3">
            {knowledge.map(({ slug, path }) => (
              <li key={slug}>
                <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                  {labelFor(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Locations */}
      {locations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Locations
          </h4>
          <ul className="space-y-3">
            {locations.map(({ slug, path }) => (
              <li key={slug}>
                <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                  {labelFor(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
