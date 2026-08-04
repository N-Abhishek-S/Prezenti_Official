import type { IndustryMetadata } from './industryTypes';
import { SEO_CONSTANTS } from '../../seo/constants';

export const industryData: Record<string, IndustryMetadata> = {
  'it-companies': {
    id: 'ind-001',
    slug: 'it-companies',
    title: 'Facility Management & Housekeeping for IT Companies in Pune',
    description: 'Specialized 24/7 integrated facility management, housekeeping, and soft services tailored for IT parks, software development centers, and BPOs in Pune.',
    industryName: 'IT & ITES',
    overview: 'Information Technology companies require round-the-clock facility support. Our Integrated Facility Management (IFM) model ensures zero downtime, maintaining pristine environments that foster productivity and comply with strict ESG goals.',
    challenges: [
      '24/7 operational requirements without disrupting workflows.',
      'Maintaining high-security data centers and server rooms.',
      'High footfall management in cafeterias and common areas.',
      'Strict adherence to international ESG and ISO standards.'
    ],
    facilityProblems: [
      'Vendor fragmentation leading to accountability issues.',
      'Inconsistent hygiene standards across different shifts.',
      'Compliance risks associated with unverified contract staff.'
    ],
    complianceRequirements: [
      '100% PF and ESIC compliance for all soft services staff.',
      'Rigorous background and police verification (PSARA compliance).',
      'Adherence to ISO 9001:2015 and ISO 45001 standards.'
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
      'Tech-enabled attendance and SLA monitoring.',
      'Guaranteed leave relievers ensuring zero service gaps.'
    ],
    serviceProcess: [
      'Comprehensive Site Audit & Requirement Gathering',
      'Customized SLA & KPI Definition',
      'Staff Deployment & Induction Training',
      'Daily Operations with Digital Checklists',
      'Monthly QBR (Quarterly Business Review) & Compliance Audits'
    ],
    technologyUsed: [
      'Digital Checklists for washroom hygiene.',
      'Biometric & Geo-fenced attendance tracking.',
      'Automated inventory management for consumables.'
    ],
    slas: [
      '99.9% Uptime for critical soft services.',
      '<30 minute resolution time for hygiene escalations.',
      '100% compliance documentation delivery by 5th of every month.'
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
        answer: 'All staff undergo 5-step background verification. We deploy specialized, trained personnel for restricted access areas like server rooms.'
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
    description: 'NABH-compliant hospital housekeeping, infection control, and facility management services for clinics and healthcare institutions in Pune.',
    industryName: 'Healthcare & Hospitals',
    overview: 'Healthcare facilities require specialized infection control, biomedical waste management, and patient-centric soft services. Our hospital housekeeping division adheres strictly to NABH guidelines to ensure a sterile, safe environment.',
    challenges: [
      'Preventing Healthcare-Associated Infections (HAIs).',
      'Safe handling and segregation of biomedical waste.',
      'Maintaining 100% hygiene in OTs and ICUs 24/7.',
      'Training housekeeping staff on patient empathy and safety.'
    ],
    facilityProblems: [
      'High attrition rates leading to untrained staff handling critical areas.',
      'Improper chemical dilution compromising disinfection efficacy.',
      'Lack of compliance with local biomedical waste regulations.'
    ],
    complianceRequirements: [
      'NABH standards for facility hygiene.',
      'Biomedical Waste Management Rules compliance.',
      'Mandatory immunization for all deployed staff.'
    ],
    recommendedServices: [
      'housekeeping-services',
      'security-services',
      'receptionist-staffing-services'
    ],
    benefits: [
      'Specialized "Color-Coding" system for infection control.',
      'Use of medical-grade, EPA-approved disinfectants.',
      'Continuous on-site training by infection control experts.',
      'Dedicated ward boys and patient care assistants.'
    ],
    serviceProcess: [
      'Infection Risk Assessment',
      'Zone-wise SOP Implementation (Red, Yellow, Green zones)',
      'Staff Immunization & Medical Checks',
      'Daily ATP Swab Testing for Surface Hygiene',
      'Monthly NABH Compliance Audits'
    ],
    technologyUsed: [
      'ATP Swab Meters for instant hygiene verification.',
      'Microfiber technology to prevent cross-contamination.',
      'HEPA-filtered vacuum systems.'
    ],
    slas: [
      'OT cleaning turnaround within 15 minutes.',
      'Zero cross-contamination incidents.',
      '100% adherence to color-coded cleaning protocols.'
    ],
    kpis: [
      'Surface Disinfection Efficacy',
      'Biomedical Waste Segregation Accuracy',
      'Patient Satisfaction Score regarding hygiene'
    ],
    faqs: [
      {
        question: 'Are your housekeeping staff trained in biomedical waste segregation?',
        answer: 'Yes, all staff receive mandatory, ongoing training on color-coded biomedical waste segregation in compliance with local regulations.'
      },
      {
        question: 'Do you provide ward boys in Pune?',
        answer: 'Yes, we provide trained ward boys and patient transport assistants for hospitals and clinics across Pune.'
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
      keywords: ['hospital housekeeping services pune', 'healthcare facility management', 'NABH compliant cleaning'],
      schema: ['Organization', 'Service', 'FAQPage', 'WebPage']
    }
  },

  'manufacturing': {
    id: 'ind-003',
    slug: 'manufacturing',
    title: 'Industrial Housekeeping & Facility Management for Factories in Pune',
    description: 'Heavy-duty industrial housekeeping, contract staffing, and facility maintenance for manufacturing plants in Chakan, Bhosari, and Ranjangaon.',
    industryName: 'Manufacturing & Industrial',
    overview: 'Industrial environments demand robust, safety-first facility management. From shop floor cleaning to warehouse maintenance, we provide skilled manpower and heavy-duty mechanized cleaning tailored for manufacturing units.',
    challenges: [
      'Handling hazardous materials and industrial waste.',
      'Cleaning high-bay areas and heavy machinery without disrupting production.',
      'Managing large-scale contract labor compliance.',
      'Maintaining strict OHSAS and safety standards.'
    ],
    facilityProblems: [
      'Vendor non-compliance leading to principal employer liabilities.',
      'Inadequate safety gear causing workplace accidents.',
      'Irregular cleaning schedules causing machine downtime.'
    ],
    complianceRequirements: [
      'Factory Act compliance.',
      'Contract Labour (Regulation & Abolition) Act.',
      'Strict PF, ESIC, and Minimum Wage adherence.',
      'Mandatory PPE (Personal Protective Equipment) for all staff.'
    ],
    recommendedServices: [
      'facility-management-services',
      'housekeeping-services',
      'security-services'
    ],
    benefits: [
      'Mechanized cleaning using industrial scrubbers and sweepers.',
      '100% compliant contract staffing eliminating your HR risks.',
      'Safety-first approach with daily toolbox talks.',
      'Customized solutions for shop floors, warehouses, and admin blocks.'
    ],
    serviceProcess: [
      'Industrial Safety & Risk Assessment',
      'Deployment of Mechanized Equipment',
      'Mandatory Safety Induction Training',
      'Shift-wise Shop Floor Cleaning SOPs',
      'Rigorous Statutory Compliance Documentation'
    ],
    technologyUsed: [
      'Ride-on industrial auto-scrubbers.',
      'High-pressure water jetting systems.',
      'Automated payroll and compliance software.'
    ],
    slas: [
      'Zero safety incidents (LTI).',
      '100% compliance with Factory Inspectorate norms.',
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
        answer: 'Yes, we have a strong operational presence in major industrial hubs including Chakan, Bhosari, Ranjangaon, and Talawade.'
      },
      {
        question: 'How do you handle contract labor compliance?',
        answer: 'We take full responsibility for PF, ESIC, PT, and Minimum Wages, providing you with transparent monthly ECRs to ensure zero liability for the principal employer.'
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
