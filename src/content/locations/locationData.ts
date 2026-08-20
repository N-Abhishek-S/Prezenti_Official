import type { LocationMetadata } from './locationTypes';
import { SEO_CONSTANTS } from '../../seo/constants';

export const locationData: Record<string, LocationMetadata> = {
  'pune': {
    id: 'loc-001',
    slug: 'pune',
    title: 'Facility Management & Housekeeping Services in Pune',
    description: 'Facility management, corporate housekeeping, and contract staffing for IT parks, manufacturing hubs, and commercial offices across Pune.',
    locationName: 'Pune',
    overview: 'Pune is a rapidly growing metropolitan hub driven by IT/ITES, automotive manufacturing, and education. We provide specialized, localized facility management solutions tailored to the unique operational demands of Pune’s diverse commercial landscape.',
    businessHubs: [
      'Hinjawadi Rajiv Gandhi Infotech Park',
      'Kharadi EON IT Park',
      'Magarpatta City SEZ',
      'Chakan MIDC Industrial Area'
    ],
    nearbyItParks: [
      'Embassy TechZone',
      'Qubix Business Park',
      'Panchshil Tech Park',
      'World Trade Center Pune'
    ],
    nearbyCommercialBuildings: [
      'Amar Business Park',
      'Cerebrum IT Park',
      'Gera Commerzone'
    ],
    challenges: [
      'High attrition rates among blue-collar workforce due to competitive local labor markets.',
      'Logistical challenges in deploying staff across distant hubs (e.g., Hinjawadi to Kharadi).',
      'Navigating Maharashtra State minimum wage and labor compliance requirements.'
    ],
    recommendedServices: [
      'facility-management-services',
      'housekeeping-services',
      'office-boy-services'
    ],
    faqs: [
      {
        question: 'Do you cover all areas of Pune for corporate housekeeping?',
        answer: 'Yes, our operations span across Pune, including major hubs like Hinjawadi, Kharadi, Baner, Viman Nagar, and industrial areas like Chakan and Bhosari.'
      },
      {
        question: 'Are your staff familiar with the local Pune business environment?',
        answer: 'Staff recruitment and training can be aligned with the local Pune business environment and the corporate culture of IT and manufacturing firms in the area.'
      }
    ],
    nearbyAreas: ['Hinjawadi', 'Kharadi', 'Baner', 'Viman Nagar', 'Chakan', 'Pimpri-Chinchwad'],
    relationships: {
      children: ['hinjawadi', 'kharadi'],
      siblings: [],
      knowledge: ['pf-compliance'],
      comparison: ['fm-vs-housekeeping'],
      industry: ['it-companies', 'manufacturing', 'hospitals'],
      service: ['facility-management-services', 'housekeeping-services'],
      pricing: ['housekeeping-cost'],
      location: []
    },
    seo: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/locations/pune`,
      keywords: ['facility management pune', 'housekeeping services pune', 'corporate cleaning pune', 'office boy staffing pune'],
      schema: ['LocalBusiness', 'Service', 'FAQPage', 'WebPage']
    }
  },
  'hinjawadi': {
    id: 'loc-002',
    slug: 'hinjawadi',
    title: 'Corporate Housekeeping & Facility Management in Hinjawadi, Pune',
    description: '24/7 IFM and corporate housekeeping services tailored for IT companies and BPOs located in Hinjawadi Rajiv Gandhi Infotech Park.',
    locationName: 'Hinjawadi',
    overview: 'Hinjawadi is a major hub of Pune’s IT sector. With multi-national software companies running round-the-clock operations, facility management arrangements can be structured around service continuity, data center access requirements, and hygiene standards for the site.',
    businessHubs: [
      'Rajiv Gandhi Infotech Park Phase 1',
      'Rajiv Gandhi Infotech Park Phase 2',
      'Rajiv Gandhi Infotech Park Phase 3'
    ],
    nearbyItParks: [
      'Embassy TechZone',
      'Qubix Business Park',
      'Quadron Business Park',
      'Blueridge IT Park'
    ],
    nearbyCommercialBuildings: [
      'TCG IT Park',
      'Ascendas IT Park'
    ],
    challenges: [
      'Managing 24/7 rotational shift schedules for continuous BPO operations.',
      'Ensuring transport and safety for facility staff during night shifts due to traffic congestion.',
      'Maintaining highly secure environments like server rooms and ODCs.'
    ],
    recommendedServices: [
      'facility-management-services',
      'housekeeping-services',
      'pantry-staff-services'
    ],
    faqs: [
      {
        question: 'Do you provide night-shift housekeeping for BPOs in Hinjawadi Phase 3?',
        answer: 'Yes, we specialize in 24/7 rotational shift staffing to support uninterrupted BPO and IT operations across all phases of Hinjawadi.'
      }
    ],
    nearbyAreas: ['Wakad', 'Baner', 'Tathawade', 'Bhumkar Chowk'],
    relationships: {
      children: [],
      siblings: ['kharadi', 'baner'],
      knowledge: ['background-verification'],
      comparison: ['outsourcing-vs-in-house-staff'],
      industry: ['it-companies'],
      service: ['facility-management-services', 'housekeeping-services'],
      pricing: ['office-boy-outsourcing-cost'],
      location: ['pune']
    },
    seo: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/locations/hinjawadi`,
      keywords: ['housekeeping services in hinjawadi', 'facility management hinjawadi', 'IT park cleaning hinjawadi'],
      schema: ['LocalBusiness', 'Service', 'FAQPage', 'WebPage']
    }
  },
  'kharadi': {
    id: 'loc-003',
    slug: 'kharadi',
    title: 'Facility Management & Office Boy Services in Kharadi, Pune',
    description: 'Expert facility management, office boy staffing, and housekeeping services for corporate offices in EON IT Park and World Trade Center Kharadi.',
    locationName: 'Kharadi',
    overview: 'Kharadi is a commercial corridor of Eastern Pune. Home to the World Trade Center and EON Free Zone, it calls for high standards of corporate hygiene, soft services, and executive support staffing.',
    businessHubs: [
      'EON Free Zone IT Park',
      'World Trade Center (WTC) Pune',
      'Zensar IT Park'
    ],
    nearbyItParks: [
      'Gera Commerzone',
      'EON IT Park Phase 2'
    ],
    nearbyCommercialBuildings: [
      'Panchshil Towers Commercial',
      'Viman Nagar Corporate Parks (Nearby)'
    ],
    challenges: [
      'Matching the high aesthetic and hygiene expectations of Grade A commercial buildings.',
      'Providing executive-level pantry and office boy staff for multinational HQs.',
      'Managing peak hour footfalls in massive IT park cafeterias.'
    ],
    recommendedServices: [
      'office-boy-services',
      'receptionist-staffing-services',
      'housekeeping-services'
    ],
    faqs: [
      {
        question: 'Can you provide English-speaking receptionists for offices in WTC Kharadi?',
        answer: 'Yes, we can provide English-speaking front desk executives and receptionists for premium corporate offices.'
      }
    ],
    nearbyAreas: ['Viman Nagar', 'Magarpatta City', 'Kalyani Nagar', 'Wagholi'],
    relationships: {
      children: [],
      siblings: ['hinjawadi', 'magarpatta'],
      knowledge: ['pf-compliance'],
      comparison: ['fm-vs-housekeeping'],
      industry: ['it-companies', 'corporate-offices'],
      service: ['office-boy-services', 'receptionist-staffing-services'],
      pricing: ['housekeeping-cost'],
      location: ['pune']
    },
    seo: {
      canonical: `${SEO_CONSTANTS.BASE_URL}/locations/kharadi`,
      keywords: ['office boy services in kharadi', 'facility management EON IT park', 'housekeeping services kharadi'],
      schema: ['LocalBusiness', 'Service', 'FAQPage', 'WebPage']
    }
  }
};
