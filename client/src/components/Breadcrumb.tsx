/**
 * Breadcrumb -- Discrete breadcrumb navigation with JSON-LD structured data
 * 
 * Brand: sage grey (#8C9C8C) text, subtle styling, SEO-optimized
 * Renders both visible breadcrumbs and JSON-LD BreadcrumbList schema
 */

import { Link } from "wouter";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Build JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `https://perioskoup.com${item.href}` : `https://perioskoup.com${typeof window !== 'undefined' ? window.location.pathname : '/'}`,
    })),
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visible breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        style={{
          position: "relative",
          zIndex: 5,
          marginBottom: 16,
        }}
      >
        <ol
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            listStyle: "none",
            padding: 0,
            margin: 0,
            fontFamily: "Gabarito, sans-serif",
            fontSize: 13,
            letterSpacing: "0.01em",
          }}
        >
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {i > 0 && (
                <span style={{ color: "#4A5E6A", fontSize: 11 }}>
                  /
                </span>
              )}
              {item.href && i < items.length - 1 ? (
                <Link
                  href={item.href}
                  style={{
                    color: "#8C9C8C",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C0E57A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8C9C8C")}
                >
                  {item.label}
                </Link>
              ) : (
                <span style={{ color: "#8C9C8C" }}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
