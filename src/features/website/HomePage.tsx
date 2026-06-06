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
import { SEO_CONSTANTS } from '../../seo/constants';
import { faqsData } from '../../data/faqsData';

export function HomePage() {
  useEffect(() => {
    const sectionId = consumePendingSection();
    if (!sectionId) return undefined;

    const frame = window.requestAnimationFrame(() => scrollToSection(sectionId));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const homepageFaqs = faqsData.flatMap((group) => group.items);
  const homepageUrl = SEO_CONSTANTS.BASE_URL;

  return (
    <div className="min-w-0 overflow-x-clip">
      <SEO 
        title="Prezenti | Facility Staffing Services in Pune"
        description="Hire verified housekeeping, office boy, receptionist, pantry, security, and facility support staff for Pune offices, IT parks, and workplaces."
        canonicalUrl="/" 
        keywords={[
          'facility staffing Pune',
          'housekeeping services Pune',
          'office boy services Pune',
          'receptionist staffing Pune',
          'commercial facility management',
        ]}
      />
      <StructuredData />
      <StructuredData type="LocalBusiness" />
      <StructuredData 
        type="Service" 
        data={{
          name: 'Facility Staffing Services in Pune',
          description: 'Verified housekeeping, office support, receptionist, pantry, security, and facility staffing services for Pune workplaces.',
          serviceType: 'Facility staffing and workplace support services',
          url: homepageUrl,
        }} 
      />
      <StructuredData type="WebSite" />
      <StructuredData type="SoftwareApplication" />
      <StructuredData
        type="WebPage"
        data={{
          name: 'Prezenti facility staffing services in Pune',
          description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
          url: homepageUrl,
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: homepageFaqs }} />
      <HeroSection />
      <ComparisonSection />
      <ServiceConfiguratorSection />
      <ImpactSection />
      <LocationSection />
      <ContactSection />
    </div>
  );
}
