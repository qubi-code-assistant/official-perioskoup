/**
 * PostHog analytics — fully deferred.
 *
 * posthog-js is loaded via dynamic import() only when VITE_POSTHOG_KEY
 * is set, so it adds zero bytes to the initial bundle when absent.
 * Initialisation is further deferred via requestIdleCallback so it
 * never competes with LCP / TTI.
 */

const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const host = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

type PostHog = typeof import("posthog-js").default;

let ph: PostHog | null = null;
let loadPromise: Promise<PostHog | null> | null = null;

/** Lazily load the posthog-js module (once). */
function loadPostHog(): Promise<PostHog | null> {
  if (!key) return Promise.resolve(null);
  if (!loadPromise) {
    loadPromise = import("posthog-js").then((m) => {
      ph = m.default;
      return ph;
    });
  }
  return loadPromise;
}

/** Initialise PostHog – silent no-op when the key is missing. Deferred to idle time. */
export function initAnalytics(): void {
  if (!key) return;

  const init = () => {
    loadPostHog().then((posthog) => {
      if (!posthog) return;
      posthog.init(key, {
        api_host: host || "https://us.i.posthog.com",
        autocapture: false,
        capture_pageview: true,
        persistence: "localStorage+cookie",
      });
    });
  };

  // Defer to idle time so PostHog never blocks TTI / TBT
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(init, { timeout: 3000 });
  } else {
    setTimeout(init, 1500);
  }
}

/** Capture a named event. No-op if PostHog was never initialised. */
export function capture(
  event: string,
  properties?: Record<string, unknown>,
): void {
  if (!key) return;
  loadPostHog().then((posthog) => posthog?.capture(event, properties));
}

/** Track a page view. Call from route-change hooks. */
export function capturePageView(path: string): void {
  if (!key) return;
  loadPostHog().then((posthog) =>
    posthog?.capture("$pageview", { $current_url: path }),
  );
}

/** Identify a user (e.g. after waitlist signup). */
export function identify(
  distinctId: string,
  properties?: Record<string, unknown>,
): void {
  if (!key) return;
  loadPostHog().then((posthog) => posthog?.identify(distinctId, properties));
}
