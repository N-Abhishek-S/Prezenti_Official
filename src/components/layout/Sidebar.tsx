import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { BadgeCount } from '../ui/Badge';
import {
  LayoutDashboard, Ticket, Users, BarChart3, Building2,
  Shield, FileText, CheckSquare, Calendar, TrendingUp,
  AlertTriangle, Settings, LogOut, IndianRupee
} from 'lucide-react';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { useState } from 'react';

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

export function Sidebar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [collapsed] = useState(false);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 flex flex-col z-30 overflow-y-auto transition-all duration-300',
        'bg-primary-800 text-white',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Header */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">
          P
        </div>
        {!collapsed && (
          <span className="text-xl font-bold text-white tracking-tight">Presenti</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {sidebarSections.map(section => (
          <div key={section.title} className="mb-6">
            {!collapsed && (
              <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
                {section.title}
              </div>
            )}
            {section.items.map(item => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium mb-0.5 transition-all duration-150 no-underline',
                    isActive
                      ? 'bg-white/12 text-white'
                      : 'text-white/70 hover:bg-white/8 hover:text-white'
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                  {!collapsed && item.badge > 0 && <BadgeCount count={item.badge} />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 shrink-0">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/8 hover:text-white transition-all no-underline mb-1"
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          onClick={() => dispatch(logout())}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/8 hover:text-white transition-all cursor-pointer bg-transparent border-none"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
