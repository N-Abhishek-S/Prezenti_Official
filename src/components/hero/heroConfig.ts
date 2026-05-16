import { publicAsset } from '../../lib/publicAsset';

export interface HeroRole {
  id: string;
  name: string;
  accent: string;
}

export interface HeroVideoAsset {
  id: string;
  label: string;
  sources: {
    src: string;
    type: string;
  }[];
  poster?: string;
}

export const heroRoles: HeroRole[] = [
  { id: 'facility-supervision', name: 'Facility Supervision', accent: '#123F35' },
  { id: 'housekeeping', name: 'Housekeeping Excellence', accent: '#4F4F6F' },
  { id: 'pantry', name: 'Pantry Services', accent: '#6B8E23' },
  { id: 'reception', name: 'Reception Teams', accent: '#148F89' },
];

export const heroMedia = {
  primary: {
    id: 'namaste-reception',
    label: 'Receptionist doing Namaste gesture',
    poster: publicAsset('/hero/staff/receptionist.png'),
    sources: [
      {
        src: publicAsset('/hero/video/prezenti-namaste-reception.webm'),
        type: 'video/webm',
      },
    ],
  },
  supporting: {
    id: 'workforce-showcase',
    label: 'Prezenti workforce actions',
    poster: publicAsset('/hero/staff/office-boy.png'),
    sources: [
      {
        src: publicAsset('/hero/video/prezenti-workforce-vertical.webm'),
        type: 'video/webm',
      },
    ],
  },
  video3: null as HeroVideoAsset | null,
} satisfies {
  primary: HeroVideoAsset;
  supporting: HeroVideoAsset;
  video3: HeroVideoAsset | null;
};
