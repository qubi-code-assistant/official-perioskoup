import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// Remove pre-render shell before mounting to prevent double-content
const shell = document.getElementById("pre-render-shell");
if (shell) shell.remove();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
