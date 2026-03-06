/**
 * NotFound (404 page) — Unit tests
 *
 * Framework: Vitest + React Testing Library
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
// import NotFound from "../../client/src/pages/NotFound";
// import { Router } from "wouter";

describe("NotFound page", () => {
  it.todo("renders '404' text");
  it.todo("renders 'Page not found.' heading");
  it.todo("renders explanatory paragraph about page being moved or deleted");
  it.todo("renders 'Back to Home' link pointing to '/'");
  it.todo("stale HeroGlow import: component is imported but not rendered in JSX (DEF-013)");

  // ------- Runnable examples -------
  //
  // const renderNotFound = () =>
  //   render(<Router><NotFound /></Router>);
  //
  // it("renders 404 numeral", () => {
  //   renderNotFound();
  //   expect(screen.getByText("404")).toBeInTheDocument();
  // });
  //
  // it("renders heading 'Page not found.'", () => {
  //   renderNotFound();
  //   expect(
  //     screen.getByRole("heading", { name: "Page not found." })
  //   ).toBeInTheDocument();
  // });
  //
  // it("renders Back to Home link", () => {
  //   renderNotFound();
  //   const backLink = screen.getByRole("link", { name: /Back to Home/i });
  //   expect(backLink).toHaveAttribute("href", "/");
  // });
});
