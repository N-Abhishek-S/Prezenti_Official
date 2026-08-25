export const SEO_CONSTANTS = {
  SITE_NAME: 'Prezenti',
  BASE_URL: 'https://www.prezenti.com',
  DEFAULT_TITLE: 'Integrated Facility Management Company in Pune | Prezenti',
  DEFAULT_DESCRIPTION:
    'Prezenti provides housekeeping, facility management, and support staffing services for corporate offices and commercial facilities in Pune.',
  DEFAULT_IMAGE: 'https://www.prezenti.com/brand/prezenti-horizontal-logo.png',
  DEFAULT_IMAGE_ALT: 'Prezenti facility staffing services',
  LOGO_URL: 'https://www.prezenti.com/brand/prezenti-mark.png',
  LOCALE: 'en_IN',
  THEME_COLOR: '#123f35',

  CONTACT_EMAIL: 'weprezenti@gmail.com',
  PHONE: '+91 8788726752',
  WHATSAPP: 'https://wa.me/918788726752',
  CITY: 'Pune',
  STATE: 'Maharashtra',
  COUNTRY: 'IN',
  // Registered office address. Single source of truth — consumed by
  // StructuredData.tsx (LocalBusiness/ProfessionalService PostalAddress),
  // Footer.tsx, and the contact page. Update here only.
  ADDRESS: {
    COMPANY_NAME: 'Prezenti Business Services Pvt. Ltd.',
    LINE1: 'FL 2, Unity Constructions',
    LINE2: 'N 1163 14, Baner, Baner Gaon',
    DISTRICT: 'Haveli',
    CITY: 'Pune',
    STATE: 'Maharashtra',
    POSTAL_CODE: '411045',
    COUNTRY: 'India',
    // Single-line form for places that need one string (JSON-LD streetAddress, etc.)
    STREET_ADDRESS: 'FL 2, Unity Constructions, N 1163 14, Baner, Baner Gaon',
  },
  // Provisional Pune HQ coordinates carried over from the former Pune-only schema
  // generator. Not verified against the confirmed business address above — see
  // PHASE_A_IMPLEMENTATION_BLUEPRINT.md Task 4 for the open business-input item.
  GEO: {
    LATITUDE: '18.5204',
    LONGITUDE: '73.8567',
  },
  SOCIAL_LINKS: {
    YOUTUBE: 'https://www.youtube.com/@PrezentiStaffingServices',
    INSTAGRAM: 'https://www.instagram.com/prezentiofficial/',
    FACEBOOK: 'https://www.facebook.com/profile.php?id=61590792212198',
    X: 'https://x.com/PrezentiOffici',
    LINKEDIN: 'https://www.linkedin.com/company/prezenti-staffing-services'
  },
  // Restricted to areas with actual evidenced service coverage in
  // content/locations/locationData.ts (Pune, Hinjawadi, Kharadi and their
  // documented nearby areas). Previously included Mumbai, Navi Mumbai,
  // Thane, Nagpur, Nashik, Aurangabad, Kolhapur, and Balewadi — none of
  // which have any supporting Category A content anywhere on the site.
  AREA_SERVED: [
    'Pune',
    'Hinjewadi',
    'Kharadi',
    'Baner',
    'Wakad',
    'Viman Nagar'
  ],
};
