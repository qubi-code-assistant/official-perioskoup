import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

// Initialise PostHog analytics (no-op when VITE_POSTHOG_KEY is absent)
initAnalytics();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
