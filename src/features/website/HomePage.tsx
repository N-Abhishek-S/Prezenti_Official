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
  const homepageTitle = SEO_CONSTANTS.DEFAULT_TITLE;
  const homepageDescription = SEO_CONSTANTS.DEFAULT_DESCRIPTION;

  return (
    <div className="min-w-0 overflow-x-clip">
      <SEO 
        title={homepageTitle}
        description={homepageDescription}
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
          description: homepageDescription,
          serviceType: 'Facility staffing and workplace support services',
          url: homepageUrl,
        }} 
      />
      <StructuredData type="WebSite" data={{ description: homepageDescription }} />
      <StructuredData type="SoftwareApplication" data={{ description: homepageDescription }} />
      <StructuredData
        type="WebPage"
        data={{
          name: homepageTitle,
          description: homepageDescription,
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
