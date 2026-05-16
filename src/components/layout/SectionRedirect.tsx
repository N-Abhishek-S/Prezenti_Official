import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPendingSection, type PublicSectionId } from '../../lib/sectionNavigation';
import { RouteFallback } from './RouteFallback';

export function SectionRedirect({ sectionId }: { sectionId: PublicSectionId }) {
  const navigate = useNavigate();

  useEffect(() => {
    setPendingSection(sectionId);
    navigate('/', { replace: true });
  }, [navigate, sectionId]);

  return <RouteFallback />;
}
