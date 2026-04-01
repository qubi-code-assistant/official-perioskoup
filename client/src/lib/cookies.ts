const CONSENT_COOKIE = "perioskoup_consent";
const MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

export type CookieConsent = "accepted" | "declined";

export function getCookieConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(CONSENT_COOKIE + "="));
  const val = match?.split("=")[1];
  if (val === "accepted" || val === "declined") return val;
  return null;
}

export function setCookieConsent(value: CookieConsent): void {
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${MAX_AGE}; path=/; SameSite=Lax`;
}
