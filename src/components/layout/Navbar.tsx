import { useEffect, useState } from 'react';
import { Building2, ChevronDown, MapPin, Menu, RadioTower, Search, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import { useCatalogData } from '../../hooks/useCatalogData';
import {
  publicSections,
  scrollToSection,
  setPendingSection,
  type PublicSectionId,
} from '../../lib/sectionNavigation';

const sectionIds = publicSections.map((section) => section.id);

function CitiesMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { cities, areas } = useCatalogData();
  const activeCity = cities.find((city) => city.isActive) ?? cities[0];
  const activeAreas = areas.filter((area) => area.isActive && area.cityId === activeCity?.id);

  return (
    <div className="w-[min(940px,calc(100vw-2rem))] overflow-hidden rounded-[26px] border border-neutral-200 bg-white text-left shadow-[0_34px_100px_rgba(10,42,34,0.18)]">
      <div className="grid lg:grid-cols-[270px_minmax(0,1fr)]">
        <div className="border-b border-neutral-100 bg-[linear-gradient(135deg,rgba(224,242,229,0.78),rgba(237,250,249,0.62))] p-5 lg:border-b-0 lg:border-r">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-800 text-white shadow-[0_18px_38px_rgba(18,63,53,0.2)]">
            <RadioTower size={22} />
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">Active service city</div>
          <div className="mt-2 text-2xl font-semibold text-neutral-950">{activeCity?.name ?? 'Pune'}</div>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Verified staffing coverage across the Pune ecosystem. No other cities are listed until service is active there.
          </p>
          <button
            type="button"
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary-800 px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-900"
            onClick={onNavigate}
          >
            View city coverage
          </button>
        </div>

        <div className="p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-neutral-950">Pune service zones</div>
              <div className="mt-1 text-xs text-neutral-500">{activeAreas.length} active localities</div>
            </div>
            <div className="flex min-h-10 items-center gap-2 rounded-full border border-neutral-200 bg-canvas px-4 text-xs font-semibold text-neutral-500">
              <Search size={14} />
              Pune only
            </div>
          </div>

          <div className="grid max-h-90 gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
            {activeAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={onNavigate}
                className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-left text-sm font-semibold text-neutral-700 transition-all duration-150 hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-800"
              >
                {area.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { cities, areas } = useCatalogData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<PublicSectionId>('home');
  const [citiesPanelOpen, setCitiesPanelOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeCity = cities.find((city) => city.isActive) ?? cities[0];
  const activeAreas = areas.filter((area) => area.isActive && area.cityId === activeCity?.id);

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

  const goToTalkPage = () => {
    setMobileOpen(false);
    navigate('/talk-to-us');
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
            const isCities = section.id === 'location';
            const isActive = activeSection === section.id;

            if (isCities) {
              return (
                <div
                  key={section.id}
                  className="relative"
                  onMouseEnter={() => setCitiesPanelOpen(true)}
                  onMouseLeave={() => setCitiesPanelOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium tracking-[-0.006em] transition-all duration-150',
                      isActive ? 'text-primary-800' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                    )}
                    onClick={() => {
                      setCitiesPanelOpen((open) => !open);
                      goToSection('location');
                    }}
                  >
                    {section.label}
                    <ChevronDown size={14} className={cn('transition-transform duration-150', citiesPanelOpen && 'rotate-180')} />
                  </button>

                  {citiesPanelOpen && (
                    <div className="absolute right-0 top-full pt-4">
                      <CitiesMegaMenu onNavigate={() => goToSection('location')} />
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
                  'rounded-md px-3 py-2 text-sm font-medium tracking-[-0.006em] transition-all duration-150',
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
          <Button type="button" variant="primary" size="sm" onClick={goToTalkPage}>
            Talk to Expert
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
              Active city: {activeCity?.name ?? 'Pune'}
            </div>
            <div className="grid max-h-44 grid-cols-2 gap-2 overflow-y-auto">
              {activeAreas.map((area) => (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => goToSection('location')}
                  className="rounded-lg bg-white px-3 py-2 text-left text-xs font-semibold text-primary-800"
                >
                  {area.name}
                </button>
              ))}
            </div>
          </div>

          <Button type="button" variant="primary" size="md" className="mt-3 w-full" onClick={goToTalkPage}>
            Talk to Expert
          </Button>
        </div>
      )}
    </nav>
  );
}
