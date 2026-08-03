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

export function RelatedContentWidget({ relationships, title = "Related Resources", theme = 'light' }: RelatedContentWidgetProps) {
  const isDark = theme === 'dark';
  
  const cardClasses = isDark 
    ? 'bg-brand-dark border-brand-accent/20 text-white' 
    : 'bg-white border-brand-accent/10 text-brand-dark';
  const headingClasses = isDark ? 'text-white border-white/20' : 'text-brand-dark border-brand-dark/10';
  const linkClasses = isDark ? 'text-brand-muted/90 hover:text-white' : 'text-brand-accent hover:underline';

  return (
    <div className={`space-y-8 rounded-2xl p-6 border shadow-sm ${cardClasses}`}>
      <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${headingClasses}`}>{title}</h3>
      
      {/* Services */}
      {relationships.service?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Core Services
          </h4>
          <ul className="space-y-3">
            {relationships.service.map(slug => {
              const path = resolveRoutePath('SERVICE', slug) || `/${slug}`;
              return (
                <li key={slug}>
                  <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Industries */}
      {relationships.industry?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Industries
          </h4>
          <ul className="space-y-3">
            {relationships.industry.map(slug => {
              const path = resolveRoutePath('INDUSTRY', slug) || `/industries/${slug}`;
              return (
                <li key={slug}>
                  <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Pricing / Knowledge */}
      {relationships.pricing?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Tag className="w-4 h-4" /> Pricing & Cost Guides
          </h4>
          <ul className="space-y-3">
            {relationships.pricing.map(slug => {
              const path = resolveRoutePath('KNOWLEDGE', slug) || `/${slug}`;
              return (
                <li key={slug}>
                  <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Related Blogs (Siblings) */}
      {relationships.siblings?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Further Reading
          </h4>
          <ul className="space-y-3">
            {relationships.siblings.map(slug => {
              const path = resolveRoutePath('BLOG', slug) || `/blog/${slug}`;
              return (
                <li key={slug}>
                  <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {/* Knowledge Base */}
      {relationships.knowledge?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Info className="w-4 h-4" /> Knowledge Base
          </h4>
          <ul className="space-y-3">
            {relationships.knowledge.map(slug => {
              const path = resolveRoutePath('KNOWLEDGE', slug) || `/${slug}`;
              return (
                <li key={slug}>
                  <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Locations */}
      {relationships.location?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 opacity-70 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Locations
          </h4>
          <ul className="space-y-3">
            {relationships.location.map(slug => {
              const path = resolveRoutePath('LOCATION', slug) || `/locations/${slug}`;
              return (
                <li key={slug}>
                  <Link to={path} className={`flex items-center gap-2 transition-colors ${linkClasses}`}>
                    <ArrowRight className="w-4 h-4 opacity-70" />
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
