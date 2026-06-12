export interface LocationData {
  id: string;
  slug: string;
  name: string;
  seoTitlePrefix: string;
  seoDescriptionPrefix: string;
  h1Prefix: string;
  shortDescription: string;
}

export const locationsData: Record<string, LocationData> = {
  pune: {
    id: 'pune',
    slug: 'pune',
    name: 'Pune',
    seoTitlePrefix: 'in Pune | Prezenti',
    seoDescriptionPrefix: 'Top-rated services in Pune, Maharashtra. Serving Hinjewadi, Magarpatta, Kharadi, and PCMC.',
    h1Prefix: 'in Pune',
    shortDescription: 'Providing premium corporate staffing and facility management across IT parks and commercial hubs in Pune.',
  },
  mumbai: {
    id: 'mumbai',
    slug: 'mumbai',
    name: 'Mumbai',
    seoTitlePrefix: 'in Mumbai | Prezenti',
    seoDescriptionPrefix: 'Premium corporate services in Mumbai. Serving BKC, Andheri, Lower Parel, and Powai.',
    h1Prefix: 'in Mumbai',
    shortDescription: 'Delivering exceptional corporate and facility services to businesses across Mumbai.',
  },
  'navi-mumbai': {
    id: 'navi-mumbai',
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    seoTitlePrefix: 'in Navi Mumbai | Prezenti',
    seoDescriptionPrefix: 'Reliable services in Navi Mumbai. Serving Mahape, Airoli, and Vashi IT Hubs.',
    h1Prefix: 'in Navi Mumbai',
    shortDescription: 'Specialized facility management and corporate staffing for Navi Mumbai businesses.',
  },
  thane: {
    id: 'thane',
    slug: 'thane',
    name: 'Thane',
    seoTitlePrefix: 'in Thane | Prezenti',
    seoDescriptionPrefix: 'Expert corporate services in Thane. Trusted by top commercial real estate managers.',
    h1Prefix: 'in Thane',
    shortDescription: 'Expert staffing and facility management solutions in Thane.',
  },
  nagpur: {
    id: 'nagpur',
    slug: 'nagpur',
    name: 'Nagpur',
    seoTitlePrefix: 'in Nagpur | Prezenti',
    seoDescriptionPrefix: 'Professional facility services in Nagpur. MIHAN and local corporate support.',
    h1Prefix: 'in Nagpur',
    shortDescription: 'Elevating corporate standards in Nagpur with reliable support staff.',
  },
  nashik: {
    id: 'nashik',
    slug: 'nashik',
    name: 'Nashik',
    seoTitlePrefix: 'in Nashik | Prezenti',
    seoDescriptionPrefix: 'Corporate support services in Nashik. Serving the industrial and commercial sectors.',
    h1Prefix: 'in Nashik',
    shortDescription: 'Providing trained manpower and facility management to Nashik enterprises.',
  },
  aurangabad: {
    id: 'aurangabad',
    slug: 'aurangabad',
    name: 'Aurangabad',
    seoTitlePrefix: 'in Aurangabad | Prezenti',
    seoDescriptionPrefix: 'Facility management and corporate staffing in Aurangabad.',
    h1Prefix: 'in Aurangabad',
    shortDescription: 'Dedicated corporate staffing services for Aurangabad industrial hubs.',
  }
};
