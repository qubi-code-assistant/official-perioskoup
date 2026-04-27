/**
 * PERIOSKOUP -- FEATURES PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text
 * Fonts: Dongle (display), Gabarito (body)
 */
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { capture } from "@/lib/analytics";
import { useScrollDepth } from "@/hooks/useScrollDepth";

const FEATURES: {
  icon: string;
  title: string;
  tag: string | string[];
  badge?: string;
  bullets: string[];
  desc: string;
  screenshot?: string; // e.g. "/images/screenshots/periobot.png"
}[] = [
  {
    icon: "🤖",
    title: "PerioBOT — Your Dental AI",
    tag: "Patient",
    badge: "Beta",
    bullets: [
      "Chat answers based on your own dental records",
      "Available 24/7 between appointments",
      "Gives insights and answers to your oral health concerns",
    ],
    desc: "Ask questions about your oral health and get personalized answers grounded in your clinical data.",
    // screenshot: "/images/screenshots/periobot.png",
  },
  {
    icon: "📋",
    title: "Treatment Plans",
    tag: "Dentist",
    bullets: [
      "Create and review treatment plans per patient",
      "Track plan status (pending, approved, completed)",
      "Patient-facing plan summaries with explanations",
    ],
    desc: "Structured treatment planning that keeps both dentist and patient aligned on next steps.",
    // screenshot: "/images/screenshots/treatment-plans.png",
  },
  {
    icon: "📂",
    title: "Document Management",
    tag: ["Patient", "Dentist"],
    bullets: [
      "Dentists attach files to patient profiles",
      "Upload X-rays, photos, and clinical documents",
      "Patients access their records anytime",
    ],
    desc: "All dental documents in one secure place — accessible to both patient and provider.",
    // screenshot: "/images/screenshots/documents.png",
  },
  {
    icon: "📱",
    title: "Instant QR Pairing",
    tag: ["Patient", "Dentist"],
    bullets: [
      "Scan a QR code to link patient and dentist",
      "Easy to share with your patients or dentist",
      "Secure handshake with JWT verification",
    ],
    desc: "Connect patient to dentist with a single scan — no forms, no friction.",
    // screenshot: "/images/screenshots/qr-pairing.png",
  },
  {
    icon: "🪥",
    title: "Daily Habit Tracker",
    tag: "Patient",
    bullets: [
      "Track brushing, flossing, mouthwash, and more",
      "Build streaks with daily check-ins",
      "Visual progress charts over time",
    ],
    desc: "Small daily habits, big dental health gains. Track your routine and watch your streaks grow.",
    // screenshot: "/images/screenshots/habit-tracker.png",
  },
];

function PhoneMockup({ icon, title, screenshot }: { icon: string; title: string; screenshot?: string }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Silent switch */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-3px", top: "18%", width: "3px", height: "6%", minHeight: "12px", borderRadius: "2px 0 0 2px", background: "#3A3A3C" }} />
      {/* Volume up */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-3px", top: "28%", width: "3px", height: "9%", minHeight: "18px", borderRadius: "2px 0 0 2px", background: "#3A3A3C" }} />
      {/* Volume down */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-3px", top: "40%", width: "3px", height: "9%", minHeight: "18px", borderRadius: "2px 0 0 2px", background: "#3A3A3C" }} />
      {/* Power button */}
      <div aria-hidden="true" style={{ position: "absolute", right: "-3px", top: "33%", width: "3px", height: "14%", minHeight: "24px", borderRadius: "0 2px 2px 0", background: "#3A3A3C" }} />

      {/* Phone body — Space Black titanium finish */}
      <div style={{
        width: "100%",
        aspectRatio: "9/19",
        borderRadius: "36px",
        background: "linear-gradient(160deg, #2E2E30 0%, #1C1C1E 55%, #262628 100%)",
        padding: "4%",
        boxShadow: [
          "0 0 0 1px rgba(255,255,255,0.08)",
          "inset 0 0 0 1px rgba(255,255,255,0.04)",
          "0 40px 80px rgba(0,0,0,0.85)",
          "0 16px 32px rgba(0,0,0,0.5)",
          "0 0 0 6px rgba(0,0,0,0.3)",
        ].join(", "),
      }}>
        {/* Screen glass */}
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "28px",
          background: "#000",
          overflow: "hidden",
          position: "relative",
          outline: "1px solid rgba(255,255,255,0.05)",
        }}>
          {screenshot ? (
            <img src={screenshot} alt={`${title} screenshot`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(165deg, #0D1F2D 0%, #071016 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}>
              <span style={{ fontSize: "32px", marginTop: "18%" }} aria-hidden="true">{icon}</span>
              <div style={{ textAlign: "center", padding: "0 18%" }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "9px", color: "#2A4A5E", fontWeight: 600, lineHeight: 1.4 }}>{title}</p>
              </div>
            </div>
          )}

          {/* Dynamic Island */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: "3%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "32%",
            height: "5%",
            minHeight: "20px",
            maxHeight: "28px",
            background: "#000",
            borderRadius: "100px",
            zIndex: 10,
          }} />

          {/* Home indicator */}
          <div aria-hidden="true" style={{
            position: "absolute",
            bottom: "2.5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "36%",
            height: "4px",
            background: "rgba(255,255,255,0.18)",
            borderRadius: "100px",
          }} />
        </div>
      </div>
    </div>
  );
}

const TAG_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Patient: { color: "#93A793", bg: "rgba(147,167,147,0.08)", border: "rgba(147,167,147,0.2)" },
  Dentist: { color: "#C0E57A", bg: "rgba(192,229,122,0.08)", border: "rgba(192,229,122,0.2)" },
};

export default function Features() {
  useReveal();
  const { GEOCapsule, meta } = usePageMeta("/features");
  const scrollRef = useScrollDepth("features");

  const featuresFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What features does Perioskoup offer for patients?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup offers patients personalised daily care programmes, smart reminders adapted to their routine, progress tracking with streaks and charts, a curated education library about periodontal conditions, and appointment preparation summaries." } },
      { "@type": "Question", "name": "What features does Perioskoup offer for dentists?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup provides dentists with a clinician dashboard to set up patient programmes, patient progress visibility between appointments, the ability to send targeted personalised guidance, and pre-visit patient progress summaries that reduce chair time." } },
      { "@type": "Question", "name": "Is Perioskoup GDPR compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Perioskoup is built with privacy-first principles, featuring end-to-end encryption, GDPR Article 9 protection, EU-hosted servers, and right to erasure built in. Patient data never leaves European servers." } },
    ]
  };

  const featuresAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Perioskoup",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "iOS, Android, Web",
    "description": "AI dental companion app with habit tracking, smart reminders, clinician dashboards, and GDPR-compliant data protection for periodontal care between visits.",
    "url": "https://perioskoup.com/features",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Free for patients during beta"
    },
    "author": {
      "@type": "Organization",
      "name": "Perioskoup SRL",
      "url": "https://perioskoup.com",
      "foundingDate": "2025",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Buzău",
        "addressCountry": "RO"
      }
    },
    "featureList": [
      "PerioBOT — AI chat trained on patient dental records, voice support, available 24/7 (Beta)",
      "Treatment Plans — structured plan creation, status tracking, patient-facing summaries",
      "Document Management — X-rays, photos, clinical documents with secure patient access",
      "Instant QR Pairing — link patient to dentist with a single scan, JWT-verified",
      "Daily Habit Tracker — brushing, flossing, streaks, dentist-set goals"
    ],
    "award": "3rd Prize, EFP Digital Innovation Award 2025, EuroPerio11 Vienna"
  };

  const featuresSpeakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Perioskoup Features",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#features-headline", "#features-subhead"]
    },
    "url": "https://perioskoup.com/features"
  };

  return (
    <div ref={scrollRef} style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Perioskoup Features | AI Habit Tracking &amp; Dental Care Plans</title>
        <meta name="description" content="Explore Perioskoup's AI dental companion features: habit tracking, smart reminders, clinician dashboards, and GDPR-compliant data protection." />
        <link rel="canonical" href="https://perioskoup.com/features" />
        <meta property="og:title" content="AI Dental App Features | Habit Tracking & Care Plans | Perioskoup" />
        <meta property="og:description" content="AI-powered habit tracking, smart reminders, clinician dashboard, and GDPR-compliant data protection for dental patients and practices." />
        <meta property="og:url" content="https://perioskoup.com/features" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="AI Dental App Features | Habit Tracking & Care Plans | Perioskoup" />
        <meta name="twitter:description" content="Personalised habit tracking, smart reminders, clinician dashboard, and GDPR-compliant data protection. All in one AI dental companion." />
        <meta property="og:image" content={meta?.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta?.ogImage} />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/features" />
        <link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/features" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresFaqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresSpeakableJsonLd) }} />
      {GEOCapsule}
      <Navbar />

      {/* Hero */}
      <section id="main-content" className="section" style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: "120px", position: "relative", zIndex: 1, overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container section-content" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
          <span className="label-tag reveal" style={{ marginBottom: "24px", display: "inline-flex" }}>Features</span>
          <h1 id="features-headline" className="display-lg reveal" style={{ marginTop: "16px", marginBottom: "24px", transitionDelay: "0.1s", lineHeight: 1.05 }}>
            AI dental companion features —{" "}
            <span className="text-gradient">everything between your visits.</span>
          </h1>
          <p id="features-subhead" className="body-lg reveal" style={{ maxWidth: "520px", margin: "0 auto 40px", transitionDelay: "0.2s" }}>
            From the moment a patient leaves the chair to their next appointment, Perioskoup keeps them engaged, informed, and consistent.
          </p>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", transitionDelay: "0.3s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }} onClick={() => capture("page_cta_clicked", { cta_text: "Join the Waitlist", page: "features", position: "hero" })}>
              Join the Waitlist →
            </Link>
            <Link href="/for-dentists" className="btn-ghost" style={{ fontSize: "16px", padding: "14px 32px" }}>
              For Dentists
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section id="feature-list" className="section" style={{ background: "#050C10", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 56px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 12, textAlign: "center" }}>
            What's inside <span style={{ color: "#C0E57A" }}>Perioskoup</span>
          </h2>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#93A793", lineHeight: 1.7, textAlign: "center", maxWidth: 560, margin: "0 auto 56px" }}>
            Five features built to keep patients engaged and dentists in control — all in one app.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const tags = Array.isArray(f.tag) ? f.tag : [f.tag];
              return (
                <div
                  key={f.title}
                  className="card reveal"
                  style={{
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    transitionDelay: `${i * 0.06}s`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {tags.map((tag) => {
                      const ts = TAG_COLORS[tag] || TAG_COLORS.Patient;
                      return (
                        <span key={tag} style={{ fontFamily: "Gabarito, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: ts.color, background: ts.bg, border: `1px solid ${ts.border}`, padding: "4px 10px", borderRadius: "100px" }}>
                          {tag}
                        </span>
                      );
                    })}
                    {f.badge && (
                      <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#0A171E", background: "#C0E57A", padding: "3px 8px", borderRadius: "100px" }}>
                        {f.badge}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(32px, 2.5vw, 42px)", fontWeight: 700, color: "#F5F9EA", lineHeight: 1, marginBottom: "12px" }}>{f.title}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "15px", lineHeight: 1.7, color: "#8C9C8C", marginBottom: "24px" }}>{f.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
                    {f.bullets.map((b) => (
                      <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" style={{ flexShrink: 0, marginTop: "3px" }}>
                          <path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "14px", color: "#93A793" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: "#0A171E", textAlign: "center" }}>
        <div className="container">
          <h2 className="display-md reveal" style={{ marginBottom: "20px" }}>Ready to get started?</h2>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#93A793", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
            Join 30+ founding clinics on the Perioskoup waitlist. Free for patients, founding pricing for clinics.
          </p>
          <p className="body-lg reveal" style={{ marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px", transitionDelay: "0.1s" }}>
            Join the founding waitlist and be among the first to experience Perioskoup.
          </p>
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: "16px", padding: "16px 36px" }} onClick={() => capture("page_cta_clicked", { cta_text: "Join the Waitlist", page: "features", position: "bottom" })}>
              Join the Waitlist →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
