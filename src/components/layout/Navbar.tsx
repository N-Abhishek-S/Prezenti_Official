import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronDown, MapPin, Menu, Search, X } from 'lucide-react';
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
    <div className="w-[760px] overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-neutral-900/5">
      <div className="grid grid-cols-[240px_1fr]">
        <div className="bg-neutral-50/50 p-6 border-r border-neutral-100 flex flex-col justify-between">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 shadow-sm border border-primary-200/50">
              <Building2 size={18} />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-1.5 tracking-tight">
              Now Serving {activeCity?.name ?? 'Pune'}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We currently provide extensive coverage across <span className="font-medium text-neutral-700">{activeAreas.length} verified localities</span> in the region.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigate}
            className="mt-8 w-full inline-flex h-9 items-center justify-center rounded-lg bg-white px-3 text-xs font-medium text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 transition-all duration-200"
          >
            View all areas
          </button>
        </div>

        <div className="p-6 bg-white">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Popular Localities
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder={`Search in ${activeCity?.name}...`}
                className="h-8 w-48 rounded-md border border-neutral-200 bg-neutral-50/50 pl-8 pr-3 text-[13px] text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
                disabled
              />
            </div>
          </div>

          <div className="grid max-h-[300px] grid-cols-2 gap-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
            {activeAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={onNavigate}
                className="flex items-center rounded-md px-3 py-2 text-left text-[13px] font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary-700"
              >
                <span className="truncate">{area.name}</span>
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



  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-40 flex h-18 items-center transition-all duration-300',
        'border-b border-neutral-200 bg-white/92 backdrop-blur-xl',
        scrolled && 'shadow-[0_12px_40px_rgba(10,42,34,0.08)]',
      )}
    >
      <div className="flex w-full items-center justify-between desktop-container">
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

                  <AnimatePresence>
                    {citiesPanelOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 origin-top"
                      >
                        <CitiesMegaMenu onNavigate={() => goToSection('location')} />
                      </motion.div>
                    )}
                  </AnimatePresence>
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
          <Button type="button" variant="outline" size="sm" onClick={() => goToSection('contact')}>
            Contact Us
          </Button>
          <Button type="button" variant="primary" size="sm" onClick={() => goToSection('contact')}>
            Get Staffing Solutions
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

          <Button type="button" variant="outline" size="md" className="mt-3 w-full" onClick={() => goToSection('contact')}>
            Contact Us
          </Button>
          <Button type="button" variant="primary" size="md" className="mt-3 w-full" onClick={() => goToSection('contact')}>
            Get Staffing Solutions
          </Button>
        </div>
      )}
    </nav>
  );
}
