export type EntityCategory = 'Service' | 'Industry' | 'Location' | 'Legal' | 'Certification' | 'Technology' | 'Concept';

export interface Entity {
  id: string;
  name: string;
  category: EntityCategory;
  description: string;
  relatedEntities: string[]; // IDs of related entities
}

export const entities: Record<string, Entity> = {
  // Services
  'ent-srv-001': {
    id: 'ent-srv-001',
    name: 'Facility Management',
    category: 'Service',
    description: 'Comprehensive management of physical workspace and infrastructure.',
    relatedEntities: ['ent-con-001', 'ent-con-002', 'ent-srv-002'],
  },
  'ent-srv-002': {
    id: 'ent-srv-002',
    name: 'Housekeeping',
    category: 'Service',
    description: 'Professional cleaning and maintenance of corporate and commercial spaces.',
    relatedEntities: ['ent-srv-001', 'ent-con-003'],
  },
  'ent-srv-004': {
    id: 'ent-srv-004',
    name: 'Contract Staffing',
    category: 'Service',
    description: 'Providing temporary or contracted workforce for enterprise operations.',
    relatedEntities: ['ent-leg-001', 'ent-leg-002'],
  },
  
  // Concepts
  'ent-con-001': {
    id: 'ent-con-001',
    name: 'Soft Services',
    category: 'Concept',
    description: 'Services that make the workplace more pleasant, such as cleaning.',
    relatedEntities: ['ent-srv-002'],
  },
  'ent-con-002': {
    id: 'ent-con-002',
    name: 'Hard Services',
    category: 'Concept',
    description: 'Services relating to the physical fabric of the building, such as MEP maintenance.',
    relatedEntities: ['ent-srv-001'],
  },
  'ent-con-003': {
    id: 'ent-con-003',
    name: 'Corporate Cleaning',
    category: 'Concept',
    description: 'Specialized cleaning standards designed for enterprise environments.',
    relatedEntities: ['ent-srv-002'],
  },
  
  // Legal / Compliance
  'ent-leg-001': {
    id: 'ent-leg-001',
    name: 'PF (Provident Fund)',
    category: 'Legal',
    description: 'Government-managed retirement savings scheme mandatory for Indian employees.',
    relatedEntities: ['ent-srv-004'],
  },
  'ent-leg-002': {
    id: 'ent-leg-002',
    name: 'ESIC (Employees State Insurance)',
    category: 'Legal',
    description: 'Self-financing social security and health insurance scheme for Indian workers.',
    relatedEntities: ['ent-srv-004'],
  },
  'ent-leg-004': {
    id: 'ent-leg-004',
    name: 'SLA (Service Level Agreement)',
    category: 'Legal',
    description: 'A commitment between a service provider and a client outlining service standards.',
    relatedEntities: ['ent-srv-001'],
  },
  
  // Certifications
  'ent-cert-001': {
    id: 'ent-cert-001',
    name: 'ISO 9001',
    category: 'Certification',
    description: 'International standard for Quality Management Systems (QMS).',
    relatedEntities: ['ent-srv-001'],
  },
  'ent-cert-002': {
    id: 'ent-cert-002',
    name: 'ISO 45001',
    category: 'Certification',
    description: 'International standard for Occupational Health and Safety (OH&S).',
    relatedEntities: ['ent-srv-001', 'ent-srv-002'],
  },
  'ent-cert-003': {
    id: 'ent-cert-003',
    name: 'NABH',
    category: 'Certification',
    description: 'National Accreditation Board for Hospitals & Healthcare Providers.',
    relatedEntities: ['ent-ind-002'],
  },

  // Industries
  'ent-ind-001': {
    id: 'ent-ind-001',
    name: 'IT Parks & Corporate Offices',
    category: 'Industry',
    description: 'Commercial technology parks and corporate office environments.',
    relatedEntities: ['ent-srv-001', 'ent-srv-002', 'ent-loc-001', 'ent-loc-002'],
  },
  'ent-ind-002': {
    id: 'ent-ind-002',
    name: 'Healthcare',
    category: 'Industry',
    description: 'Hospitals, clinics, and medical facilities requiring specialized hygiene.',
    relatedEntities: ['ent-srv-002', 'ent-cert-003'],
  },
  'ent-ind-003': {
    id: 'ent-ind-003',
    name: 'Manufacturing & Warehousing',
    category: 'Industry',
    description: 'Heavy industrial spaces, factories, and logistics warehouses.',
    relatedEntities: ['ent-srv-001', 'ent-srv-002', 'ent-loc-003'],
  },
  'ent-ind-004': {
    id: 'ent-ind-004',
    name: 'Retail & Education',
    category: 'Industry',
    description: 'Malls, schools, colleges, and hotels requiring high footfall management.',
    relatedEntities: ['ent-srv-002'],
  },

  // Additional Concepts
  'ent-con-004': {
    id: 'ent-con-004',
    name: 'Reception Management',
    category: 'Concept',
    description: 'Front desk operations, visitor management, and administrative support.',
    relatedEntities: ['ent-con-001'],
  },
  'ent-con-005': {
    id: 'ent-con-005',
    name: 'Building Maintenance',
    category: 'Concept',
    description: 'Ongoing upkeep of building infrastructure, plumbing, electrical, and HVAC.',
    relatedEntities: ['ent-con-002', 'ent-srv-001'],
  },
  'ent-con-006': {
    id: 'ent-con-006',
    name: 'Payroll Management',
    category: 'Concept',
    description: 'Processing wages, taxes, and statutory compliance for contract workforce.',
    relatedEntities: ['ent-leg-001', 'ent-leg-002', 'ent-srv-004'],
  },
  'ent-con-007': {
    id: 'ent-con-007',
    name: 'Workforce Management',
    category: 'Concept',
    description: 'Strategic deployment, attendance tracking, and rostering of blue-collar staff.',
    relatedEntities: ['ent-srv-004', 'ent-con-006'],
  },
  'ent-con-008': {
    id: 'ent-con-008',
    name: 'AMC (Annual Maintenance Contract)',
    category: 'Concept',
    description: 'Yearly service agreements for building assets, machinery, and IFM.',
    relatedEntities: ['ent-srv-001'],
  },

  // Locations
  'ent-loc-001': {
    id: 'ent-loc-001',
    name: 'Hinjawadi',
    category: 'Location',
    description: 'Major IT hub in Western Pune.',
    relatedEntities: ['ent-ind-001'],
  },
  'ent-loc-002': {
    id: 'ent-loc-002',
    name: 'Kharadi',
    category: 'Location',
    description: 'Prominent IT and business hub in Eastern Pune.',
    relatedEntities: ['ent-ind-001'],
  },
  'ent-loc-003': {
    id: 'ent-loc-003',
    name: 'Chakan',
    category: 'Location',
    description: 'Major automobile and manufacturing hub near Pune.',
    relatedEntities: ['ent-ind-003'],
  }
};
