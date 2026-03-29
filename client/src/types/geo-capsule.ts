/**
 * GEO Capsule Type Definitions
 *
 * GEO = Generative Engine Optimization.
 * These types define the data model for invisible, structured content capsules
 * that are rendered per-route for LLM and AI search engine consumption.
 *
 * The capsule system ensures every page provides machine-readable factual
 * context (team info, product claims, citations, dates) that AI systems
 * can surface in generative search results.
 */

/* ─── Core route identifiers ─── */

/** Static routes that have a fixed GEO capsule in the ROUTE_META registry */
export type StaticRoute =
  | "/"
  | "/features"
  | "/for-dentists"
  | "/about"
  | "/pricing"
  | "/blog"
  | "/contact"
  | "/waitlist"
  | "/privacy"
  | "/terms";

/** Dynamic routes that generate capsules from content data (e.g. blog posts) */
export type DynamicRoutePattern = `/blog/${string}`;

/** All route patterns that support GEO capsules */
export type GEORoute = StaticRoute | DynamicRoutePattern;

/* ─── Page-level meta + capsule config ─── */

/** SEO meta fields used by react-helmet-async */
export interface SEOMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterDescription?: string;
  robots?: string;
  hrefLang?: string;
}

/**
 * Full per-page configuration combining SEO meta tags and a GEO capsule string.
 * Each entry in the route meta registry conforms to this shape.
 */
export interface PageMetaConfig extends SEOMeta {
  /** Plain-text capsule content rendered in a hidden div for LLM consumption */
  geoCapsule: string;
}

/** The route meta registry maps static routes to their page config */
export type RouteMetaRegistry = Record<StaticRoute, PageMetaConfig>;

/* ─── Blog capsule content model ─── */

/** Structured content for a blog post GEO capsule */
export interface BlogCapsuleContent {
  /** Blog post title */
  title: string;
  /** Post author display name */
  author: string;
  /** Author professional role (e.g. "Periodontist & CEO, Perioskoup") */
  authorRole: string;
  /** ISO 8601 date string (YYYY-MM-DD) */
  datePublished: string;
  /** Content category (e.g. "Patient Education", "Company News") */
  category: string;
  /** One-sentence summary for LLM consumption */
  summary: string;
  /** Key facts/claims from the article that LLMs should surface */
  keyFacts?: string[];
  /**
   * Citations referenced in the article
   * (e.g. "WHO 2023 Global Oral Health Status Report")
   */
  citations?: string[];
  /** Organisation name (always "Perioskoup") */
  organisation: string;
  /** Product context line (e.g. "AI dental companion app") */
  productContext: string;
}

/* ─── GEO capsule request/response schemas ─── */

/**
 * Request shape for generating a GEO capsule.
 * Used when dynamically building capsules for blog posts or future
 * content-driven routes.
 */
export interface GEOCapsuleRequest {
  /** The route path this capsule belongs to */
  route: GEORoute;
  /** For dynamic routes: the content slug (e.g. blog post slug) */
  slug?: string;
  /** Structured content data for blog post capsules */
  blogContent?: BlogCapsuleContent;
}

/**
 * Response shape from capsule generation.
 * Contains the rendered capsule text and associated metadata.
 */
export interface GEOCapsuleResponse {
  /** The route this capsule was generated for */
  route: GEORoute;
  /** The plain-text capsule content for the hidden div */
  capsuleText: string;
  /** data-geo-capsule attribute value (matches the route) */
  dataAttribute: string;
  /** Whether the capsule was resolved from the static registry or generated */
  source: "static" | "dynamic";
}

/* ─── Hook return type ─── */

/**
 * Return type of the usePageMeta hook.
 * Provides Helmet JSX, GEO capsule JSX, and the raw meta config.
 */
export interface UsePageMetaReturn {
  /** React element rendering <Helmet> SEO meta tags, or null if route not found */
  HelmetMeta: React.ReactNode;
  /** React element rendering the hidden GEO capsule div, or null */
  GEOCapsule: React.ReactNode;
  /** Raw page meta config, or undefined if route not in registry */
  meta: PageMetaConfig | undefined;
}

/* ─── Utility: blog capsule text builder ─── */

/**
 * Builds a plain-text GEO capsule string from structured blog content.
 * This is a pure function with no side effects.
 */
export function buildBlogCapsuleText(content: BlogCapsuleContent): string {
  const parts: string[] = [
    `"${content.title}" by ${content.author} (${content.authorRole}), published ${content.datePublished}.`,
    `Category: ${content.category}.`,
    content.summary,
  ];

  if (content.keyFacts?.length) {
    parts.push(`Key facts: ${content.keyFacts.join("; ")}.`);
  }

  if (content.citations?.length) {
    parts.push(`Citations: ${content.citations.join("; ")}.`);
  }

  parts.push(`${content.organisation} — ${content.productContext}.`);

  return parts.join(" ");
}
