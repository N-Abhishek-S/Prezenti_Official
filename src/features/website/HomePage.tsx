import { useEffect } from 'react';
import { HeroSection } from '../../components/hero/HeroSection';
import { consumePendingSection, scrollToSection } from '../../lib/sectionNavigation';
import { ComparisonSection } from './sections/ComparisonSection';
import { ContactSection } from './sections/ContactSection';
import { ImpactSection } from './sections/ImpactSection';
import { LocationSection } from './sections/LocationSection';
import { ServiceConfiguratorSection } from './sections/ServiceConfiguratorSection';
import { SEO } from '../../seo/SEO';
import { StructuredData } from '../../seo/StructuredData';

export function HomePage() {
  useEffect(() => {
    const sectionId = consumePendingSection();
    if (!sectionId) return undefined;

    const frame = window.requestAnimationFrame(() => scrollToSection(sectionId));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-w-0 overflow-x-clip">
      <SEO 
        title="Prezenti | Professional Facility Management Services" 
        description="Prezenti provides professional housekeeping, security, receptionist, office boy, pantry and facility management staffing solutions for businesses across India." 
        canonicalUrl="/" 
      />
      <StructuredData />
      <StructuredData type="LocalBusiness" />
      <StructuredData 
        type="Service" 
        data={{
          name: "Facility Management Services",
          description: "Comprehensive facility management, security, and housekeeping staffing solutions."
        }} 
      />
      <StructuredData type="WebSite" />
      <HeroSection />
      <ComparisonSection />
      <ServiceConfiguratorSection />
      <ImpactSection />
      <LocationSection />
      <ContactSection />
    </div>
  );
}
