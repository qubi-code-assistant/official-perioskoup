/**
 * BlogPost page -- Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Tests:
 *  - Valid slug renders the article title
 *  - Valid slug renders the article category badge
 *  - Valid slug does NOT show "Article not found"
 *  - Invalid slug shows the "Article not found" heading
 *  - Invalid slug shows a "Back to Blog" link pointing to /blog
 *  - Invalid slug does NOT show the global "Page not found."
 *  - All six known slugs render without throwing
 *  - Article author is rendered for a known slug
 *
 * Implementation note on useParams():
 *   BlogPost calls `useParams<{ slug: string }>()`. Wouter only populates
 *   params when the component is rendered inside a matching <Route> element.
 *   We use `memoryLocation` to seed the in-memory path, then wrap BlogPost
 *   in `<Route path="/blog/:slug">` so params are populated correctly.
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Router, Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { memoryLocation } from "wouter/memory-location";
import BlogPost from "../../client/src/pages/BlogPost";

afterEach(() => {
  cleanup();
});

/**
 * Render BlogPost with the given slug already matched in the URL.
 * The <Route path="/blog/:slug"> wrapper is required for useParams() to work.
 */
function renderBlogPost(slug: string) {
  const { hook } = memoryLocation({ path: `/blog/${slug}` });
  return render(
    <HelmetProvider>
      <Router hook={hook}>
        <Route path="/blog/:slug">
          <BlogPost />
        </Route>
      </Router>
    </HelmetProvider>
  );
}

const KNOWN_ARTICLES = [
  {
    slug: "what-is-periodontal-disease",
    title: "What Is Periodontal Disease?",
    category: "Patient Education",
  },
  {
    slug: "efp-digital-innovation-award-2025",
    title: "Perioskoup Wins EFP Digital Innovation Award 2025",
    category: "Company News",
  },
  {
    slug: "how-ai-is-changing-dental-monitoring",
    title: "How AI Is Changing Dental Monitoring",
    category: "Technology",
  },
  {
    slug: "3-minute-routine-save-teeth",
    title: "The 3-Minute Daily Routine",
    category: "Patient Habits",
  },
  {
    slug: "why-patients-forget-instructions",
    title: "Why Patients Forget Dental Instructions",
    category: "Clinical Insight",
  },
  {
    slug: "building-the-bridge-perioskoup-story",
    title: "Building the Bridge: The Perioskoup Story",
    category: "Founder Story",
  },
] as const;

describe("BlogPost -- valid slug renders article content", () => {
  it("renders the article title for 'what-is-periodontal-disease'", () => {
    renderBlogPost("what-is-periodontal-disease");
    expect(
      screen.getByRole("heading", { name: /What Is Periodontal Disease/i })
    ).toBeInTheDocument();
  });

  it("renders the category badge for 'what-is-periodontal-disease'", () => {
    renderBlogPost("what-is-periodontal-disease");
    // Category appears multiple times (hero badge + breadcrumb-like tag)
    const matches = screen.getAllByText("Patient Education");
    expect(matches.length).toBeGreaterThan(0);
  });

  it("does not show 'Article not found' for a valid slug", () => {
    renderBlogPost("what-is-periodontal-disease");
    expect(screen.queryByText(/Article not found/i)).not.toBeInTheDocument();
  });

  it("renders the EFP award article heading", () => {
    renderBlogPost("efp-digital-innovation-award-2025");
    // The article title appears in multiple elements (h1 + excerpt/body)
    const matches = screen.getAllByText(/EFP Digital Innovation Award/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("renders article author name for 'what-is-periodontal-disease'", () => {
    renderBlogPost("what-is-periodontal-disease");
    // Author name appears multiple times (byline + bio section)
    const matches = screen.getAllByText(/Dr\. Anca Laura Constantin/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});

describe("BlogPost -- all six known slugs render without throwing", () => {
  for (const article of KNOWN_ARTICLES) {
    it(`/blog/${article.slug} renders without throwing`, () => {
      expect(() => renderBlogPost(article.slug)).not.toThrow();
      cleanup();
    });
  }
});

describe("BlogPost -- ARTICLES object coverage", () => {
  it("all six slugs show article content (not the fallback UI)", () => {
    const slugsWithContent: string[] = [];
    for (const article of KNOWN_ARTICLES) {
      const { unmount } = renderBlogPost(article.slug);
      const fallback = screen.queryByText(/Article not found/i);
      if (!fallback) slugsWithContent.push(article.slug);
      unmount();
    }
    expect(slugsWithContent).toHaveLength(KNOWN_ARTICLES.length);
  });
});

describe("BlogPost -- invalid slug shows fallback UI", () => {
  it("shows 'Article not found' heading for a non-existent slug", () => {
    renderBlogPost("this-slug-does-not-exist");
    expect(screen.getByText(/Article not found/i)).toBeInTheDocument();
  });

  it("shows a 'Back to Blog' link for an invalid slug", () => {
    renderBlogPost("totally-invalid-slug-xyz");
    const link = screen.getByRole("link", { name: /Back to Blog/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/blog");
  });

  it("does not show the global 'Page not found.' text for an invalid slug", () => {
    renderBlogPost("not-a-real-article");
    expect(screen.queryByText("Page not found.")).not.toBeInTheDocument();
  });

  it("renders without throwing for a random invalid slug", () => {
    expect(() => renderBlogPost("completely-made-up-slug-123")).not.toThrow();
  });
});
