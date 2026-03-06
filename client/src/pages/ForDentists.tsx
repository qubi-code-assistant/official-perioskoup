/**
 * PERIOSKOUP — FOR DENTISTS PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";

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

const FEATURES = [
  {
    icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18h6",
    title: "Practice Dashboard",
    desc: "A unified view of all your patients — their engagement rates, last activity, upcoming appointments, and AI-generated summaries. Everything you need before you walk into the room.",
    bullets: ["Patient engagement heatmaps", "Appointment preparation briefs", "Multi-patient practice overview", "Exportable clinical summaries"],
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Personalised Care Plans",
    desc: "Send custom care plans directly to patients after each appointment. They receive clear, illustrated instructions for their specific condition and treatment.",
    bullets: ["Condition-specific templates", "Illustrated home care guides", "Medication reminders", "Post-procedure instructions"],
  },
  {
    icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "Engagement Analytics",
    desc: "Track which patients are following their care plans and which need a nudge. Identify patterns across your practice and intervene before problems escalate.",
    bullets: ["Individual engagement scores", "Practice-wide trend analysis", "At-risk patient flagging", "Monthly engagement reports"],
  },
];

export default function ForDentists() {
  useReveal();

  const dentistsFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How does Perioskoup help my dental practice?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup provides a clinician dashboard where you can set up personalised patient programmes, monitor engagement between appointments, send targeted guidance, and receive pre-visit summaries. This extends your care beyond the chair and reduces time spent on history-taking." } },
      { "@type": "Question", "name": "Is Perioskoup a medical device?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is designed as a clinical support tool, not a diagnostic device. It does not diagnose conditions or make independent clinical recommendations. All patient programmes are set by the clinician. The app is built with EU MDR and FDA SaMD guidance in mind." } },
      { "@type": "Question", "name": "Is patient data secure with Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All patient data is stored in EU-based servers with end-to-end encryption, GDPR Article 9 protection, and right to erasure built in. Patient data never leaves European servers and is never sold or used for model training without explicit consent." } },
      { "@type": "Question", "name": "What platforms does Perioskoup support?", "acceptedAnswer": { "@type": "Answer", "text": "The clinician dashboard is accessible via web browser on any device. The patient app will be available on iOS and Android. No special hardware or software is required." } },
      { "@type": "Question", "name": "How do I get started with Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is currently in private beta with founding clinics. You can join the waitlist for priority access. Founding clinics receive onboarding support, founding pricing, and a direct line to the team." } },
      { "@type": "Question", "name": "How much does Perioskoup cost for dental practices?", "acceptedAnswer": { "@type": "Answer", "text": "Pricing details will be announced closer to the public launch. Founding clinics that join the waitlist during beta receive founding pricing. The platform is designed to be accessible for practices of all sizes." } },
    ]
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistsFaqJsonLd) }} />
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "For Dentists" }]} />
          <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>For Dentists</span>
          <h1 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(56px, 7vw, 88px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 24, marginTop: 16, transitionDelay: "0.08s" }}>
            Your patients,<br />
            <span style={{ color: "#C0E57A" }}>better prepared.</span>
          </h1>
          <p className="body-lg reveal" style={{ maxWidth: 520, marginBottom: 40, transitionDelay: "0.16s" }}>
            Perioskoup gives your clinic a powerful tool to extend care beyond the appointment — improving engagement, reducing no-shows, and building lasting patient relationships.
          </p>
          <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap", transitionDelay: "0.24s" }}>
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

      {/* Stats */}
      <section style={{ background: "#050C10", padding: "64px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#234966", borderRadius: 20, overflow: "hidden" }}>
            {[
              { value: "40%", label: "Reduction in no-shows", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { value: "3×", label: "Higher engagement rates", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
              { value: "85%", label: "Treatment acceptance", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
            ].map((s, i) => (
              <div key={s.label} className="reveal" style={{ background: "#0A171E", padding: "40px 32px", textAlign: "center", transitionDelay: `${i * 0.06}s` }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={s.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: 48, color: "#C0E57A", lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Tools */}
      <section style={{ padding: "120px 0" }}>
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
              <div key={f.title} className="card reveal" style={{ padding: 36, display: "flex", gap: 28, transitionDelay: `${i * 0.08}s` }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d={f.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, fontWeight: 700, color: "#F5F9EA", marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, lineHeight: 1.7, color: "#8C9C8C", marginBottom: 16 }}>{f.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
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

      {/* CTA */}
      <section style={{ background: "#050C10", padding: "120px 0", textAlign: "center" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 16 }}>
            <span className="label-tag" style={{ display: "inline-flex" }}>Founding Clinics Open</span>
          </div>
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20, marginTop: 16, transitionDelay: "0.08s" }}>
            Be a founding clinic.
          </h2>
          <p className="body-lg reveal" style={{ maxWidth: 440, margin: "0 auto 36px", transitionDelay: "0.16s" }}>
            Founding clinics get lifetime discounted pricing, direct input on the product roadmap, and a dedicated onboarding specialist.
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
