/**
 * Navbar -- Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Note on the mobile toggle button:
 *   The hamburger button has inline style `display: 'none'` by default in the
 *   component source. It is revealed only by the `.show-mobile-flex` CSS class
 *   via a media query, which jsdom does not process. Therefore standard
 *   getByRole queries that respect visibility will not find it.
 *   We use querySelector with the aria-label attribute to locate it directly --
 *   this is intentional and correct for jsdom unit tests.
 *
 * Covers:
 *  - Renders all 4 nav links
 *  - Renders the Join Waitlist CTA
 *  - Mobile menu toggle button exists in DOM with correct aria-label
 *  - Mobile drawer is not in DOM on initial render
 *  - Clicking toggle opens the mobile drawer
 *  - Clicking toggle again closes the mobile drawer
 *  - body.style.overflow is 'hidden' when menu is open
 *  - body.style.overflow is '' when menu is closed
 *  - Mobile drawer contains all 4 nav links
 *  - Mobile drawer contains Join the Waitlist CTA
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Router } from "wouter";
import Navbar from "../../client/src/components/Navbar";
import type { ReactElement } from "react";

const renderNavbar = (ui: ReactElement = <Navbar />) =>
  render(<Router>{ui}</Router>);

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

// Helper: find the hamburger/close button regardless of CSS visibility
function getMenuToggleButton(): HTMLElement {
  const btn = document.querySelector(
    'button[aria-label="Open menu"], button[aria-label="Close menu"]'
  ) as HTMLElement | null;
  if (!btn) throw new Error("Mobile menu toggle button not found in DOM");
  return btn;
}

describe("Navbar -- desktop nav links", () => {
  it("renders the Features link", () => {
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "Features" });
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders the For Dentists link", () => {
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "For Dentists" });
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders the About link", () => {
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "About" });
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders the Blog link", () => {
    renderNavbar();
    const links = screen.getAllByRole("link", { name: "Blog" });
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders the Join Waitlist CTA link", () => {
    renderNavbar();
    // The desktop CTA link has aria-label="Join the waitlist" -- match via aria-label text
    const cta = screen.getAllByRole("link", { name: /Join.*[Ww]aitlist/i });
    expect(cta.length).toBeGreaterThan(0);
  });
});

describe("Navbar -- mobile menu toggle button exists in DOM", () => {
  it("hamburger button exists in DOM with aria-label='Open menu'", () => {
    renderNavbar();
    const btn = document.querySelector('button[aria-label="Open menu"]');
    expect(btn).not.toBeNull();
  });

  it("hamburger button has aria-expanded='false' initially", () => {
    renderNavbar();
    const btn = document.querySelector('button[aria-label="Open menu"]');
    expect(btn?.getAttribute("aria-expanded")).toBe("false");
  });

  it("hamburger button has aria-controls='mobile-nav'", () => {
    renderNavbar();
    const btn = document.querySelector('button[aria-label="Open menu"]');
    expect(btn?.getAttribute("aria-controls")).toBe("mobile-nav");
  });
});

describe("Navbar -- mobile drawer toggle", () => {
  it("mobile drawer (id=mobile-nav) is NOT in DOM before toggle is clicked", () => {
    renderNavbar();
    expect(document.getElementById("mobile-nav")).toBeNull();
  });

  it("clicking toggle renders the mobile drawer", () => {
    renderNavbar();
    const btn = getMenuToggleButton();
    fireEvent.click(btn);
    expect(document.getElementById("mobile-nav")).not.toBeNull();
  });

  it("clicking toggle twice removes the mobile drawer", () => {
    renderNavbar();
    const btn = getMenuToggleButton();
    fireEvent.click(btn); // open
    fireEvent.click(getMenuToggleButton()); // close (label may change to Close menu)
    expect(document.getElementById("mobile-nav")).toBeNull();
  });

  it("aria-label changes to 'Close menu' after opening", () => {
    renderNavbar();
    fireEvent.click(getMenuToggleButton());
    const btn = document.querySelector('button[aria-label="Close menu"]');
    expect(btn).not.toBeNull();
  });

  it("aria-expanded becomes 'true' after opening", () => {
    renderNavbar();
    fireEvent.click(getMenuToggleButton());
    const btn = getMenuToggleButton();
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });
});

describe("Navbar -- body scroll lock", () => {
  it("body.style.overflow is 'hidden' when menu is open", () => {
    renderNavbar();
    fireEvent.click(getMenuToggleButton());
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("body.style.overflow is '' when menu is closed", () => {
    renderNavbar();
    fireEvent.click(getMenuToggleButton()); // open
    fireEvent.click(getMenuToggleButton()); // close
    expect(document.body.style.overflow).toBe("");
  });
});

describe("Navbar -- mobile drawer content", () => {
  it("mobile drawer contains all 4 nav link labels after toggle", () => {
    renderNavbar();
    fireEvent.click(getMenuToggleButton());

    const drawer = document.getElementById("mobile-nav");
    expect(drawer).not.toBeNull();

    // All 4 navigation links should be in the drawer
    const links = Array.from(drawer!.querySelectorAll("a[href]"));
    const hrefs = links.map((l) => (l as HTMLAnchorElement).getAttribute("href"));
    expect(hrefs).toContain("/features");
    expect(hrefs).toContain("/for-dentists");
    expect(hrefs).toContain("/about");
    expect(hrefs).toContain("/blog");
  });

  it("mobile drawer contains a link to /waitlist", () => {
    renderNavbar();
    fireEvent.click(getMenuToggleButton());

    const drawer = document.getElementById("mobile-nav");
    const waitlistLink = drawer?.querySelector('a[href="/waitlist"]');
    expect(waitlistLink).not.toBeNull();
  });
});
