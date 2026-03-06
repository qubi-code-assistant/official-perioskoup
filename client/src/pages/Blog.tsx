/*
 * PERIOSKOUP -- BLOG PAGE
 * Design: Clinical Precision, Human Warmth -- Dark Tech-Medical Premium
 * Animation: JS onMouseEnter/Leave replaced with CSS .blog-card-hover and .blog-row-hover.
 */
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";

const ANCA_IMG = "/images/anca-headshot.jpg";
const EDI_IMG = "/images/eduard-headshot.jpg";

function useReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll(".reveal, .reveal-scale");

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const POSTS = [
  {
    slug: "what-is-periodontal-disease",
    category: "Patient Education",
    title: "What Is Periodontal Disease? A Patient's Complete Guide",
    excerpt: "Periodontal disease affects more than half of adults over 30, yet most people have never heard the word 'periodontist'. Here's everything you need to know.",
    date: "12 Nov 2025",
    readTime: "8 min read",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    featured: true,
  },
  {
    slug: "efp-digital-innovation-award-2025",
    category: "Company News",
    title: "Perioskoup Wins EFP Digital Innovation Award 2025",
    excerpt: "At EuroPerio11 in Vienna, Perioskoup was awarded 3rd Prize at the EFP Digital Innovation Awards - selected from 20 submissions across 17 national societies.",
    date: "17 May 2025",
    readTime: "4 min read",
    author: "Eduard Ciugulea",
    authorImg: EDI_IMG,
    featured: true,
  },
  {
    slug: "how-ai-is-changing-dental-monitoring",
    category: "Technology",
    title: "How AI Is Changing Dental Monitoring - And Why It Matters",
    excerpt: "From pattern recognition in X-rays to personalised habit coaching, AI is beginning to close the gap between clinical visits. Here's what's real and what's hype.",
    date: "3 Dec 2025",
    readTime: "7 min read",
    author: "Eduard Ciugulea",
    authorImg: EDI_IMG,
    featured: false,
  },
  {
    slug: "3-minute-routine-save-teeth",
    category: "Patient Habits",
    title: "The 3-Minute Daily Routine That Could Save Your Teeth",
    excerpt: "Most people spend more time choosing what to watch on Netflix than caring for their teeth. Here's a clinically-backed 3-minute routine that actually works.",
    date: "8 Jan 2026",
    readTime: "5 min read",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    featured: false,
  },
  {
    slug: "why-patients-forget-instructions",
    category: "Clinical Insight",
    title: "Why Patients Forget Dental Instructions (And What to Do About It)",
    excerpt: "Research shows patients forget up to 80% of clinical instructions within 24 hours. A periodontist explains why - and how technology is changing this.",
    date: "5 Oct 2025",
    readTime: "6 min read",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    featured: false,
  },
  {
    slug: "building-the-bridge-perioskoup-story",
    category: "Founder Story",
    title: "Building the Bridge: The Perioskoup Story",
    excerpt: "How a periodontist, a developer, and a product designer decided to build the dental companion they always wished existed.",
    date: "1 Sep 2025",
    readTime: "7 min read",
    author: "Dr. Anca Laura Constantin",
    authorImg: ANCA_IMG,
    featured: false,
  },
];

const FEATURED = POSTS.filter((p) => p.featured);
const REGULAR = POSTS.filter((p) => !p.featured);

export default function Blog() {
  useReveal();

  return (
    <div style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Dental Health &amp; AI Blog | Periodontal Care Insights | Perioskoup</title>
        <meta name="description" content="Evidence-based articles on periodontal health, dental AI, and patient care from Dr. Anca Constantin (Periodontist, EFP Award 2025) and the Perioskoup team." />
        <link rel="canonical" href="https://perioskoup.com/blog" />
        <meta property="og:title" content="Dental Health &amp; AI Blog | Periodontal Care Insights | Perioskoup" />
        <meta property="og:description" content="Articles on periodontal disease, AI in dental care, and daily oral health habits. Written by Dr. Anca Laura Constantin and the Perioskoup team." />
        <meta property="og:url" content="https://perioskoup.com/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Dental Health &amp; AI Blog | Perioskoup" />
        <meta name="twitter:description" content="Evidence-based articles on periodontal health, AI in dental care, and daily oral habits from a practising periodontist. EFP Award 2025 winners." />
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/blog" />
      </Helmet>

      {/* Blog ItemList + FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Perioskoup Blog. Dental Health & AI Insights",
            "description": "Evidence-based articles on periodontal health, dental AI, and patient care from the Perioskoup team.",
            "url": "https://perioskoup.com/blog",
            "itemListElement": POSTS.map((p, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "url": `https://perioskoup.com/blog/${p.slug}`,
              "name": p.title,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What topics does the Perioskoup blog cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Perioskoup blog covers periodontal disease education, AI in dental care, daily oral health habits, clinical insights from Dr. Anca Laura Constantin (Periodontist, EFP Award 2025), and company news.",
                },
              },
              {
                "@type": "Question",
                "name": "Who writes the Perioskoup blog?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Articles are written by Dr. Anca Laura Constantin (Periodontist, EFP Digital Innovation Award 2025 winner) and Eduard Ciugulea (Co-founder & CGO). Clinical articles are authored by Dr. Anca and reflect her experience as a practising periodontist.",
                },
              },
            ],
          }),
        }}
      />
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

      {/* Featured posts -- CSS .blog-card-hover, no JS style mutations */}
      <section style={{ paddingBottom: "80px" }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {FEATURED.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="blog-card-hover"
                  style={{
                    background: "#1D3449",
                    border: "1px solid #234966",
                    borderRadius: "16px",
                    padding: "40px",
                    cursor: "pointer",
                    transitionDelay: `${i * 80}ms`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="label-tag">{post.category}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#C0E57A" }}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#F5F9EA", lineHeight: 1.05, margin: 0 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "15px", color: "#8C9C8C", lineHeight: 1.65, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid #234966" }}>
                    <img src={post.authorImg} alt={post.author} width={32} height={32} style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0 }} />
                    <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#F5F9EA", fontWeight: 600 }}>{post.author}</span>
                    <span style={{ marginLeft: "auto", fontFamily: "Gabarito, sans-serif", fontSize: "12px", color: "#8C9C8C" }}>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section style={{ padding: "60px 0", background: "#050C10" }}>
        <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
          <div className="reveal" style={{ padding: "40px 32px", background: "rgba(29,52,73,0.5)", border: "1px solid rgba(192,229,122,0.15)", borderRadius: 20, backdropFilter: "blur(12px)" }}>
            <p style={{ fontFamily: "Dongle, sans-serif", fontSize: 32, color: "#F5F9EA", lineHeight: 1, marginBottom: 12 }}>
              Interested in what we're building?
            </p>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, color: "#8C9C8C", marginBottom: 24 }}>
              Join 30+ founding clinics on the Perioskoup waitlist. The AI dental companion launching March 2026.
            </p>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Join the Waitlist
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* All articles -- CSS .blog-row-hover, no JS style mutations */}
      <section style={{ paddingBottom: "120px", borderTop: "1px solid #234966", paddingTop: "80px" }}>
        <div className="container">
          <h2 className="display-sm reveal" style={{ marginBottom: "48px" }}>All Articles</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {REGULAR.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="reveal blog-row-hover flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                  style={{
                    padding: "28px 0",
                    borderBottom: "1px solid #234966",
                    cursor: "pointer",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span className="label-tag">{post.category}</span>
                      <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "12px", color: "#8C9C8C" }}>{post.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 700, color: "#F5F9EA", lineHeight: 1.1, margin: "0 0 8px" }}>
                      {post.title}
                    </h3>
                    <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "14px", color: "#8C9C8C", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 sm:ml-auto" style={{ minWidth: "fit-content" }}>
                    <img src={post.authorImg} alt={post.author} width={36} height={36} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#F5F9EA", fontWeight: 600, margin: 0 }}>{post.author.split(" ")[0]}</p>
                      <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "12px", color: "#C0E57A", margin: 0 }}>{post.readTime}</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#8C9C8C" }}>
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA -- input uses .p-input class for consistent focus animation */}
      <section style={{ background: "#050C10", padding: "80px 0", borderTop: "1px solid #234966" }}>
        <div className="container" style={{ maxWidth: "560px", textAlign: "center" }}>
          <div className="reveal" style={{ marginBottom: "16px" }}>
            <span className="label-tag">Newsletter</span>
          </div>
          <h2 className="display-sm reveal" style={{ marginBottom: "16px", transitionDelay: "0.08s" }}>Stay informed.</h2>
          <p className="body-lg reveal" style={{ marginBottom: "32px", transitionDelay: "0.16s" }}>
            Get the latest articles on periodontal health and dental AI delivered to your inbox. No spam, ever.
          </p>
          <div className="reveal" style={{ display: "flex", gap: "8px", transitionDelay: "0.24s", flexWrap: "wrap", justifyContent: "center" }}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              className="p-input"
              style={{ flex: "1", minWidth: "220px" }}
              aria-required="true"
            />
            <button className="btn-primary" aria-label="Subscribe to newsletter">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
