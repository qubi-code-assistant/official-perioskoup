/**
 * PERIOSKOUP -- FEATURES PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text
 * Fonts: Dongle (display), Gabarito (body)
 */
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";

const FEATURES: { icon: string; title: string; desc: React.ReactNode; bullets: string[]; tag: string; badge?: string }[] = [
  { icon: "💡", title: "AI Clinical Companion", desc: "Patients get instant, evidence-based answers about their periodontal health in plain language - no medical jargon, no confusion.", bullets: ["Personalised oral health guidance", "Evidence-based answers", "Understands clinical reports", "Launching with the app"], tag: "Patients", badge: "Beta" },
  { icon: "🔔", title: "Smart Reminders", desc: "Personalised, adaptive nudges that fit into daily routines. Brushing, flossing, medication - all tracked and encouraged.", bullets: ["Adaptive reminder timing", "Habit-based nudge frequency", "Appointment reminders", "Opt-in communication"], tag: "Patients", badge: "Beta" },
  { icon: "📊", title: "Progress Tracking", desc: <>Visual timelines and habit streaks that show the oral health journey over time. Long-term maintenance studies show consistent daily routines reduce periodontal disease progression by <a href="https://www.who.int/news-room/fact-sheets/detail/oral-health" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "#7DD3FC" }}>60–70%</a> (WHO, 2023).</>, bullets: ["Daily habit logging", "Visual progress dashboards", "Habit streaks", "Routine consistency tools"], tag: "Patients" },
  { icon: "🖥️", title: "Dentist Dashboard", desc: "A dedicated portal for clinicians to view care plans, send patient programmes, and review upcoming appointment summaries across their practice.", bullets: ["Patient programme overview", "Appointment preparation briefs", "Multi-patient practice view", "Exportable summaries"], tag: "Dentists" },
  { icon: "📚", title: "Education Library", desc: "Curated, clinician-approved content about periodontal conditions, home care, and daily oral hygiene - always up to date.", bullets: ["Condition explainers", "Treatment guides", "Home care tutorials", "Clinician-approved content"], tag: "Patients", badge: "Coming Soon" },
  { icon: "📅", title: "Appointment Prep", desc: "Patients arrive better prepared with a summary of their progress and questions ready. Dentists save time on history-taking.", bullets: ["Pre-visit summaries", "Question prompts", "Progress snapshots", "Better-prepared patients"], tag: "Both", badge: "In Development" },
  { icon: "🔒", title: "GDPR-Compliant & Secure", desc: "End-to-end encrypted, EU-hosted, and built with privacy-first principles. Patient data never leaves European servers.", bullets: ["End-to-end encryption", "GDPR Article 9 compliant", "EU-hosted servers", "Right to erasure built-in"], tag: "Both" },
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
      "AI Clinical Companion — evidence-based oral health answers in plain language",
      "Smart Reminders — adaptive nudges for brushing, flossing, and medication habits",
      "Progress Tracking — visual timelines and habit streaks (WHO 2023: consistent routines reduce periodontal disease progression by 60–70%)",
      "Dentist Dashboard — care plan overview, appointment briefs, multi-patient practice view",
      "Education Library — clinician-approved periodontal content (coming soon)",
      "Appointment Prep — pre-visit summaries and question prompts (in development)",
      "GDPR-compliant security — end-to-end encryption, EU-hosted servers, right to erasure"
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

      {/* Feature grid */}
      <section className="section" style={{ background: "#050C10", paddingTop: "80px" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 56px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 12, textAlign: "center" }}>
            What's inside <span style={{ color: "#C0E57A" }}>Perioskoup</span>
          </h2>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#93A793", lineHeight: 1.7, textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
            Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and GDPR-compliant privacy into a single AI dental companion app.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const tagStyle = TAG_COLORS[f.tag] || TAG_COLORS.Patients;
              return (
                <div key={f.title} className="card reveal" style={{ transitionDelay: `${(i % 4) * 0.06}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }} aria-hidden="true">
                        {f.icon}
                      </div>
                      {(f as { badge?: string }).badge && (
                        <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0A171E", background: "#C0E57A", padding: "3px 8px", borderRadius: "100px" }}>
                          {(f as { badge?: string }).badge}
                        </span>
                      )}
                    </div>
                    <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: tagStyle.color, background: tagStyle.bg, border: `1px solid ${tagStyle.border}`, padding: "4px 10px", borderRadius: "100px" }}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: "32px", fontWeight: 700, color: "#F5F9EA", marginBottom: "10px" }}>{f.title}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#93A793", marginBottom: "20px" }}>{f.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {f.bullets.map((b) => (
                      <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#93A793" }}>{b}</span>
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
