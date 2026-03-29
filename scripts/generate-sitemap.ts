/**
 * generate-sitemap.ts
 * Generates client/public/sitemap.xml and client/public/feed.xml
 * from core routes + blog article data extracted from BlogPost.tsx.
 *
 * Run: pnpm sitemap
 */

import fs from "fs";
import path from "path";

const BASE_URL = "https://perioskoup.com";
const BLOG_POST_PATH = path.resolve("client/src/pages/BlogPost.tsx");
const SITEMAP_PATH = path.resolve("client/public/sitemap.xml");
const RSS_PATH = path.resolve("client/public/feed.xml");

// ─── Core routes ───
const CORE_ROUTES = [
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

// Routes excluded from sitemap (noindex)
const EXCLUDED_ROUTES = new Set(["/waitlist", "/privacy", "/terms"]);

// ─── Parse articles from BlogPost.tsx ───
interface ArticleInfo {
  slug: string;
  title: string;
  date: string;
  metaDescription: string;
  author: string;
  excerpt: string;
  category: string;
}

function parseArticles(): ArticleInfo[] {
  const content = fs.readFileSync(BLOG_POST_PATH, "utf-8");
  const articles: ArticleInfo[] = [];

  // Extract each article block by matching slug keys in the ARTICLES object
  // Pattern: "slug-value": { slug: "...", title: "...", date: "...", ... }
  const articleBlockRegex = /"([\w-]+)":\s*\{[\s\S]*?(?=^\s*"[\w-]+":\s*\{|\};)/gm;
  
  // Simpler approach: find all slug fields
  const slugMatches = content.matchAll(/slug:\s*"([\w-]+)"/g);
  const titleMatches = [...content.matchAll(/title:\s*"([^"]+)"/g)];
  const dateMatches = [...content.matchAll(/date:\s*"(\d{4}-\d{2}-\d{2})"/g)];
  const descMatches = [...content.matchAll(/metaDescription:\s*"([^"]+)"/g)];
  const authorMatches = [...content.matchAll(/author:\s*"([^"]+)"/g)];
  const excerptMatches = [...content.matchAll(/excerpt:\s*"([^"]+)"/g)];
  const categoryMatches = [...content.matchAll(/category:\s*"([^"]+)"/g)];

  let i = 0;
  for (const slugMatch of slugMatches) {
    const slug = slugMatch[1];
    articles.push({
      slug,
      title: titleMatches[i]?.[1] ?? slug,
      date: dateMatches[i]?.[1] ?? new Date().toISOString().slice(0, 10),
      metaDescription: descMatches[i]?.[1] ?? "",
      author: authorMatches[i]?.[1] ?? "Perioskoup",
      excerpt: excerptMatches[i]?.[1] ?? "",
      category: categoryMatches[i]?.[1] ?? "Blog",
    });
    i++;
  }

  return articles;
}

// ─── Sitemap generation ───
function generateSitemap(articles: ArticleInfo[]) {
  const today = new Date().toISOString().slice(0, 10);

  const coreEntries = CORE_ROUTES.filter((r) => !EXCLUDED_ROUTES.has(r))
    .map((route) => {
      const url = `${BASE_URL}${route}`;
      const priority = route === "/" ? "1.0" : "0.8";
      const changefreq = route === "/" ? "weekly" : "monthly";
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
  </url>`;
    })
    .join("");

  const blogEntries = articles
    .map((a) => {
      const url = `${BASE_URL}/blog/${a.slug}`;
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${a.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${coreEntries}
${blogEntries}
</urlset>`;
}

// ─── RSS feed generation ───
function generateRSS(articles: ArticleInfo[]) {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sorted
    .map((a) => {
      const url = `${BASE_URL}/blog/${a.slug}`;
      const pubDate = new Date(a.date).toUTCString();
      return `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${a.excerpt || a.metaDescription}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>hello@perioskoup.com (${a.author})</author>
      <category>${a.category}</category>
    </item>`;
    })
    .join("");

  const lastBuildDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Perioskoup Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Insights on periodontal health, AI in dentistry, and patient engagement from the Perioskoup team.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/images/og-image.jpg</url>
      <title>Perioskoup Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>`;
}

// ─── Main ───
async function main() {
  console.log("📰 Parsing articles from BlogPost.tsx...");
  const articles = parseArticles();
  console.log(`   Found ${articles.length} articles: ${articles.map((a) => a.slug).join(", ")}`);

  console.log("🗺️  Generating sitemap.xml...");
  const sitemap = generateSitemap(articles);
  fs.writeFileSync(SITEMAP_PATH, sitemap, "utf-8");
  console.log(`   Written to ${SITEMAP_PATH}`);

  console.log("📡 Generating feed.xml (RSS)...");
  const rss = generateRSS(articles);
  fs.writeFileSync(RSS_PATH, rss, "utf-8");
  console.log(`   Written to ${RSS_PATH}`);

  console.log("✅ Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
