import { useCallback, useEffect, useRef } from 'react';

export function useAutoScroll(trigger: unknown, enabled = true) {
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    scrollAnchorRef.current?.scrollIntoView({ behavior, block: 'end' });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    scrollToBottom();
  }, [enabled, scrollToBottom, trigger]);

  return { scrollAnchorRef, scrollToBottom };
}
