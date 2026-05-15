import { Link } from 'react-router-dom';

const footerLinks = {
  platform: [
    { label: 'Overview', href: '/platform' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Compliance', href: '/compliance' },
    { label: 'Security', href: '/security' },
  ],
  services: [
    { label: 'Housekeeping', href: '/services' },
    { label: 'Security', href: '/services' },
    { label: 'Maintenance', href: '/services' },
    { label: 'AMC', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Data Processing', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white/70 pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-primary-800 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">
                P
              </div>
              <span className="text-lg font-bold text-white">Presenti</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[300px]">
              Enterprise-grade facility management platform powering operations, compliance, and workforce management.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150 no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between text-sm">
          <div>© 2026 Presenti. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors text-lg no-underline">in</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-lg no-underline">𝕏</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-lg no-underline">📧</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
