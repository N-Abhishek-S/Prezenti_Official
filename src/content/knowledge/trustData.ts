import type { KnowledgePageData } from './pricingData';

export const trustData: Record<string, KnowledgePageData> = {
  'pf-compliance': {
    id: 'kno-tru-001',
    slug: 'pf-compliance',
    seoTitle: '100% PF Compliance | Ethical Staffing & Facility Management',
    seoDescription: 'Learn how our strict adherence to Provident Fund (PF) compliance protects your business from legal liabilities when outsourcing facility management.',
    h1: 'Provident Fund (PF) Compliance Guarantee',
    category: 'Trust',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'When you outsource staffing or facility management, the principal employer (your company) shares joint liability for statutory compliance under Indian labor laws. Engaging with vendors who evade Provident Fund (PF) contributions exposes your organization to severe financial penalties, operational disruptions, and profound reputational damage. At Prezenti, we operate with an absolute zero-tolerance policy for non-compliance.'
      },
      {
        type: 'markdown',
        title: 'Complete Transparency and Protection',
        content: 'We act as the principal employer for all deployed staff. Every single month, alongside our invoices, we provide our clients with transparent, audit-ready compliance dossiers. These dossiers include precise remittance challans proving that PF contributions have been deposited for every individual deployed at your facility. This ironclad process completely insulates your organization from legal risks and ensures that the workforce protecting and maintaining your assets is ethically compensated.'
      },
      {
        type: 'factors',
        title: 'Why PF Compliance Matters',
        items: [
          { name: 'Legal Immunity', description: 'Protects the principal employer from punitive actions by the EPFO.' },
          { name: 'Employee Loyalty', description: 'Staff who receive their full statutory benefits demonstrate higher morale, lower attrition, and greater vigilance.' },
          { name: 'Audit Readiness', description: 'Ensures your organization passes internal and external compliance audits flawlessly.' }
        ]
      },
      {
        type: 'cta',
        title: 'Partner with a 100% Compliant Vendor',
        content: 'Don\'t risk your corporate reputation. Contact us to learn about our ethical staffing practices.'
      }
    ],
    faqs: [
      { question: 'What happens if a vendor does not pay PF?', answer: 'The principal employer can be held legally and financially responsible for the vendor\'s default, including paying the arrears and penalties.' },
      { question: 'How do you prove PF compliance?', answer: 'We share detailed ECR (Electronic Challan cum Return) reports and payment receipts with our clients every billing cycle.' }
    ],
    relatedServices: ['facility-management-services', 'contract-staffing'],
    relatedKnowledge: ['esic-compliance', 'background-verification']
  },
  'background-verification': {
    id: 'kno-tru-002',
    slug: 'background-verification',
    seoTitle: 'Rigorous Staff Background Verification & Police Checks',
    seoDescription: 'Discover our multi-tiered background verification process for housekeeping and security staff, ensuring absolute safety for your corporate facility.',
    h1: 'Multi-Tiered Background Verification',
    category: 'Trust',
    contentBlocks: [
      {
        type: 'markdown',
        content: 'The physical security and operational integrity of your enterprise depend entirely on the people allowed inside. You cannot afford to grant facility access to unverified personnel. Prezenti utilizes a stringent, multi-tiered vetting protocol for every candidate before they are deployed to a client site.'
      },
      {
        type: 'factors',
        title: 'Our Verification Protocol',
        items: [
          { name: 'Identity Authentication', description: 'Rigorous checking of Aadhar, PAN, and other government-issued IDs to prevent identity fraud.' },
          { name: 'Address Verification', description: 'Physical or tech-enabled verification of permanent and current residential addresses.' },
          { name: 'Police Clearance (PCC)', description: 'Mandatory Police Clearance Certificates to ensure candidates have no criminal records.' },
          { name: 'Reference Checks', description: 'Verification of past employment history to assess reliability and professional conduct.' },
          { name: 'Medical Screening', description: 'Basic health and fitness checks to ensure capability for the assigned physical roles.' }
        ]
      },
      {
        type: 'cta',
        title: 'Secure Your Facility Today',
        content: 'Hire verified, trustworthy professionals for your enterprise.'
      }
    ],
    faqs: [
      { question: 'Is police verification mandatory?', answer: 'Yes, for sensitive roles like security and corporate housekeeping, we mandate Police Clearance Certificates.' },
      { question: 'Can we access the verification reports?', answer: 'Yes, sanitized verification reports are maintained in our digital records and can be audited by authorized client representatives.' }
    ],
    relatedServices: ['security-services', 'housekeeping-services', 'office-boy-services'],
    relatedKnowledge: ['pf-compliance']
  }
};
