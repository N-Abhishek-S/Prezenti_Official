import { useEffect, useRef, useState } from 'react';
import { Bot, CheckCircle2, WifiOff } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { cn } from '../../lib/cn';
import { ChatWindow } from './ChatWindow';
import { MessageComposer } from './MessageComposer';
import { QuickPrompts } from './QuickPrompts';

export function AssistantChatWindow() {
  const chat = useChat();
  const [draft, setDraft] = useState('');
  const initialPromptConsumed = useRef(false);

  useEffect(() => {
    window.addEventListener('online', chat.handleOnline);
    window.addEventListener('offline', chat.handleOffline);

    return () => {
      window.removeEventListener('online', chat.handleOnline);
      window.removeEventListener('offline', chat.handleOffline);
    };
  }, [chat.handleOffline, chat.handleOnline]);

  useEffect(() => {
    if (initialPromptConsumed.current) return;

    const initialPrompt = window.sessionStorage.getItem('presenti.chat.initialPrompt');
    if (!initialPrompt) return;

    initialPromptConsumed.current = true;
    window.sessionStorage.removeItem('presenti.chat.initialPrompt');
    void chat.sendMessage(initialPrompt, { bypassDuplicateCheck: true });
  }, [chat]);

  const isOffline = chat.connectionStatus === 'offline';

  const submitDraft = () => {
    const message = draft.trim();
    if (!message) return;

    setDraft('');
    void chat.sendMessage(message);
  };

  return (
    <section
      id="staffing-chat"
      aria-labelledby="staffing-chat-heading"
      className="flex h-[calc(100svh-104px)] min-h-[620px] w-full flex-col overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_30px_100px_rgba(10,42,34,0.13)] sm:h-[720px]"
    >
      <header className="border-b border-neutral-100 bg-white/95 px-4 py-4 backdrop-blur sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-800 text-white shadow-[0_16px_34px_rgba(18,63,53,0.24)]">
              <Bot size={23} aria-hidden="true" />
              <span
                className={cn(
                  'absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white',
                  isOffline ? 'bg-critical-400' : 'bg-success-400',
                )}
              />
            </div>
            <div className="min-w-0">
              <h2 id="staffing-chat-heading" className="truncate text-base font-semibold text-neutral-950 sm:text-lg">
                PS AI Staffing Assistant
              </h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                {isOffline ? <WifiOff size={13} className="text-critical-500" /> : <CheckCircle2 size={13} className="text-success-500" />}
                {isOffline ? 'Offline' : chat.isTyping ? 'Assistant typing' : 'Online'}
              </p>
            </div>
          </div>
          <div className="hidden rounded-full border border-primary-100 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-800 sm:inline-flex">
            24/7 support
          </div>
        </div>
      </header>

      <ChatWindow
        conversation={chat.activeConversation}
        isTyping={chat.isTyping}
        errorState={chat.errorState}
        onRetry={chat.retryLastMessage}
        onStartConversation={() => void chat.sendMessage('I want to discuss my staffing requirement.')}
      />

      {isOffline && (
        <div className="border-t border-critical-100 bg-critical-50 px-4 py-2 text-sm text-critical-600">
          You are offline. The assistant will be ready when your connection returns.
        </div>
      )}

      <QuickPrompts prompts={chat.quickPrompts.slice(0, 6)} disabled={chat.isSending || isOffline} onPromptSelect={(message) => void chat.sendMessage(message)} />
      <MessageComposer value={draft} onChange={setDraft} onSend={submitDraft} disabled={isOffline} isSending={chat.isSending} />
    </section>
  );
}
