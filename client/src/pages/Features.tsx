/**
 * PERIOSKOUP — FEATURES PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text
 * Fonts: Dongle (display), Gabarito (body)
 */
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
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
  { icon: "💡", title: "AI Clinical Companion", desc: "Patients get instant, evidence-based answers about their periodontal health in plain language — no medical jargon, no confusion.", bullets: ["Personalised oral health guidance", "Evidence-based answers", "Understands clinical reports", "Available 24/7"], tag: "Patients" },
  { icon: "🔔", title: "Smart Reminders", desc: "Personalised, adaptive nudges that fit into daily routines. Brushing, flossing, medication — all tracked and encouraged.", bullets: ["Adaptive reminder timing", "Habit-based nudge frequency", "Appointment reminders", "Opt-in communication"], tag: "Patients" },
  { icon: "📊", title: "Progress Tracking", desc: "Visual timelines and habit streaks that show the oral health journey over time. Patients see their own improvement.", bullets: ["Daily habit logging", "Visual progress dashboards", "Streak rewards", "Weekly engagement reports"], tag: "Patients" },
  { icon: "💬", title: "Secure Messaging", desc: "Patients can send questions and updates directly to their dental team between appointments — reducing anxiety and unnecessary calls.", bullets: ["GDPR-compliant messaging", "File and photo sharing", "Read receipts", "Archived conversation history"], tag: "Both" },
  { icon: "🖥️", title: "Dentist Dashboard", desc: "A dedicated portal for clinicians to monitor engagement, send care plans, and track patient outcomes across their entire practice.", bullets: ["Patient engagement overview", "Appointment preparation briefs", "Multi-patient practice view", "Exportable summaries"], tag: "Dentists" },
  { icon: "📚", title: "Education Library", desc: "Curated, clinician-approved content about periodontal conditions, treatments, and home care — always up to date.", bullets: ["Condition explainers", "Treatment guides", "Home care tutorials", "Clinician-approved content"], tag: "Patients" },
  { icon: "📅", title: "Appointment Prep", desc: "Patients arrive better prepared with a summary of their progress and questions ready. Dentists save time on history-taking.", bullets: ["Pre-visit summaries", "Question prompts", "Progress snapshots", "Reduced chair time"], tag: "Both" },
  { icon: "🔒", title: "GDPR-Compliant & Secure", desc: "End-to-end encrypted, EU-hosted, and built with privacy-first principles. Patient data never leaves European servers.", bullets: ["End-to-end encryption", "GDPR Article 9 compliant", "EU-hosted servers", "Right to erasure built-in"], tag: "Both" },
];

const TAG_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Patients: { color: "#8C9C8C", bg: "rgba(140,156,140,0.08)", border: "rgba(140,156,140,0.2)" },
  Dentists: { color: "#C0E57A", bg: "rgba(192,229,122,0.08)", border: "rgba(192,229,122,0.2)" },
  Both: { color: "#C0E57A", bg: "rgba(192,229,122,0.08)", border: "rgba(192,229,122,0.2)" },
};

export default function Features() {
  useReveal();

  const featuresFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What features does Perioskoup offer for patients?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup offers patients personalised daily care programmes, smart reminders adapted to their routine, progress tracking with streaks and charts, a curated education library about periodontal conditions, and appointment preparation summaries." } },
      { "@type": "Question", "name": "What features does Perioskoup offer for dentists?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup provides dentists with a clinician dashboard to set up patient programmes, real-time engagement monitoring between appointments, the ability to send targeted guidance, and pre-visit patient progress summaries that reduce chair time." } },
      { "@type": "Question", "name": "Is Perioskoup GDPR compliant?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Perioskoup is built with privacy-first principles, featuring end-to-end encryption, GDPR Article 9 protection, EU-hosted servers, and right to erasure built in. Patient data never leaves European servers." } },
    ]
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresFaqJsonLd) }} />
      <Navbar />
      <ParallaxHeroBg />

      {/* Hero */}
      <section className="section" style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: "120px", position: "relative", zIndex: 1 }}>
        <div className="container section-content" style={{ textAlign: "center" }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Features" }]} />
          <span className="label-tag reveal" style={{ marginBottom: "24px", display: "inline-flex" }}>Features</span>
          <h1 className="display-lg reveal" style={{ marginTop: "16px", marginBottom: "24px", transitionDelay: "0.1s" }}>
            Built for the full<br />
            <span className="text-gradient">dental journey.</span>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {FEATURES.map((f, i) => {
              const tagStyle = TAG_COLORS[f.tag] || TAG_COLORS.Patients;
              return (
                <div key={f.title} className="card reveal" style={{ transitionDelay: `${(i % 4) * 0.06}s` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                      {f.icon}
                    </div>
                    <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: tagStyle.color, background: tagStyle.bg, border: `1px solid ${tagStyle.border}`, padding: "4px 10px", borderRadius: "100px" }}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: "32px", fontWeight: 700, color: "#F5F9EA", marginBottom: "10px" }}>{f.title}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#8C9C8C", marginBottom: "20px" }}>{f.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {f.bullets.map((b) => (
                      <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: "13px", color: "#8C9C8C" }}>{b}</span>
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
          <p className="body-lg reveal" style={{ marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px", transitionDelay: "0.1s" }}>
            Join the founding waitlist and be among the first to experience Perioskoup.
          </p>
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: "16px", padding: "16px 36px" }}>
              Get Early Access →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
