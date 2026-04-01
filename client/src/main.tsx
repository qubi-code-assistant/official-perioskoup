import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { initAnalytics } from "./lib/analytics";
import { getCookieConsent } from "./lib/cookies";
import "./index.css";

// Only initialise analytics if the user has already given consent on a prior visit.
// First-time visitors will trigger initAnalytics() from CookieBanner on accept.
if (getCookieConsent() === "accepted") {
  initAnalytics();
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
