import { KnowledgePage } from './routeRegistry';
import type { RouteDefinition } from './routeRegistry';
import { pricingData } from '../../content/knowledge/pricingData';
import { trustData } from '../../content/knowledge/trustData';
import { comparisonData } from '../../content/comparisons/comparisonData';

export const knowledgeRoutes: Record<string, RouteDefinition> = {};

// Register Pricing
Object.keys(pricingData).forEach(slug => {
  knowledgeRoutes[slug] = {
    type: 'KNOWLEDGE',
    component: KnowledgePage,
    dataKey: slug
  };
});

// Register Trust
Object.keys(trustData).forEach(slug => {
  knowledgeRoutes[slug] = {
    type: 'KNOWLEDGE',
    component: KnowledgePage,
    dataKey: slug
  };
});

// Register Comparisons
Object.keys(comparisonData).forEach(slug => {
  knowledgeRoutes[slug] = {
    type: 'COMPARISON',
    component: KnowledgePage,
    dataKey: slug
  };
});
