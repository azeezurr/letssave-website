import { useEffect, useState } from 'react';

interface UseAnimatedCounterOptions {
  duration?: number;
  easing?: (t: number) => number;
  startOnMount?: boolean;
}

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
): number {
  const { duration = 2000, easing = (t) => t, startOnMount = true } = options;
  
  const [currentValue, setCurrentValue] = useState(startOnMount ? 0 : targetValue);

  useEffect(() => {
    if (!startOnMount) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing function
      const easedProgress = easing(progress);
      
      // Calculate current value
      const value = easedProgress * targetValue;
      setCurrentValue(value);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, duration, easing, startOnMount]);

  return currentValue;
}
