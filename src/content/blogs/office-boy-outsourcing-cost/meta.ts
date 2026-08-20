import type { BlogMetadata } from '../blogTypes';

export const meta: BlogMetadata = {
  id: 'blog-005',
  title: 'Office Boy Outsourcing Cost in Pune',
  slug: 'office-boy-outsourcing-cost',
  category: 'Pricing',
  cluster: 'Office Boy',
  intent: 'Commercial',
  intentConfidence: '95%',
  researchSource: 'Google Autocomplete',
  validationSource: 'Internal Pricing',
  status: 'Published',
  author: 'Prezenti Editorial Team',
  readingTime: 4,
  priority: 'High',
  
  conversion: {
    primaryCTA: 'Hire an Office Boy in Pune',
    secondaryCTA: 'Get Pricing Guide',
    conversionGoal: 'Lead Generation',
    targetService: 'office-boy-services'
  },
  
  keywords: {
    primary: 'office boy outsourcing cost pune',
    secondary: ['office boy agency charges', 'peon services price'],
    lsi: ['minimum wages', 'pf esic', 'leave reliever', 'uniform'],
    entities: ['ent-srv-004', 'ent-leg-001'],
    questions: ['How much does an office boy cost in Pune?'],
    relatedSearches: ['peon supply agency in Pune'],
    peopleAlsoAsk: ['What is the salary of an office boy in India?']
  },
  
  aiSearch: {
    summary: 'The cost of outsourcing an office boy in Pune includes minimum wages, statutory compliance, and agency service charges.',
    definition: 'Office boy outsourcing is the process of hiring a third-party agency to provide support staff for basic office tasks, eliminating direct payroll liabilities.',
    keyFacts: [
      'Minimum wages for unskilled/semi-skilled labor govern the base cost.'
    ],
    takeaways: [
      'Outsourcing is more cost-effective than hiring permanently due to reduced HR overhead and guaranteed leave relievers.'
    ],
    entityMentions: ['Office Boy', 'Outsourcing', 'Minimum Wages']
  },
  
  relationships: {
    parent: 'office-boy-services',
    children: [],
    siblings: ['housekeeping-cost-in-pune'],
    knowledge: [],
    comparison: ['outsourcing-vs-in-house-staff'],
    industry: [],
    service: ['office-boy-services', 'pantry-staff-services'],
    pricing: [],
    location: ['pune']
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
    seo: 92,
    eeat: 85,
    aiReadiness: 90,
    localSeo: 95,
    conversion: 95,
    authority: 85,
    internalLinking: 95,
    entityCoverage: 90,
    readability: 85,
    accessibility: 100,
    freshness: 100,
    uniqueness: 100
  }
};
