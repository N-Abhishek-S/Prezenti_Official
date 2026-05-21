export interface City {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

export interface Area {
  id: string;
  cityId: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

export const initialCities: City[] = [
  {
    id: 'city-pune',
    name: 'Pune',
    slug: 'pune',
    isActive: true,
    displayOrder: 1,
  },
];

export const initialAreas: Area[] = [
  'Baner',
  'Hinjewadi',
  'Wakad',
  'Balewadi',
  'Aundh',
  'Pimple Saudagar',
  'Pimple Gurav',
  'Kharadi',
  'Viman Nagar',
  'Hadapsar',
  'Magarpatta',
  'Koregaon Park',
  'Kalyani Nagar',
  'Kothrud',
  'Bavdhan',
  'Shivaji Nagar',
  'Camp',
  'Yerwada',
  'Kondhwa',
  'NIBM',
  'Undri',
  'Bibwewadi',
  'Sinhagad Road',
  'Katraj',
  'Pimpri',
  'Chinchwad',
  'Bhosari',
  'Ravet',
  'Tathawade',
  'Sus',
  'Mahalunge',
  'Mundhwa',
  'Manjari',
  'Lohegaon',
  'Dhanori',
].map((name, index) => ({
  id: `area-${name.toLowerCase().replace(/\s+/g, '-')}`,
  cityId: 'city-pune',
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  isActive: true,
  displayOrder: index + 1,
}));
