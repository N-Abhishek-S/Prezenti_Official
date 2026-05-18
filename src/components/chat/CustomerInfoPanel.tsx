import { BadgeCheck, BriefcaseBusiness, ClipboardCheck, MapPin, Phone, UserRound, UsersRound, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { ChatConversation } from '../../types/chat';

interface CustomerInfoPanelProps {
  conversation: ChatConversation;
  mobile?: boolean;
  onClose?: () => void;
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-primary-800 shadow-card">
        <Icon size={17} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{label}</div>
        <div className="mt-1 text-sm font-semibold leading-5 text-neutral-900">{value}</div>
      </div>
    </div>
  );
}

export function CustomerInfoPanel({ conversation, mobile = false, onClose }: CustomerInfoPanelProps) {
  return (
    <aside
      className={cn(
        'flex h-full min-h-0 flex-col border-l border-neutral-200 bg-white',
        mobile ? 'w-[min(92vw,380px)] shadow-[0_30px_100px_rgba(10,42,34,0.22)]' : 'hidden w-86 xl:flex',
      )}
      aria-label="Customer information"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 p-5">
        <div>
          <h2 className="text-base font-semibold text-neutral-950">Customer info</h2>
          <p className="mt-1 text-xs text-neutral-500">Lead context and staffing profile</p>
        </div>
        {mobile && (
          <button
            type="button"
            className="rounded-xl p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20"
            onClick={onClose}
            aria-label="Close customer information"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="text-center">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-3xl bg-primary-800 text-xl font-bold text-white shadow-[0_18px_42px_rgba(18,63,53,0.22)]">
            {conversation.customer.avatarInitials}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-950">{conversation.customer.name}</h3>
          <p className="mt-1 text-sm text-neutral-500">{conversation.customer.organizationType}</p>
          <div className="mt-4 inline-flex rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
            {conversation.customer.leadStatus}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <InfoRow icon={Phone} label="Phone" value={conversation.customer.phone} />
          <InfoRow icon={ClipboardCheck} label="Inquiry type" value={conversation.customer.inquiryType} />
          <InfoRow icon={BriefcaseBusiness} label="Staffing category" value={conversation.customer.staffingCategory} />
          <InfoRow icon={UsersRound} label="Estimated requirement" value={conversation.customer.estimatedRequirement} />
          <InfoRow icon={MapPin} label="Location" value={conversation.customer.location} />
        </div>

        <div className="mt-5 rounded-3xl border border-primary-100 bg-primary-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary-900">
            <BadgeCheck size={17} aria-hidden="true" />
            Suggested next step
          </div>
          <p className="text-sm leading-6 text-primary-800">
            Confirm role count, shift timing, site address, weekly off, and expected deployment date before moving this lead to proposal.
          </p>
        </div>
      </div>
    </aside>
  );
}
