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
  },
  'security-guard-pricing': {
    id: 'kno-pri-002',
    slug: 'security-guard-pricing',
    seoTitle: 'Security Guard Services Pricing & Cost Breakdown',
    seoDescription: 'Learn how corporate security guard pricing is calculated, including guard profile, shift structure, and screening considerations.',
    h1: 'Security Guard Pricing & Cost Factors',
    category: 'Pricing',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'Corporate security is an investment in risk mitigation. Engaging with unverified, low-cost vendors can expose your organization to liabilities. Pricing for security services reflects factors such as training requirements, regulatory considerations, and employment practices.'
      },
      {
        type: 'factors',
        title: 'What Influences Security Costs?',
        items: [
          { name: 'Guard Profile', description: 'Costs can differ between unarmed guards, security supervisors, and CCTV operators, depending on the role and site requirements.' },
          { name: 'PSARA-Related Considerations', description: 'PSARA governs private security agencies in India; regulatory and training requirements can factor into pricing for compliant security engagements.' },
          { name: 'Shift & Rotation', description: 'Round-the-clock coverage can require multiple shift rotations and reliever planning to help maintain coverage continuity.' },
          { name: 'Personnel Screening Considerations', description: 'Screening requirements — such as identity checks, police verification, or medical screening — can be factored into deployment costs where included in the engagement.' }
        ]
      },
      {
        type: 'cta',
        title: 'Request a Comprehensive Security Audit',
        content: 'Contact us for a detailed vulnerability assessment and a customized security deployment quote.'
      }
    ],
    faqs: [
      { question: 'Why are compliant security guards more expensive?', answer: 'Compliant agencies generally pay minimum wages, PF, and ESIC, and invest in required training — which is reflected in their pricing.' },
      { question: 'Do you charge extra for relievers?', answer: 'Reliever management can be included in your quote as part of coverage-continuity planning.' }
    ],
    relatedServices: ['security-services', 'facility-management-services'],
    relatedKnowledge: ['police-verification', 'psara-compliance']
  }
};
