import { useEffect } from 'react';
import { ChatLayout } from '../components/chat/ChatLayout';

export function LiveSupport() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return <ChatLayout />;
}
