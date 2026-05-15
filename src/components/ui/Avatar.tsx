import { cn } from '../../lib/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'away';
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function Avatar({ name, src, size = 'md', className, status }: AvatarProps) {
  return (
    <div className="relative inline-flex">
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-800 font-semibold overflow-hidden shrink-0',
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white',
            status === 'online' && 'bg-success-500',
            status === 'offline' && 'bg-neutral-300',
            status === 'away' && 'bg-warning-500',
          )}
        />
      )}
    </div>
  );
}
