import type { IndustryMetadata } from './industryTypes';
import { SEO_CONSTANTS } from '../../seo/constants';

export const industryData: Record<string, IndustryMetadata> = {
  'it-companies': {
    id: 'ind-001',
    slug: 'it-companies',
    title: 'Facility Management & Housekeeping for IT Companies in Pune',
    description: 'Integrated facility management, housekeeping, and soft services for IT parks, software development centers, and BPOs in Pune.',
    industryName: 'IT & ITES',
    overview: 'Information Technology companies often require round-the-clock facility support. Facility management for IT environments can be structured to help maintain productive, well-kept environments aligned with ESG-related goals.',
    challenges: [
      '24/7 operational requirements without disrupting workflows.',
      'Maintaining high-security data centers and server rooms.',
      'High footfall management in cafeterias and common areas.',
      'Meeting ESG and quality-standard expectations across vendors.'
    ],
    facilityProblems: [
      'Vendor fragmentation leading to accountability issues.',
      'Inconsistent hygiene standards across different shifts.',
      'Compliance risks associated with unverified contract staff.'
    ],
    complianceRequirements: [
      'PF and ESIC considerations for deployed soft-services staff.',
      'Personnel screening considerations, including verification where required for site access.',
      'Site-specific operating procedures aligned with client quality expectations.'
    ],
    recommendedServices: [
      'facility-management-services',
      'housekeeping-services',
      'security-services',
      'pantry-staff-services'
    ],
    benefits: [
      'Single point of contact for all facility needs (IFM).',
      'Scalable workforce for peak hours and sudden expansions.',
      'Attendance and SLA tracking that can be structured for your site.',
      'Reliever coordination that can be planned to help minimize service gaps.'
    ],
    serviceProcess: [
      'Comprehensive Site Audit & Requirement Gathering',
      'Customized SLA & KPI Definition',
      'Staff Deployment & Induction Training',
      'Daily Operations with Digital Checklists',
      'Monthly QBR (Quarterly Business Review) & Compliance Reviews'
    ],
    technologyUsed: [
      'Checklist-based tracking for washroom hygiene, where included in the engagement.',
      'Attendance tracking systems that can be discussed as part of the engagement.',
      'Inventory tracking for consumables that can be structured as part of the engagement.'
    ],
    slas: [
      'Service continuity planning for critical soft services.',
      'Escalation response times that can be defined as part of your SLA.',
      'Compliance documentation cadence that can be agreed as part of your contract.'
    ],
    kpis: [
      'Washroom Hygiene Index',
      'Cafeteria Turnaround Time',
      'Staff Absenteeism Rate'
    ],
    faqs: [
      {
        question: 'Do you provide 24/7 housekeeping for night shifts?',
        answer: 'Yes, we provide rotational shift staffing specifically designed for BPOs and IT companies running 24/7 operations in areas like Hinjawadi and Kharadi.'
      },
      {
        question: 'How do you ensure data center security?',
        answer: 'Personnel screening and access-control requirements for server rooms and restricted areas can be defined as part of the engagement.'
      }
    ],
    localReferences: [
      'Hinjawadi IT Park',
      'Kharadi EON IT Park',
      'Magarpatta City',
      'Talawade IT Park'
    ],
    relationships: {
      children: [],
      siblings: ['hospitals', 'manufacturing'],
      knowledge: ['pf-compliance'],
      comparison: ['fm-vs-housekeeping'],
      industry: [],
      service: ['facility-management-services', 'housekeeping-services'],
      pricing: ['housekeeping-cost'],
      location: ['pune', 'hinjawadi', 'kharadi']
    },
    seo: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/industries/it-companies`,
      keywords: ['facility management for IT companies in Pune', 'corporate housekeeping for software companies', 'BPO housekeeping services'],
      schema: ['Organization', 'Service', 'FAQPage', 'WebPage']
    }
  },

  'hospitals': {
    id: 'ind-002',
    slug: 'hospitals',
    title: 'Hospital Housekeeping & Healthcare Facility Management in Pune',
    description: 'Hospital housekeeping, infection control, and facility management services for clinics and healthcare institutions in Pune.',
    industryName: 'Healthcare & Hospitals',
    overview: 'Healthcare facilities require specialized infection control, biomedical waste management, and patient-centric soft services. Cleaning and infection-control procedures for hospital housekeeping can be aligned with the facility\'s applicable hygiene requirements.',
    challenges: [
      'Preventing Healthcare-Associated Infections (HAIs).',
      'Safe handling and segregation of biomedical waste.',
      'Maintaining hygiene standards in OTs and ICUs around the clock.',
      'Training housekeeping staff on patient empathy and safety.'
    ],
    facilityProblems: [
      'High attrition rates leading to untrained staff handling critical areas.',
      'Improper chemical dilution compromising disinfection efficacy.',
      'Lack of compliance with local biomedical waste regulations.'
    ],
    complianceRequirements: [
      'Hygiene procedures that can be aligned with NABH-related facility standards.',
      'Biomedical waste handling in line with applicable regulations.',
      'Staff immunization considerations that can be discussed for healthcare deployments.'
    ],
    recommendedServices: [
      'housekeeping-services',
      'security-services',
      'receptionist-staffing-services'
    ],
    benefits: [
      'Color-coded systems that can be used to support infection control.',
      'Use of hospital-appropriate disinfectants where required by the site.',
      'Training considerations for infection-control procedures that can be built into deployment planning.',
      'Ward boys and patient care assistants available for healthcare deployments.'
    ],
    serviceProcess: [
      'Infection Risk Assessment',
      'Zone-wise SOP Implementation (Red, Yellow, Green zones)',
      'Staff Health and Fitness Considerations',
      'Surface Hygiene Verification (where included)',
      'Periodic Hygiene Compliance Reviews'
    ],
    technologyUsed: [
      'Hygiene verification tools that can be used where included in the engagement.',
      'Microfiber technology to help prevent cross-contamination.',
      'HEPA-filtered vacuum systems.'
    ],
    slas: [
      'OT cleaning turnaround times that can be defined as part of your SLA.',
      'Cross-contamination prevention protocols structured for your site.',
      'Color-coded protocol adherence reviewed as part of ongoing quality checks.'
    ],
    kpis: [
      'Surface Disinfection Efficacy',
      'Biomedical Waste Segregation Accuracy',
      'Patient Satisfaction Score regarding hygiene'
    ],
    faqs: [
      {
        question: 'Are your housekeeping staff trained in biomedical waste segregation?',
        answer: 'Biomedical waste segregation training can be built into onboarding and deployment planning for healthcare sites.'
      },
      {
        question: 'Do you provide ward boys in Pune?',
        answer: 'Yes, ward boys and patient transport assistants can be provided for hospitals and clinics across Pune.'
      }
    ],
    localReferences: [
      'Ruby Hall Clinic vicinity',
      'Baner Medical Hubs',
      'Deccan Gymkhana Clinics'
    ],
    relationships: {
      children: [],
      siblings: ['it-companies', 'manufacturing'],
      knowledge: ['pf-compliance'],
      comparison: ['outsourcing-vs-in-house-staff'],
      industry: [],
      service: ['housekeeping-services', 'security-services'],
      pricing: [],
      location: ['pune', 'baner']
    },
    seo: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/industries/hospitals`,
      keywords: ['hospital housekeeping services pune', 'healthcare facility management', 'NABH hygiene standards'],
      schema: ['Organization', 'Service', 'FAQPage', 'WebPage']
    }
  },

  'manufacturing': {
    id: 'ind-003',
    slug: 'manufacturing',
    title: 'Industrial Housekeeping & Facility Management for Factories in Pune',
    description: 'Heavy-duty industrial housekeeping, contract staffing, and facility maintenance for manufacturing plants in Chakan, Bhosari, and Ranjangaon.',
    industryName: 'Manufacturing & Industrial',
    overview: 'Industrial environments demand robust, safety-first facility management. From shop floor cleaning to warehouse maintenance, we provide manpower and heavy-duty mechanized cleaning tailored for manufacturing units.',
    challenges: [
      'Handling hazardous materials and industrial waste.',
      'Cleaning high-bay areas and heavy machinery without disrupting production.',
      'Managing large-scale contract labor compliance.',
      'Maintaining OHSAS-aligned safety standards.'
    ],
    facilityProblems: [
      'Vendor non-compliance leading to principal employer liabilities.',
      'Inadequate safety gear causing workplace accidents.',
      'Irregular cleaning schedules causing machine downtime.'
    ],
    complianceRequirements: [
      'Factory Act considerations for on-site personnel.',
      'Contract Labour (Regulation & Abolition) Act considerations.',
      'PF, ESIC, and Minimum Wage considerations addressed as part of the engagement.',
      'PPE (Personal Protective Equipment) considerations for deployed staff.'
    ],
    recommendedServices: [
      'facility-management-services',
      'housekeeping-services',
      'security-services'
    ],
    benefits: [
      'Mechanized cleaning using industrial scrubbers and sweepers.',
      'Contract staffing structured to help address HR and compliance considerations.',
      'Safety-first approach, including toolbox talks that can be scheduled for your site.',
      'Customized solutions for shop floors, warehouses, and admin blocks.'
    ],
    serviceProcess: [
      'Industrial Safety & Risk Assessment',
      'Deployment of Mechanized Equipment',
      'Safety Induction Training',
      'Shift-wise Shop Floor Cleaning SOPs',
      'Statutory Compliance Documentation'
    ],
    technologyUsed: [
      'Ride-on industrial auto-scrubbers.',
      'High-pressure water jetting systems.',
      'Payroll and compliance tracking that can be structured for your engagement.'
    ],
    slas: [
      'Safety performance tracked through Lost Time Injury (LTI) metrics.',
      'Documentation aligned with Factory Inspectorate requirements can be maintained as part of the engagement.',
      'Machine cleaning completed during scheduled downtimes.'
    ],
    kpis: [
      'Safety Compliance Rate',
      'Mechanized Cleaning Coverage',
      'Staff Turnover Rate'
    ],
    faqs: [
      {
        question: 'Do you provide services in MIDC areas like Chakan and Bhosari?',
        answer: 'Yes, we provide services across major industrial hubs including Chakan, Bhosari, Ranjangaon, and Talawade.'
      },
      {
        question: 'How do you handle contract labor compliance?',
        answer: 'PF, ESIC, PT, and Minimum Wage considerations for contract labor can be addressed as part of the engagement, with documentation availability discussed as part of your contract.'
      }
    ],
    localReferences: [
      'Chakan MIDC',
      'Bhosari MIDC',
      'Ranjangaon Industrial Area',
      'Talawade'
    ],
    relationships: {
      children: [],
      siblings: ['it-companies', 'hospitals'],
      knowledge: ['pf-compliance', 'background-verification'],
      comparison: ['fm-vs-housekeeping'],
      industry: [],
      service: ['facility-management-services', 'housekeeping-services'],
      pricing: ['housekeeping-cost'],
      location: ['chakan', 'bhosari', 'pune']
    },
    seo: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/industries/manufacturing`,
      keywords: ['industrial housekeeping in Pune', 'factory cleaning services Chakan', 'manufacturing facility management'],
      schema: ['Organization', 'Service', 'FAQPage', 'WebPage']
    }
  }
};
