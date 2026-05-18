import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { ChatSidebar } from './ChatSidebar';
import { ChatWindow } from './ChatWindow';
import { CustomerInfoPanel } from './CustomerInfoPanel';
import { MessageComposer } from './MessageComposer';
import { QuickPrompts } from './QuickPrompts';
import { useChat } from '../../hooks/useChat';
import { cn } from '../../lib/cn';

export function ChatLayout() {
  const chat = useChat();
  const [draft, setDraft] = useState('');

  useEffect(() => {
    window.addEventListener('online', chat.handleOnline);
    window.addEventListener('offline', chat.handleOffline);

    return () => {
      window.removeEventListener('online', chat.handleOnline);
      window.removeEventListener('offline', chat.handleOffline);
    };
  }, [chat.handleOffline, chat.handleOnline]);

  const submitDraft = () => {
    const message = draft.trim();
    if (!message) return;

    setDraft('');
    void chat.sendMessage(message);
  };

  const sendPrompt = (message: string) => {
    setDraft('');
    void chat.sendMessage(message);
  };

  const startConversation = () => {
    void chat.sendMessage('I want to discuss my staffing requirement.');
  };

  const isComposerDisabled = chat.connectionStatus === 'offline';

  return (
    <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#F8FAFB_0%,#F0F8F3_48%,#EAF7F5_100%)] pt-18">
      <div className="absolute inset-x-0 top-0 h-36 bg-white/75" />
      <div className="relative mx-auto h-[calc(100svh-72px)] max-w-[1680px] p-2 sm:p-4 lg:p-5">
        <div className="flex h-full min-h-0 overflow-hidden rounded-[28px] border border-neutral-200 bg-white/80 shadow-[0_32px_110px_rgba(10,42,34,0.16)] backdrop-blur-xl">
          <ChatSidebar
            conversations={chat.filteredConversations}
            activeConversationId={chat.activeConversationId}
            collapsed={chat.isSidebarCollapsed}
            searchQuery={chat.searchQuery}
            filter={chat.filter}
            onSearchChange={chat.setSearchQuery}
            onFilterChange={chat.setFilter}
            onSelectConversation={chat.selectConversation}
            onToggleCollapse={() => chat.setIsSidebarCollapsed((collapsed) => !collapsed)}
          />

          <div className="flex min-w-0 flex-1 flex-col bg-white">
            <ChatHeader
              conversation={chat.activeConversation}
              connectionStatus={chat.connectionStatus}
              isTyping={chat.isTyping}
              queueCount={chat.messageQueue.length}
              onOpenSidebar={() => chat.setIsMobileSidebarOpen(true)}
              onToggleCustomerPanel={() => chat.setIsCustomerPanelOpen(true)}
            />
            <ChatWindow
              conversation={chat.activeConversation}
              isTyping={chat.isTyping}
              errorState={chat.errorState}
              onRetry={chat.retryLastMessage}
              onStartConversation={startConversation}
            />
            <QuickPrompts prompts={chat.quickPrompts} disabled={chat.isSending || isComposerDisabled} onPromptSelect={sendPrompt} />
            <MessageComposer
              value={draft}
              onChange={setDraft}
              onSend={submitDraft}
              disabled={isComposerDisabled}
              isSending={chat.isSending}
            />
          </div>

          <CustomerInfoPanel conversation={chat.activeConversation} />
        </div>
      </div>

      <AnimatePresence>
        {chat.isMobileSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-neutral-950/35 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => chat.setIsMobileSidebarOpen(false)}
          >
            <motion.div
              className="h-full"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <ChatSidebar
                mobile
                conversations={chat.filteredConversations}
                activeConversationId={chat.activeConversationId}
                searchQuery={chat.searchQuery}
                filter={chat.filter}
                onSearchChange={chat.setSearchQuery}
                onFilterChange={chat.setFilter}
                onSelectConversation={chat.selectConversation}
                onToggleCollapse={() => chat.setIsSidebarCollapsed((collapsed) => !collapsed)}
                onCloseMobile={() => chat.setIsMobileSidebarOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chat.isCustomerPanelOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end bg-neutral-950/35 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => chat.setIsCustomerPanelOpen(false)}
          >
            <motion.div
              className={cn('h-full')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <CustomerInfoPanel conversation={chat.activeConversation} mobile onClose={() => chat.setIsCustomerPanelOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
