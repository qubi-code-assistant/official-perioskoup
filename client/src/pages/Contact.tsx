/**
 * PERIOSKOUP -- CONTACT PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";

function useReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".reveal, .reveal-scale");
    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Contact() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): Record<string, string> {
    const errs: Record<string, string> = {};
    const firstName = (form.elements.namedItem("contact-first-name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("contact-email") as HTMLInputElement)?.value.trim();
    const role = (form.elements.namedItem("contact-role") as HTMLSelectElement)?.value;
    const message = (form.elements.namedItem("contact-message") as HTMLTextAreaElement)?.value.trim();
    if (!firstName) errs["contact-first-name"] = "First name is required.";
    if (!email) errs["contact-email"] = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs["contact-email"] = "Please enter a valid email address.";
    if (!role) errs["contact-role"] = "Please select your role.";
    if (!message) errs["contact-message"] = "Message is required.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(e.currentTarget);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
    }
  }

  const contactFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How do I contact Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "You can reach Perioskoup via email at hello@perioskoup.com for general enquiries or clinic@perioskoup.com for dental practice partnerships. You can also use the contact form on this page. We respond within 24 hours." } },
      { "@type": "Question", "name": "When does Perioskoup launch?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup's public launch is planned for March 2026. Founding clinics and early patients on the waitlist receive priority access before the public launch." } },
      { "@type": "Question", "name": "Is Perioskoup available in my country?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is based in Bucharest, Romania and is initially launching across Europe. The platform is designed for dental clinics and patients in the EU, UK, and beyond. Contact us for availability in your region." } },
    ]
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://perioskoup.com/#organization",
    "name": "Perioskoup",
    "legalName": "Perioskoup SRL",
    "description": "AI-powered dental companion app for personalised periodontal care between appointments.",
    "url": "https://perioskoup.com",
    "email": "hello@perioskoup.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EU"
    },
    "foundingDate": "2025-06",
    "founders": [
      { "@id": "https://perioskoup.com/#anca-constantin" },
      { "@type": "Person", "name": "Eduard Ciugulea", "jobTitle": "Co-founder & CGO" },
      { "@type": "Person", "name": "Petrica Nancu", "jobTitle": "CTO & Head of AI" }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/perioskoup",
      "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
    ]
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Contact Perioskoup | Dental AI Enquiries</title>
        <meta name="description" content="Reach the Perioskoup team for press, clinic partnerships, investor enquiries, or product questions. We respond within 24 hours." />
        <link rel="canonical" href="https://perioskoup.com/contact" />
        <meta property="og:title" content="Contact Perioskoup | Dental AI Enquiries" />
        <meta property="og:description" content="Get in touch with the Perioskoup team for press, clinic partnerships, or general enquiries. Based in Bucharest, serving clinics across Europe." />
        <meta property="og:url" content="https://perioskoup.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Contact Perioskoup" />
        <meta name="twitter:description" content="Reach the Perioskoup team for press, clinic partnerships, investor enquiries, or product questions. We respond within 24 hours." />
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/contact" />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqJsonLd) }} />
      <Navbar />

      {/* Hero */}
      <section id="main-content" style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
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
            Whether you're a patient, a dentist, an investor, or just curious - we'd love to hear from you.
          </p>
          <p className="reveal" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C", marginTop: 12, transitionDelay: "0.24s" }}>
            Perioskoup is the AI dental companion bridging clinic and home.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: "#050C10", padding: "80px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px] items-start">
            {/* Left: info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "hello@perioskoup.com", sub: "We reply within 24 hours." },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Location", value: "Based in Europe", sub: "Serving dental practices worldwide." },
                { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", label: "For Clinics", value: "clinic@perioskoup.com", sub: "Founding partner enquiries." },
              ].map((item) => (
                <div key={item.label} className="reveal" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={item.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
                <div role="status" aria-live="polite" aria-atomic="true" style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(192,229,122,0.12)", border: "1px solid rgba(192,229,122,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: 32, fontWeight: 700, color: "#F5F9EA", marginBottom: 8 }}>Message sent!</h2>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, color: "#8C9C8C" }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, fontWeight: 700, color: "#F5F9EA", marginBottom: 8 }}>Send a message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="contact-first-name" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>First name</label>
                      <input id="contact-first-name" type="text" placeholder="Anca" className="p-input" required aria-required="true" aria-invalid={!!errors["contact-first-name"]} aria-describedby={errors["contact-first-name"] ? "contact-first-name-error" : undefined} />
                      {errors["contact-first-name"] && <span id="contact-first-name-error" role="alert" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#C0E57A", marginTop: 4, display: "block" }}>{errors["contact-first-name"]}</span>}
                    </div>
                    <div>
                      <label htmlFor="contact-last-name" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Last name</label>
                      <input id="contact-last-name" type="text" placeholder="Constantin" className="p-input" required aria-required="true" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Email</label>
                    <input id="contact-email" type="email" placeholder="you@example.com" className="p-input" required aria-required="true" aria-invalid={!!errors["contact-email"]} aria-describedby={errors["contact-email"] ? "contact-email-error" : undefined} />
                    {errors["contact-email"] && <span id="contact-email-error" role="alert" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#C0E57A", marginTop: 4, display: "block" }}>{errors["contact-email"]}</span>}
                  </div>
                  <div>
                    <label htmlFor="contact-role" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>I am a...</label>
                    <select id="contact-role" className="p-select" required aria-required="true" aria-invalid={!!errors["contact-role"]} aria-describedby={errors["contact-role"] ? "contact-role-error" : undefined}>
                      <option value="">Select your role</option>
                      <option value="patient">Patient</option>
                      <option value="dentist">Dentist / Periodontist</option>
                      <option value="clinic">Clinic Owner</option>
                      <option value="investor">Investor</option>
                      <option value="press">Press / Media</option>
                      <option value="other">Other</option>
                    </select>
                    {errors["contact-role"] && <span id="contact-role-error" role="alert" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#C0E57A", marginTop: 4, display: "block" }}>{errors["contact-role"]}</span>}
                  </div>
                  <div>
                    <label htmlFor="contact-message" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Message</label>
                    <textarea id="contact-message" placeholder="Tell us what's on your mind..." className="p-input" rows={4} required aria-required="true" aria-invalid={!!errors["contact-message"]} aria-describedby={errors["contact-message"] ? "contact-message-error" : undefined} style={{ resize: "vertical" }} />
                    {errors["contact-message"] && <span id="contact-message-error" role="alert" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#C0E57A", marginTop: 4, display: "block" }}>{errors["contact-message"]}</span>}
                  </div>
                  <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
                    Send Message
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
