/**
 * PERIOSKOUP — CONTACT PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { useEffect, useState } from "react";
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

export default function Contact() {
  useReveal();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Perioskoup",
    "description": "AI-powered dental companion app for personalised periodontal care between appointments.",
    "url": "https://perioskoup.com",
    "email": "hello@perioskoup.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bucharest",
      "addressCountry": "RO"
    },
    "foundingDate": "2025",
    "founder": [
      { "@type": "Person", "name": "Dr. Anca Laura Constantin", "jobTitle": "CEO & Periodontist" },
      { "@type": "Person", "name": "Eduard Ciugulea", "jobTitle": "Co-founder & CGO" },
      { "@type": "Person", "name": "Petrica Nancu", "jobTitle": "CTO & Head of AI" }
    ]
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Contact</span>
          <h1 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(56px, 7vw, 88px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20, marginTop: 16, transitionDelay: "0.08s" }}>
            Let's talk<br />
            <span style={{ color: "#C0E57A" }}>dental health.</span>
          </h1>
          <p className="body-lg reveal" style={{ maxWidth: 480, transitionDelay: "0.16s" }}>
            Whether you're a patient, a dentist, an investor, or just curious — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#050C10", padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            {/* Left: info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "hello@perioskoup.com", sub: "We reply within 24 hours." },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Location", value: "Bucharest, Romania", sub: "Serving clinics across Europe." },
                { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "For Clinics", value: "clinic@perioskoup.com", sub: "Founding partner enquiries." },
              ].map((item) => (
                <div key={item.label} className="reveal" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={item.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8C9C8C", marginBottom: 4 }}>{item.label}</p>
                    <p style={{ fontFamily: "Gabarito, sans-serif", fontWeight: 600, fontSize: 16, color: "#F5F9EA", marginBottom: 2 }}>{item.value}</p>
                    <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: form */}
            <div className="card reveal" style={{ padding: 40 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(192,229,122,0.12)", border: "1px solid rgba(192,229,122,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 32, fontWeight: 700, color: "#F5F9EA", marginBottom: 8 }}>Message sent!</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, color: "#8C9C8C" }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, fontWeight: 700, color: "#F5F9EA", marginBottom: 8 }}>Send a message</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>First name</label>
                      <input type="text" placeholder="Anca" className="p-input" required />
                    </div>
                    <div>
                      <label style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Last name</label>
                      <input type="text" placeholder="Constantin" className="p-input" required />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Email</label>
                    <input type="email" placeholder="you@example.com" className="p-input" required />
                  </div>
                  <div>
                    <label style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>I am a...</label>
                    <select className="p-select" required>
                      <option value="">Select your role</option>
                      <option value="patient">Patient</option>
                      <option value="dentist">Dentist / Periodontist</option>
                      <option value="clinic">Clinic Owner</option>
                      <option value="investor">Investor</option>
                      <option value="press">Press / Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Message</label>
                    <textarea placeholder="Tell us what's on your mind..." className="p-input" rows={4} required style={{ resize: "vertical" }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                    Send Message
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
