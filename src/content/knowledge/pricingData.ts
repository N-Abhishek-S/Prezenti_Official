export interface KnowledgePageData {
  id: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  category: 'Pricing' | 'Trust' | 'Comparison' | 'Resource';
  contentBlocks: {
    type: 'markdown' | 'factors' | 'table' | 'cta' | 'trust-signals';
    title?: string;
    content?: string;
    items?: any[];
  }[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
  relatedKnowledge: string[];
}

export const pricingData: Record<string, KnowledgePageData> = {
  'housekeeping-cost': {
    id: 'kno-pri-001',
    slug: 'housekeeping-cost',
    seoTitle: 'Housekeeping Cost & Pricing Factors for Corporate Offices',
    seoDescription: 'Understand the factors that influence corporate housekeeping costs, including staffing, shifts, and statutory considerations.',
    h1: 'Understanding Corporate Housekeeping Costs',
    category: 'Pricing',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'When budgeting for enterprise housekeeping, looking for a single flat rate can lead to hidden costs. Professional housekeeping pricing is typically customized based on your facility\'s specific operational demands, so pricing can reflect what your site actually needs.'
      },
      {
        type: 'factors',
        title: 'Key Pricing Factors',
        items: [
          { name: 'Staff Count & Roles', description: 'The total number of janitors, supervisors, and specialized mechanized cleaners required.' },
          { name: 'Shift Requirements', description: 'Costs vary between standard 8-hour day shifts, night shifts, and round-the-clock rotational coverage.' },
          { name: 'Statutory Considerations', description: 'PF, ESIC, Professional Tax, and Minimum Wages considerations can factor into pricing depending on the engagement.' },
          { name: 'Consumables & Equipment', description: 'Whether you require an end-to-end solution (including chemicals, machinery, and toiletries) or manpower-only.' },
          { name: 'Facility Size & Industry', description: 'Facilities such as hospitals or data centers can require specialized training and role-specific compensation.' }
        ]
      },
      {
        type: 'trust-signals',
        title: 'Why Transparent Pricing Matters',
      },
      {
        type: 'cta',
        title: 'Get a Customized Housekeeping Quote',
        content: 'Our experts can review your facility and provide a detailed cost breakdown.'
      }
    ],
    faqs: [
      { question: 'Do you provide a flat monthly rate?', answer: 'We provide a customized monthly rate after conducting a facility audit to understand your exact requirements.' },
      { question: 'Are cleaning materials included in the cost?', answer: 'We offer flexible models. You can opt for a comprehensive contract that includes all eco-friendly consumables and heavy machinery.' },
      { question: 'Is PF and ESIC included in your quote?', answer: 'Quotes can transparently display statutory considerations relevant to your engagement.' }
    ],
    relatedServices: ['housekeeping-services', 'facility-management-services'],
    relatedKnowledge: ['pf-compliance', 'why-outsource-housekeeping']
  }
};
