/**
 * Breadcrumb — Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Tests:
 *  - Renders the correct number of breadcrumb items
 *  - Last item has no link (current page indicator)
 *  - All but last item have correct href links
 *  - JSON-LD script tag is injected with correct structure
 *  - Separator "/" is rendered between items
 *  - Single item renders without separator
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// import Breadcrumb from "../../client/src/components/Breadcrumb";

// Wouter Link requires a Router context in tests
// import { Router } from "wouter";

describe("Breadcrumb", () => {
  it.todo("renders a nav with aria-label='Breadcrumb'");
  it.todo("renders the correct number of items");
  it.todo("renders the last item as a <span> (no link)");
  it.todo("renders non-last items with href links");
  it.todo("renders '/' separator between items");
  it.todo("single item renders without separator");
  it.todo("injects JSON-LD script tag in the DOM");
  it.todo("JSON-LD has @type BreadcrumbList");
  it.todo("JSON-LD item positions are 1-indexed");
  it.todo("JSON-LD last item has no 'item' URL property");

  // ------- Runnable examples -------
  //
  // const renderWithRouter = (ui: ReactElement) =>
  //   render(<Router>{ui}</Router>);
  //
  // it("renders nav with aria-label", () => {
  //   renderWithRouter(
  //     <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
  //   );
  //   expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  // });
  //
  // it("renders 2 items", () => {
  //   renderWithRouter(
  //     <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
  //   );
  //   const listItems = screen.getAllByRole("listitem");
  //   expect(listItems).toHaveLength(2);
  // });
  //
  // it("last item is not a link", () => {
  //   renderWithRouter(
  //     <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
  //   );
  //   const featuresItem = screen.getByText("Features");
  //   expect(featuresItem.tagName).toBe("SPAN");
  //   expect(featuresItem.closest("a")).toBeNull();
  // });
  //
  // it("first item is a link", () => {
  //   renderWithRouter(
  //     <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
  //   );
  //   const homeLink = screen.getByRole("link", { name: "Home" });
  //   expect(homeLink).toHaveAttribute("href", "/");
  // });
});
