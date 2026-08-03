import type { ContentRelationships } from '../blogs/blogTypes';

export interface IndustryMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  industryName: string;
  
  overview: string;
  challenges: string[];
  facilityProblems: string[];
  complianceRequirements: string[];
  
  recommendedServices: string[];
  benefits: string[];
  serviceProcess: string[];
  
  technologyUsed: string[];
  slas: string[];
  kpis: string[];
  
  faqs: { question: string; answer: string }[];
  localReferences: string[];
  
  relationships: ContentRelationships;
  
  seo: {
    canonical: string;
    keywords: string[];
    schema: string[]; // e.g. ['Organization', 'Service', 'FAQPage']
  };
}
