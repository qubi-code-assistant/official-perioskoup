import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// Hide LCP shell once React is ready
const lcpShell = document.getElementById("lcp-shell");
if (lcpShell) lcpShell.style.display = "none";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
