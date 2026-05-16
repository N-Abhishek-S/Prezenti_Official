import { cn } from '../../lib/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
  flat?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = true, interactive, flat, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'min-w-0 bg-white border border-neutral-200 rounded-lg transition-all duration-200',
        !flat && 'shadow-card',
        hover && !flat && 'hover:shadow-card-hover',
        interactive && 'cursor-pointer hover:border-primary-200 hover:-translate-y-0.5 hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-4 sm:px-6 sm:py-5', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-4 sm:p-6', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-neutral-200 bg-surface-secondary rounded-b-lg', className)}>
      {children}
    </div>
  );
}

interface KpiCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  iconBg?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function KpiCard({ label, value, change, changeLabel, icon, iconBg, trend }: KpiCardProps) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500 font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-neutral-900 tracking-tight">{value}</p>
          {(change !== undefined || changeLabel) && (
            <div className={cn(
              'inline-flex items-center gap-1 text-xs font-medium mt-2',
              trend === 'up' && 'text-success-600',
              trend === 'down' && 'text-critical-500',
              trend === 'neutral' && 'text-neutral-500',
            )}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {change !== undefined && `${Math.abs(change)}%`}
              {changeLabel && <span className="text-neutral-400 ml-1">{changeLabel}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-lg', iconBg || 'bg-primary-50 text-primary-800')}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
