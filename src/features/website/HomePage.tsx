import { useEffect } from 'react';
import { HeroSection } from '../../components/hero/HeroSection';
import { consumePendingSection, scrollToSection } from '../../lib/sectionNavigation';
import { ComparisonSection } from './sections/ComparisonSection';
import { ContactSection } from './sections/ContactSection';
import { ImpactSection } from './sections/ImpactSection';
import { LocationSection } from './sections/LocationSection';
import { ServiceConfiguratorSection } from './sections/ServiceConfiguratorSection';

export function HomePage() {
  useEffect(() => {
    const sectionId = consumePendingSection();
    if (!sectionId) return undefined;

    const frame = window.requestAnimationFrame(() => scrollToSection(sectionId));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-w-0 overflow-x-clip">
      <HeroSection />
      <ComparisonSection />
      <ServiceConfiguratorSection />
      <ImpactSection />
      <LocationSection />
      <ContactSection />
    </div>
  );
}
