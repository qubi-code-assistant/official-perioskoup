/**
 * Breadcrumb — Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Tests:
 *  - Renders a nav with aria-label="Breadcrumb"
 *  - Renders the correct number of list items
 *  - Last item is a <span> — no link (current page indicator)
 *  - Non-last items with href render as links
 *  - "/" separator is rendered between items
 *  - Single item renders without separator
 *  - JSON-LD script tag is injected with correct structure
 *  - JSON-LD positions are 1-indexed
 *  - JSON-LD last item has no "item" URL property
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Router } from "wouter";
import Breadcrumb from "../../client/src/components/Breadcrumb";
import type { ReactElement } from "react";

const renderWithRouter = (ui: ReactElement) =>
  render(<Router>{ui}</Router>);

describe("Breadcrumb — visible navigation", () => {
  it("renders nav with aria-label='Breadcrumb'", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("renders the correct number of list items", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
  });

  it("renders 3 list items when given 3 breadcrumb items", () => {
    renderWithRouter(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Article Title" },
        ]}
      />
    );
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("last item is rendered as a span (no link)", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const featuresEl = screen.getByText("Features");
    expect(featuresEl.tagName).toBe("SPAN");
    expect(featuresEl.closest("a")).toBeNull();
  });

  it("non-last item with href renders as a link", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders '/' separator text between items", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
    );
    // Separator spans with text "/"
    const separators = screen.getAllByText("/");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("single item renders without separator", () => {
    renderWithRouter(<Breadcrumb items={[{ label: "Home", href: "/" }]} />);
    const separators = screen.queryAllByText("/");
    expect(separators).toHaveLength(0);
  });

  it("renders all provided labels", () => {
    renderWithRouter(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "My Article" },
        ]}
      />
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("My Article")).toBeInTheDocument();
  });
});

describe("Breadcrumb — JSON-LD structured data", () => {
  it("injects a JSON-LD script tag into the DOM", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
  });

  it("JSON-LD has @type BreadcrumbList", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.innerHTML ?? "{}");
    expect(data["@type"]).toBe("BreadcrumbList");
  });

  it("JSON-LD positions are 1-indexed", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.innerHTML ?? "{}");
    expect(data.itemListElement[0].position).toBe(1);
    expect(data.itemListElement[1].position).toBe(2);
  });

  it("JSON-LD non-last items include an 'item' URL", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.innerHTML ?? "{}");
    expect(data.itemListElement[0].item).toBe("https://perioskoup.com/");
  });

  it("JSON-LD last item has no 'item' URL (current page)", () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.innerHTML ?? "{}");
    const lastItem = data.itemListElement[data.itemListElement.length - 1];
    expect(lastItem.item).toBeUndefined();
  });

  it("JSON-LD includes all item names", () => {
    renderWithRouter(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Article" },
        ]}
      />
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.innerHTML ?? "{}");
    const names = data.itemListElement.map((el: { name: string }) => el.name);
    expect(names).toEqual(["Home", "Blog", "Article"]);
  });
});
