/*
 * PERIOSKOUP — BLOG PAGE
 * Design: Clinical Precision, Human Warmth — Dark Tech-Medical Premium
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import HeroGlow from "@/components/HeroGlow";

const ANCA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/anca_e45bcd41.jpeg";
const EDI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/edi_32419062.jpeg";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => io.observe(el));
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
    excerpt: "At EuroPerio11 in Vienna, Perioskoup was awarded 3rd Prize at the EFP Digital Innovation Awards — selected from 20 submissions across 17 national societies.",
    date: "17 May 2025",
    readTime: "4 min read",
    author: "Eduard Ciugulea",
    authorImg: EDI_IMG,
    featured: true,
  },
  {
    slug: "how-ai-is-changing-dental-monitoring",
    category: "Technology",
    title: "How AI Is Changing Dental Monitoring — And Why It Matters",
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
    excerpt: "Research shows patients forget up to 80% of clinical instructions within 24 hours. A periodontist explains why — and how technology is changing this.",
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
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <Navbar />
      <ParallaxHeroBg />
      <HeroGlow />

      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="container">
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

      {/* Featured posts */}
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
                  style={{
                    background: "#1D3449",
                    border: "1px solid #234966",
                    borderRadius: "16px",
                    padding: "40px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                    transitionDelay: `${i * 80}ms`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor = "#C0E57A"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "#234966"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="label-tag">{post.category}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#C0E57A" }}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "#F5F9EA", lineHeight: 1.05, margin: 0 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "15px", color: "#8C9C8C", lineHeight: 1.65, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid #234966" }}>
                    <img src={post.authorImg} alt={post.author} style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0 }} />
                    <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#F5F9EA", fontWeight: 600 }}>{post.author}</span>
                    <span style={{ marginLeft: "auto", fontFamily: "Gabarito, sans-serif", fontSize: "12px", color: "#8C9C8C" }}>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All articles */}
      <section style={{ paddingBottom: "120px", borderTop: "1px solid #234966", paddingTop: "80px" }}>
        <div className="container">
          <h2 className="display-sm reveal" style={{ marginBottom: "48px" }}>All Articles</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {REGULAR.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div
                  className="reveal"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    padding: "28px 0",
                    borderBottom: "1px solid #234966",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    transitionDelay: `${i * 60}ms`,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(29,52,73,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <span className="label-tag">{post.category}</span>
                      <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "12px", color: "#8C9C8C" }}>{post.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 700, color: "#F5F9EA", lineHeight: 1.1, margin: "0 0 8px" }}>
                      {post.title}
                    </h3>
                    <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "14px", color: "#8C9C8C", lineHeight: 1.6, margin: 0 }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                    <img src={post.authorImg} alt={post.author} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
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

      {/* Newsletter CTA */}
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
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: "1",
                minWidth: "220px",
                background: "#1D3449",
                border: "1px solid #234966",
                borderRadius: "8px",
                padding: "12px 16px",
                fontFamily: "Gabarito, sans-serif",
                fontSize: "15px",
                color: "#F5F9EA",
                outline: "none",
              }}
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
