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
    seoDescription: 'Understand the factors that influence corporate housekeeping costs. Learn how compliance, staff count, and shifts affect facility management pricing.',
    h1: 'Understanding Corporate Housekeeping Costs',
    category: 'Pricing',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'When budgeting for enterprise housekeeping, looking for a single flat rate often leads to hidden costs and compliance risks. Professional housekeeping pricing is highly customized based on your facility\'s specific operational demands. Our transparent pricing model ensures you only pay for exactly what you need, with absolute compliance and zero hidden fees.'
      },
      {
        type: 'factors',
        title: 'Key Pricing Factors',
        items: [
          { name: 'Staff Count & Roles', description: 'The total number of janitors, supervisors, and specialized mechanized cleaners required.' },
          { name: 'Shift Requirements', description: 'Costs vary between standard 8-hour day shifts, night shifts, and 24/7 rotational coverage.' },
          { name: 'Statutory Compliance', description: 'Mandatory inclusions for PF, ESIC, Professional Tax, and adherence to Minimum Wages.' },
          { name: 'Consumables & Equipment', description: 'Whether you require an end-to-end solution (including all chemicals, machinery, and toiletries) or manpower-only.' },
          { name: 'Facility Size & Industry', description: 'High-compliance environments like hospitals or data centers require specialized training and higher compensation.' }
        ]
      },
      {
        type: 'trust-signals',
        title: 'Why Transparent Pricing Matters',
      },
      {
        type: 'cta',
        title: 'Get a Customized Housekeeping Quote',
        content: 'Our experts will audit your facility and provide a detailed, compliance-first cost breakdown.'
      }
    ],
    faqs: [
      { question: 'Do you provide a flat monthly rate?', answer: 'We provide a customized monthly rate after conducting a facility audit to understand your exact requirements.' },
      { question: 'Are cleaning materials included in the cost?', answer: 'We offer flexible models. You can opt for a comprehensive contract that includes all eco-friendly consumables and heavy machinery.' },
      { question: 'Is PF and ESIC included in your quote?', answer: 'Yes, 100%. Our quotes transparently display all statutory compliance components to protect you from legal liabilities.' }
    ],
    relatedServices: ['housekeeping-services', 'facility-management-services'],
    relatedKnowledge: ['pf-compliance', 'why-outsource-housekeeping']
  },
  'security-guard-pricing': {
    id: 'kno-pri-002',
    slug: 'security-guard-pricing',
    seoTitle: 'Security Guard Services Pricing & Cost Breakdown',
    seoDescription: 'Learn how corporate security guard pricing is calculated. Factors include PSARA compliance, armed vs unarmed guards, shifts, and background verification.',
    h1: 'Security Guard Pricing & Cost Factors',
    category: 'Pricing',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'Corporate security is a critical investment in risk mitigation. Engaging with unverified, low-cost vendors often exposes your organization to severe liabilities and catastrophic security failures. Our pricing structure for security services is built on three pillars: rigorous training, absolute PSARA compliance, and ethical employment practices.'
      },
      {
        type: 'factors',
        title: 'What Influences Security Costs?',
        items: [
          { name: 'Guard Profile', description: 'Costs differ significantly between unarmed guards, armed guards, executive protection officers (PSOs), and CCTV operators.' },
          { name: 'PSARA Compliance', description: 'Fully compliant agencies invest heavily in mandatory training, certifications, and licensing, which is reflected in the pricing.' },
          { name: 'Shift & Rotation', description: '24/7 coverage requires multiple shift rotations and reliever provisions to ensure zero downtime.' },
          { name: 'Verification Rigor', description: 'Comprehensive background checks, police verifications (PCC), and medical screenings are factored into deployment costs.' }
        ]
      },
      {
        type: 'cta',
        title: 'Request a Comprehensive Security Audit',
        content: 'Contact us for a detailed vulnerability assessment and a customized security deployment quote.'
      }
    ],
    faqs: [
      { question: 'Why are compliant security guards more expensive?', answer: 'Compliant agencies pay minimum wages, PF, and ESIC, and invest in mandatory PSARA training, ensuring you get alert, professional, and legally compliant guards.' },
      { question: 'Do you charge extra for relievers?', answer: 'Our quotes include the cost of managing relievers to guarantee zero downtime due to absenteeism.' }
    ],
    relatedServices: ['security-services', 'facility-management-services'],
    relatedKnowledge: ['police-verification', 'psara-compliance']
  }
};
