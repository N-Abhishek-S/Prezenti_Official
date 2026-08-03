export type BlogCategory = 
  | 'Pricing' 
  | 'Compliance' 
  | 'Hiring' 
  | 'Industry' 
  | 'Comparison' 
  | 'Guides' 
  | 'Checklists' 
  | 'Facility Management' 
  | 'Housekeeping' 
  | 'Security' 
  | 'Receptionist' 
  | 'Office Boy' 
  | 'Pantry' 
  | 'Property Management';

export type BlogStatus = 'Draft' | 'Review' | 'SEO Review' | 'Legal Review' | 'Ready' | 'Published' | 'Archived';

export interface ContentScores {
  seo: number;
  eeat: number;
  aiReadiness: number;
  localSeo: number;
  conversion: number;
  authority: number;
  internalLinking: number;
  entityCoverage: number;
  readability: number;
  accessibility: number;
  freshness: number;
  uniqueness: number;
}

export interface BlogConversionMapping {
  primaryCTA: string;
  secondaryCTA: string;
  conversionGoal: string;
  targetService: string;
}

export interface KeywordMap {
  primary: string;
  secondary: string[];
  lsi: string[];
  entities: string[];
  questions: string[];
  relatedSearches: string[];
  peopleAlsoAsk: string[];
}

export interface AISearchMetadata {
  summary: string;
  definition: string;
  keyFacts: string[];
  comparison?: string;
  takeaways: string[];
  entityMentions: string[];
}

export interface ContentRelationships {
  parent?: string;
  children: string[];
  siblings: string[];
  knowledge: string[];
  comparison: string[];
  industry: string[];
  service: string[];
  pricing: string[];
  location: string[];
}

export interface BlogRevisionHistory {
  version: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  reviewedAt: string; // ISO
  reviewedBy: string;
  nextReview: string; // ISO
  reviewCycle: string;
}

export interface BlogMetadata {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  cluster: string;
  intent: 'Commercial' | 'Informational' | 'Comparison' | 'Navigational';
  intentConfidence: string; // e.g. "95%"
  researchSource: string;
  validationSource: string;
  status: BlogStatus;
  author: string;
  readingTime: number;
  priority: 'High' | 'Medium' | 'Low';
  
  conversion: BlogConversionMapping;
  keywords: KeywordMap;
  aiSearch: AISearchMetadata;
  relationships: ContentRelationships;
  history: BlogRevisionHistory;
  scores: ContentScores;
}
