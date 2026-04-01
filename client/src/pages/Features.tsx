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

const FEATURES: {
  icon: string;
  title: string;
  tag: string;
  badge?: string;
  bullets: string[];
  desc: string;
  screenshot?: string; // e.g. "/images/screenshots/periobot.png"
}[] = [
  {
    icon: "🤖",
    title: "PerioBOT — Your Dental AI",
    tag: "Patients",
    badge: "Beta",
    bullets: [
      "Chat trained on your own dental records",
      "Voice message support with transcription",
      "Contextual answers based on your treatment history",
      "Available 24/7 between appointments",
    ],
    desc: "Ask questions about your oral health and get personalized answers grounded in your clinical data.",
    // screenshot: "/images/screenshots/periobot.png",
  },
  {
    icon: "📋",
    title: "Treatment Plans",
    tag: "Dentists",
    bullets: [
      "Create and review treatment plans per patient",
      "Track plan status (pending, approved, completed)",
      "Patient-facing plan summaries with explanations",
      "Link plans to specific appointments",
    ],
    desc: "Structured treatment planning that keeps both dentist and patient aligned on next steps.",
    // screenshot: "/images/screenshots/treatment-plans.png",
  },
  {
    icon: "📂",
    title: "Document Management",
    tag: "Both",
    bullets: [
      "Upload X-rays, photos, and clinical documents",
      "Patients access their records anytime",
      "Dentists attach files to patient profiles",
      "Compressed uploads for fast mobile transfer",
    ],
    desc: "All dental documents in one secure place — accessible to both patient and provider.",
    // screenshot: "/images/screenshots/documents.png",
  },
  {
    icon: "📱",
    title: "Instant QR Pairing",
    tag: "Both",
    bullets: [
      "Scan a QR code to link patient and dentist",
      "No manual data entry or invitation codes",
      "Secure handshake with JWT verification",
      "Works in-clinic in seconds",
    ],
    desc: "Connect patient to dentist with a single scan — no forms, no friction.",
    // screenshot: "/images/screenshots/qr-pairing.png",
  },
  {
    icon: "🪥",
    title: "Daily Habit Tracker",
    tag: "Patients",
    bullets: [
      "Track brushing, flossing, mouthwash, and more",
      "Build streaks with daily check-ins",
      "Personalized habit goals set by your dentist",
      "Visual progress charts over time",
    ],
    desc: "Small daily habits, big dental health gains. Track your routine and watch your streaks grow.",
    // screenshot: "/images/screenshots/habit-tracker.png",
  },
  {
    icon: "🩺",
    title: "Smart Health Profile",
    tag: "Patients",
    bullets: [
      "Guided anamnesis questionnaire",
      "Medical conditions, allergies, medications",
      "Automatically shared with your dentist",
      "Update anytime as health changes",
    ],
    desc: "Complete your dental health profile once — your dentist gets the full picture instantly.",
    // screenshot: "/images/screenshots/health-profile.png",
  },
];

const TAG_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Patients: { color: "#93A793", bg: "rgba(147,167,147,0.08)", border: "rgba(147,167,147,0.2)" },
  Dentists: { color: "#C0E57A", bg: "rgba(192,229,122,0.08)", border: "rgba(192,229,122,0.2)" },
  Both: { color: "#C0E57A", bg: "rgba(192,229,122,0.08)", border: "rgba(192,229,122,0.2)" },
};

export default function Features() {
  useReveal();
  const { GEOCapsule } = usePageMeta("/features");

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
        "addressLocality": "Bucharest",
        "addressCountry": "RO"
      }
    },
    "featureList": [
      "PerioBOT — AI chat trained on patient dental records, voice support, available 24/7 (Beta)",
      "Treatment Plans — structured plan creation, status tracking, patient-facing summaries",
      "Document Management — X-rays, photos, clinical documents with secure patient access",
      "Instant QR Pairing — link patient to dentist with a single scan, JWT-verified",
      "Daily Habit Tracker — brushing, flossing, streaks, dentist-set goals",
      "Smart Health Profile — guided anamnesis, medical history, shared with dentist automatically"
    ],
    "award": "3rd Prize, EFP Digital Innovation Award 2025, EuroPerio11 Vienna"
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100svh" }}>
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
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/features" />
        <link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/features" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresFaqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresAppJsonLd) }} />
      {GEOCapsule}
      <Navbar />

      {/* Hero */}
      <section id="main-content" className="section" style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: "120px", position: "relative", zIndex: 1, overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container section-content" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
          <span className="label-tag reveal" style={{ marginBottom: "24px", display: "inline-flex" }}>Features</span>
          <h1 className="display-lg reveal" style={{ marginTop: "16px", marginBottom: "24px", transitionDelay: "0.1s", lineHeight: 1.05 }}>
            AI dental companion features —{" "}
            <span className="text-gradient">everything between your visits.</span>
          </h1>
          <p className="body-lg reveal" style={{ maxWidth: "520px", margin: "0 auto 40px", transitionDelay: "0.2s" }}>
            From the moment a patient leaves the chair to their next appointment, Perioskoup keeps them engaged, informed, and consistent.
          </p>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", transitionDelay: "0.3s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }}>
              Join the Waitlist →
            </Link>
            <Link href="/for-dentists" className="btn-ghost" style={{ fontSize: "16px", padding: "14px 32px" }}>
              For Dentists
            </Link>
          </div>
        </div>
      </section>

      {/* Feature rows — alternating layout with app screenshot slots */}
      <section className="section" style={{ background: "#050C10", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 56px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 12, textAlign: "center" }}>
            What's inside <span style={{ color: "#C0E57A" }}>Perioskoup</span>
          </h2>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#93A793", lineHeight: 1.7, textAlign: "center", maxWidth: 560, margin: "0 auto 72px" }}>
            Six features built to keep patients engaged and dentists in control — all in one app.
          </p>

          <div>
            {FEATURES.map((f, i) => {
              const isReversed = i % 2 === 1;
              const tagStyle = TAG_COLORS[f.tag] || TAG_COLORS.Patients;
              return (
                <div
                  key={f.title}
                  className={`reveal flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 lg:gap-20`}
                  style={{
                    paddingTop: "72px",
                    paddingBottom: "72px",
                    borderBottom: i < FEATURES.length - 1 ? "1px solid #1D3449" : "none",
                    transitionDelay: `${i * 0.04}s`,
                  }}
                >
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: tagStyle.color, background: tagStyle.bg, border: `1px solid ${tagStyle.border}`, padding: "4px 10px", borderRadius: "100px" }}>
                        {f.tag}
                      </span>
                      {f.badge && (
                        <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0A171E", background: "#C0E57A", padding: "3px 8px", borderRadius: "100px" }}>
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "40px", marginBottom: "12px", lineHeight: 1 }} aria-hidden="true">{f.icon}</div>
                    <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(38px, 3.5vw, 52px)", fontWeight: 700, color: "#F5F9EA", lineHeight: 1, marginBottom: "16px" }}>{f.title}</h3>
                    <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "16px", lineHeight: 1.7, color: "#8C9C8C", marginBottom: "28px", maxWidth: "480px" }}>{f.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {f.bullets.map((b) => (
                        <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" style={{ flexShrink: 0, marginTop: "3px" }}>
                            <path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "15px", color: "#93A793" }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phone mockup — drop screenshot path into FEATURES[n].screenshot to activate */}
                  <div className="w-[200px] md:w-[220px] lg:w-[260px] flex-shrink-0 mx-auto md:mx-0">
                    <div style={{
                      width: "100%",
                      aspectRatio: "9/19",
                      borderRadius: "40px",
                      border: "1.5px solid #234966",
                      background: "#071016",
                      overflow: "hidden",
                      boxShadow: "0 0 0 4px rgba(35,73,102,0.25), 0 32px 80px rgba(0,0,0,0.6)",
                      position: "relative",
                    }}>
                      {f.screenshot ? (
                        <img
                          src={f.screenshot}
                          alt={`${f.title} app screenshot`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", position: "relative" }}>
                          {/* Dynamic Island / notch */}
                          <div style={{ position: "absolute", top: "18px", left: "50%", transform: "translateX(-50%)", width: "72px", height: "22px", background: "#050C10", borderRadius: "100px" }} aria-hidden="true" />
                          <span style={{ fontSize: "42px", marginTop: "32px" }} aria-hidden="true">{f.icon}</span>
                          <div style={{ textAlign: "center", padding: "0 20px" }}>
                            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "11px", fontWeight: 600, color: "#2A4A5E", marginBottom: "4px" }}>{f.title}</p>
                            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "9px", color: "#1D3449", textTransform: "uppercase", letterSpacing: "0.14em" }}>App screenshot</p>
                          </div>
                        </div>
                      )}
                    </div>
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
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: "16px", padding: "16px 36px" }}>
              Join the Waitlist →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
