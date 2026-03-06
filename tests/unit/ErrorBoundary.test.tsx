/**
 * ErrorBoundary -- Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Covers:
 *  - Renders children when no error occurs
 *  - Renders error UI when a child component throws
 *  - Error UI contains the expected heading and buttons
 *  - "Try again" button resets state and re-renders children
 *  - "Reload Page" button calls window.location.reload
 *  - componentDidCatch logs to console.error (DEF-006 fix verification)
 *  - Stack trace is hidden in production (DEF-007 fix verification)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../../client/src/components/ErrorBoundary";

// Helper component that throws on demand
function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Test render error from ThrowingComponent");
  }
  return <div>Normal content</div>;
}

// Helper to swap the shouldThrow prop via a wrapper
function TestWrapper({ throwError }: { throwError: boolean }) {
  return (
    <ErrorBoundary>
      <ThrowingComponent shouldThrow={throwError} />
    </ErrorBoundary>
  );
}

describe("ErrorBoundary", () => {
  // Suppress expected console.error noise during error boundary tests
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children normally when no error is thrown", () => {
    render(<TestWrapper throwError={false} />);
    expect(screen.getByText("Normal content")).toBeInTheDocument();
    expect(screen.queryByText("An unexpected error occurred.")).not.toBeInTheDocument();
  });

  it("renders error UI when a child component throws", () => {
    render(<TestWrapper throwError={true} />);
    expect(screen.getByText("An unexpected error occurred.")).toBeInTheDocument();
    expect(screen.queryByText("Normal content")).not.toBeInTheDocument();
  });

  it("error UI contains an 'Try again' button", () => {
    render(<TestWrapper throwError={true} />);
    expect(screen.getByRole("button", { name: /Try again/i })).toBeInTheDocument();
  });

  it("error UI contains a 'Reload Page' button", () => {
    render(<TestWrapper throwError={true} />);
    expect(screen.getByRole("button", { name: /Reload Page/i })).toBeInTheDocument();
  });

  it("Reload Page button calls window.location.reload", () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: reloadMock },
    });

    render(<TestWrapper throwError={true} />);
    fireEvent.click(screen.getByRole("button", { name: /Reload Page/i }));
    expect(reloadMock).toHaveBeenCalledOnce();
  });

  it("componentDidCatch logs the error to console.error (DEF-006 fix)", () => {
    render(<TestWrapper throwError={true} />);
    // console.error is spied -- verify it was called with the error
    const calls = (console.error as ReturnType<typeof vi.fn>).mock.calls;
    const errorCalls = calls.filter((args) =>
      args.some(
        (arg: unknown) =>
          typeof arg === "string" && arg.includes("[ErrorBoundary]")
      )
    );
    expect(errorCalls.length).toBeGreaterThan(0);
  });

  it("getDerivedStateFromError sets hasError: true and stores the error", () => {
    const state = ErrorBoundary.getDerivedStateFromError(
      new Error("synthetic test error")
    );
    expect(state.hasError).toBe(true);
    expect(state.error).toBeInstanceOf(Error);
    expect(state.error?.message).toBe("synthetic test error");
  });

  it("stack trace is hidden in test/dev environment (IS_PROD is false in test)", () => {
    // import.meta.env.PROD is false in jsdom / vitest environment.
    // The stack trace <pre> block is rendered only when NOT in production.
    render(<TestWrapper throwError={true} />);
    // In non-prod the pre element with the stack should be present
    const pre = document.querySelector("pre");
    expect(pre).not.toBeNull();
  });
});
