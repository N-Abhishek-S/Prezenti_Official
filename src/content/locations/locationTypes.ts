import type { ContentRelationships } from '../blogs/blogTypes';

export interface LocationMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  locationName: string;
  
  overview: string;
  businessHubs: string[];
  nearbyItParks: string[];
  nearbyCommercialBuildings: string[];
  challenges: string[];
  
  recommendedServices: string[];
  faqs: { question: string; answer: string }[];
  
  nearbyAreas: string[];
  mapEmbedUrl?: string;
  
  relationships: ContentRelationships;
  
  seo: {
    canonical: string;
    keywords: string[];
    schema: string[]; // e.g. ['LocalBusiness', 'Service']
  };
}
