import { cn } from '../../lib/cn';
import type { HeroRole } from './heroConfig';

interface RoleSwitcherProps {
  roles: readonly HeroRole[];
  activeRoleIndex: number;
  onRoleSelect: (index: number) => void;
  className?: string;
  compact?: boolean;
}

export function RoleSwitcher({
  roles,
  activeRoleIndex,
  onRoleSelect,
  className,
  compact = false,
}: RoleSwitcherProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {roles.map((role, index) => {
        const isActive = index === activeRoleIndex;

        return (
          <button
            key={role.id}
            type="button"
            aria-pressed={isActive}
            aria-label={`Show ${role.title}`}
            onClick={() => onRoleSelect(index)}
            className={cn(
              'rounded-lg border font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20',
              compact ? 'h-9 px-3 text-xs' : 'px-3 py-2 text-xs',
              isActive
                ? 'border-transparent text-white shadow-[0_12px_28px_rgba(10,42,34,0.16)]'
                : 'border-white/70 bg-white/78 text-neutral-700 backdrop-blur-xl hover:border-primary-100 hover:bg-white hover:text-neutral-950',
            )}
            style={isActive ? { backgroundColor: role.accent } : undefined}
          >
            {compact ? role.name.replace(' Excellence', '').replace(' Teams', '') : role.title}
          </button>
        );
      })}
    </div>
  );
}
