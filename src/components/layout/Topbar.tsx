import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { BrandLogo } from '../brand/BrandLogo';
import { Avatar } from '../ui/Avatar';
import { BadgeCount } from '../ui/Badge';

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const user = useAppSelector(state => state.auth.user);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 shadow-topbar sm:px-6 lg:left-[260px]">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          className="rounded-md p-2 text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <BrandLogo size="xs" className="lg:hidden" imageClassName="max-w-[106px]" />

        <div className="relative hidden min-w-0 max-w-xl flex-1 sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search tickets, branches, reports..."
            className="w-full rounded-lg border border-transparent bg-neutral-100 py-2 pl-10 pr-4 text-sm outline-none transition-all duration-150 focus:border-primary-600 focus:bg-white focus:ring-2 focus:ring-primary-600/15 lg:pr-16"
          />
          <span className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-[11px] text-neutral-400 lg:block">
            Ctrl K
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button className="relative rounded-lg p-2 transition-colors hover:bg-neutral-100" aria-label="Notifications">
          <Bell size={18} className="text-neutral-600" />
          <BadgeCount count={5} className="absolute -right-0.5 -top-0.5 scale-75" />
        </button>

        <div className="hidden h-8 w-px bg-neutral-200 sm:block" />

        <button className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-neutral-100 sm:gap-3">
          <Avatar name={user?.name || 'Guest'} size="sm" status="online" />
          <div className="hidden text-left md:block">
            <div className="text-sm font-medium text-neutral-900">{user?.name || 'Guest'}</div>
            <div className="text-xs text-neutral-500">{user?.organization || ''}</div>
          </div>
          <ChevronDown size={14} className="text-neutral-400" />
        </button>
      </div>
    </header>
  );
}
