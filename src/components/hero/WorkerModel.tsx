import { DigitalHuman } from './DigitalHuman';
import type { HeroRole } from './heroConfig';

interface WorkerModelProps {
  role: HeroRole;
  active: boolean;
  index: number;
  activeRoleIndex: number;
  isReducedMotion: boolean;
}

export function WorkerModel(props: WorkerModelProps) {
  return <DigitalHuman {...props} />;
}
