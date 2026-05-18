import { AlertCircle, CheckCircle2, Loader2, WifiOff } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { ConnectionStatus as ConnectionStatusType } from '../../types/chat';

interface ConnectionStatusProps {
  status: ConnectionStatusType;
  queueCount?: number;
  isTyping?: boolean;
  className?: string;
}

export function ConnectionStatus({ status, queueCount = 0, isTyping = false, className }: ConnectionStatusProps) {
  const statusConfig = {
    online: {
      label: isTyping ? 'AI thinking' : 'Online',
      icon: isTyping ? Loader2 : CheckCircle2,
      className: 'border-success-100 bg-success-50 text-success-600',
    },
    connecting: {
      label: queueCount > 0 ? `${queueCount} queued` : 'Connecting',
      icon: Loader2,
      className: 'border-warning-100 bg-warning-50 text-warning-600',
    },
    offline: {
      label: 'Offline',
      icon: WifiOff,
      className: 'border-critical-100 bg-critical-50 text-critical-600',
    },
    error: {
      label: 'Needs retry',
      icon: AlertCircle,
      className: 'border-warning-100 bg-warning-50 text-warning-600',
    },
  } satisfies Record<ConnectionStatusType, { label: string; icon: typeof CheckCircle2; className: string }>;

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold', config.className, className)}>
      <Icon size={13} className={cn((status === 'connecting' || isTyping) && 'animate-spin')} aria-hidden="true" />
      {config.label}
    </span>
  );
}
