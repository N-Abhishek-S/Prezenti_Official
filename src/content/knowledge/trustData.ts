import type { KnowledgePageData } from './pricingData';

export const trustData: Record<string, KnowledgePageData> = {
  'pf-compliance': {
    id: 'kno-tru-001',
    slug: 'pf-compliance',
    seoTitle: 'PF Compliance for Outsourced Staffing | Prezenti',
    seoDescription: 'Understand Provident Fund (PF) compliance considerations for outsourced staffing and facility management engagements.',
    h1: 'Provident Fund (PF) Compliance for Outsourced Staffing',
    category: 'Trust',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'When you outsource staffing or facility management, the principal employer (your company) can share joint liability for statutory compliance under Indian labor laws. Engaging with vendors who don\'t manage Provident Fund (PF) contributions properly can expose your organization to financial penalties and operational disruption. PF considerations for your outsourced workforce can be addressed as part of the engagement structure agreed with your organization.'
      },
      {
        type: 'markdown',
        title: 'Documentation and Transparency',
        content: 'Compliance documentation — including remittance-related records for PF contributions — can be made available to clients as part of the engagement, on a cadence agreed with your organization. This kind of documentation can help support your own audit-readiness for outsourced staff.'
      },
      {
        type: 'factors',
        title: 'Why PF Compliance Matters',
        items: [
          { name: 'Legal Immunity', description: 'Protects the principal employer from punitive actions by the EPFO.' },
          { name: 'Employee Loyalty', description: 'Staff who receive their full statutory benefits tend to demonstrate higher morale and lower attrition.' },
          { name: 'Audit Readiness', description: 'Can help support your organization\'s readiness for internal and external compliance audits.' }
        ]
      },
      {
        type: 'cta',
        title: 'Discuss Your Compliance Requirements',
        content: 'Contact us to discuss how PF and other statutory considerations can be addressed for your outsourced workforce.'
      }
    ],
    faqs: [
      { question: 'What happens if a vendor does not pay PF?', answer: 'The principal employer can be held legally and financially responsible for the vendor\'s default, including paying the arrears and penalties.' },
      { question: 'How do you prove PF compliance?', answer: 'ECR (Electronic Challan cum Return) reports and payment receipts can be shared with clients as part of the engagement, on a cadence agreed with your organization.' }
    ],
    relatedServices: ['facility-management-services', 'contract-staffing'],
    relatedKnowledge: ['esic-compliance', 'background-verification']
  },
  'background-verification': {
    id: 'kno-tru-002',
    slug: 'background-verification',
    seoTitle: 'Staff Background Verification for Outsourced Personnel | Prezenti',
    seoDescription: 'Understand background verification considerations for outsourced housekeeping and support staff at your corporate facility.',
    h1: 'Background Verification Considerations for Outsourced Staff',
    category: 'Trust',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'The physical security and operational integrity of your enterprise depend on the people allowed inside. Screening and verification requirements for personnel deployed to your site can be defined according to the role, site, and engagement requirements.'
      },
      {
        type: 'factors',
        title: 'Verification Concepts That Can Be Included',
        items: [
          { name: 'Identity Authentication', description: 'Verification of Aadhar, PAN, or other government-issued IDs can be included as part of screening requirements.' },
          { name: 'Address Verification', description: 'Verification of permanent and current residential addresses can be included as part of screening requirements.' },
          { name: 'Police Clearance (PCC)', description: 'Police Clearance Certificate requirements can be discussed and included where relevant to the role and site.' },
          { name: 'Reference Checks', description: 'Verification of past employment history can be included as part of screening requirements.' },
          { name: 'Medical Screening', description: 'Health and fitness checks can be included where relevant to the physical demands of the role.' }
        ]
      },
      {
        type: 'cta',
        title: 'Discuss Your Screening Requirements',
        content: 'Contact us to discuss personnel screening and verification requirements for your enterprise.'
      }
    ],
    faqs: [
      { question: 'Is police verification mandatory?', answer: 'Police Clearance Certificate requirements can be discussed and included as part of screening for sensitive roles, based on the site and engagement.' },
      { question: 'Can we access the verification reports?', answer: 'Verification-report sharing and audit access can be discussed and agreed as part of your engagement.' }
    ],
    relatedServices: ['housekeeping-services', 'office-boy-services'],
    relatedKnowledge: ['pf-compliance']
  }
};
