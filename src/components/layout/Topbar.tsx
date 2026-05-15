import { Search, Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { BadgeCount } from '../ui/Badge';
import { useAppSelector } from '../../app/hooks';

export function Topbar() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 z-40 shadow-topbar">
      {/* Left: Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search tickets, branches, reports..."
          className="w-80 pl-10 pr-16 py-2 text-sm bg-neutral-100 border border-transparent rounded-lg transition-all duration-150 focus:bg-white focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15 focus:w-96 outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400 bg-white border border-neutral-200 rounded px-1.5 py-0.5">
          ⌘K
        </span>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors">
          <Bell size={18} className="text-neutral-600" />
          <BadgeCount count={5} className="absolute -top-0.5 -right-0.5 scale-75" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-neutral-200" />

        {/* User */}
        <button className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors">
          <Avatar name={user?.name || 'Guest'} size="sm" status="online" />
          <div className="text-left hidden md:block">
            <div className="text-sm font-medium text-neutral-900">{user?.name || 'Guest'}</div>
            <div className="text-xs text-neutral-500">{user?.organization || ''}</div>
          </div>
          <ChevronDown size={14} className="text-neutral-400" />
        </button>
      </div>
    </header>
  );
}
