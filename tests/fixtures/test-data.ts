/**
 * Shared test fixtures for Perioskoup E2E and unit tests
 *
 * Usage: import { VALID_DENTIST, VALID_PATIENT, INVALID_EMAILS } from '../fixtures/test-data';
 */

export const VALID_DENTIST = {
  firstName: "Anca",
  lastName: "Constantin",
  email: "anca.test@periodontal-clinic.ro",
  clinicName: "Periodontal Clinic Bucharest",
  city: "Bucharest, Romania",
} as const;

export const VALID_PATIENT = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.patient@example.com",
} as const;

export const INVALID_EMAILS = [
  "notanemail",
  "missing@tld",
  "@nodomain.com",
  "spaces in@email.com",
  "",
] as const;

export const XSS_PAYLOADS = [
  '<script>window.__xss=1</script>',
  '"><img src=x onerror=alert(1)>',
  "javascript:alert('xss')",
  '<svg onload=alert(1)>',
] as const;

export const LONG_INPUTS = {
  // 5000 characters
  name: "A".repeat(5000),
  // 10000 characters
  message: "B".repeat(10000),
  // Standard email-length valid address
  email: `${"a".repeat(60)}@${"b".repeat(60)}.com`,
} as const;

export const BLOG_SLUGS = [
  "what-is-periodontal-disease",
  "efp-digital-innovation-award-2025",
  "how-ai-is-changing-dental-monitoring",
  "3-minute-routine-save-teeth",
  "why-patients-forget-instructions",
  "building-the-bridge-perioskoup-story",
] as const;

export const ALL_ROUTES = [
  "/",
  "/features",
  "/for-dentists",
  "/pricing",
  "/about",
  "/blog",
  "/contact",
  "/waitlist",
  "/privacy",
  "/terms",
] as const;

export const UNKNOWN_ROUTES = [
  "/this-page-does-not-exist",
  "/foo/bar/baz",
  "/admin",
  "/dashboard",
  "/login",
] as const;

/** Contact form valid submission payload */
export const VALID_CONTACT = {
  firstName: "Anca",
  lastName: "Constantin",
  email: "anca@perioskoup.com",
  role: "dentist",
  message: "Interested in the founding clinic partnership.",
} as const;

/** Blog article metadata used in unit + E2E tests */
export const BLOG_ARTICLES = [
  {
    slug: "what-is-periodontal-disease",
    title: "What Is Periodontal Disease? A Patient's Complete Guide",
    category: "Patient Education",
    author: "Dr. Anca Laura Constantin",
  },
  {
    slug: "efp-digital-innovation-award-2025",
    title: "Perioskoup Wins EFP Digital Innovation Award 2025",
    category: "Company News",
    author: "Eduard Ciugulea",
  },
  {
    slug: "how-ai-is-changing-dental-monitoring",
    title: "How AI Is Changing Dental Monitoring",
    category: "Technology",
    author: "Petrica Nancu",
  },
  {
    slug: "3-minute-routine-save-teeth",
    title: "The 3-Minute Daily Routine",
    category: "Patient Habits",
    author: "Dr. Anca Laura Constantin",
  },
  {
    slug: "why-patients-forget-instructions",
    title: "Why Patients Forget Dental Instructions",
    category: "Clinical Insight",
    author: "Dr. Anca Laura Constantin",
  },
  {
    slug: "building-the-bridge-perioskoup-story",
    title: "Building the Bridge: The Perioskoup Story",
    category: "Founder Story",
    author: "Eduard Ciugulea",
  },
] as const;

/** All internal Footer link hrefs */
export const FOOTER_INTERNAL_HREFS = [
  "/features",
  "/for-dentists",
  "/pricing",
  "/waitlist",
  "/about",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export const EFP_URL =
  "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/" as const;

/** Invalid blog slugs for fallback UI testing */
export const INVALID_BLOG_SLUGS = [
  "this-slug-does-not-exist",
  "completely-made-up-xyz",
  "admin",
  "undefined",
] as const;
