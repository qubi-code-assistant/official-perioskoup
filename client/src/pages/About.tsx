/**
 * PERIOSKOUP — ABOUT PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";

const ANCA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/anca_e45bcd41.jpeg";
const EDI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/edi_32419062.jpeg";
const PETRICA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/petrica_0ca5e5b8.png";
const AWARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/award_ceremony_2ad896fb.webp";

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

export default function About() {
  useReveal();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://perioskoup.com/#anca-constantin",
    "name": "Dr. Anca Laura Constantin",
    "honorificPrefix": "Dr.",
    "givenName": "Anca Laura",
    "familyName": "Constantin",
    "jobTitle": "Periodontist",
    "description": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, co-founder and Chief Dental Officer of Perioskoup. She won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna, selected from 20 submissions across 17 national societies.",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/anca_e45bcd41.jpeg",
    "worksFor": { "@id": "https://perioskoup.com/#organization" },
    "award": "EFP Digital Innovation Award 2025 — 3rd Prize, European Federation of Periodontology",
    "knowsAbout": ["Periodontal Disease", "Periodontology", "AI in Dental Care", "Patient Engagement"],
    "sameAs": [
      "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
    ]
  };

  const aboutFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who founded Perioskoup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perioskoup was founded in 2025 by Dr. Anca Laura Constantin (Periodontist, CEO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The idea emerged from Dr. Anca's clinical practice — specifically the challenge of maintaining patient engagement between dental appointments."
        }
      },
      {
        "@type": "Question",
        "name": "What award did Perioskoup win?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perioskoup won 3rd Prize at the EFP Digital Innovation Award 2025, presented by the European Federation of Periodontology at EuroPerio11 in Vienna. The award was selected from 20 submissions across 17 national periodontal societies by a jury including Professors James Deschner, David Herrera, and Andreas Stavropoulos."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Perioskoup based?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perioskoup is based in Bucharest, Romania. It is a Romanian SRL incorporated in June 2025. The platform serves dental clinics and patients across Europe."
        }
      },
      {
        "@type": "Question",
        "name": "What is Perioskoup's mission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perioskoup's mission is to bridge the gap between dental visits. Periodontal disease affects 1 in 2 adults worldwide, yet most patients forget their care instructions within 48 hours. Perioskoup gives every patient the tools to understand their condition, stay connected to their care team, and take meaningful action between appointments."
        }
      }
    ]
  };

  return (
    <div style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>About Perioskoup — Dental AI Built in Bucharest</title>
        <meta name="description" content="Meet the team behind Perioskoup: a periodontist, engineer, and AI specialist building the dental companion they always wished existed." />
        <link rel="canonical" href="https://perioskoup.com/about" />
        <meta property="og:title" content="About Perioskoup — Dental AI Built in Bucharest" />
        <meta property="og:description" content="Meet the founders of Perioskoup: Dr. Anca Constantin (Periodontist), Eduard Ciugulea (CGO), and Petrica Nancu (CTO). EFP Award winners 2025." />
        <meta property="og:url" content="https://perioskoup.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="About Perioskoup — Dental AI Built in Bucharest" />
        <meta name="twitter:description" content="A periodontist, an engineer, and an AI specialist walk into a dental chair... and build the companion they always wished existed. EFP Award 2025." />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutFaqJsonLd) }} />
      <Navbar />

      {/* Hero */}
      <section id="main-content" style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Our Story</span>
          <h1 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(56px, 7vw, 88px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 28, marginTop: 16, transitionDelay: "0.08s" }}>
            Born in a dental chair.<br />
            <span style={{ color: "#C0E57A" }}>Built for every patient.</span>
          </h1>
          <p className="body-lg reveal" style={{ fontSize: 19, maxWidth: 600, transitionDelay: "0.16s" }}>
            Perioskoup started with a simple observation: patients leave the dentist's office understanding very little about their condition. Dr. Anca Constantin saw this every day in her periodontal clinic in Bucharest — and decided to build the solution herself.
          </p>
        </div>
      </section>

      {/* EFP Award */}
      <section style={{ background: "#050C10", padding: "80px 0" }}>
        <div className="container">
          <span className="label-tag reveal" style={{ marginBottom: 32, display: "inline-flex" }}>Recognition</span>
          <div className="reveal-scale grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-[#234966]" style={{ maxWidth: 900 }}>
            {/* Photo */}
            <div className="relative min-h-[240px] md:min-h-[360px] overflow-hidden">
              <img src={AWARD_IMG} alt="EFP Digital Innovation Award 2025 ceremony" loading="lazy" width={900} height={360} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #1D3449)" }} />
            </div>
            {/* Content */}
            <div className="bg-[#1D3449] p-6 md:p-10 flex flex-col justify-center gap-4">
              <span style={{ display: "inline-block", fontFamily: "Gabarito, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0A171E", background: "#C0E57A", padding: "5px 12px", borderRadius: 100, width: "fit-content" }}>
                EFP Innovation Award Winner 2025
              </span>
              <blockquote style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, fontStyle: "italic", fontWeight: 600, lineHeight: 1.6, color: "#F5F9EA", borderLeft: "3px solid #C0E57A", paddingLeft: 20, margin: 0 }}>
                "Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health."
              </blockquote>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C", margin: 0 }}>
                — European Federation of Periodontology
              </p>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, lineHeight: 1.7, color: "#8C9C8C", margin: 0 }}>
                Selected from 20 submissions across 17 national societies, recognized by an international expert jury including Professors James Deschner, David Herrera, and Andreas Stavropoulos.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 8, borderTop: "1px solid #234966" }}>
                {["EFP", "Haleon", "EuroPerio11"].map((l) => (
                  <span key={l} style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C" }}>{l}</span>
                ))}
              </div>
              <a href="https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/" target="_blank" rel="noopener noreferrer" className="btn-text">
                Read the EFP announcement
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Mission</span>
              <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 24, marginTop: 16, transitionDelay: "0.08s" }}>
                Close the gap<br />
                <span style={{ color: "#C0E57A" }}>between visits.</span>
              </h2>
              <p className="body-lg reveal" style={{ marginBottom: 20, transitionDelay: "0.16s" }}>
                Periodontal disease affects 1 in 2 adults worldwide, yet most patients don't understand their diagnosis, forget their care instructions within 48 hours, and don't return for follow-up appointments.
              </p>
              <p className="body-lg reveal" style={{ transitionDelay: "0.24s" }}>
                Perioskoup exists to change that. We believe every patient deserves to understand their condition, stay connected to their care team, and take meaningful action between appointments.
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.08s" }}>
              <div className="bg-[#1D3449] border border-[#234966] rounded-2xl p-6 lg:p-10">
                {[
                  { value: "50%", label: "of adults have periodontal disease" },
                  { value: "48h", label: "until patients forget care instructions" },
                  { value: "60%", label: "of patients don't return for follow-up" },
                  { value: "3×", label: "better outcomes with digital support" },
                ].map((stat, i) => (
                  <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 0", borderBottom: i < 3 ? "1px solid #234966" : "none" }}>
                    <span style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: 32, color: "#C0E57A", minWidth: 60 }}>{stat.value}</span>
                    <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C" }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#050C10", padding: "120px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>The Team</span>
            <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, transitionDelay: "0.08s" }}>
              Built by clinicians,<br />
              <span style={{ color: "#C0E57A" }}>for clinicians.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[900px] mx-auto">
            {[
              { img: ANCA_IMG, name: "Dr. Anca Laura Constantin", role: "Periodontist & Co-founder, CDO", creds: "DMD, PhD in Periodontology", bio: "Dr. Anca founded Perioskoup after recognizing that the biggest barrier to treatment success wasn't clinical skill — it was the communication gap between chair and home." },
              { img: EDI_IMG, name: "Eduard Ciugulea", role: "CGO & Co-Founder", creds: "Full-stack engineer & growth strategist", bio: "Eduard brings the technical architecture and growth strategy that transforms Anca's clinical vision into a scalable product built for both patients and clinics." },
              { img: PETRICA_IMG, name: "Petrica Nancu", role: "CTO & Head of AI", creds: "AI & machine learning specialist", bio: "Petrica leads the AI engine powering Perioskoup's clinical intelligence — transforming raw periodontal data into actionable nudges that keep patients engaged." },
            ].map((f, i) => (
              <div key={f.name} className="card reveal" style={{ padding: 0, overflow: "hidden", transitionDelay: `${i * 0.08}s` }}>
                <div className="h-48 sm:h-56 lg:h-[280px] overflow-hidden relative">
                  <img src={f.img} alt={f.name} loading="lazy" width={300} height={280} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #1D3449, transparent)" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 26, fontWeight: 700, color: "#F5F9EA", marginBottom: 4 }}>{f.name}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, fontWeight: 600, color: "#C0E57A", marginBottom: 4 }}>{f.role}</p>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C", marginBottom: 12 }}>{f.creds}</p>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, lineHeight: 1.65, color: "#8C9C8C" }}>{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 64px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20 }}>
            Want to be part of the story?
          </h2>
          <p className="body-lg reveal" style={{ maxWidth: 400, margin: "0 auto 32px", transitionDelay: "0.08s" }}>
            Join the founding waitlist or reach out to the team directly.
          </p>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", transitionDelay: "0.16s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
              Join the Waitlist
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/contact" className="btn-ghost" style={{ fontSize: 16, padding: "16px 36px" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
