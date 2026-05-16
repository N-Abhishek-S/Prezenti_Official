import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';
import { cn } from '../../lib/cn';
import { BadgeCount } from '../ui/Badge';
import {
  LayoutDashboard, Ticket, Users, BarChart3, Building2,
  Shield, FileText, CheckSquare, Calendar, TrendingUp,
  AlertTriangle, Settings, LogOut, IndianRupee, X
} from 'lucide-react';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

const sidebarSections = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', badge: 0 },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Tickets', icon: Ticket, href: '/dashboard/tickets', badge: 12 },
      { label: 'Attendance', icon: Users, href: '/dashboard/attendance', badge: 0 },
      { label: 'Branches', icon: Building2, href: '/dashboard/branches', badge: 0 },
      { label: 'SLA Dashboard', icon: BarChart3, href: '/dashboard/sla', badge: 3 },
    ],
  },
  {
    title: 'Governance',
    items: [
      { label: 'Compliance Vault', icon: Shield, href: '/dashboard/compliance', badge: 0 },
      { label: 'Invoices', icon: FileText, href: '/dashboard/invoices', badge: 5 },
      { label: 'Approvals', icon: CheckSquare, href: '/dashboard/approvals', badge: 8 },
      { label: 'AMC Calendar', icon: Calendar, href: '/dashboard/amc', badge: 0 },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Pricing', icon: IndianRupee, href: '/admin/pricing', badge: 0 },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'Reports', icon: TrendingUp, href: '/dashboard/reports', badge: 0 },
      { label: 'Escalations', icon: AlertTriangle, href: '/dashboard/escalations', badge: 2 },
    ],
  },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-neutral-950/42 backdrop-blur-[2px] lg:hidden"
          onClick={onMobileClose}
          aria-label="Close navigation overlay"
        />
      )}

      <aside
        className={cn(
          'fixed bottom-0 left-0 top-0 z-50 flex w-[260px] flex-col overflow-y-auto transition-transform duration-300 lg:z-30',
          'bg-primary-800 text-white',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <BrandLogo size="sm" tone="onDark" imageClassName="max-w-[150px]" />
          <button
            type="button"
            className="rounded-md p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            onClick={onMobileClose}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sidebarSections.map(section => (
            <div key={section.title} className="mb-6">
              <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                {section.title}
              </div>
              {section.items.map(item => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onMobileClose}
                    className={cn(
                      'mb-0.5 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium no-underline transition-all duration-150',
                      isActive
                        ? 'bg-white/12 text-white'
                        : 'text-white/70 hover:bg-white/8 hover:text-white',
                    )}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge > 0 && <BadgeCount count={item.badge} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/10 px-3 py-4">
          <Link
            to="/dashboard/settings"
            onClick={onMobileClose}
            className="mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 no-underline transition-all hover:bg-white/8 hover:text-white"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => {
              onMobileClose?.();
              dispatch(logout());
            }}
            className="flex w-full cursor-pointer items-center gap-3 rounded-md border-none bg-transparent px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/8 hover:text-white"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
