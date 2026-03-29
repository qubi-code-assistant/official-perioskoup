/**
 * Post-build prerender script.
 * Uses Playwright to visit each route, capture the rendered HTML,
 * and write it to dist/public so crawlers/social scrapers get full content.
 *
 * Usage: pnpm build && pnpm prerender
 */
import { chromium } from "playwright";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";

const DIST = join(import.meta.dirname, "..", "dist", "public");
const PORT = 4173;

// All routes to prerender
const ROUTES = [
  "/",
  "/features",
  "/for-dentists",
  "/pricing",
  "/about",
  "/blog",
  "/blog/what-is-periodontal-disease",
  "/blog/how-ai-is-changing-dental-monitoring",
  "/blog/3-minute-routine-save-teeth",
  "/blog/efp-digital-innovation-award-2025",
  "/blog/why-patients-forget-instructions",
  "/blog/building-the-bridge-perioskoup-story",
  "/contact",
  "/waitlist",
  "/privacy",
  "/terms",
];

// Simple static file server for dist/public
function startServer(): Promise<ReturnType<typeof createServer>> {
  return new Promise((resolve) => {
    const fallback = readFileSync(join(DIST, "index.html"), "utf-8");
    const server = createServer((req, res) => {
      const url = req.url ?? "/";
      const filePath = join(DIST, url === "/" ? "index.html" : url);

      if (existsSync(filePath) && !filePath.endsWith("/")) {
        const ext = filePath.split(".").pop() ?? "";
        const mimeTypes: Record<string, string> = {
          html: "text/html",
          js: "application/javascript",
          css: "text/css",
          json: "application/json",
          svg: "image/svg+xml",
          png: "image/png",
          jpg: "image/jpeg",
          webp: "image/webp",
          woff2: "font/woff2",
          xml: "application/xml",
          txt: "text/plain",
        };
        res.writeHead(200, { "Content-Type": mimeTypes[ext] ?? "application/octet-stream" });
        res.end(readFileSync(filePath));
      } else {
        // SPA fallback
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fallback);
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  console.log("Starting prerender...");
  const server = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const route of ROUTES) {
    const page = await context.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });

    // Force all reveal animations visible
    await page.evaluate(() => {
      document.querySelectorAll(".reveal,.reveal-scale").forEach((el) => {
        el.classList.add("visible");
      });
    });

    // Wait a tick for any final renders
    await page.waitForTimeout(500);

    // Get the full HTML
    const html = await page.content();

    // Determine output path
    const outPath = route === "/"
      ? join(DIST, "index.html")
      : join(DIST, route, "index.html");

    const outDir = dirname(outPath);
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }

    writeFileSync(outPath, html, "utf-8");
    console.log(`  ✓ ${route} → ${outPath.replace(DIST, "dist/public")}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nPrerendered ${ROUTES.length} routes.`);
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
