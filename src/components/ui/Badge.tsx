import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full leading-relaxed',
  {
    variants: {
      variant: {
        success: 'bg-success-100 text-success-600',
        warning: 'bg-warning-100 text-warning-600',
        critical: 'bg-critical-100 text-critical-600',
        info: 'bg-info-100 text-info-600',
        neutral: 'bg-neutral-100 text-neutral-700',
        primary: 'bg-primary-50 text-primary-800',
        teal: 'bg-teal-100 text-teal-700',
      },
      size: {
        sm: 'px-2 py-0.5 text-[11px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant, size, className, dot }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

interface BadgeCountProps {
  count: number;
  className?: string;
}

export function BadgeCount({ count, className }: BadgeCountProps) {
  return (
    <span className={cn(
      'inline-flex items-center justify-center min-w-[1.25rem] min-h-[1.25rem] py-0.5 px-1.5 text-[11px] font-semibold rounded-full bg-critical-500 text-white break-words',
      className
    )}>
      {count > 99 ? '99+' : count}
    </span>
  );
}
