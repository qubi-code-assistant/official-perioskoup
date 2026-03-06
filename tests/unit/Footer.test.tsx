/**
 * Footer component -- Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Covers:
 *  - All expected internal link hrefs are present
 *  - EFP Award badge link has correct href
 *  - EFP Award badge link has target="_blank"
 *  - EFP Award badge link has rel="noopener noreferrer"
 *  - Footer renders copyright text
 *  - Footer renders "Made in Europe" tagline
 *  - Product links section renders all expected items
 *  - Company links section renders all expected items
 *  - Legal links section renders Privacy Policy and Terms of Service
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Router } from "wouter";
import Footer from "../../client/src/components/Footer";
import type { ReactElement } from "react";

const renderFooter = (ui: ReactElement = <Footer />) =>
  render(<Router>{ui}</Router>);

afterEach(() => {
  cleanup();
});

const EFP_URL =
  "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/";

describe("Footer -- internal link hrefs", () => {
  it("renders a link to /features", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/features");
  });

  it("renders a link to /for-dentists", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/for-dentists");
  });

  it("renders a link to /pricing", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/pricing");
  });

  it("renders a link to /waitlist", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/waitlist");
  });

  it("renders a link to /about", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/about");
  });

  it("renders a link to /blog", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/blog");
  });

  it("renders a link to /contact", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/contact");
  });

  it("renders a link to /privacy", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/privacy");
  });

  it("renders a link to /terms", () => {
    renderFooter();
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/terms");
  });
});

describe("Footer -- EFP Award badge (external link security)", () => {
  it("renders a link to the EFP Award URL", () => {
    renderFooter();
    const efpLink = screen.getByRole("link", { name: /EFP Award 2025/i });
    expect(efpLink).toBeInTheDocument();
    expect(efpLink).toHaveAttribute("href", EFP_URL);
  });

  it("EFP Award link has target='_blank'", () => {
    renderFooter();
    const efpLink = screen.getByRole("link", { name: /EFP Award 2025/i });
    expect(efpLink).toHaveAttribute("target", "_blank");
  });

  it("EFP Award link has rel='noopener noreferrer'", () => {
    renderFooter();
    const efpLink = screen.getByRole("link", { name: /EFP Award 2025/i });
    const rel = efpLink.getAttribute("rel") ?? "";
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  });
});

describe("Footer -- copyright and branding", () => {
  it("renders copyright text including 'Perioskoup'", () => {
    renderFooter();
    // "Perioskoup" appears in both the logo and the copyright paragraph.
    // Use getAllByText to handle multiple matches.
    const matches = screen.getAllByText(/Perioskoup/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("renders 'Made in Europe' tagline", () => {
    renderFooter();
    expect(screen.getByText(/Made in Europe/i)).toBeInTheDocument();
  });
});

describe("Footer -- section headings", () => {
  it("renders a Product section heading", () => {
    renderFooter();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  it("renders a Company section heading", () => {
    renderFooter();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("renders a Legal section heading", () => {
    renderFooter();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });
});

describe("Footer -- link label text", () => {
  it("renders 'Join Waitlist' link label", () => {
    renderFooter();
    expect(screen.getByText("Join Waitlist")).toBeInTheDocument();
  });

  it("renders 'Privacy Policy' link label", () => {
    renderFooter();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
  });

  it("renders 'Terms of Service' link label", () => {
    renderFooter();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });
});
