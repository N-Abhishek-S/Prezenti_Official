export interface IndustryData {
  id: string;
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  overview: string;
}

export const industriesData: Record<string, IndustryData> = {
  offices: {
    id: 'offices',
    slug: 'offices',
    name: 'Corporate Offices',
    seoTitle: 'Facility Management for Corporate Offices | Prezenti',
    seoDescription: 'Expert facility management and staffing services for corporate offices and IT parks. Keep your workspace clean, secure, and productive.',
    h1: 'Facility Management for Corporate Offices',
    overview: 'Corporate offices demand a seamless, professional environment. From front-desk receptionists to deep-cleaning housekeeping, we provide the support staff needed to keep your business running smoothly.'
  },
  hospitals: {
    id: 'hospitals',
    slug: 'hospitals',
    name: 'Hospitals & Healthcare',
    seoTitle: 'Housekeeping & Facility Management for Hospitals | Prezenti',
    seoDescription: 'Specialized hospital housekeeping, sanitation, and facility management services adhering to strict healthcare compliance.',
    h1: 'Facility Management for Hospitals',
    overview: 'Healthcare facilities require specialized sanitation protocols. Our hospital-trained staff ensures a sterile, safe environment for patients, doctors, and visitors.'
  },
  schools: {
    id: 'schools',
    slug: 'schools',
    name: 'Schools & Educational Institutes',
    seoTitle: 'Housekeeping Services for Schools & Colleges | Prezenti',
    seoDescription: 'Provide a safe and clean learning environment. Expert facility management for schools, colleges, and educational institutes.',
    h1: 'Facility Management for Educational Institutes',
    overview: 'A clean school is a productive school. We offer tailored facility management services to educational institutions to ensure student safety and campus hygiene.'
  },
  warehouses: {
    id: 'warehouses',
    slug: 'warehouses',
    name: 'Warehouses & Factories',
    seoTitle: 'Industrial Housekeeping for Warehouses & Factories | Prezenti',
    seoDescription: 'Heavy-duty industrial housekeeping services for factories, manufacturing units, and large warehouses.',
    h1: 'Industrial Facility Management',
    overview: 'Factories and warehouses face unique operational challenges. Our industrial support staff are trained for heavy-duty cleaning and strict compliance standards.'
  },
  residential: {
    id: 'residential',
    slug: 'residential',
    name: 'Housing Societies',
    seoTitle: 'Facility Management for Housing Societies | Prezenti',
    seoDescription: 'Complete property and facility management services for premium residential complexes and housing societies.',
    h1: 'Facility Management for Housing Societies',
    overview: 'Enhance the living experience in residential complexes with our daily housekeeping and comprehensive property management services.'
  }
};
