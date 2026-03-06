/**
 * Navbar — Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Tests:
 *  - Renders all 4 nav links
 *  - Renders the Join Waitlist CTA
 *  - Mobile menu toggle button is rendered
 *  - Menu is closed by default
 *  - Clicking toggle opens the menu
 *  - Clicking toggle again closes the menu
 *  - Menu closes when location changes
 *  - Active link gets lime color when path matches
 *  - Body scroll is locked when menu is open
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
// import Navbar from "../../client/src/components/Navbar";
// import { Router } from "wouter";

describe("Navbar", () => {
  it.todo("renders all 4 nav links: Features, For Dentists, About, Blog");
  it.todo("renders the Join Waitlist CTA link");
  it.todo("mobile toggle button has aria-label='Toggle menu'");
  it.todo("mobile drawer is not rendered on initial render");
  it.todo("clicking toggle button renders the mobile drawer");
  it.todo("clicking toggle button again removes the mobile drawer");
  it.todo("body.style.overflow is 'hidden' when menu is open");
  it.todo("body.style.overflow is '' when menu is closed");
  it.todo("mobile drawer contains all 4 nav links");
  it.todo("mobile drawer contains Join the Waitlist button");
  it.todo("menu closes (menuOpen = false) when location prop changes");

  // ------- Runnable examples -------
  //
  // const renderNavbar = () =>
  //   render(<Router><Navbar /></Router>);
  //
  // it("renders Features link", () => {
  //   renderNavbar();
  //   expect(screen.getAllByRole("link", { name: "Features" })).toBeTruthy();
  // });
  //
  // it("mobile menu is closed by default", () => {
  //   renderNavbar();
  //   // No drawer-only links visible (drawer links have large Dongle font)
  //   expect(screen.queryByText("For Dentists")).not.toBeNull(); // exists in DOM
  //   // The drawer is conditionally rendered, so look for the container
  //   expect(document.querySelector('[style*="position: fixed"]')).not.toBeInTheDocument();
  // });
  //
  // it("toggle button opens mobile menu", () => {
  //   renderNavbar();
  //   const toggleBtn = screen.getByRole("button", { name: "Toggle menu" });
  //   fireEvent.click(toggleBtn);
  //   expect(document.body.style.overflow).toBe("hidden");
  // });
});
