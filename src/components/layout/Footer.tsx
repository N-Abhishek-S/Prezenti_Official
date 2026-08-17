import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';
import { Mail } from 'lucide-react';
import { YoutubeIcon, InstagramIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from '../ui/SocialIcons';
import { publicSections, scrollToSection, setPendingSection, type PublicSectionId } from '../../lib/sectionNavigation';
import { SEO_CONSTANTS } from '../../seo/constants';
import { resetAnalyticsConsent } from '../../lib/consent';
import { ServiceAreasPopover } from './ServiceAreasPopover';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (sectionId: PublicSectionId) => {
    if (location.pathname !== '/') {
      setPendingSection(sectionId);
      navigate('/');
      return;
    }

    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-neutral-900 pt-14 pb-8 text-white/70 sm:pt-16">
      <div className="desktop-container">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <button
              type="button"
              className="mb-4 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/50 rounded-md"
              onClick={() => goToSection('home')}
              aria-label="Go to home"
            >
              <BrandLogo size="sm" tone="onDark" />
            </button>
            <p className="max-w-75 text-sm leading-relaxed">
              Enterprise-grade facility management platform powering operations, compliance, and workforce management.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="flex flex-col gap-2">
              {publicSections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm"
                    onClick={() => goToSection(section.id)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">All Services</Link></li>
              <li><Link to="/housekeeping-services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Housekeeping</Link></li>
              <li><Link to="/security-services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Security</Link></li>
              <li><Link to="/receptionist-staffing-services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Receptionist</Link></li>
              <li><Link to="/office-boy-services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Office Boy</Link></li>
              <li><Link to="/pantry-staff-services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Pantry Staff</Link></li>
              <li><Link to="/facility-management-services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Facility Management</Link></li>
              <li><Link to="/property-management-services" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Property Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-white/60 mb-1">+91 8788726752</li>
              <li className="text-sm text-white/60 mb-1">weprezenti@gmail.com</li>
              <li className="mb-1">
                <ServiceAreasPopover tone="dark" />
              </li>
              <li>
                <button
                  type="button"
                  className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm mt-2"
                  onClick={() => goToSection('contact')}
                >
                  Contact Form
                </button>
              </li>
              <li><Link to="/privacy-policy" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Terms & Conditions</Link></li>
              <li><Link to="/pricing" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Pricing & Payment</Link></li>
              <li><Link to="/refund-policy" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Refund Policy</Link></li>
              <li><Link to="/cancellation-policy" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Cancellation Policy</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => resetAnalyticsConsent()}
                  className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Service Areas</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/housekeeping-services-pune" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Corporate Housekeeping in Pune</Link></li>
              <li><Link to="/office-boy-services-pune" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Hire Office Boys in Pune</Link></li>
              <li><Link to="/pantry-staff-services-pune" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Pantry Staff Services in Pune</Link></li>
              <li><Link to="/facility-management-services-pune" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">Facility Management in Pune</Link></li>
              <li><Link to="/pune" className="inline-block py-1.5 text-sm text-white/60 transition-colors duration-150 hover:text-white rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20">All Services in Pune</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>&copy; 2026 Prezenti Staffing Services. All rights reserved.</div>
          <div className="flex gap-4">
            <a href={SEO_CONSTANTS.SOCIAL_LINKS?.FACEBOOK || '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 transition-colors hover:text-[#1877F2]">
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a href={SEO_CONSTANTS.SOCIAL_LINKS?.INSTAGRAM || '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 transition-colors hover:text-[#E1306C]">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={SEO_CONSTANTS.SOCIAL_LINKS?.X || '#'} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-white/50 transition-colors hover:text-white">
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href={SEO_CONSTANTS.SOCIAL_LINKS?.LINKEDIN || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 transition-colors hover:text-[#0A66C2]">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href={SEO_CONSTANTS.SOCIAL_LINKS?.YOUTUBE || '#'} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/50 transition-colors hover:text-[#FF0000]">
              <YoutubeIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${SEO_CONSTANTS.CONTACT_EMAIL}`} aria-label="Email" className="text-white/50 transition-colors hover:text-white">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
