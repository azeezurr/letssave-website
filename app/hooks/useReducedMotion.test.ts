import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';
import * as fc from 'fast-check';

// Feature: website-ux-enhancement, Property 18: Reduced motion respect
// Validates: Requirements 5.4, 10.5

describe('useReducedMotion - Property-Based Tests', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let listeners: Array<(event: MediaQueryListEvent) => void> = [];

  beforeEach(() => {
    listeners = [];
    mockMatchMedia = vi.fn();
    window.matchMedia = mockMatchMedia;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    listeners = [];
  });

  it('Property 18: For any prefers-reduced-motion setting, the hook should accurately reflect the user preference', () => {
    // Property: For any boolean value representing prefers-reduced-motion preference,
    // the useReducedMotion hook should return that exact preference value
    
    fc.assert(
      fc.property(fc.boolean(), (prefersReduced) => {
        // Setup: Create a mock MediaQueryList with the given preference
        const mockMediaQueryList = {
          matches: prefersReduced,
          media: '(prefers-reduced-motion: reduce)',
          addEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              listeners.push(handler);
            }
          }),
          removeEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
            if (event === 'change') {
              const index = listeners.indexOf(handler);
              if (index > -1) {
                listeners.splice(index, 1);
              }
            }
          }),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
          onchange: null,
        } as unknown as MediaQueryList;

        mockMatchMedia.mockReturnValue(mockMediaQueryList);

        // Execute: Render the hook
        const { result } = renderHook(() => useReducedMotion());

        // Verify: The hook should return the same preference as the media query
        expect(result.current).toBe(prefersReduced);

        // Cleanup
        listeners = [];
      }),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('Property 18: For any sequence of preference changes, the hook should update to reflect each new preference', () => {
    // Property: For any sequence of boolean values representing preference changes,
    // the hook should update its return value to match each change
    
    fc.assert(
      fc.property(
        fc.boolean(), // Initial preference
        fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }), // Sequence of changes
        (initialPreference, preferenceChanges) => {
          // Setup: Create a mock MediaQueryList with initial preference
          let currentMatches = initialPreference;
          const mockMediaQueryList = {
            get matches() {
              return currentMatches;
            },
            media: '(prefers-reduced-motion: reduce)',
            addEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
              if (event === 'change') {
                listeners.push(handler);
              }
            }),
            removeEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
              if (event === 'change') {
                const index = listeners.indexOf(handler);
                if (index > -1) {
                  listeners.splice(index, 1);
                }
              }
            }),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
            onchange: null,
          } as unknown as MediaQueryList;

          mockMatchMedia.mockReturnValue(mockMediaQueryList);

          // Execute: Render the hook
          const { result, rerender } = renderHook(() => useReducedMotion());

          // Verify initial state
          expect(result.current).toBe(initialPreference);

          // Simulate preference changes
          for (const newPreference of preferenceChanges) {
            currentMatches = newPreference;
            
            // Trigger the change event
            const changeEvent = {
              matches: newPreference,
              media: '(prefers-reduced-motion: reduce)',
            } as MediaQueryListEvent;

            // Call all registered listeners
            listeners.forEach(listener => listener(changeEvent));
            
            rerender();

            // Verify the hook updated to the new preference
            expect(result.current).toBe(newPreference);
          }

          // Cleanup
          listeners = [];
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 18: When matchMedia is not supported, the hook should default to false (no reduced motion)', () => {
    // Property: For any environment where matchMedia is undefined,
    // the hook should safely return false
    
    fc.assert(
      fc.property(fc.constant(undefined), () => {
        // Setup: Remove matchMedia support
        const originalMatchMedia = window.matchMedia;
        // @ts-expect-error - Testing undefined case
        window.matchMedia = undefined;

        // Execute: Render the hook
        const { result } = renderHook(() => useReducedMotion());

        // Verify: Should default to false when matchMedia is not supported
        expect(result.current).toBe(false);

        // Cleanup
        window.matchMedia = originalMatchMedia;
      }),
      { numRuns: 100 }
    );
  });

  it('Property 18: The hook should respect reduced motion preference across all animation contexts', () => {
    // Property: For any reduced motion preference value,
    // components using this hook should be able to conditionally disable animations
    
    fc.assert(
      fc.property(fc.boolean(), (prefersReduced) => {
        // Setup
        const mockMediaQueryList = {
          matches: prefersReduced,
          media: '(prefers-reduced-motion: reduce)',
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
          dispatchEvent: vi.fn(),
          onchange: null,
        } as unknown as MediaQueryList;

        mockMatchMedia.mockReturnValue(mockMediaQueryList);

        // Execute
        const { result } = renderHook(() => useReducedMotion());

        // Verify: The return value can be used to conditionally control animations
        const shouldAnimate = !result.current;
        const shouldReduceMotion = result.current;

        // When user prefers reduced motion, animations should be disabled
        if (prefersReduced) {
          expect(shouldAnimate).toBe(false);
          expect(shouldReduceMotion).toBe(true);
        } else {
          expect(shouldAnimate).toBe(true);
          expect(shouldReduceMotion).toBe(false);
        }

        // Cleanup
        listeners = [];
      }),
      { numRuns: 100 }
    );
  });
});
