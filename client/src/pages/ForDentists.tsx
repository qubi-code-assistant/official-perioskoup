/**
 * PERIOSKOUP -- FOR DENTISTS PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";
import { useReveal } from "@/hooks/useReveal";

const FEATURES = [
  {
    icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18h6",
    title: "Practice Dashboard",
    desc: "A unified view of all your patients - their engagement rates, last activity, upcoming appointments, and AI-generated summaries. Everything you need before you walk into the room.",
    bullets: ["Patient engagement overview", "Appointment preparation briefs", "Multi-patient practice overview", "Exportable clinical summaries"],
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Personalised Care Plans",
    desc: "Send custom care plans directly to patients after each appointment. They receive clear, illustrated instructions for their specific condition and treatment.",
    bullets: ["Condition-specific templates", "Illustrated home care guides", "Medication reminders", "Post-procedure instructions"],
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "Engagement Insights",
    desc: "See which patients are following their care plans and which may need an extra nudge. Engagement visibility between appointments — coming in Q2 2026.",
    bullets: ["Patient programme overview", "Appointment preparation briefs", "Engagement visibility (in development)", "Practice-wide insights (coming Q2 2026)"],
  },
];

export default function ForDentists() {
  useReveal();

  const dentistsFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How does Perioskoup help my dental practice?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup provides a clinician dashboard where you can set up personalised patient programmes, stay connected with patients between appointments, send targeted guidance, and receive pre-visit summaries. This extends your care beyond the chair and reduces time spent on history-taking." } },
      { "@type": "Question", "name": "Is Perioskoup a medical device?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is a wellness and patient engagement companion, not a medical device. It does not provide diagnoses or medical advice. All patient programmes are set by the clinician. The app is built with EU MDR and FDA SaMD guidance in mind." } },
      { "@type": "Question", "name": "Is patient data secure with Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All patient data is stored in EU-based servers with end-to-end encryption, GDPR Article 9 protection, and right to erasure built in. Patient data never leaves European servers and is never sold or used for model training without explicit consent." } },
      { "@type": "Question", "name": "What platforms does Perioskoup support?", "acceptedAnswer": { "@type": "Answer", "text": "The clinician dashboard is accessible via web browser on any device. The patient app will be available on iOS and Android. No special hardware or software is required." } },
      { "@type": "Question", "name": "How do I get started with Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is currently in private beta with founding clinics. You can join the waitlist for priority access. Founding clinics receive onboarding support, founding pricing, and a direct line to the team." } },
      { "@type": "Question", "name": "How much does Perioskoup cost for dental practices?", "acceptedAnswer": { "@type": "Answer", "text": "Pricing details will be announced closer to the public launch. Founding clinics that join the waitlist during beta receive founding pricing. The platform is designed to be accessible for practices of all sizes." } },
    ]
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Dental Patient Engagement App for Clinicians | Perioskoup</title>
        <meta name="description" content="Perioskoup gives dental practices a clinician dashboard, personalised care plans, and patient engagement visibility to extend care and reduce no-shows." />
        <link rel="canonical" href="https://perioskoup.com/for-dentists" />
        <meta property="og:title" content="Dental Patient Engagement App for Clinicians | Perioskoup" />
        <meta property="og:description" content="Clinician dashboard, personalised care plans, and patient engagement visibility for dental practices. Extend care beyond the appointment." />
        <meta property="og:url" content="https://perioskoup.com/for-dentists" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Dental Patient Engagement App for Clinicians | Perioskoup" />
        <meta name="twitter:description" content="Give your dental practice a clinician dashboard, personalised care plans, and patient engagement visibility. Join 30+ founding clinics on the Perioskoup waitlist." />
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/for-dentists" />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistsFaqJsonLd) }} />
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section id="main-content" style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "For Dentists" }]} />
          <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>For Dentists</span>
          <h1 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(56px, 7vw, 88px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 24, marginTop: 16, transitionDelay: "0.08s" }}>
            Your patients,<br />
            <span style={{ color: "#C0E57A" }}>better prepared.</span>
          </h1>
          <p className="body-lg reveal" style={{ maxWidth: 520, marginBottom: 28, transitionDelay: "0.16s" }}>
            Perioskoup gives your clinic a powerful tool to extend care beyond the appointment - improving engagement, reducing no-shows, and building lasting patient relationships.
          </p>

          {/* EFP Award badge + founding clinic count */}
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 24, transitionDelay: "0.20s" }}>
            <a href="https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/" target="_blank" rel="noopener noreferrer"
              className="efp-badge-hover"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 6px", background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.3)", borderRadius: 100, textDecoration: "none" }}>
              <span style={{ background: "#C0E57A", color: "#0A171E", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 100, fontFamily: "Gabarito, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>EFP Award Winner 2025</span>
              <span style={{ color: "#C0E57A", fontSize: 13, fontFamily: "Gabarito, sans-serif", fontWeight: 500 }}>Digital Innovation</span>
            </a>
            <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>30+ founding clinics on the waitlist</span>
          </div>

          <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap", transitionDelay: "0.28s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
              Join as a Founding Clinic
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/features" className="btn-ghost" style={{ fontSize: 16, padding: "14px 32px" }}>
              See All Features
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM-FIRST ────────────────────────────────────────────────── */}
      <section style={{ background: "#0A171E", padding: "clamp(48px, 6vw, 80px) 0" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="reveal" style={{ borderLeft: "3px solid #C0E57A", paddingLeft: 24 }}>
            <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(36px, 4vw, 56px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 16 }}>
              The problem is clear.
            </h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 17, lineHeight: 1.7, color: "#8C9C8C", marginBottom: 12 }}>
              Patients forget 80% of care instructions within 48 hours. Perioskoup translates your clinical recommendations into daily habits they actually follow.
            </p>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, lineHeight: 1.7, color: "#8C9C8C" }}>
              Recent research confirms patients lack awareness of their own responsibility for oral health and face barriers including understanding instructions, conflicting recommendations, and lack of motivation (<a href="https://doi.org/10.1111/jcpe.70044" target="_blank" rel="noopener noreferrer" style={{ color: "#C0E57A", textDecoration: "none" }}>Weinert et al. 2025, JCP</a>). Perioskoup is the AI dental companion that extends your care beyond the appointment.
            </p>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, lineHeight: 1.7, color: "#8C9C8C", marginTop: 12 }}>
              Only 30% of patients follow post-treatment oral hygiene instructions after leaving the chair (<a href="https://onlinelibrary.wiley.com/doi/full/10.1002/cre2.526" target="_blank" rel="noopener noreferrer" style={{ color: "#C0E57A", textDecoration: "none" }}>J Clin Periodontol</a>). Oral diseases cost €90 billion annually in Europe (<a href="https://www.oralhealthplatform.eu/" target="_blank" rel="noopener noreferrer" style={{ color: "#C0E57A", textDecoration: "none" }}>Platform for Better Oral Health in Europe</a>). Prevention is not just better care — it is better economics.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. STATS ────────────────────────────────────────────────────────── */}
      <section style={{ background: "#050C10", padding: "clamp(40px, 5vw, 64px) 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#234966] rounded-2xl overflow-hidden">
            {[
              { value: "80%", label: "of instructions forgotten within 48h", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", source: "Kessels 2003, BMJ", href: "https://doi.org/10.1136/bmj.326.7395.920" },
              { value: "87%", label: "of mHealth studies show improved outcomes", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", source: "Toniazzo et al. 2019, JCP", href: "https://doi.org/10.1111/jcpe.13064" },
              { value: "62%", label: "of adults have periodontitis worldwide", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", source: "Bernabe et al. 2020, JCP", href: "https://doi.org/10.1111/jcpe.13217" },
            ].map((s, i) => (
              <div key={s.label} className="reveal" style={{ background: "#0A171E", padding: "40px 32px", textAlign: "center", transitionDelay: `${i * 0.06}s` }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d={s.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: 48, color: "#C0E57A", lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>{s.label}</p>
                <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 11, color: "#8C9C8C", marginTop: 4, display: "block", textDecoration: "none" }}>{s.source}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DR. ANCA QUOTE ───────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(48px, 6vw, 80px) 0" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="reveal" style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <img src="/images/anca-headshot.jpg" alt="Dr. Anca Laura Constantin" loading="lazy" width={80} height={80} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", objectPosition: "center 25%", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 280 }}>
              <blockquote style={{ borderLeft: "3px solid #C0E57A", paddingLeft: 20, margin: 0 }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 17, fontStyle: "italic", color: "rgba(245,249,234,0.85)", lineHeight: 1.65 }}>
                  "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes."
                </p>
              </blockquote>
              <div style={{ marginTop: 12, paddingLeft: 20 }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, fontWeight: 600, color: "#F5F9EA" }}>Dr. Anca Laura Constantin</p>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#C0E57A" }}>Periodontist & Co-founder, CDO</p>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C", marginTop: 4 }}>EFP Digital Innovation Award Winner 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CLINICAL TOOLS ───────────────────────────────────────────────── */}
      <section style={{ padding: "clamp(64px, 8vw, 120px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Clinical Tools</span>
            <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, transitionDelay: "0.08s" }}>
              Everything you need<br />
              <span style={{ color: "#C0E57A" }}>in one place.</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 800, margin: "0 auto" }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="card reveal flex flex-col sm:flex-row gap-4 sm:gap-7 p-5 sm:p-9" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={f.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, fontWeight: 700, color: "#F5F9EA", marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, lineHeight: 1.7, color: "#8C9C8C", marginBottom: 16 }}>{f.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {f.bullets.map((b) => (
                      <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 3 }}><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT FITS YOUR WORKFLOW ────────────────────────────────────── */}
      <section style={{ background: "#050C10", padding: "clamp(56px, 7vw, 100px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Workflow</span>
            <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, transitionDelay: "0.08s" }}>
              How it fits<br />
              <span style={{ color: "#C0E57A" }}>your practice.</span>
            </h2>
            <p className="body-lg reveal" style={{ maxWidth: 520, margin: "16px auto 0", transitionDelay: "0.16s" }}>
              Perioskoup slots into your existing appointment flow - no hardware, no software migration, no training days.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ maxWidth: 900, margin: "0 auto" }}>
            {[
              { step: "Before", title: "Pre-Visit Prep", desc: "Patients arrive better prepared. You receive a summary of their engagement, habits, and questions - reducing chair time on history-taking." },
              { step: "During", title: "Set the Plan", desc: "After the appointment, set a personalised care plan in under 2 minutes. Perioskoup translates it into daily habits with reminders and tracking." },
              { step: "After", title: "Between Visits", desc: "Patients follow their plan at home with AI personalised guidance. You stay connected and can reach out if someone needs an extra nudge." },
            ].map((item, i) => (
              <div key={item.step} className="card reveal" style={{ padding: 32, transitionDelay: `${i * 0.08}s` }}>
                <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C0E57A", marginBottom: 12, display: "block" }}>{item.step}</span>
                <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, color: "#F5F9EA", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, lineHeight: 1.65, color: "#8C9C8C" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. COMPETITIVE POSITIONING ──────────────────────────────────────── */}
      <section style={{ padding: "clamp(56px, 7vw, 100px) 0" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 64px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 24 }}>
            Not another PMS plugin.
          </h2>
          <p className="body-lg reveal" style={{ marginBottom: 20, transitionDelay: "0.08s" }}>
            Practice management systems track appointments. Patient portals send reminders. But neither helps a patient build the daily habits that prevent disease recurrence.
          </p>
          <p className="body-lg reveal" style={{ marginBottom: 32, transitionDelay: "0.16s" }}>
            Perioskoup is for the behavioural side - translating your clinical recommendations into a personalised daily programme. It's the AI dental companion for what happens between visits.
          </p>
          <div className="reveal" style={{ padding: 24, background: "rgba(192,229,122,0.06)", border: "1px solid rgba(192,229,122,0.15)", borderRadius: 16, transitionDelay: "0.24s" }}>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, fontWeight: 600, color: "#C0E57A", marginBottom: 8 }}>Founding clinic spots are limited.</p>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C" }}>Public launch: March 2026. Founding clinics get locked-in pricing, direct product input, and dedicated onboarding.</p>
          </div>
        </div>
      </section>

      {/* ── 8. CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#050C10", padding: "clamp(64px, 8vw, 120px) 0", textAlign: "center" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 16 }}>
            <span className="label-tag" style={{ display: "inline-flex" }}>Founding Clinics Open</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20, marginTop: 16, transitionDelay: "0.08s" }}>
            Be a founding clinic.
          </h2>
          <p className="body-lg reveal" style={{ maxWidth: 440, margin: "0 auto 24px", transitionDelay: "0.16s" }}>
            Founding clinics get lifetime discounted pricing, direct input on the product roadmap, and a dedicated onboarding specialist.
          </p>
          <p className="reveal" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C", maxWidth: 440, margin: "0 auto 36px", transitionDelay: "0.20s" }}>
            Every €1 invested in prevention saves €8–50 in future treatment costs. Source: <a href="https://www.who.int/news-room/fact-sheets/detail/oral-health" target="_blank" rel="noopener noreferrer" style={{ color: "#8C9C8C", textDecoration: "none" }}>WHO Oral Health</a>
          </p>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", transitionDelay: "0.24s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Apply as a Founding Clinic
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/contact" className="btn-ghost" style={{ fontSize: 16, padding: "16px 36px" }}>
              Talk to the Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
