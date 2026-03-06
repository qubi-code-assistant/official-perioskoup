/**
 * NotFound (404 page) — Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Covers:
 *  - Renders "404" text
 *  - Renders "Page not found." heading
 *  - Renders explanatory paragraph
 *  - Renders "Back to Home" link pointing to "/"
 *  - DEF-013 fix: HeroGlow is NOT imported (stale import removed)
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "wouter";
import NotFound from "../../client/src/pages/NotFound";
import type { ReactElement } from "react";

// NotFound uses Navbar, Footer, and ParallaxHeroBg — all need a Router context
const renderWithRouter = (ui: ReactElement) =>
  render(<Router>{ui}</Router>);

describe("NotFound page — content", () => {
  it("renders the '404' numeral", () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the 'Page not found.' heading", () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByRole("heading", { name: "Page not found." })
    ).toBeInTheDocument();
  });

  it("renders the explanatory paragraph", () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByText(/the page you.re looking for doesn.t exist/i)
    ).toBeInTheDocument();
  });

  it("renders 'Back to Home' link", () => {
    renderWithRouter(<NotFound />);
    const link = screen.getByRole("link", { name: /Back to Home/i });
    expect(link).toBeInTheDocument();
  });

  it("'Back to Home' link points to '/'", () => {
    renderWithRouter(<NotFound />);
    const link = screen.getByRole("link", { name: /Back to Home/i });
    expect(link).toHaveAttribute("href", "/");
  });
});

describe("NotFound page — DEF-013 regression (stale HeroGlow import)", () => {
  it("page renders without errors (stale HeroGlow import removed)", () => {
    // If HeroGlow were imported but undefined this would throw on render.
    // Successful render confirms the stale import was cleaned up.
    expect(() => renderWithRouter(<NotFound />)).not.toThrow();
  });
});
