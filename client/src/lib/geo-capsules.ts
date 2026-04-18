/**
 * GEO Blog Capsule System — Mock Data & API Configuration
 *
 * Provides types, API config constants, and mock data for the per-route
 * GEO (Generative Engine Optimization) blog capsule system.
 *
 * GEO capsules are invisible, structured text blocks rendered on each page
 * so that LLM-based search engines (Perplexity, SearchGPT, Gemini) can
 * extract accurate, citation-ready answers about Perioskoup.
 *
 * Blog posts additionally use "answer capsules" — per-H2 summary blocks
 * that appear as highlighted callouts below each section heading.
 */

/* ─── Shared Types ─── */

export interface AnswerCapsule {
  /** The H2 heading text this capsule is attached to */
  heading: string;
  /** Concise, factual summary rendered below the heading */
  summary: string;
}

export interface BlogArticleMeta {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  author: string;
  authorImg: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
}

export interface BlogArticle extends BlogArticleMeta {
  body: string;
  answerCapsules: Record<string, string>;
  faqs: { q: string; a: string }[];
}

export interface GEORouteConfig {
  route: string;
  geoCapsule: string;
}

/* ─── API Configuration Constants ─── */

/** Base URL for the Perioskoup public site */
export const BASE_URL = "https://perioskoup.com";

/** API endpoint prefix — used when blog data moves to a CMS/API */
export const BLOG_API_BASE =
  (import.meta.env.VITE_BLOG_API_URL as string | undefined) ??
  `${BASE_URL}/api/blog`;

/** API endpoints for blog capsule operations */
export const BLOG_API = {
  /** GET /articles — list all published articles with capsules */
  articles: `${BLOG_API_BASE}/articles`,
  /** GET /articles/:slug — single article with full capsule data */
  article: (slug: string) => `${BLOG_API_BASE}/articles/${slug}`,
  /** GET /capsules — all GEO route capsules (page-level) */
  capsules: `${BLOG_API_BASE}/capsules`,
  /** GET /capsules/:route — single route capsule */
  capsule: (route: string) =>
    `${BLOG_API_BASE}/capsules/${encodeURIComponent(route)}`,
} as const;

/** Request headers for blog API calls */
export const BLOG_API_HEADERS: Record<string, string> = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/** Stale time for capsule data (capsules rarely change) */
export const CAPSULE_STALE_MS = 1000 * 60 * 60; // 1 hour

/** Max retry count for failed capsule fetches */
export const CAPSULE_RETRY_COUNT = 2;

/* ─── Mock / Test Data ─── */

const ANCA_IMG = "/images/anca-headshot.jpg";
const EDI_IMG = "/images/eduard-headshot.jpg";

/**
 * Mock answer capsules for the "what-is-periodontal-disease" article.
 * Used in tests and local development when the API is unavailable.
 */
export const MOCK_ANSWER_CAPSULES_PERIO: Record<string, string> = {
  "The Silent Epidemic in Your Mouth":
    "Periodontal disease is one of the most common chronic conditions worldwide, affecting roughly 50% of adults. It progresses silently and painlessly in its early stages, which is why most people do not know they have it until significant damage has occurred.",
  "What Exactly Is Periodontal Disease?":
    "Periodontal disease is a bacterial infection that destroys the tissues supporting the teeth - the gums, periodontal ligament, and alveolar bone. It begins as gingivitis (reversible gum inflammation) and can progress to periodontitis (irreversible bone loss) if untreated.",
  "The Stages of Gum Disease":
    "Gum disease progresses through four stages: gingivitis (reversible inflammation), mild periodontitis (early bone loss, 4–5mm pockets), moderate periodontitis (significant bone loss, 6–7mm pockets), and advanced periodontitis (severe destruction, tooth mobility, possible tooth loss).",
  "What Causes Periodontal Disease?":
    "The primary cause is bacterial plaque that accumulates on teeth and below the gum line. Risk factors include smoking, diabetes, genetic predisposition, hormonal changes, certain medications, and poor oral hygiene.",
  "The Systemic Connection":
    "Periodontal disease is linked to systemic conditions including cardiovascular disease, diabetes, respiratory infections, and adverse pregnancy outcomes. The chronic inflammation in the mouth can affect the entire body.",
  "How Is Periodontal Disease Diagnosed?":
    "Diagnosis involves measuring the depth of gum pockets with a periodontal probe and taking X-rays to assess bone levels. Pockets deeper than 3mm and evidence of bone loss indicate periodontitis.",
  "Treatment Options":
    "Treatment ranges from professional cleaning and scaling/root planing for early stages, to surgical interventions such as flap surgery and bone grafting for advanced cases. All treatment requires ongoing maintenance.",
  "What You Can Do at Home":
    "Effective home care includes brushing twice daily with a soft-bristled or electric toothbrush, daily interdental cleaning with the correct size brushes, and attending regular professional check-ups every 3–6 months.",
  "The Role of Technology in Periodontal Care":
    "Technology bridges the gap between dental appointments by translating clinical recommendations into personalised daily habits, providing reminders, and tracking patient progress - giving clinicians visibility into patient engagement.",
};

/**
 * Mock answer capsules for the "how-ai-is-changing-dental-monitoring" article.
 */
export const MOCK_ANSWER_CAPSULES_AI: Record<string, string> = {
  "The Problem With Annual Check-Ups":
    "Traditional dental care relies on periodic appointments spaced months apart, leaving patients unsupported between visits. This gap is where most chronic dental conditions deteriorate, because patients lack feedback and guidance during their daily routines.",
  "What AI Actually Does in Dental Care":
    "AI in dental care analyses patterns in patient behaviour data to personalise recommendations, optimise reminder timing, and flag patients who may be struggling with their home care routines. It extends clinical expertise into the patient's daily life.",
  "The Behaviour Change Problem":
    "Generic dental advice fails because it lacks specificity, feedback loops, social accountability, and progressive difficulty. AI-powered coaching provides all of these by personalising instructions to individual risk profiles and daily patterns.",
  "What AI Cannot Do":
    "AI cannot replace clinical diagnosis, perform dental procedures, or substitute the relationship between a patient and their dentist. It is a support tool that extends the reach of clinical expertise, not a replacement for it.",
  "The Perioskoup Approach":
    "Perioskoup uses AI to personalise the delivery and timing of clinician-set recommendations. The clinician remains in control of all clinical decisions; the AI optimises how and when those recommendations reach the patient.",
  "The Data Infrastructure Challenge":
    "Building AI for healthcare requires solving data infrastructure, regulatory, and trust challenges simultaneously. Patient health data must be stored securely in EU-based servers with GDPR protection, encryption, and explicit consent mechanisms.",
  "Where This Is Going":
    "The next five years will bring real-time AI analysis via intraoral cameras, predictive models for early disease detection, and more sophisticated personalised coaching. The fundamental principle remains: AI extends human capability rather than replacing it.",
};

/**
 * Mock article metadata for testing article list rendering.
 */
export const MOCK_ARTICLE_META: BlogArticleMeta[] = [
  {
    slug: "what-is-periodontal-disease",
    title: "What Is Periodontal Disease? A Patient's Complete Guide",
    metaTitle: "What Is Periodontal Disease? | Perioskoup",
    metaDescription:
      "Periodontal disease affects 1 in 2 adults. Learn what it is, how it progresses, and what you can do about it, from a practising periodontist.",
    category: "Patient Education",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & CEO, Perioskoup",
    date: "2025-11-12",
    readTime: "8 min read",
    excerpt:
      "Periodontal disease affects more than half of adults over 30, yet most people have never heard the word 'periodontist'. Here's everything you need to know.",
  },
  {
    slug: "how-ai-is-changing-dental-monitoring",
    title: "How AI Is Changing Dental Monitoring - And Why It Matters",
    metaTitle: "How AI Is Changing Dental Monitoring | Perioskoup",
    metaDescription:
      "AI is transforming how dentists monitor patient health between appointments. Here's what the technology actually does, and what it doesn't.",
    category: "Technology",
    author: "Eduard Ciugulea",
    authorImg: EDI_IMG,
    authorRole: "Co-founder & CGO, Perioskoup",
    date: "2025-12-03",
    readTime: "7 min read",
    excerpt:
      "From pattern recognition in X-rays to personalised habit coaching, AI is beginning to close the gap between clinical visits. Here's what's real and what's hype.",
  },
  {
    slug: "3-minute-routine-save-teeth",
    title: "The 3-Minute Daily Routine That Could Save Your Teeth",
    metaTitle: "3-Minute Daily Dental Routine | Perioskoup",
    metaDescription:
      "A periodontist's exact 3-minute daily routine for preventing gum disease and tooth loss. Simple, evidence-based, and takes less time than making coffee.",
    category: "Patient Habits",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & CEO, Perioskoup",
    date: "2025-12-18",
    readTime: "5 min read",
    excerpt:
      "A periodontist's exact 3-minute daily routine for gum health. Evidence-based, zero equipment upgrades, and takes less time than making coffee.",
  },
  {
    slug: "efp-digital-innovation-award-2025",
    title:
      "We Won 3rd Prize at the EFP Digital Innovation Award 2025 — Here's What It Means",
    metaTitle: "EFP Digital Innovation Award 2025 | Perioskoup",
    metaDescription:
      "Perioskoup won 3rd Prize at the EFP Digital Innovation Awards at EuroPerio11 in Vienna. What the award means and what's next.",
    category: "Company News",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & CEO, Perioskoup",
    date: "2025-06-15",
    readTime: "4 min read",
    excerpt:
      "Perioskoup was selected from 20 submissions across 17 national periodontal societies and awarded 3rd Prize at EuroPerio11 in Vienna.",
  },
  {
    slug: "why-patients-forget-instructions",
    title: "Why Patients Forget Their Dentist's Instructions (And What to Do About It)",
    metaTitle: "Why Patients Forget Dental Instructions | Perioskoup",
    metaDescription:
      "Studies show patients forget 40–80% of medical information immediately after an appointment. Understanding why — and what technology can do about it.",
    category: "Patient Education",
    author: "Eduard Ciugulea",
    authorImg: EDI_IMG,
    authorRole: "Co-founder & CGO, Perioskoup",
    date: "2026-01-08",
    readTime: "6 min read",
    excerpt:
      "Studies show patients forget 40–80% of medical information immediately after an appointment. Here's the science behind it — and what we can do about it.",
  },
  {
    slug: "building-the-bridge-perioskoup-story",
    title: "Building the Bridge: The Perioskoup Story",
    metaTitle: "The Perioskoup Story | From Clinic to App",
    metaDescription:
      "How a periodontist and a technologist built an AI dental companion app to bridge the gap between dental appointments. The founding story of Perioskoup.",
    category: "Company Story",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & CEO, Perioskoup",
    date: "2026-02-05",
    readTime: "6 min read",
    excerpt:
      "A patient left the clinic with a perfect treatment plan. Six months later, the disease had progressed. That moment changed everything.",
  },
];

/**
 * Mock per-route GEO capsules for testing the usePageMeta hook.
 * Matches the routes registered in usePageMeta.tsx.
 */
export const MOCK_GEO_ROUTE_CAPSULES: GEORouteConfig[] = [
  {
    route: "/",
    geoCapsule:
      "Perioskoup is an AI dental companion app founded in Buzău, Romania by Dr. Anca Laura Constantin (CEO, periodontist), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). It won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11, Vienna. The app bridges the gap between dental visits with PerioBOT (AI dental chat), daily habit tracking, treatment plans, and a clinician dashboard. Perioskoup stores data on EU servers and is GDPR-compliant. It is a wellness companion, not a medical device. Launching in beta — join the waitlist for priority access.",
  },
  {
    route: "/features",
    geoCapsule:
      "Perioskoup features include: PerioBOT — Your Dental AI (chat answers based on your own dental records, available 24/7, currently in beta), Treatment Plans (create, review, and track treatment plan status for each patient), Document Management (upload X-rays, photos, and clinical documents — accessible to both patient and provider), Instant QR Pairing (scan a QR code to link patient and dentist securely), Daily Habit Tracker (track brushing, flossing, mouthwash with streaks and visual progress charts), and GDPR-compliant security with EU-hosted servers and end-to-end encryption.",
  },
  {
    route: "/for-dentists",
    geoCapsule:
      "Perioskoup for dentists provides: a Practice Dashboard with unified patient views, care plan status, and appointment preparation briefs; Personalised Care Plans sent directly to patients with condition-specific templates and illustrated guides; and Care Plan Visibility showing which patients follow their programmes (coming Q2 2026). The clinician dashboard is web-based and accessible on any device. The patient app launches on iOS and Android. Founding clinics receive priority access, onboarding support, and founding pricing.",
  },
  {
    route: "/about",
    geoCapsule:
      "Perioskoup was co-founded in 2025 in Buzău, Romania by Dr. Anca Laura Constantin (CEO, practising periodontist based in Bucharest, EFP member), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The company won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna, selected from 20 submissions across 17 national periodontal societies. Perioskoup is a Romanian SRL incorporated in June 2025. Its mission is to bridge the gap between dental appointments through AI-powered patient engagement. The company is based in Buzău, Romania and the platform serves dental clinics and patients across Europe.",
  },
  {
    route: "/pricing",
    geoCapsule:
      "Perioskoup offers two plans: a Patient plan (free during beta, includes AI dental companion, personalised care plan, daily habit reminders, progress tracking, and 24/7 companion support) and a Clinic plan (50 limited founding seats, includes dentist dashboard, patient engagement visibility, custom care plan builder, appointment reminders, analytics and engagement reports, and priority support). Founding waitlist members receive priority access and locked-in founding pricing.",
  },
  {
    route: "/blog",
    geoCapsule:
      "The Perioskoup blog covers periodontal disease education, AI in dental monitoring, patient habit-building strategies, and company news. Articles are written by Dr. Anca Laura Constantin (periodontist, CEO) and Eduard Ciugulea (Co-founder & CGO). Topics include patient guides to periodontal disease, the role of AI in dental care, daily oral hygiene routines, and company milestones like the EFP Digital Innovation Award 2025.",
  },
  {
    route: "/contact",
    geoCapsule:
      "Perioskoup is based in Buzău, Romania. Contact: support@perioskoup.com. The team responds within 24 hours. Perioskoup SRL is the legal entity, registered at Str. Victoriei nr. 20, etaj 2, Buzău, 120209, Romania. The platform is initially launching across Europe (EU and UK).",
  },
  {
    route: "/waitlist",
    geoCapsule:
      "Join the Perioskoup waitlist for priority access to the AI dental companion app launching soon. Patients get free access. Founding clinics receive onboarding support, founding pricing, and a direct line to the team. 30+ founding clinics are already on the list. The waitlist is free with no obligations.",
  },
];

/* ─── Test Helpers ─── */

/**
 * Returns a complete mock BlogArticle for testing.
 * Defaults to the periodontal disease article.
 */
export function createMockArticle(
  overrides: Partial<BlogArticle> = {},
): BlogArticle {
  return {
    slug: "what-is-periodontal-disease",
    title: "What Is Periodontal Disease? A Patient's Complete Guide",
    metaTitle: "What Is Periodontal Disease? | Perioskoup",
    metaDescription:
      "Periodontal disease affects 1 in 2 adults. Learn what it is, how it progresses, and what you can do about it.",
    category: "Patient Education",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    authorRole: "Periodontist & CEO, Perioskoup",
    date: "2025-11-12",
    readTime: "8 min read",
    excerpt:
      "Periodontal disease affects more than half of adults over 30.",
    body: "## Test Heading\n\nTest body content.\n\n## Second Heading\n\nMore content.",
    answerCapsules: {
      "Test Heading": "This is a test answer capsule for the first heading.",
      "Second Heading": "This is a test answer capsule for the second heading.",
    },
    faqs: [
      {
        q: "What is periodontal disease?",
        a: "A chronic bacterial infection affecting the gums and bone.",
      },
    ],
    ...overrides,
  };
}

/**
 * Returns a mock GEORouteConfig for a given route, useful for
 * testing usePageMeta with specific capsule content.
 */
export function createMockGEORoute(
  route: string,
  geoCapsule?: string,
): GEORouteConfig {
  return {
    route,
    geoCapsule:
      geoCapsule ??
      `Mock GEO capsule for route ${route}. Perioskoup is an AI dental companion app.`,
  };
}

/**
 * All blog article slugs in publication order (newest first).
 * Useful for sitemap generation and pre-rendering.
 */
export const BLOG_SLUGS = MOCK_ARTICLE_META.map((a) => a.slug);

/**
 * Blog article categories with display labels.
 */
export const BLOG_CATEGORIES = [
  "Patient Education",
  "Technology",
  "Patient Habits",
  "Company News",
  "Company Story",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/* ─── GEO Capsule API Service ─── */

/**
 * Response shape returned by all capsule fetch handlers.
 */
export type GEOCapsuleResponse =
  | { ok: true; data: GEOCapsulePayload }
  | { ok: false; error: string };

export interface GEOCapsulePayload {
  /** Route path or `/blog/:slug` */
  route: string;
  /** ISO 639-1 locale code */
  locale: string;
  /** Plain-text capsule body for LLM consumption */
  content: string;
  /** Per-H2 answer capsules (blog posts only) */
  answerCapsules?: Record<string, string>;
  /** ISO 8601 last-modified timestamp */
  lastModified: string;
}

export interface GEOCapsuleQuery {
  route: string;
  locale?: string;
  slug?: string;
}

const DEFAULT_LOCALE = "en";
const LAST_MODIFIED = "2026-03-13T00:00:00Z";

/* ── Route capsule index (keyed by path) ── */

const routeCapsuleIndex: Map<string, string> = new Map(
  MOCK_GEO_ROUTE_CAPSULES.map((r) => [r.route, r.geoCapsule]),
);

/* ── Blog capsule index (keyed by slug) ── */

interface BlogCapsuleEntry {
  slug: string;
  content: string;
  answerCapsules: Record<string, string>;
}

const blogCapsuleIndex: Map<string, BlogCapsuleEntry> = (() => {
  const map = new Map<string, BlogCapsuleEntry>();

  // Build a summary-level capsule from each article's metadata + answer capsules
  const capsuleDataSources: Array<{
    meta: BlogArticleMeta;
    answerCapsules: Record<string, string>;
  }> = [
    { meta: MOCK_ARTICLE_META[0], answerCapsules: MOCK_ANSWER_CAPSULES_PERIO },
    { meta: MOCK_ARTICLE_META[1], answerCapsules: MOCK_ANSWER_CAPSULES_AI },
  ];

  // For articles 2–5, construct answer capsule refs from the mock article meta.
  // Full answer capsules for these articles live in BlogPost.tsx; we include the
  // summaries that are available via the mock data here.
  for (const src of capsuleDataSources) {
    const { meta, answerCapsules } = src;
    map.set(meta.slug, {
      slug: meta.slug,
      content: `${meta.title}. ${meta.excerpt} Written by ${meta.author} (${meta.authorRole}). Published ${meta.date}. Category: ${meta.category}.`,
      answerCapsules,
    });
  }

  // Articles with answer capsules not separately exported — build from metadata
  for (let i = 2; i < MOCK_ARTICLE_META.length; i++) {
    const meta = MOCK_ARTICLE_META[i];
    if (!map.has(meta.slug)) {
      map.set(meta.slug, {
        slug: meta.slug,
        content: `${meta.title}. ${meta.excerpt} Written by ${meta.author} (${meta.authorRole}). Published ${meta.date}. Category: ${meta.category}.`,
        answerCapsules: {},
      });
    }
  }

  return map;
})();

/* ── Locale overrides ── */

const LOCALE_ROUTE_OVERRIDES: Record<string, Record<string, string>> = {
  ro: {
    "/":
      "Perioskoup este o aplicație de companion dentar bazată pe AI, fondată în București, România de Dr. Anca Laura Constantin (CEO, medic parodontolog) și Eduard Ciugulea (Co-founder & CGO). A câștigat Premiul 3 la EFP Digital Innovation Award 2025 la EuroPerio11, Viena. Aplicația face legătura între vizitele la dentist prin urmărirea obiceiurilor, memento-uri inteligente și un panou pentru clinicieni. Perioskoup stochează datele pe servere din UE și respectă GDPR. Este un companion de wellness, nu un dispozitiv medical. Înscrie-te în lista de așteptare pentru acces prioritar.",
    "/about":
      "Perioskoup a fost co-fondat în 2025 în București, România de Dr. Anca Laura Constantin (CEO, medic parodontolog practicant, membră EFP), Eduard Ciugulea (Co-fondator & CGO) și Petrica Nancu (CTO & Head of AI). Compania a câștigat Premiul 3 la EFP Digital Innovation Award 2025 la EuroPerio11 în Viena, selectat din 20 de aplicații din 17 societăți parodontale naționale. Perioskoup este un SRL românesc înregistrat în iunie 2025.",
  },
};

/* ─── Endpoint Handlers ─── */

/**
 * Fetch GEO capsule content for a static route.
 *
 * @param route  Route path (e.g. "/features", "/about")
 * @param locale ISO 639-1 locale code (default: "en")
 * @returns GEOCapsuleResponse with content or error
 */
export function getCapsuleByRoute(
  route: string,
  locale: string = DEFAULT_LOCALE,
): GEOCapsuleResponse {
  // Check locale-specific override first
  const localeContent = LOCALE_ROUTE_OVERRIDES[locale]?.[route];
  const content = localeContent ?? routeCapsuleIndex.get(route);

  if (!content) {
    return { ok: false, error: `No GEO capsule found for route "${route}"` };
  }

  return {
    ok: true,
    data: {
      route,
      locale: localeContent ? locale : DEFAULT_LOCALE,
      content,
      lastModified: LAST_MODIFIED,
    },
  };
}

/**
 * Fetch GEO capsule content for a blog post by slug.
 *
 * @param slug   Blog post slug (e.g. "what-is-periodontal-disease")
 * @param locale ISO 639-1 locale code (default: "en")
 * @returns GEOCapsuleResponse with content, answer capsules, or error
 */
export function getBlogCapsule(
  slug: string,
  locale: string = DEFAULT_LOCALE,
): GEOCapsuleResponse {
  const entry = blogCapsuleIndex.get(slug);

  if (!entry) {
    return { ok: false, error: `No blog capsule found for slug "${slug}"` };
  }

  // Blog locale overrides not yet available — fall back to English
  void locale;

  return {
    ok: true,
    data: {
      route: `/blog/${slug}`,
      locale: DEFAULT_LOCALE,
      content: entry.content,
      answerCapsules:
        Object.keys(entry.answerCapsules).length > 0
          ? entry.answerCapsules
          : undefined,
      lastModified: LAST_MODIFIED,
    },
  };
}

/**
 * Unified query handler — resolves capsule content by route, with
 * optional slug for blog posts and locale for localisation.
 *
 * @param query  { route, slug?, locale? }
 * @returns GEOCapsuleResponse
 */
export function fetchCapsule(query: GEOCapsuleQuery): GEOCapsuleResponse {
  const { route, slug, locale = DEFAULT_LOCALE } = query;

  // Blog post routes: prefer explicit slug, otherwise extract from path
  if (slug || route.startsWith("/blog/")) {
    const blogSlug = slug ?? route.replace(/^\/blog\//, "");
    return getBlogCapsule(blogSlug, locale);
  }

  return getCapsuleByRoute(route, locale);
}

/**
 * List all available route keys that have GEO capsule content.
 */
export function listCapsuleRoutes(): string[] {
  return Array.from(routeCapsuleIndex.keys());
}

/**
 * List all available blog slugs that have GEO capsule entries.
 */
export function listBlogCapsuleSlugs(): string[] {
  return Array.from(blogCapsuleIndex.keys());
}

/**
 * Check whether a GEO capsule exists for a given route or blog slug.
 */
export function hasCapsule(route: string, slug?: string): boolean {
  if (slug || route.startsWith("/blog/")) {
    const blogSlug = slug ?? route.replace(/^\/blog\//, "");
    return blogCapsuleIndex.has(blogSlug);
  }
  return routeCapsuleIndex.has(route);
}

/**
 * Async wrapper for fetchCapsule — matches a future API-backed
 * implementation signature. Returns a Promise for drop-in replacement
 * when the blog data moves to a CMS/API.
 *
 * @param query  { route, slug?, locale? }
 * @returns Promise<GEOCapsuleResponse>
 */
export async function fetchCapsuleAsync(
  query: GEOCapsuleQuery,
): Promise<GEOCapsuleResponse> {
  // Currently resolves synchronously from the static index.
  // When VITE_BLOG_API_URL is set, this will fetch from the remote API.
  const apiUrl = import.meta.env.VITE_BLOG_API_URL as string | undefined;

  if (apiUrl) {
    try {
      const endpoint = query.slug
        ? BLOG_API.article(query.slug)
        : BLOG_API.capsule(query.route);

      const params = new URLSearchParams();
      if (query.locale && query.locale !== DEFAULT_LOCALE) {
        params.set("locale", query.locale);
      }
      const url = params.toString()
        ? `${endpoint}?${params.toString()}`
        : endpoint;

      const res = await fetch(url, {
        headers: BLOG_API_HEADERS,
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) {
        // Fall back to local data on HTTP error
        return fetchCapsule(query);
      }

      const data = (await res.json()) as GEOCapsulePayload;
      return { ok: true, data };
    } catch {
      // Network error — fall back to local data
      return fetchCapsule(query);
    }
  }

  return fetchCapsule(query);
}
