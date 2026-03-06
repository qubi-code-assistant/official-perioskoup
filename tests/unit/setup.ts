/**
 * Vitest setup file — runs before each test file
 *
 * 1. Imports @testing-library/jest-dom matchers so assertions like
 *    toBeInTheDocument(), toBeVisible(), toHaveAttribute() are available.
 *
 * 2. Mocks browser APIs that jsdom does not implement:
 *    - IntersectionObserver (used by scroll-reveal hooks in all page components)
 *    - ResizeObserver (used by some Radix UI primitives)
 */
import "@testing-library/jest-dom";
import { vi } from "vitest";

// ---------------------------------------------------------------------------
// IntersectionObserver mock
// ---------------------------------------------------------------------------
// jsdom does not implement IntersectionObserver. All page components that use
// useReveal() call new IntersectionObserver(...) on mount. Without a mock this
// throws "IntersectionObserver is not defined" during every page render in tests.
const IntersectionObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn(() => []),
}));

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// ---------------------------------------------------------------------------
// ResizeObserver mock
// ---------------------------------------------------------------------------
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

// ---------------------------------------------------------------------------
// window.matchMedia mock
// ---------------------------------------------------------------------------
// jsdom does not implement matchMedia. Components using it (e.g. ParallaxHeroBg
// respects prefers-reduced-motion via matchMedia) will throw in tests without
// this mock.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
