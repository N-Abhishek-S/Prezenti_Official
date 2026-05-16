import { useEffect, useState } from 'react';
import { ArrowRight, Building2, ChevronDown, MapPin, Menu, Network, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import {
  publicSections,
  scrollToSection,
  setPendingSection,
  type PublicSectionId,
} from '../../lib/sectionNavigation';

const sectionIds = publicSections.map((section) => section.id);

function LocationPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="w-[min(320px,calc(100vw-2rem))] rounded-[22px] border border-neutral-200 bg-white p-4 text-left shadow-[0_28px_80px_rgba(10,42,34,0.16)]">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-800">
          <MapPin size={19} />
        </div>
        <div>
          <div className="text-sm font-semibold text-neutral-950">Pune availability</div>
          <div className="mt-1 text-xs text-neutral-500">Regional Offices</div>
        </div>
      </div>

      <div className="rounded-xl border border-primary-100 bg-primary-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">Service zone</div>
        <div className="mt-2 text-sm font-semibold text-primary-900">Pune - Hinjewadi</div>
      </div>

      <div className="mt-3 flex items-start gap-3 rounded-xl border border-neutral-200 bg-canvas p-4">
        <Network size={17} className="mt-0.5 shrink-0 text-teal-700" />
        <div>
          <div className="text-sm font-semibold text-neutral-900">Scalable future city architecture</div>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">Multi-location management with site-level configurations, service mapping, and performance benchmarking.</p>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-800 transition-colors hover:text-primary-600"
        onClick={onNavigate}
      >
        View location section
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<PublicSectionId>('home');
  const [locationPanelOpen, setLocationPanelOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id && sectionIds.includes(visible.target.id as PublicSectionId)) {
          setActiveSection(visible.target.id as PublicSectionId);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.08, 0.2, 0.4, 0.6] },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const goToSection = (sectionId: PublicSectionId) => {
    setMobileOpen(false);

    if (location.pathname !== '/') {
      setPendingSection(sectionId);
      navigate('/');
      return;
    }

    scrollToSection(sectionId);
  };

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-40 flex h-18 items-center transition-all duration-300',
        'border-b border-neutral-200 bg-white/92 backdrop-blur-xl',
        scrolled && 'shadow-[0_12px_40px_rgba(10,42,34,0.08)]',
      )}
    >
      <div className="mx-auto flex w-full max-w-360 items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          className="flex min-w-0 items-center no-underline"
          onClick={() => goToSection('home')}
          aria-label="Go to home"
        >
          <BrandLogo variant="stacked" size="nav" imageClassName="max-w-[136px] sm:max-w-none" />
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {publicSections.map((section) => {
            const isLocation = section.id === 'location';
            const isActive = activeSection === section.id;

            if (isLocation) {
              return (
                <div
                  key={section.id}
                  className="relative"
                  onMouseEnter={() => setLocationPanelOpen(true)}
                  onMouseLeave={() => setLocationPanelOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150',
                      isActive ? 'text-primary-800' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                    )}
                    onClick={() => {
                      setLocationPanelOpen(true);
                      goToSection('location');
                    }}
                  >
                    {section.label}
                    <ChevronDown size={14} className={cn('transition-transform duration-150', locationPanelOpen && 'rotate-180')} />
                  </button>

                  {locationPanelOpen && (
                    <div className="absolute left-1/2 top-full pt-4 -translate-x-1/2">
                      <LocationPanel onNavigate={() => goToSection('location')} />
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={section.id}
                type="button"
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-all duration-150',
                  isActive ? 'text-primary-800' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                )}
                onClick={() => goToSection(section.id)}
              >
                {section.label}
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button type="button" variant="primary" size="sm" onClick={() => goToSection('contact')}>
            Request Call
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 transition-colors hover:bg-neutral-100 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-18 flex max-h-[calc(100svh-72px)] flex-col gap-1 overflow-y-auto border-b border-neutral-200 bg-white p-4 shadow-lg lg:hidden">
          {publicSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={cn(
                'flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium',
                activeSection === section.id ? 'bg-primary-50 text-primary-800' : 'text-neutral-700 hover:bg-neutral-100',
              )}
              onClick={() => goToSection(section.id)}
            >
              {section.label}
              {section.id === 'location' && <MapPin size={15} />}
            </button>
          ))}

          <div className="mt-3 rounded-xl border border-primary-100 bg-primary-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary-900">
              <Building2 size={16} />
              Pune availability
            </div>
            <div className="text-xs text-neutral-600">Pune - Hinjewadi</div>
          </div>

          <Button type="button" variant="primary" size="md" className="mt-3 w-full" onClick={() => goToSection('contact')}>
            Request Call
          </Button>
        </div>
      )}
    </nav>
  );
}
