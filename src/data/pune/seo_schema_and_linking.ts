export const internalLinkingStrategy = {
  homepage: [
    { target: "/housekeeping-services-pune", anchor: "Corporate Housekeeping in Pune", placement: "Services Grid" },
    { target: "/office-boy-services-pune", anchor: "Hire Office Boys in Pune", placement: "Services Grid" },
    { target: "/pantry-staff-services-pune", anchor: "Pantry Staff Services in Pune", placement: "Services Grid" },
    { target: "/facility-management-services-pune", anchor: "Facility Management in Pune", placement: "Services Grid" }
  ],
  housekeepingPage: [
    { target: "/office-boy-services-pune", anchor: "dedicated office boy services in Pune", context: "Combine your cleaning with our dedicated office boy services in Pune for total admin relief." },
    { target: "/pantry-staff-services-pune", anchor: "expert Pantry Staff Services", context: "Ensure your cafeteria is equally immaculate by exploring our expert Pantry Staff Services." },
    { target: "/facility-management-services-pune", anchor: "Integrated Facility Management", context: "Consolidate all vendor management entirely with our Integrated Facility Management solutions." }
  ],
  officeBoyPage: [
    { target: "/pantry-staff-services-pune", anchor: "specialized pantry management staff", context: "If you require dedicated cafeteria support, we also deploy specialized pantry management staff." },
    { target: "/facility-management-services-pune", anchor: "comprehensive facility management solutions", context: "Scale your administrative operations seamlessly with our comprehensive facility management solutions." }
  ],
  pantryStaffPage: [
    { target: "/housekeeping-services-pune", anchor: "deep corporate housekeeping", context: "For extensive cafeteria floor scrubbing, integrate our deep corporate housekeeping teams." },
    { target: "/facility-management-services-pune", anchor: "integrated facility management in Pune", context: "Manage your entire commercial real estate footprint with our integrated facility management in Pune." }
  ]
};

export const conversionCTAs = {
  primary: {
    headline: "Secure a Pristine, Fully Compliant Workplace Today.",
    subtext: "Get a Custom Commercial Proposal within 2 Hours.",
    button: "Request a Free Site Audit"
  },
  secondary: {
    headline: "Struggling with vendor compliance or rampant staff absenteeism?",
    subtext: "Let our operations experts analyze your current facility setup.",
    button: "Talk to an Operations Expert"
  },
  urgency: {
    headline: "Don't wait for a compliance audit or a major hygiene failure.",
    subtext: "Upgrade your corporate infrastructure to enterprise standards today.",
    button: "Contact Prezenti Pune"
  }
};

export const generatePuneSchema = (serviceName: string, serviceUrlSlug: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://prezenti.in/#localbusiness",
        "name": "Prezenti Facility Management",
        "image": "https://prezenti.in/og-images/og-homepage.jpg",
        "url": "https://prezenti.in",
        "telephone": "+918788726752",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Pune Headquarters",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "18.5204",
          "longitude": "73.8567"
        },
        "areaServed": [
          {"@type": "City", "name": "Pune"},
          {"@type": "Neighborhood", "name": "Hinjawadi"},
          {"@type": "Neighborhood", "name": "Kharadi"},
          {"@type": "Neighborhood", "name": "Baner"},
          {"@type": "Neighborhood", "name": "Pimpri-Chinchwad"}
        ]
      },
      {
        "@type": "Service",
        "@id": `https://prezenti.in/${serviceUrlSlug}#service`,
        "name": serviceName,
        "description": description,
        "provider": {"@id": "https://prezenti.in/#localbusiness"},
        "areaServed": {"@type": "City", "name": "Pune"}
      },
      {
        "@type": "WebPage",
        "@id": `https://prezenti.in/${serviceUrlSlug}#webpage`,
        "url": `https://prezenti.in/${serviceUrlSlug}`,
        "name": `${serviceName} in Pune | Prezenti`,
        "isPartOf": {"@id": "https://prezenti.in/#website"}
      }
    ]
  };
};
