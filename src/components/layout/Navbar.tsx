import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '/platform' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Compliance', href: '/compliance' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 h-[72px] flex items-center z-40 transition-all duration-300',
        'bg-white/95 backdrop-blur-xl border-b border-neutral-200',
        scrolled && 'shadow-md'
      )}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 bg-primary-800 rounded-lg flex items-center justify-center text-white font-extrabold text-lg">
            P
          </div>
          <span className="text-[22px] font-bold text-primary-800 tracking-tight">Presenti</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 no-underline',
                location.pathname === link.href
                  ? 'text-primary-800'
                  : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/contact">
            <Button variant="primary" size="sm">Request Demo</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-neutral-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-neutral-200 shadow-lg p-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="px-4 py-3 text-sm font-medium text-neutral-700 rounded-lg hover:bg-neutral-100 no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-200">
            <Link to="/login" className="flex-1">
              <Button variant="outline" size="md" className="w-full">Sign In</Button>
            </Link>
            <Link to="/contact" className="flex-1">
              <Button variant="primary" size="md" className="w-full">Request Demo</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
