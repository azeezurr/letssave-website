/**
 * Animation utility functions for smooth animations and timing orchestration
 * Requirements: 1.1, 2.1
 */

/**
 * Easing functions for smooth animations
 * These functions take a time value t (0-1) and return an eased value (0-1)
 */
export const easing = {
  /**
   * Linear easing - no acceleration
   */
  linear: (t: number): number => t,

  /**
   * Ease in quad - accelerating from zero velocity
   */
  easeInQuad: (t: number): number => t * t,

  /**
   * Ease out quad - decelerating to zero velocity
   */
  easeOutQuad: (t: number): number => t * (2 - t),

  /**
   * Ease in-out quad - acceleration until halfway, then deceleration
   */
  easeInOutQuad: (t: number): number => 
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

  /**
   * Ease in cubic - accelerating from zero velocity
   */
  easeInCubic: (t: number): number => t * t * t,

  /**
   * Ease out cubic - decelerating to zero velocity
   */
  easeOutCubic: (t: number): number => {
    const t1 = t - 1;
    return t1 * t1 * t1 + 1;
  },

  /**
   * Ease in-out cubic - acceleration until halfway, then deceleration
   */
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  /**
   * Ease in quart - accelerating from zero velocity
   */
  easeInQuart: (t: number): number => t * t * t * t,

  /**
   * Ease out quart - decelerating to zero velocity
   */
  easeOutQuart: (t: number): number => {
    const t1 = t - 1;
    return 1 - t1 * t1 * t1 * t1;
  },

  /**
   * Ease in-out quart - acceleration until halfway, then deceleration
   */
  easeInOutQuart: (t: number): number => {
    const t1 = t - 1;
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
  },

  /**
   * Ease in expo - exponential accelerating from zero velocity
   */
  easeInExpo: (t: number): number => 
    t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),

  /**
   * Ease out expo - exponential decelerating to zero velocity
   */
  easeOutExpo: (t: number): number => 
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t),

  /**
   * Ease in-out expo - exponential acceleration until halfway, then deceleration
   */
  easeInOutExpo: (t: number): number => {
    if (t === 0 || t === 1) return t;
    if (t < 0.5) {
      return Math.pow(2, 20 * t - 10) / 2;
    }
    return (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
};

/**
 * Calculate stagger delay for sequential animations
 * @param index - The index of the element in the sequence
 * @param baseDelay - The base delay in milliseconds (default: 100ms)
 * @param maxDelay - Maximum delay cap in milliseconds (optional)
 * @returns The calculated delay in milliseconds
 */
export function calculateStaggerDelay(
  index: number,
  baseDelay: number = 100,
  maxDelay?: number
): number {
  const delay = index * baseDelay;
  return maxDelay !== undefined ? Math.min(delay, maxDelay) : delay;
}

/**
 * Calculate stagger delays for a collection of elements
 * @param count - Number of elements
 * @param baseDelay - The base delay in milliseconds (default: 100ms)
 * @param maxDelay - Maximum delay cap in milliseconds (optional)
 * @returns Array of delays in milliseconds
 */
export function calculateStaggerDelays(
  count: number,
  baseDelay: number = 100,
  maxDelay?: number
): number[] {
  return Array.from({ length: count }, (_, index) =>
    calculateStaggerDelay(index, baseDelay, maxDelay)
  );
}

/**
 * Timing utilities for animation orchestration
 */
export const timing = {
  /**
   * Convert milliseconds to seconds
   */
  msToSeconds: (ms: number): number => ms / 1000,

  /**
   * Convert seconds to milliseconds
   */
  secondsToMs: (seconds: number): number => seconds * 1000,

  /**
   * Create a delay promise for async animation sequencing
   * @param ms - Delay in milliseconds
   * @returns Promise that resolves after the delay
   */
  delay: (ms: number): Promise<void> => 
    new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Request animation frame as a promise
   * @returns Promise that resolves on the next animation frame
   */
  nextFrame: (): Promise<number> =>
    new Promise(resolve => requestAnimationFrame(resolve)),

  /**
   * Wait for multiple animation frames
   * @param frames - Number of frames to wait
   * @returns Promise that resolves after the specified frames
   */
  waitFrames: async (frames: number): Promise<void> => {
    for (let i = 0; i < frames; i++) {
      await timing.nextFrame();
    }
  },

  /**
   * Calculate animation progress (0-1) based on elapsed time
   * @param startTime - Animation start timestamp
   * @param duration - Animation duration in milliseconds
   * @param currentTime - Current timestamp (defaults to Date.now())
   * @returns Progress value between 0 and 1
   */
  calculateProgress: (
    startTime: number,
    duration: number,
    currentTime: number = Date.now()
  ): number => {
    const elapsed = currentTime - startTime;
    return Math.min(Math.max(elapsed / duration, 0), 1);
  },

  /**
   * Clamp a value between min and max
   * @param value - Value to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Clamped value
   */
  clamp: (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max),

  /**
   * Linear interpolation between two values
   * @param start - Start value
   * @param end - End value
   * @param progress - Progress value (0-1)
   * @returns Interpolated value
   */
  lerp: (start: number, end: number, progress: number): number =>
    start + (end - start) * progress,
};

/**
 * Animation orchestration helper for coordinating multiple animations
 */
export class AnimationOrchestrator {
  private animations: Map<string, number> = new Map();

  /**
   * Register an animation with a unique key
   * @param key - Unique identifier for the animation
   * @param startTime - Animation start timestamp
   */
  register(key: string, startTime: number = Date.now()): void {
    this.animations.set(key, startTime);
  }

  /**
   * Get the start time of a registered animation
   * @param key - Animation identifier
   * @returns Start timestamp or undefined if not found
   */
  getStartTime(key: string): number | undefined {
    return this.animations.get(key);
  }

  /**
   * Check if an animation is registered
   * @param key - Animation identifier
   * @returns True if animation exists
   */
  has(key: string): boolean {
    return this.animations.has(key);
  }

  /**
   * Remove an animation from the orchestrator
   * @param key - Animation identifier
   */
  unregister(key: string): void {
    this.animations.delete(key);
  }

  /**
   * Clear all registered animations
   */
  clear(): void {
    this.animations.clear();
  }

  /**
   * Get the number of registered animations
   */
  get count(): number {
    return this.animations.size;
  }
}

/**
 * Create a staggered animation sequence
 * @param elements - Array of elements or element count
 * @param animationFn - Function to call for each element with (element, delay)
 * @param baseDelay - Base delay between animations in milliseconds
 * @param maxDelay - Maximum delay cap in milliseconds
 */
export async function createStaggeredSequence<T>(
  elements: T[] | number,
  animationFn: (element: T | number, delay: number, index: number) => void | Promise<void>,
  baseDelay: number = 100,
  maxDelay?: number
): Promise<void> {
  const count = typeof elements === 'number' ? elements : elements.length;
  const delays = calculateStaggerDelays(count, baseDelay, maxDelay);

  const promises = delays.map(async (delay, index) => {
    await timing.delay(delay);
    const element = typeof elements === 'number' ? index : elements[index];
    return animationFn(element, delay, index);
  });

  await Promise.all(promises);
}
