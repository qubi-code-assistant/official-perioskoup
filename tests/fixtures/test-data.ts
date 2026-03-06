/**
 * Shared test fixtures for Perioskoup E2E tests
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
