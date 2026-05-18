import { ChevronLeft, ChevronRight, MessageSquareText, Search, SlidersHorizontal, UsersRound, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { ChatConversation, ConversationFilter } from '../../types/chat';
import { ConversationItem } from './ConversationItem';

interface ChatSidebarProps {
  conversations: readonly ChatConversation[];
  activeConversationId: string;
  collapsed?: boolean;
  mobile?: boolean;
  searchQuery: string;
  filter: ConversationFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: ConversationFilter) => void;
  onSelectConversation: (conversationId: string) => void;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
}

const filterOptions: Array<{ value: ConversationFilter; label: string }> = [
  { value: 'all', label: 'All conversations' },
  { value: 'unread', label: 'Unread' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'open', label: 'Open leads' },
];

export function ChatSidebar({
  conversations,
  activeConversationId,
  collapsed = false,
  mobile = false,
  searchQuery,
  filter,
  onSearchChange,
  onFilterChange,
  onSelectConversation,
  onToggleCollapse,
  onCloseMobile,
}: ChatSidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full min-h-0 flex-col border-neutral-200 bg-white',
        mobile ? 'w-[min(92vw,380px)] border-r shadow-[0_30px_100px_rgba(10,42,34,0.22)]' : 'hidden border-r transition-all duration-300 lg:flex',
        !mobile && (collapsed ? 'w-22' : 'w-92'),
      )}
      aria-label="Live support conversations"
    >
      <div className={cn('border-b border-neutral-100 p-4', collapsed && !mobile && 'px-2')}>
        <div className={cn('flex items-center gap-3', collapsed && !mobile && 'justify-center')}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white shadow-[0_16px_34px_rgba(18,63,53,0.2)]">
            <MessageSquareText size={20} aria-hidden="true" />
          </div>
          {(!collapsed || mobile) && (
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold text-neutral-950">PS Live Support</h1>
              <p className="mt-0.5 truncate text-xs text-neutral-500">Staffing conversation desk</p>
            </div>
          )}
          {mobile ? (
            <button
              type="button"
              className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20"
              onClick={onCloseMobile}
              aria-label="Close conversation sidebar"
            >
              <X size={18} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20"
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={18} aria-hidden="true" /> : <ChevronLeft size={18} aria-hidden="true" />}
            </button>
          )}
        </div>

        {(!collapsed || mobile) && (
          <div className="mt-4 space-y-3">
            <label className="relative block">
              <span className="sr-only">Search conversations</span>
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search conversations"
                className="h-11 w-full rounded-2xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-400 focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-600/10"
              />
            </label>

            <label className="relative block">
              <span className="sr-only">Filter conversations</span>
              <SlidersHorizontal size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
              <select
                value={filter}
                onChange={(event) => onFilterChange(event.target.value as ConversationFilter)}
                className="h-11 w-full appearance-none rounded-2xl border border-neutral-200 bg-white pl-9 pr-8 text-sm font-medium text-neutral-700 outline-none transition-all focus:border-primary-300 focus:ring-4 focus:ring-primary-600/10"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      <div className={cn('flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400', collapsed && !mobile && 'justify-center px-2')}>
        {(!collapsed || mobile) ? (
          <>
            <span>Inbox</span>
            <span className="inline-flex items-center gap-1 normal-case tracking-normal text-neutral-500">
              <UsersRound size={13} aria-hidden="true" />
              {conversations.length}
            </span>
          </>
        ) : (
          <UsersRound size={16} aria-label="Inbox" />
        )}
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-4">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === activeConversationId}
            collapsed={collapsed && !mobile}
            onSelect={onSelectConversation}
          />
        ))}
      </div>
    </aside>
  );
}
