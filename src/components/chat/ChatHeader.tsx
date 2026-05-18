import { Info, Menu, MoreHorizontal, PhoneCall, Video } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ChatConversation, ConnectionStatus as ConnectionStatusType } from '../../types/chat';
import { ConnectionStatus } from './ConnectionStatus';

interface ChatHeaderProps {
  conversation: ChatConversation;
  connectionStatus: ConnectionStatusType;
  isTyping: boolean;
  queueCount: number;
  onOpenSidebar: () => void;
  onToggleCustomerPanel: () => void;
}

export function ChatHeader({
  conversation,
  connectionStatus,
  isTyping,
  queueCount,
  onOpenSidebar,
  onToggleCustomerPanel,
}: ChatHeaderProps) {
  return (
    <header className="flex min-h-18 items-center justify-between gap-3 border-b border-neutral-100 bg-white/95 px-3 py-3 backdrop-blur sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20 lg:hidden"
          onClick={onOpenSidebar}
          aria-label="Open conversations"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-sm font-bold text-primary-800">
          {conversation.customer.avatarInitials}
          <span
            className={`absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
              conversation.isOnline ? 'bg-success-400' : 'bg-neutral-300'
            }`}
          />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-neutral-950">{conversation.title}</h2>
          <p className="truncate text-xs text-neutral-500">Staffing support agent - {conversation.customer.staffingCategory}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <ConnectionStatus status={connectionStatus} isTyping={isTyping} queueCount={queueCount} className="hidden sm:inline-flex" />
        <Button type="button" variant="ghost" size="icon" className="hidden rounded-xl sm:inline-flex" aria-label="Start voice call">
          <PhoneCall size={17} aria-hidden="true" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="hidden rounded-xl sm:inline-flex" aria-label="Start video call">
          <Video size={17} aria-hidden="true" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="rounded-xl xl:hidden" onClick={onToggleCustomerPanel} aria-label="Open customer information">
          <Info size={18} aria-hidden="true" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="hidden rounded-xl sm:inline-flex" aria-label="More conversation actions">
          <MoreHorizontal size={19} aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
