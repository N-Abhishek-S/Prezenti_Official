import { KpiCards } from './KpiCards';

interface FloatingStatsCardsProps {
  isReducedMotion: boolean;
}

export function FloatingStatsCards(props: FloatingStatsCardsProps) {
  return <KpiCards {...props} />;
}
