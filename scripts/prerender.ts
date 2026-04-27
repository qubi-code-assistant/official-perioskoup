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
  "/contact",
  "/waitlist",
  "/privacy",
  "/terms",
];

const NOINDEX_ROUTES = new Set(["/privacy", "/terms", "/waitlist"]);

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/for-dentists", label: "For Dentists" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/waitlist", label: "Join the Waitlist" },
];

function buildNoscript(route: string, title: string, description: string, capsuleText: string): string {
  if (NOINDEX_ROUTES.has(route)) {
    return `
      <div style="background:#0A171E;color:#F5F9EA;font-family:system-ui,sans-serif;padding:40px 24px;max-width:900px;margin:0 auto">
        <h1 style="font-size:36px;line-height:1;margin:0 0 16px">${escapeHtml(title)}</h1>
        <p style="color:#8C9C8C;font-size:16px;line-height:1.65">${escapeHtml(description)}</p>
        <p style="margin-top:24px"><a href="/" style="color:#C0E57A">← Back to Perioskoup</a></p>
      </div>`;
  }

  const navHtml = NAV_LINKS
    .filter((l) => l.href !== route)
    .map((l) => `<a href="${l.href}" style="color:#C0E57A">${l.label}</a>`)
    .join(" · ");

  const capsuleHtml = capsuleText
    ? `<section style="margin-bottom:32px">
        <h2 style="font-size:22px;margin:0 0 12px">About This Page</h2>
        <p style="color:#8C9C8C;font-size:14px;line-height:1.65">${escapeHtml(capsuleText)}</p>
      </section>`
    : "";

  return `
      <div style="background:#0A171E;color:#F5F9EA;font-family:system-ui,sans-serif;padding:40px 24px;max-width:900px;margin:0 auto">
        <header style="margin-bottom:32px">
          <p style="color:#8C9C8C;font-size:14px">AI Dental Companion App | EFP Digital Innovation Award 2025 — 3rd Prize</p>
        </header>
        <main>
          <h1 style="font-size:36px;line-height:1;margin:0 0 16px">${escapeHtml(title)}</h1>
          <p style="color:#8C9C8C;font-size:18px;line-height:1.65;max-width:600;margin-bottom:32px">${escapeHtml(description)}</p>
          ${capsuleHtml}
          <section>
            <p style="color:#8C9C8C;font-size:14px">General: hello@perioskoup.com | Support: support@perioskoup.com</p>
            <p style="color:#8C9C8C;font-size:14px;margin-top:8px">Perioskoup SRL · Buzău, Romania · Founded June 2025</p>
            <nav style="margin-top:16px">
              <p style="color:#8C9C8C;font-size:13px">${navHtml} · <a href="/llms-full.txt" style="color:#C0E57A">Full content (llms-full.txt)</a></p>
            </nav>
          </section>
        </main>
      </div>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

    // Force all reveal animations visible — uses querySelectorAll, not eval()
    await page.$$eval(".reveal,.reveal-scale", (els) => {
      els.forEach((el) => el.classList.add("visible"));
    });

    // Wait a tick for any final renders
    await page.waitForTimeout(500);

    // Get the full HTML and deduplicate <title> / <meta name="description">
    // react-helmet-async injects page-specific tags but leaves the original template ones,
    // so the snapshot ends up with duplicates — keep only the first occurrence of each.
    let html = await page.content();
    html = html.replace(
      /(<title>[^<]*<\/title>)(\s*<title>[^<]*<\/title>)+/gi,
      "$1",
    );
    html = html.replace(
      /(<meta name="description" [^>]*>)(\s*<meta name="description" [^>]*>)+/gi,
      "$1",
    );

    // Extract page-specific content for noscript replacement
    const pageTitle = await page.$eval("title", (el) => el.textContent ?? "").catch(() => "Perioskoup");
    const pageDesc = await page.$eval('meta[name="description"]', (el) => el.getAttribute("content") ?? "").catch(() => "");
    const capsuleText = await page.$eval("[data-geo-capsule]", (el) => el.textContent ?? "").catch(() => "");

    const noscriptContent = buildNoscript(route, pageTitle, pageDesc, capsuleText);
    html = html.replace(/(<noscript>)\s*<div[\s\S]*?(<\/noscript>)/i, `$1${noscriptContent}$2`);

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
  if (process.env.CI) {
    console.warn("Skipping prerender in CI environment.");
    process.exit(0);
  }
  process.exit(1);
});
