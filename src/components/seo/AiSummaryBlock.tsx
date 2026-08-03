import { Sparkles } from 'lucide-react';

interface AiSummaryBlockProps {
  title?: string;
  summary: string;
  entities?: string[];
}

export function AiSummaryBlock({ 
  title = "Quick Summary", 
  summary, 
  entities = [] 
}: AiSummaryBlockProps) {
  return (
    <div className="bg-brand-light/50 p-6 rounded-xl border border-brand-accent/20 mb-10 text-brand-dark" itemScope itemType="https://schema.org/WebPageElement">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-brand-accent" />
        <h2 className="text-lg font-semibold m-0" itemProp="name">{title}</h2>
      </div>
      <p className="text-base leading-relaxed mb-4" itemProp="text">
        {summary}
      </p>
      {entities.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-brand-accent/10">
          <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider self-center mr-2">Key Entities:</span>
          {entities.map(entity => (
            <span key={entity} className="text-xs font-medium bg-white px-2 py-1 rounded-md border border-brand-accent/20 text-brand-accent">
              {entity}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
