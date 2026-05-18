import type { FormEvent, KeyboardEvent } from 'react';
import { Paperclip, Send, SmilePlus } from 'lucide-react';
import { Button } from '../ui/Button';

interface MessageComposerProps {
  value: string;
  disabled?: boolean;
  isSending?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function MessageComposer({ value, disabled = false, isSending = false, onChange, onSend }: MessageComposerProps) {
  const canSend = value.trim().length > 0 && !disabled && !isSending;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSend) onSend();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (canSend) onSend();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-neutral-100 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
      <div className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2 shadow-inner focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-600/10">
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-neutral-500 transition-colors hover:bg-white hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20"
          aria-label="Attach file"
        >
          <Paperclip size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-neutral-500 transition-colors hover:bg-white hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600/20"
          aria-label="Add emoji"
        >
          <SmilePlus size={18} aria-hidden="true" />
        </button>
        <label htmlFor="live-support-message" className="sr-only">
          Message staffing support
        </label>
        <textarea
          id="live-support-message"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={900}
          placeholder="Message PS staffing support..."
          disabled={disabled}
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-6 text-neutral-900 outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed"
          aria-describedby="live-support-message-helper"
        />
        <Button
          type="submit"
          size="icon"
          className="h-10 w-10 shrink-0 rounded-xl"
          disabled={!canSend}
          isLoading={isSending}
          aria-label="Send message"
        >
          {!isSending && <Send size={17} aria-hidden="true" />}
        </Button>
      </div>
      <div id="live-support-message-helper" className="mt-2 px-1 text-[11px] text-neutral-400">
        Enter sends. Shift + Enter adds a new line.
      </div>
    </form>
  );
}
