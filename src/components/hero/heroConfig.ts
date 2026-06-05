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
  { id: 'housekeeping', name: 'Housekeeping', accent: '#16A34A' },
];

export const heroMedia = {
  primary: {
    id: 'housekeeping-deployment',
    label: 'Housekeeping professional on duty',
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
