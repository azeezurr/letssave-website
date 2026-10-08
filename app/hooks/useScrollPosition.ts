import { useEffect, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}): ScrollPosition {
  const { throttleMs = 100 } = options;
  
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId !== null) return;

      timeoutId = setTimeout(() => {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY,
        });
        timeoutId = null;
      }, throttleMs);
    };

    // Set initial position
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY,
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  return scrollPosition;
}
