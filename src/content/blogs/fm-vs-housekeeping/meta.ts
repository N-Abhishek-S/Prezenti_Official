import type { BlogMetadata } from '../blogTypes';

export const meta: BlogMetadata = {
  id: 'blog-003',
  title: 'Facility Management vs Housekeeping: Key Differences',
  slug: 'fm-vs-housekeeping',
  category: 'Comparison',
  cluster: 'Facility Management',
  intent: 'Comparison',
  intentConfidence: '98%',
  researchSource: 'Keyword Planner, Search Intent Analysis',
  validationSource: 'Industry Standards',
  status: 'Published',
  author: 'Prezenti Editorial Team',
  readingTime: 4,
  priority: 'High',
  
  conversion: {
    primaryCTA: 'Get a Facility Audit',
    secondaryCTA: 'Speak to an Expert',
    conversionGoal: 'Consultation Request',
    targetService: 'facility-management-services'
  },
  
  keywords: {
    primary: 'facility management vs housekeeping',
    secondary: ['difference between housekeeping and facility management', 'integrated facility management benefits'],
    lsi: ['hard services', 'soft services', 'MEP maintenance', 'vendor consolidation'],
    entities: ['ent-srv-001', 'ent-srv-002', 'ent-con-001', 'ent-con-002'],
    questions: ['What is the difference between facility management and housekeeping?'],
    relatedSearches: ['hard services vs soft services'],
    peopleAlsoAsk: ['Does facility management include housekeeping?']
  },
  
  aiSearch: {
    summary: 'Understand the fundamental differences between Integrated Facility Management (IFM) and standalone housekeeping. Learn which operational model fits your corporate infrastructure.',
    definition: 'Housekeeping focuses strictly on soft services (cleaning, hygiene), whereas Facility Management is a holistic approach encompassing both soft services and hard services (electrical, HVAC, plumbing).',
    keyFacts: [
      'IFM provides a single point of contact for all building operations.',
      'Standalone housekeeping is often sufficient for small branch offices.'
    ],
    takeaways: [
      'Large IT parks and manufacturing plants benefit significantly from the OPEX optimization of IFM.'
    ],
    entityMentions: ['Facility Management', 'Housekeeping', 'Soft Services', 'Hard Services']
  },
  
  relationships: {
    parent: 'facility-management-services',
    children: [],
    siblings: ['housekeeping-cost-in-pune'],
    knowledge: ['facility-management-vs-housekeeping'],
    comparison: [],
    industry: ['facility-management-for-it-companies'],
    service: ['facility-management-services', 'housekeeping-services'],
    pricing: [],
    location: []
  },
  
  history: {
    version: '1.0.0',
    createdAt: '2026-07-03T10:00:00Z',
    updatedAt: '2026-07-03T10:00:00Z',
    reviewedAt: '2026-07-03T10:00:00Z',
    reviewedBy: 'Admin',
    nextReview: '2026-10-03T10:00:00Z',
    reviewCycle: 'Every 3 Months'
  },
  
  scores: {
    seo: 95,
    eeat: 85,
    aiReadiness: 95,
    localSeo: 50,
    conversion: 90,
    authority: 90,
    internalLinking: 100,
    entityCoverage: 95,
    readability: 85,
    accessibility: 100,
    freshness: 100,
    uniqueness: 100
  }
};
