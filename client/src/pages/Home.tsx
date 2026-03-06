/**
 * PERIOSKOUP HOME PAGE
 * Design: Clinical Precision, Human Warmth — Dark Tech-Medical Premium
 * Animation fixes:
 *   - Phone mockup: reveal-scale outer div, phone-float inner div (fix transform conflict)
 *   - Counter: prefers-reduced-motion guard
 *   - EFP badge: CSS hover class
 *   - useReveal: prefers-reduced-motion guard
 */

import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import PhoneMockup from "@/components/PhoneMockup";

// Local Asset URLs
const ASSETS = {
  heroBg:       "/images/hero-bg.webp",
  featuresBg:   "/images/features-bg-v2.webp",
  ctaBg:        "/images/cta-bg-v2.webp",
  anca:         "/images/anca-headshot.jpg",
  edi:          "/images/eduard-headshot.jpg",
  petrica:      "/images/petrica.webp",
  award:        "/images/efp-award.webp",
  howItWorks:   "/images/howitworks-rings-bg.webp",
};

/* Scroll reveal hook — respects prefers-reduced-motion */
function useReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll(".reveal, .reveal-scale");

    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Animated counter — respects prefers-reduced-motion */
function Counter({ to, suffix = "", duration = 2000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — show final value immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(to);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * to));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(to);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* Waitlist form */
function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email address is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" aria-atomic="true" className="text-center py-8">
        <div style={{ width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", background: "rgba(192,229,122,0.12)", border: "1px solid rgba(192,229,122,0.35)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <p style={{ fontFamily: "Dongle, sans-serif", fontSize: "36px", color: "#C0E57A", lineHeight: 1 }}>You're on the list.</p>
        <p className="body-md" style={{ marginTop: 8 }}>We'll reach out when your spot opens up.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }} noValidate>
      {!compact && (
        <>
          <label htmlFor="home-waitlist-name" className="sr-only">Your name</label>
          <input id="home-waitlist-name" className="p-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </>
      )}
      <label htmlFor="home-waitlist-email" className="sr-only">Email address</label>
      <input
        id="home-waitlist-email"
        className="p-input"
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
        required
        aria-required="true"
        aria-invalid={!!emailError}
        aria-describedby={emailError ? "home-email-error" : undefined}
      />
      {emailError && <span id="home-email-error" role="alert" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#C0E57A" }}>{emailError}</span>}
      {!compact && (
        <>
          <label htmlFor="home-waitlist-role" className="sr-only">I am a...</label>
          <select id="home-waitlist-role" className="p-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">I am a...</option>
            <option value="patient">Patient</option>
            <option value="dentist">Dentist / Periodontist</option>
            <option value="clinic">Clinic Owner</option>
            <option value="other">Other</option>
          </select>
        </>
      )}
      <button type="submit" className="btn-primary w-full" style={{ justifyContent: "center", fontSize: 16, padding: "16px 28px" }}>
        Join the Waitlist
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C", textAlign: "center" }}>No spam. Unsubscribe anytime. GDPR compliant.</p>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  useReveal();

  const homeFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is an AI-powered dental companion app that bridges the gap between dental appointments. It translates clinical recommendations into personalised daily programmes with reminders, tracking, and educational content for patients, while giving clinicians real-time engagement data." } },
      { "@type": "Question", "name": "Who is Perioskoup for?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is designed for two audiences: patients who want to take control of their oral health between dental appointments, and dental professionals (periodontists, hygienists, clinic owners) who want to monitor and support their patients remotely." } },
      { "@type": "Question", "name": "Is Perioskoup a medical device?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is designed as a clinical support tool, not a diagnostic device. It does not diagnose conditions or make independent clinical recommendations. All patient programmes are set by their clinician. The app is built with EU MDR and FDA SaMD guidance in mind." } },
      { "@type": "Question", "name": "How much does Perioskoup cost?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is currently in private beta. Founding members who join the waitlist will receive priority access and founding pricing when the app launches on iOS and Android. Pricing details will be announced closer to launch." } },
      { "@type": "Question", "name": "Is my health data safe with Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Perioskoup stores all patient data in EU-based servers, encrypted at rest and in transit. The platform is built with GDPR protection by design. Patient data is never sold or used for model training without explicit consent." } },
    ]
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <Helmet>
        <title>Perioskoup — AI Dental Companion App | Between-Visit Dental Care</title>
        <meta name="description" content="Perioskoup bridges the gap between dental visits with AI-powered guidance, habit tracking, and real-time support. Winner of the EFP Digital Innovation Award 2025." />
        <link rel="canonical" href="https://perioskoup.com/" />
        <meta property="og:title" content="Perioskoup — AI Dental Companion App | Between-Visit Dental Care" />
        <meta property="og:description" content="AI-powered dental companion app. Bridges the gap between dental visits with personalized daily habits for patients. EFP Innovation Award Winner 2025." />
        <meta property="og:url" content="https://perioskoup.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Perioskoup — AI Dental Companion App | Between-Visit Dental Care" />
        <meta name="twitter:description" content="Bridge the gap between dental appointments with AI habit tracking, smart reminders, and a clinician dashboard. EFP Digital Innovation Award 2025 Winner." />
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/" />
      </Helmet>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }} />
      <div className="noise-overlay" />
      <Navbar />

      {/* HERO */}
      <section id="main-content" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: "clamp(80px, 12vw, 120px)", paddingBottom: "clamp(48px, 8vw, 80px)", overflow: "hidden" }}>
        {/* Hero LCP image — outside wrapper so overflow:hidden doesn't block LCP detection */}
        <img src={ASSETS.heroBg} alt="Perioskoup dental companion app hero" fetchPriority="high" width={1280} height={714} className="hero-lcp-img ken-burns" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
        {/* Animated background overlays */}
        <div className="animated-bg-wrapper">
          <div className="bg-overlay" style={{ background: "linear-gradient(105deg, rgba(10,23,30,0.88) 0%, rgba(10,23,30,0.7) 50%, rgba(10,23,30,0.4) 100%)" }} />
          <div className="bg-overlay" style={{ background: "linear-gradient(to top, #0A171E 0%, transparent 35%)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-center">
            {/* Left: text content */}
            <div>
              {/* EFP badge — CSS hover via .efp-badge-hover */}
              <div className="reveal" style={{ marginBottom: 28 }}>
                <a href="https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/" target="_blank" rel="noopener noreferrer"
                  className="efp-badge-hover"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 6px", background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.3)", borderRadius: 100, textDecoration: "none", whiteSpace: "nowrap" as const }}>
                  <span style={{ background: "#C0E57A", color: "#0A171E", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 100, fontFamily: "Gabarito, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const }}>EFP Award Winner 2025</span>
                  <span style={{ color: "#C0E57A", fontSize: 13, fontFamily: "Gabarito, sans-serif", fontWeight: 500, whiteSpace: "nowrap" as const }}>Digital Innovation</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "#C0E57A", flexShrink: 0 }}><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>

              {/* Headline */}
              <h1 className="reveal visible" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(64px, 7vw, 96px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 32, transitionDelay: "0.1s" }}>
                Between visits,<br />
                <span style={{ color: "#C0E57A" }}>we take over.</span>
              </h1>

              {/* Product subhead */}
              <p className="reveal body-lg" style={{ maxWidth: 520, marginBottom: 32, transitionDelay: "0.15s", color: "rgba(245,249,234,0.8)" }}>
                Perioskoup is a free AI dental companion app — personalised guidance, habit tracking, and a direct line to your clinic between appointments.
              </p>

              {/* Dr. Anca quote */}
              <blockquote className="reveal" style={{ borderLeft: "3px solid #C0E57A", paddingLeft: 20, marginBottom: 40, transitionDelay: "0.2s" }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 17, fontStyle: "italic", color: "rgba(245,249,234,0.85)", lineHeight: 1.65, maxWidth: 480 }}>
                  "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes."
                </p>
                <footer style={{ marginTop: 10, fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>
                  — Dr. Anca Constantin, Periodontist &amp; Co-founder
                </footer>
              </blockquote>

              {/* CTA row */}
              <div className="reveal" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48, transitionDelay: "0.3s" }}>
                <Link href="/waitlist" className="btn-primary" style={{ fontSize: 16, padding: "16px 32px" }}>
                  Join the Waitlist
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link href="/for-dentists" className="btn-ghost" style={{ fontSize: 16, padding: "16px 32px" }}>
                  For Clinicians
                </Link>
              </div>

              {/* Social proof micro-bar */}
              <p className="reveal" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C", marginBottom: 32, transitionDelay: "0.35s" }}>
                30+ founding clinics · 500+ on the waitlist · Free for patients
              </p>

              {/* Stats row */}
              <div className="reveal flex flex-wrap gap-6 lg:gap-10" style={{ transitionDelay: "0.4s" }}>
                {[
                  { label: "Treatment Acceptance", value: "85%", source: "digital health research" },
                  { label: "Fewer No-Shows", value: "40%", source: "digital health research" },
                  { label: "EFP Innovation Award", value: "Winner", source: "" },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "Dongle, sans-serif", fontSize: 44, color: "#C0E57A", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C", marginTop: 4 }}>{s.label}</div>
                    {s.source && <div style={{ fontFamily: "Gabarito, sans-serif", fontSize: 10, color: "#6B7F7B", marginTop: 2 }}>{s.source}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: phone mockup
                FIX: reveal-scale on outer div, phone-float on inner div.
                Previously both classes were on the same element, which caused
                the CSS animation (float) to override the CSS transition (reveal-scale)
                on the transform property — the scale-in never fired. */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} aria-hidden="true">
              <div className="reveal-scale" style={{ transitionDelay: "0.2s" }}>
                <div className="phone-float">
                  <PhoneMockup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "#C0E57A", padding: "14px 0", overflow: "hidden" }} aria-hidden="true">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {["AI-Powered Dental Companion", "EFP Innovation Award Winner 2025", "For Patients & Clinicians", "Personalised Daily Habits", "Bridging the Gap Between Visits", "Trusted by Periodontists", "Launching Soon"].map((t) => (
                <span key={t} style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, fontWeight: 700, color: "#0A171E", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0 40px", whiteSpace: "nowrap" }}>
                  {t} <span style={{ color: "rgba(10,23,30,0.35)", margin: "0 8px" }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* EFP AWARD CARD */}
      <section style={{ background: "#0A171E", padding: "80px 0" }}>
        <div className="container">
          <div className="reveal grid grid-cols-1 md:grid-cols-2" style={{ borderRadius: 24, overflow: "hidden", border: "1px solid #234966" }}>
            {/* Left: ceremony photo */}
            <div style={{ position: "relative", minHeight: 420, overflow: "hidden" }}>
              <img src={ASSETS.award} alt="EFP Digital Innovation Award ceremony — Perioskoup" loading="lazy" decoding="async" width={800} height={446} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #1D3449 100%)" }} />
            </div>
            {/* Right: content */}
            <div style={{ background: "#1D3449", padding: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#C0E57A", color: "#0A171E", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 100, fontFamily: "Gabarito, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
                EFP Innovation Award Winner 2025
              </div>
              <blockquote style={{ borderLeft: "3px solid #C0E57A", paddingLeft: 20, marginBottom: 24 }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 18, fontStyle: "italic", color: "#F5F9EA", lineHeight: 1.6 }}>
                  "Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health."
                </p>
                <footer style={{ marginTop: 12, fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>
                  — European Federation of Periodontology
                </footer>
              </blockquote>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C", lineHeight: 1.65, marginBottom: 24 }}>
                Selected from 20 submissions across 17 national societies, Perioskoup was recognised by an international expert jury including Professors James Deschner, David Herrera, and Andreas Stavropoulos.
              </p>
              <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 24, paddingTop: 16, borderTop: "1px solid #234966" }}>
                {["EFP", "Sponsored by Haleon", "EuroPerio11"].map((t) => (
                  <span key={t} style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C" }}>{t}</span>
                ))}
              </div>
              <a href="https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/" target="_blank" rel="noopener noreferrer" className="btn-text">
                Read the EFP announcement
                <span className="btn-text-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position: "relative", background: "#050C10", padding: "120px 0", overflow: "hidden" }}>
        <div className="animated-bg-wrapper">
          <div className="animated-bg-img drift-x" style={{ backgroundImage: `url(${ASSETS.featuresBg})`, opacity: 0.35 }} />
          <div className="bg-overlay" style={{ background: "linear-gradient(to bottom, #050C10 0%, transparent 20%, transparent 80%, #050C10 100%)" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="text-center reveal" style={{ marginBottom: 72 }}>
            <span className="label-tag" style={{ marginBottom: 20, display: "inline-flex" }}>Features</span>
            <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, marginBottom: 20 }}>
              Everything your smile<br />needs. <span style={{ color: "#C0E57A" }}>In one place.</span>
            </h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
              Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and secure patient-clinic messaging into a single dental companion app.
            </p>
            <p className="body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
              Perioskoup connects patients and clinicians with AI-powered tools that make daily dental care simple, consistent, and effective.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { span: 2, title: "AI-Powered Guidance", desc: "Perioskoup's AI analyses your dental history and daily habits to deliver personalised recommendations — not generic advice. It learns what works for you and adapts over time.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { span: 1, title: "Habit Tracking", desc: "Daily streaks, reminders, and progress visualisation that make good dental habits stick.", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { span: 1, title: "For Clinicians", desc: "Dentists and periodontists get a dashboard to monitor patient engagement and send targeted guidance between appointments.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { span: 2, title: "Privacy First", desc: "Your dental data stays yours. Perioskoup is built with GDPR protection at its core — no selling of health data, ever. Encrypted end-to-end, stored in the EU.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            ].map((f, i) => (
              <div key={f.title} className={`card reveal ${f.span === 2 ? "md:col-span-2" : ""}`} style={{ transitionDelay: `${i * 0.08}s`, background: "rgba(29,52,73,0.75)", backdropFilter: "blur(12px)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(192,229,122,0.1)", border: "1px solid rgba(192,229,122,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d={f.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 32, color: "#F5F9EA", lineHeight: 1, marginBottom: 12 }}>{f.title}</h3>
                <p className="body-md" style={{ maxWidth: f.span === 2 ? 480 : undefined }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal" style={{ marginTop: 48 }}>
            <Link href="/features" className="btn-ghost">See all features &rarr;</Link>
          </div>
        </div>
      </section>

      {/* WHAT IS AN AI DENTAL COMPANION */}
      <section style={{ background: "#0A171E", padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="reveal" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 64px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 24 }}>
              What is an AI dental companion?
            </h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
              An AI dental companion translates clinical recommendations into personalised daily habits. It bridges the gap between what your dentist recommends and what you actually do at home.
            </p>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 18, color: "rgba(245,249,234,0.8)", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 16px" }}>
              Not a chatbot. Not a practice management system. Not a fitness tracker for teeth.
            </p>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 17, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
              An AI dental companion translates clinical recommendations into personalised daily habits — with smart reminders, progress tracking, and a direct line to your dental team. Perioskoup is the first.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ position: "relative", padding: "120px 0", overflow: "hidden", background: "#0A171E" }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="text-center reveal" style={{ marginBottom: 80 }}>
            <span className="label-tag" style={{ marginBottom: 20, display: "inline-flex" }}>Seamless Integration</span>
            <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(52px, 6vw, 80px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, marginBottom: 20 }}>
              From Chair <span style={{ color: "#C0E57A" }}>to Chat.</span>
            </h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
              Perioskoup connects your dental appointment to your daily routine in three steps: your dentist sets a personalised plan, AI translates it into habits, and you build consistency between visits.
            </p>
            <p className="body-lg" style={{ maxWidth: 540, margin: "0 auto" }}>
              The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps.
            </p>
          </div>

          {/* Wave circles layout */}
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", paddingTop: 40, paddingBottom: 40 }}>
            <svg viewBox="0 0 900 200" fill="none" className="hidden md:block" style={{ position: "absolute", top: 40, left: 0, width: "100%", height: 200, zIndex: 1 }}>
              <path d="M 120 80 C 250 80, 300 160, 450 160 C 600 160, 650 80, 780 80" stroke="rgba(192,229,122,0.35)" strokeWidth="1.5" fill="none" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 0, position: "relative", zIndex: 2 }}>
              {[
                {
                  step: "01", title: "Visit Your Dentist", desc: "Your dentist examines, diagnoses, and sets a personalised care plan using Perioskoup.", offsetY: 0,
                  icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" fill="#C0E57A"/><rect x="13" y="4" width="7" height="7" rx="1.5" fill="#C0E57A"/><rect x="4" y="13" width="7" height="7" rx="1.5" fill="#C0E57A"/><rect x="13" y="13" width="7" height="7" rx="1.5" fill="#C0E57A"/></>,
                },
                {
                  step: "02", title: "Get Your Plan", desc: "AI translates clinical recommendations into daily habits with smart reminders and tracking.", offsetY: 80,
                  icon: <><path d="M12 2l2 5L19 9l-5 2-2 5-2-5L5 9l5-2 2-5z" fill="#C0E57A"/><path d="M18 14l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5 1.5-3z" fill="#C0E57A" opacity="0.6"/></>,
                },
                {
                  step: "03", title: "Build Daily Habits", desc: "Follow your plan at home with AI support, progress tracking, and a direct line to your clinic.", offsetY: 0,
                  icon: <><rect x="5" y="1" width="14" height="22" rx="3" stroke="#C0E57A" strokeWidth="1.8" fill="none"/><rect x="10" y="18" width="4" height="2" rx="1" fill="#C0E57A"/></>,
                },
              ].map((item, i) => (
                <div key={item.step} className={`reveal ${item.offsetY ? "md:pt-20" : ""}`} style={{ transitionDelay: `${i * 0.15}s`, textAlign: "center" }}>
                  <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 280, height: 280, borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(192,229,122,0.06) 0%, rgba(192,229,122,0.02) 40%, transparent 70%)",
                      pointerEvents: "none",
                    }} />
                    <div className="circle-pulse" style={{
                      width: 160, height: 160, borderRadius: "50%",
                      background: "#1D3449", border: "2px solid rgba(35,73,102,0.8)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      animationDelay: `${i * 0.8}s`,
                    }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">{item.icon}</svg>
                    </div>
                    <div style={{
                      position: "absolute", top: -4, right: -4,
                      width: 32, height: 32, borderRadius: "50%",
                      background: "#C0E57A", color: "#0A171E",
                      fontFamily: "Gabarito, sans-serif", fontSize: 11, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {item.step}
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 36, color: "#F5F9EA", lineHeight: 1, marginBottom: 12 }}>{item.title}</h3>
                  <p className="body-md" style={{ maxWidth: 240, margin: "0 auto" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS / TEAM */}
      <section style={{ background: "#050C10", padding: "120px 0" }}>
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: 72 }}>
            <span className="label-tag" style={{ marginBottom: 20, display: "inline-flex" }}>The Team</span>
            <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, marginBottom: 20 }}>
              Built by people who<br />care about <span style={{ color: "#C0E57A" }}>your health.</span>
            </h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
              Perioskoup was founded by Dr. Anca Laura Constantin (Periodontist), Eduard Ciugulea (CGO), and Petrica Nancu (CTO & Head of AI) in Bucharest, Romania.
            </p>
            <p className="body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
              Perioskoup was founded by a periodontist, a full-stack engineer, and an AI specialist — united by a single mission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: ASSETS.anca, name: "Dr. Anca Laura Constantin", role: "Co-founder & Chief Dental Officer", cred: "Periodontist · Bucharest, Romania", quote: "I see patients every day who don't know how to maintain their oral health between visits. Perioskoup is the companion I always wished I could give them." },
              { img: ASSETS.edi, name: "Eduard Ciugulea", role: "Co-founder & CGO", cred: "Full-Stack Engineer & Growth Strategist", quote: "We built Perioskoup to be the kind of app that actually changes behaviour — not just tracks it. The technology has to serve the human outcome." },
              { img: ASSETS.petrica, name: "Petrica Nancu", role: "CTO & Head of AI", cred: "AI & Machine Learning Specialist", quote: "Every screen in Perioskoup is designed to reduce friction and increase confidence. Health apps should feel empowering, not clinical." },
            ].map((f, i) => (
              <div key={f.name} className="card reveal" style={{ transitionDelay: `${i * 0.12}s`, padding: 0, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
                  <img src={f.img} alt={f.name} loading="lazy" decoding="async" width={400} height={280} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1D3449 0%, rgba(29,52,73,0.3) 60%, transparent 100%)" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, color: "#F5F9EA", marginBottom: 4 }}>{f.name}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, fontWeight: 600, color: "#C0E57A", marginBottom: 4 }}>{f.role}</p>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C", marginBottom: 16 }}>{f.cred}</p>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C", lineHeight: 1.6, fontStyle: "italic" }}>"{f.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", background: "#0A171E", padding: "120px 0", overflow: "hidden" }}>
        <div className="cta-bg-canvas">
          <div className="cta-orb cta-orb--1" />
          <div className="cta-orb cta-orb--2" />
          <div className="cta-orb cta-orb--3" />
          <div className="cta-orb cta-orb--4" />
          <div className="cta-orb cta-orb--5" />
          <div className="cta-grid" />
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`p-${i}`}
              className="cta-particle"
              style={{
                left: `${8 + (i * 7.5) % 84}%`,
                bottom: `${-5 - (i * 3)}%`,
                animationDuration: `${6 + (i % 5) * 2}s`,
                animationDelay: `${(i * 1.3) % 8}s`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                opacity: 0.3 + (i % 4) * 0.15,
              }}
            />
          ))}
          <div className="cta-scan-line" />
          <div className="cta-vignette" />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="reveal" style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <span className="label-tag" style={{ marginBottom: 24, display: "inline-flex" }}>Join the Waitlist</span>
            <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, marginBottom: 24 }}>
              Be first when<br /><span style={{ color: "#C0E57A" }}>we launch.</span>
            </h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
              Perioskoup is currently in private beta with a public launch planned for March 2026. Founding waitlist members receive priority access and founding pricing.
            </p>
            <p className="body-lg" style={{ marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
              We're onboarding founding clinics and early patients now. Get priority access, founding member pricing, and a direct line to the team.
            </p>
            <div style={{
              maxWidth: 440,
              margin: "0 auto",
              background: "rgba(29,52,73,0.35)",
              border: "1px solid rgba(192,229,122,0.15)",
              borderRadius: 20,
              padding: "32px 28px",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 60px rgba(192,229,122,0.06), 0 8px 32px rgba(0,0,0,0.3)",
            }}>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / QUOTE */}
      <section style={{ background: "#050C10", padding: "80px 0" }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div style={{ width: 48, height: 3, background: "#C0E57A", margin: "0 auto 32px", borderRadius: 2 }} />
            <blockquote style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(32px, 4vw, 52px)", color: "#F5F9EA", lineHeight: 1.1, marginBottom: 24 }}>
              "The app I always wished I could prescribe to my patients."
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <img src={ASSETS.anca} alt="Dr. Anca Laura Constantin" loading="lazy" decoding="async" width={44} height={44} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
              <div style={{ textAlign: "left" }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, fontWeight: 600, color: "#F5F9EA" }}>Dr. Anca Laura Constantin</p>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C" }}>Periodontist & Co-founder, Perioskoup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
