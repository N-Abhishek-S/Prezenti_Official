import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';
import { publicSections, scrollToSection, setPendingSection, type PublicSectionId } from '../../lib/sectionNavigation';


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
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <button
              type="button"
              className="mb-4 flex items-center"
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
                    className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
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
              <li><Link to="/services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">All Services</Link></li>
              <li><Link to="/housekeeping-services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Housekeeping</Link></li>
              <li><Link to="/security-services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Security</Link></li>
              <li><Link to="/receptionist-staffing-services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Receptionist</Link></li>
              <li><Link to="/office-boy-services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Office Boy</Link></li>
              <li><Link to="/pantry-staff-services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Pantry Staff</Link></li>
              <li><Link to="/facility-management-services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Facility Management</Link></li>
              <li><Link to="/property-management-services" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Property Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company & Legal</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  type="button"
                  className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                  onClick={() => goToSection('contact')}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-sm text-white/60 transition-colors duration-150 hover:text-white"
                  onClick={() => navigate('/login')}
                >
                  Open App
                </button>
              </li>
              <li><Link to="/privacy-policy" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-sm text-white/60 transition-colors duration-150 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>&copy; 2026 Prezenti. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="text-lg text-white/50 no-underline transition-colors hover:text-white">in</a>
            <a href="#" aria-label="X (Twitter)" className="text-lg text-white/50 no-underline transition-colors hover:text-white">x</a>
            <a href="mailto:bd@kargar.co.in" aria-label="Email" className="text-lg text-white/50 no-underline transition-colors hover:text-white">@</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
