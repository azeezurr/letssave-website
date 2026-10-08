/**
 * Tests for animation utility functions
 * Requirements: 1.1, 2.1
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import {
  easing,
  calculateStaggerDelay,
  calculateStaggerDelays,
  timing,
  AnimationOrchestrator,
  createStaggeredSequence,
} from './animations';

describe('Easing Functions', () => {
  it('should return correct values for linear easing', () => {
    expect(easing.linear(0)).toBe(0);
    expect(easing.linear(0.5)).toBe(0.5);
    expect(easing.linear(1)).toBe(1);
  });

  it('should return correct values for easeInQuad', () => {
    expect(easing.easeInQuad(0)).toBe(0);
    expect(easing.easeInQuad(0.5)).toBe(0.25);
    expect(easing.easeInQuad(1)).toBe(1);
  });

  it('should return correct values for easeOutQuad', () => {
    expect(easing.easeOutQuad(0)).toBe(0);
    expect(easing.easeOutQuad(1)).toBe(1);
  });

  it('should return values between 0 and 1 for all easing functions', () => {
    const easingFunctions = Object.values(easing);
    const testValues = [0, 0.25, 0.5, 0.75, 1];

    easingFunctions.forEach((easingFn) => {
      testValues.forEach((t) => {
        const result = easingFn(t);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(1);
      });
    });
  });
});

describe('Stagger Delay Calculations', () => {
  it('should calculate stagger delay correctly', () => {
    expect(calculateStaggerDelay(0, 100)).toBe(0);
    expect(calculateStaggerDelay(1, 100)).toBe(100);
    expect(calculateStaggerDelay(2, 100)).toBe(200);
    expect(calculateStaggerDelay(5, 50)).toBe(250);
  });

  it('should respect max delay cap', () => {
    expect(calculateStaggerDelay(10, 100, 500)).toBe(500);
    expect(calculateStaggerDelay(3, 100, 500)).toBe(300);
  });

  it('should calculate delays for multiple elements', () => {
    const delays = calculateStaggerDelays(3, 100);
    expect(delays).toEqual([0, 100, 200]);
  });

  it('should calculate delays with max cap for multiple elements', () => {
    const delays = calculateStaggerDelays(5, 100, 300);
    expect(delays).toEqual([0, 100, 200, 300, 300]);
  });
});

describe('Timing Utilities', () => {
  it('should convert milliseconds to seconds', () => {
    expect(timing.msToSeconds(1000)).toBe(1);
    expect(timing.msToSeconds(500)).toBe(0.5);
    expect(timing.msToSeconds(2500)).toBe(2.5);
  });

  it('should convert seconds to milliseconds', () => {
    expect(timing.secondsToMs(1)).toBe(1000);
    expect(timing.secondsToMs(0.5)).toBe(500);
    expect(timing.secondsToMs(2.5)).toBe(2500);
  });

  it('should calculate animation progress correctly', () => {
    const startTime = 1000;
    const duration = 1000;

    expect(timing.calculateProgress(startTime, duration, 1000)).toBe(0);
    expect(timing.calculateProgress(startTime, duration, 1500)).toBe(0.5);
    expect(timing.calculateProgress(startTime, duration, 2000)).toBe(1);
    expect(timing.calculateProgress(startTime, duration, 2500)).toBe(1); // Clamped to 1
  });

  it('should clamp values correctly', () => {
    expect(timing.clamp(5, 0, 10)).toBe(5);
    expect(timing.clamp(-5, 0, 10)).toBe(0);
    expect(timing.clamp(15, 0, 10)).toBe(10);
  });

  it('should interpolate values correctly', () => {
    expect(timing.lerp(0, 100, 0)).toBe(0);
    expect(timing.lerp(0, 100, 0.5)).toBe(50);
    expect(timing.lerp(0, 100, 1)).toBe(100);
    expect(timing.lerp(50, 150, 0.5)).toBe(100);
  });

  it('should create delay promise', async () => {
    const start = Date.now();
    await timing.delay(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45); // Allow small margin
  });
});

describe('AnimationOrchestrator', () => {
  let orchestrator: AnimationOrchestrator;

  beforeEach(() => {
    orchestrator = new AnimationOrchestrator();
  });

  it('should register animations', () => {
    orchestrator.register('test', 1000);
    expect(orchestrator.has('test')).toBe(true);
    expect(orchestrator.getStartTime('test')).toBe(1000);
  });

  it('should unregister animations', () => {
    orchestrator.register('test', 1000);
    orchestrator.unregister('test');
    expect(orchestrator.has('test')).toBe(false);
  });

  it('should clear all animations', () => {
    orchestrator.register('test1', 1000);
    orchestrator.register('test2', 2000);
    expect(orchestrator.count).toBe(2);
    orchestrator.clear();
    expect(orchestrator.count).toBe(0);
  });

  it('should track animation count', () => {
    expect(orchestrator.count).toBe(0);
    orchestrator.register('test1', 1000);
    expect(orchestrator.count).toBe(1);
    orchestrator.register('test2', 2000);
    expect(orchestrator.count).toBe(2);
  });
});

describe('Staggered Sequence', () => {
  it('should execute animations in staggered sequence', async () => {
    const results: number[] = [];
    const animationFn = vi.fn((element: number) => {
      results.push(element);
    });

    await createStaggeredSequence([1, 2, 3], animationFn, 10);

    expect(animationFn).toHaveBeenCalledTimes(3);
    expect(results).toEqual([1, 2, 3]);
  });

  it('should work with element count instead of array', async () => {
    const results: number[] = [];
    const animationFn = vi.fn((element: number) => {
      results.push(element);
    });

    await createStaggeredSequence(3, animationFn, 10);

    expect(animationFn).toHaveBeenCalledTimes(3);
    expect(results).toEqual([0, 1, 2]);
  });
});

describe('Property-Based Tests', () => {
  /**
   * Feature: website-ux-enhancement, Property 1: Hero animation timing consistency
   * Validates: Requirements 1.1
   * 
   * Property: For any page load, the hero section fade-in animation should complete 
   * within 300 milliseconds from DOM ready.
   * 
   * This test verifies that animation progress calculations correctly handle the 300ms
   * duration constraint and that animations complete (progress = 1) when the elapsed
   * time reaches or exceeds the duration.
   */
  it('should ensure hero animation completes within 300ms duration', () => {
    const HERO_ANIMATION_DURATION = 300; // milliseconds as per requirement 1.1

    fc.assert(
      fc.property(
        // Generate random start times (simulating different page load times)
        fc.integer({ min: 0, max: 1000000 }),
        // Generate random elapsed times from 0 to 500ms (testing before, at, and after 300ms)
        fc.integer({ min: 0, max: 500 }),
        (startTime, elapsedTime) => {
          const currentTime = startTime + elapsedTime;
          const progress = timing.calculateProgress(
            startTime,
            HERO_ANIMATION_DURATION,
            currentTime
          );

          // Progress should always be between 0 and 1
          expect(progress).toBeGreaterThanOrEqual(0);
          expect(progress).toBeLessThanOrEqual(1);

          // If elapsed time is 0, progress should be 0
          if (elapsedTime === 0) {
            expect(progress).toBe(0);
          }

          // If elapsed time >= duration (300ms), progress should be 1 (animation complete)
          if (elapsedTime >= HERO_ANIMATION_DURATION) {
            expect(progress).toBe(1);
          }

          // If elapsed time < duration, progress should be proportional
          if (elapsedTime < HERO_ANIMATION_DURATION) {
            const expectedProgress = elapsedTime / HERO_ANIMATION_DURATION;
            expect(progress).toBeCloseTo(expectedProgress, 10);
          }

          // Animation should complete exactly at 300ms
          if (elapsedTime === HERO_ANIMATION_DURATION) {
            expect(progress).toBe(1);
          }
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });

  /**
   * Feature: website-ux-enhancement, Property 2: Hover feedback responsiveness
   * Validates: Requirements 1.4, 15.1
   * 
   * Property: For any interactive button element, hover state transitions should 
   * trigger within 150 milliseconds of mouse enter event.
   * 
   * This test verifies that hover feedback timing calculations correctly handle the 
   * 150ms duration constraint and that hover transitions complete (progress = 1) when 
   * the elapsed time reaches or exceeds the duration.
   */
  it('should ensure hover feedback completes within 150ms duration', () => {
    const HOVER_FEEDBACK_DURATION = 150; // milliseconds as per requirements 1.4, 15.1

    fc.assert(
      fc.property(
        // Generate random hover start times (simulating different interaction times)
        fc.integer({ min: 0, max: 1000000 }),
        // Generate random elapsed times from 0 to 300ms (testing before, at, and after 150ms)
        fc.integer({ min: 0, max: 300 }),
        (hoverStartTime, elapsedTime) => {
          const currentTime = hoverStartTime + elapsedTime;
          const progress = timing.calculateProgress(
            hoverStartTime,
            HOVER_FEEDBACK_DURATION,
            currentTime
          );

          // Progress should always be between 0 and 1
          expect(progress).toBeGreaterThanOrEqual(0);
          expect(progress).toBeLessThanOrEqual(1);

          // If elapsed time is 0, progress should be 0 (hover just started)
          if (elapsedTime === 0) {
            expect(progress).toBe(0);
          }

          // If elapsed time >= duration (150ms), progress should be 1 (hover feedback complete)
          if (elapsedTime >= HOVER_FEEDBACK_DURATION) {
            expect(progress).toBe(1);
          }

          // If elapsed time < duration, progress should be proportional
          if (elapsedTime < HOVER_FEEDBACK_DURATION) {
            const expectedProgress = elapsedTime / HOVER_FEEDBACK_DURATION;
            expect(progress).toBeCloseTo(expectedProgress, 10);
          }

          // Hover feedback should complete exactly at 150ms
          if (elapsedTime === HOVER_FEEDBACK_DURATION) {
            expect(progress).toBe(1);
          }

          // Verify that the transition is responsive (completes within 150ms)
          // Any elapsed time >= 150ms should show complete transition
          if (elapsedTime >= HOVER_FEEDBACK_DURATION) {
            expect(progress).toBe(1);
          }
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });
});
