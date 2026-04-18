/*
 * PERIOSKOUP -- BLOG PAGE
 * Design: Clinical Precision, Human Warmth -- Dark Tech-Medical Premium
 */
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useScrollDepth } from "@/hooks/useScrollDepth";

// TODO: Add blog posts here when ready
// const POSTS = [ { slug, category, title, excerpt, date, readTime, author, authorImg, featured } ];
const POSTS: never[] = [];

export default function Blog() {
  useReveal();
  const { GEOCapsule } = usePageMeta("/blog");
  const scrollRef = useScrollDepth("blog");

  return (
    <div ref={scrollRef} style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Blog | Perioskoup</title>
        <meta name="description" content="Evidence-based articles on periodontal health, dental AI, and patient care from the Perioskoup team. Coming soon." />
        <link rel="canonical" href="https://perioskoup.com/blog" />
        <meta property="og:title" content="Blog | Perioskoup" />
        <meta property="og:description" content="Evidence-based articles on periodontal health, dental AI, and patient care. Coming soon." />
        <meta property="og:url" content="https://perioskoup.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/blog" />
      </Helmet>
      {GEOCapsule}
      <Navbar />

      {/* Hero */}
      <section id="main-content" style={{ paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <div className="reveal" style={{ marginBottom: "20px" }}>
            <span className="label-tag">Knowledge Hub</span>
          </div>
          <h1 className="display-lg reveal" style={{ transitionDelay: "0.08s", marginBottom: "20px" }}>
            Insights on dental health,<br />
            <span style={{ color: "#C0E57A" }}>AI, and care.</span>
          </h1>
          <p className="body-lg reveal" style={{ maxWidth: "520px", transitionDelay: "0.16s" }}>
            Evidence-based articles for patients and clinicians navigating the future of periodontal care.
          </p>
        </div>
      </section>

      {/* Empty state */}
      {POSTS.length === 0 && (
        <section style={{ paddingBottom: "120px" }}>
          <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
            <div className="reveal" style={{ padding: "60px 32px", background: "#1D3449", border: "1px solid #234966", borderRadius: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: 36, fontWeight: 700, color: "#F5F9EA", marginBottom: 12, lineHeight: 1 }}>
                Articles coming soon
              </h2>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, color: "#8C9C8C", lineHeight: 1.65, marginBottom: 32 }}>
                We're preparing evidence-based articles on periodontal health, dental AI, and patient care written by our clinical team. Check back soon.
              </p>
              <Link href="/waitlist" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
                Join the Waitlist
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter section — hidden until backend is connected
      <section style={{ background: "#050C10", padding: "80px 0", borderTop: "1px solid #234966" }}>
        ...
      </section>
      */}

      <Footer />
    </div>
  );
}
