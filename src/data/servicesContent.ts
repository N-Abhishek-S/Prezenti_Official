export interface ContentSection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface ServiceData {
  id: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
  relatedServices: { name: string; slug: string }[];
  relationships?: import('../content/blogs/blogTypes').ContentRelationships;
}


import { housekeepingBaseContent } from './base/housekeeping_base';
import { receptionistBaseContent } from './base/receptionist_base';
import { officeBoyBaseContent } from './base/office_boy_base';
import { pantryStaffBaseContent } from './base/pantry_staff_base';
import { facilityManagementBaseContent } from './base/facility_management_base';
import { propertyManagementBaseContent } from './base/property_management_base';

import { housekeepingPuneContent } from './pune/housekeeping_pune_content';
import { officeBoyPuneContent } from './pune/office_boy_pune_content';
import { pantryStaffPuneContent } from './pune/pantry_staff_pune_content';
import { facilityManagementPuneContent } from './pune/facility_management_pune_content';

export const generateLocalizedContent = (serviceName: string, locationName: string, serviceSlug?: string, locationSlug?: string): ContentSection[] => {
  if (locationSlug === 'pune') {
    if (serviceSlug === 'housekeeping-services') return housekeepingPuneContent;
    if (serviceSlug === 'office-boy-services') return officeBoyPuneContent;
    if (serviceSlug === 'pantry-staff-services') return pantryStaffPuneContent;
    if (serviceSlug === 'facility-management-services') return facilityManagementPuneContent;
  }
  return [
  {
    title: `${serviceName} in ${locationName}: Local Business Context`,
    paragraphs: [
      `The business landscape in ${locationName} is evolving rapidly, creating a high demand for specialized ${serviceName}. Whether your operations are based in the bustling commercial hubs or the expanding industrial sectors of ${locationName}, maintaining a productive and pristine environment is critical for success. Our local staffing and facility management solutions are uniquely designed to meet the specific regulatory and operational demands of ${locationName}'s enterprises. By deeply understanding the local labor market and industry standards, we provide support staff that seamlessly integrate into your daily workflow.`,
      `We recognize that companies in ${locationName} face unique workforce challenges, from talent retention to compliance management. Our approach to ${serviceName} addresses these pain points directly. We don't just deploy personnel; we actively recruit from the local ${locationName} community, ensuring reliable transit times and stronger cultural alignment with your workplace. Our rigorous vetting process, combined with ongoing, localized training programs, guarantees that our team is equipped to handle the high expectations of your clients, visitors, and employees alike.`,
      `Partnering with a provider that has a strong foothold in ${locationName} offers unparalleled advantages. Our regional supervisory teams are always on the ground, allowing for immediate response times and proactive issue resolution. When you outsource your ${serviceName} to us, you are gaining a strategic local partner dedicated to protecting your physical assets and enhancing your brand's reputation across the city.`
    ],
    listItems: [
      `Locally sourced and rigorously vetted support staff in ${locationName}.`,
      "Rapid deployment capabilities for urgent staffing requirements.",
      "Strict adherence to state and local compliance regulations.",
      "Dedicated area managers for continuous on-site supervision.",
      "Customized training modules tailored to local industry needs."
    ]
  },
  {
    title: `Industries We Serve Across ${locationName}`,
    paragraphs: [
      `Our ${serviceName} are trusted by a diverse array of sectors throughout ${locationName}. The IT and technology parks rely on our personnel to maintain 24/7 operational readiness in highly secure environments. We understand the stringent protocols required in these zones and deploy staff who are trained in access control and discrete service delivery. Similarly, the manufacturing and warehousing facilities in ${locationName}'s industrial corridors depend on our robust facility management practices to ensure safety and continuous production flow.`,
      `In the corporate and commercial real estate sectors, first impressions are everything. High-end office buildings and co-working spaces in ${locationName} utilize our ${serviceName} to project professionalism. From immaculate reception areas to well-maintained executive boardrooms, our staff elevate the daily experience of every occupant. We also partner extensively with the healthcare and educational sectors in ${locationName}, providing specialized support that adheres to the highest standards of hygiene and patient/student safety.`,
      `No matter your industry, the foundational principles of our ${serviceName} remain the same: reliability, transparency, and excellence. We adapt our standard operating procedures to align perfectly with your sector's specific requirements, ensuring that our presence is a seamless extension of your own operations.`
    ]
  },
  {
    title: `The Benefits of Upgrading Your ${serviceName} in ${locationName}`,
    paragraphs: [
      `Investing in premium ${serviceName} yields immediate and tangible benefits for businesses operating in ${locationName}. The most immediate impact is a significant boost in core employee productivity. When your team operates in a clean, safe, and well-managed environment, distractions are minimized, and morale improves. By removing the administrative burden of facility upkeep, your leaders can focus entirely on driving business growth and innovation within the competitive ${locationName} market.`,
      `Furthermore, professional facility management is a crucial strategy for asset preservation. The environmental factors and high foot traffic typical of commercial properties in ${locationName} can lead to rapid wear and tear. Our trained staff utilize preventative maintenance techniques and appropriate care protocols to extend the lifespan of your infrastructure and equipment. This proactive approach saves your organization substantial capital expenditure over time, transforming a perceived operational cost into a long-term financial benefit.`,
      `Finally, exceptional ${serviceName} directly influence how your brand is perceived by external stakeholders. When prospective clients, partners, or top-tier talent visit your facility in ${locationName}, the cleanliness and professionalism of the environment speak volumes about your corporate values. Our dedicated personnel ensure that every interaction reflects competence and reliability, giving you a distinct competitive edge in the local market.`
    ],
    listItems: [
      "Enhanced employee morale and productivity through superior working conditions.",
      "Long-term cost savings via preventative maintenance and asset protection.",
      "Stronger brand perception and professional image for visiting clients.",
      "Reduced administrative overhead by outsourcing workforce management.",
      "Increased agility to scale operations up or down as business demands fluctuate."
    ]
  }
  ];
};

export const servicesData: Record<string, ServiceData> = {
  'housekeeping-services': {
    id: 'housekeeping',
    slug: 'housekeeping-services',
    seoTitle: 'Professional Housekeeping Services in Pune | Prezenti',
    seoDescription: 'Expert housekeeping services for corporate offices, IT parks, and enterprises in Pune. Get housekeeping staff for a pristine, well-maintained workplace.',
    h1: 'Enterprise Housekeeping Services in Pune',
    sections: housekeepingBaseContent,
    faqs: [
      { question: 'What is included in your housekeeping services?', answer: 'Our housekeeping services cover comprehensive daily cleaning, deep cleaning, restroom sanitation, floor care, waste management, and pantry maintenance tailored to corporate environments.' },
      { question: 'Are your housekeeping staff background-verified?', answer: 'Personnel screening, verification, and health-related requirements can be defined according to the role, site, and engagement requirements.' },
      { question: 'Do you provide cleaning materials and equipment?', answer: 'Yes, we provide an end-to-end solution including eco-friendly cleaning chemicals, modern mechanized equipment, and all necessary consumables.' },
      { question: 'Can you scale the housekeeping team based on our needs?', answer: 'Absolutely. We offer flexible staffing models allowing you to scale up or down based on your occupancy and operational requirements.' },
      { question: 'Which areas of Pune do you provide housekeeping services in?', answer: 'We provide housekeeping services across Pune’s major commercial and industrial hubs, including Hinjawadi, Baner, Wakad, Kharadi, Magarpatta, Hadapsar, Viman Nagar, Pimpri-Chinchwad, and Chakan.' }
    ],
    relatedServices: [
      { name: 'Pantry Staff Services', slug: 'pantry-staff-services' },
      { name: 'Facility Management', slug: 'facility-management-services' }
    ]
  },
  'receptionist-staffing-services': {
    id: 'receptionist',
    slug: 'receptionist-staffing-services',
    seoTitle: 'Professional Receptionist Staffing Services | Prezenti',
    seoDescription: 'Enhance your front desk with professional, articulate, and highly trained receptionist staffing services from Prezenti. Perfect for corporate offices.',
    h1: 'Professional Receptionist Staffing Solutions',
    sections: receptionistBaseContent,
    faqs: [
      { question: 'What skills do your receptionists possess?', answer: 'Our receptionists are trained in visitor management, EPABX handling, corporate communication, mailroom management, and front-desk administration.' },
      { question: 'Can you provide bilingual receptionists?', answer: 'Yes, depending on your location and requirement, we can provide receptionists fluent in English and local languages.' },
      { question: 'What happens if a receptionist takes leave?', answer: 'Reliever and coverage-continuity arrangements can be discussed during service planning based on your front-desk requirements.' },
      { question: 'Do you provide temporary receptionist staffing?', answer: 'Yes, we cater to both long-term contracts and temporary staffing needs for events or interim coverage.' }
    ],
    relatedServices: [
      { name: 'Office Boy Services', slug: 'office-boy-services' },
      { name: 'Facility Management', slug: 'facility-management-services' }
    ]
  },
  'office-boy-services': {
    id: 'office-boy',
    slug: 'office-boy-services',
    seoTitle: 'Reliable Office Boy Services & Support Staff | Prezenti',
    seoDescription: 'Hire office boys, peons, and support staff to keep your corporate office running smoothly.',
    h1: 'Reliable Office Boy & Support Staff Services',
    sections: officeBoyBaseContent,
    faqs: [
      { question: 'What duties do office boys perform?', answer: 'Duties include file movement, serving tea/coffee, document photocopying, bank runs, managing stationary, and assisting with general office administration.' },
      { question: 'Are your office boys verified?', answer: 'Personnel screening and verification requirements can be defined according to the role, site, and engagement requirements.' },
      { question: 'Do they wear uniforms?', answer: 'Yes, all our office boys are provided with professional, clean uniforms and ID cards to maintain corporate decorum.' },
      { question: 'Can we hire office boys for multiple shifts?', answer: 'Yes, we provide support staff across various shifts depending on your office operational hours.' }
    ],
    relatedServices: [
      { name: 'Pantry Staff Services', slug: 'pantry-staff-services' },
      { name: 'Receptionist Staffing', slug: 'receptionist-staffing-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' }
    ]
  },
  'pantry-staff-services': {
    id: 'pantry',
    slug: 'pantry-staff-services',
    seoTitle: 'Corporate Pantry Staff & Cafeteria Management | Prezenti',
    seoDescription: 'Professional pantry staff services for corporate offices. Trained in hygiene, F&B service, and cafeteria management.',
    h1: 'Corporate Pantry Staff Services',
    sections: pantryStaffBaseContent,
    faqs: [
      { question: 'Are pantry staff trained in food hygiene?', answer: 'Yes, our pantry staff undergo specific training in food safety, personal hygiene, and proper F&B service etiquette.' },
      { question: 'What tasks do pantry staff handle?', answer: 'They manage tea/coffee vending machines, serve beverages to employees and guests, maintain cafeteria cleanliness, and manage pantry inventory.' },
      { question: 'Do you manage executive dining rooms?', answer: 'Yes, we provide specialized, highly trained stewards for executive dining and boardroom service.' },
      { question: 'Do you provide the pantry consumables?', answer: 'We offer flexible models. We can provide just the manpower, or an end-to-end solution including tea, coffee, and pantry consumables.' }
    ],
    relatedServices: [
      { name: 'Office Boy Services', slug: 'office-boy-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' },
      { name: 'Facility Management', slug: 'facility-management-services' }
    ]
  },
  'facility-management-services': {
    id: 'facility-management',
    slug: 'facility-management-services',
    seoTitle: 'Integrated Facility Management Services in Pune | Prezenti',
    seoDescription: 'End-to-end integrated facility management services for corporate parks, hospitals, and enterprises in Pune. A single facility management company handling maintenance, soft services, and daily operations.',
    h1: 'Integrated Facility Management Services in Pune',
    sections: facilityManagementBaseContent,
    faqs: [
      { question: 'What does Integrated Facility Management (IFM) include?', answer: 'IFM includes soft services (housekeeping, pantry, office support), hard services (MEP maintenance, HVAC), and specialized services (pest control, landscaping) under a single contract.' },
      { question: 'How do you ensure service quality across multiple locations?', answer: 'We utilize a centralized tech-platform for ticketing, audits, and SLA tracking, overseen by a dedicated Key Account Manager.' },
      { question: 'Can you manage technical and MEP maintenance?', answer: 'Yes, we provide trained technicians, electricians, and plumbers for comprehensive preventative and reactive maintenance.' },
      { question: 'Is your facility management tech-enabled?', answer: 'Yes, we deploy proprietary software for visitor management, helpdesk ticketing, and asset management.' },
      { question: 'Is housekeeping included in your Integrated Facility Management services?', answer: 'Yes, housekeeping is one of the soft services included under our IFM contracts, delivered by the same trained, compliant teams behind our dedicated housekeeping service, combined with hard services like MEP maintenance under a single SLA.' },
      { question: 'Do you provide facility management services across Pune?', answer: 'Yes, we provide integrated facility management across Pune’s major commercial and industrial hubs, including Hinjawadi, Kharadi, Baner, Wakad, Magarpatta, Hadapsar, Pimpri-Chinchwad, and Chakan.' }
    ],
    relatedServices: [
      { name: 'Property Management', slug: 'property-management-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' }
    ]
  },
  'property-management-services': {
    id: 'property-management',
    slug: 'property-management-services',
    seoTitle: 'Commercial Property Management Services | Prezenti',
    seoDescription: 'Comprehensive property management services for commercial real estate, IT parks, and residential complexes. Maximize asset value.',
    h1: 'Commercial Property Management Services',
    sections: propertyManagementBaseContent,
    faqs: [
      { question: 'How is property management different from facility management?', answer: 'Property management focuses on the commercial lifecycle of the real estate, including tenant relations, lease administration, and asset value enhancement, alongside physical upkeep.' },
      { question: 'Do you handle vendor management for the property?', answer: 'Yes, we manage all third-party vendors (elevators, fire safety, AMC contracts) to ensure seamless operations.' },
      { question: 'Can you help reduce operational costs for the property?', answer: 'Energy audits, preventative maintenance, and staffing optimization can be structured as part of your engagement to help manage OPEX.' },
      { question: 'Do you manage tenant complaints and helpdesk?', answer: 'Yes, we run a centralized 24/7 helpdesk to address and resolve all tenant queries and maintenance requests swiftly.' }
    ],
    relatedServices: [
      { name: 'Facility Management', slug: 'facility-management-services' },
      { name: 'Housekeeping Services', slug: 'housekeeping-services' }
    ]
  }
};
