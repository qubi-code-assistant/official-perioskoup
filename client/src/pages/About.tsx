/**
 * PERIOSKOUP -- ABOUT PAGE
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
import { usePageMeta } from "@/hooks/usePageMeta";
import { capture } from "@/lib/analytics";
import { useScrollDepth } from "@/hooks/useScrollDepth";

const ANCA_IMG = "/images/anca-headshot.jpg";
const EDI_IMG = "/images/eduard-headshot.jpg";
const PETRICA_IMG = "/images/petrica.webp";
const AWARD_IMG = "/images/efp-award.webp";

export default function About() {
  useReveal();
  const { GEOCapsule } = usePageMeta("/about");
  const scrollRef = useScrollDepth("about");

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "Physician"],
    "@id": "https://perioskoup.com/#anca-constantin",
    "name": "Dr. Anca Laura Constantin",
    "honorificPrefix": "Dr.",
    "givenName": "Anca Laura",
    "familyName": "Constantin",
    "jobTitle": "CEO",
    "medicalSpecialty": "Periodontology",
    "memberOf": { "@type": "Organization", "name": "European Federation of Periodontology", "url": "https://www.efp.org" },
    "description": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, co-founder and CEO of Perioskoup. She won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna, selected from 20 submissions across 17 national societies.",
    "image": "https://perioskoup.com/images/anca-headshot.jpg",
    "worksFor": { "@type": "Organization", "@id": "https://perioskoup.com/#organization" },
    "award": "EFP Digital Innovation Award 2025, 3rd Prize, European Federation of Periodontology",
    "knowsAbout": ["Periodontal Disease", "Periodontology", "AI in Dental Care", "Patient Engagement"],
    "sameAs": [
      "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/",
      "https://www.linkedin.com/in/anca-constantin-99800633b/"
    ]
  };

  const aboutOrgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://perioskoup.com/#organization",
    "name": "Perioskoup",
    "legalName": "Perioskoup SRL",
    "url": "https://perioskoup.com",
    "logo": "https://perioskoup.com/images/og-image.jpg",
    "foundingDate": "2025",
    "description": "AI dental companion app that bridges the gap between dental visits with habit tracking, smart reminders, and a clinician dashboard.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bucharest",
      "addressCountry": "RO"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Europe"
    },
    "founder": [
      { "@type": "Person", "@id": "https://perioskoup.com/#anca-constantin", "name": "Dr. Anca Laura Constantin" },
      { "@type": "Person", "name": "Eduard Ciugulea" },
      { "@type": "Person", "name": "Petrica Nancu" }
    ],
    "award": "EFP Digital Innovation Award 2025, 3rd Prize",
    "sameAs": [
      "https://www.linkedin.com/company/perioskoup/",
      "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
    ]
  };

  const aboutFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Dr. Anca Laura Constantin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, specialising in Periodontology. She is the co-founder and CEO of Perioskoup and won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna, selected from 20 submissions across 17 national periodontal societies."
        }
      },
      {
        "@type": "Question",
        "name": "Who founded Perioskoup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perioskoup was founded in 2025 by Dr. Anca Laura Constantin (Periodontist, CEO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The idea emerged from Dr. Anca's clinical practice — specifically, the challenge of maintaining patient engagement between dental appointments."
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
    <div ref={scrollRef} style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>About Perioskoup | Dental AI Built in Bucharest</title>
        <meta name="description" content="Meet the team behind Perioskoup: a periodontist, engineer, and AI specialist building the dental companion they always wished existed." />
        <link rel="canonical" href="https://perioskoup.com/about" />
        <meta property="og:title" content="About Perioskoup | Dental AI Built in Bucharest" />
        <meta property="og:description" content="Meet the founders of Perioskoup: Dr. Anca Constantin (Periodontist), Eduard Ciugulea (CGO), and Petrica Nancu (CTO). EFP Digital Innovation Award 2025 — 3rd Prize." />
        <meta property="og:url" content="https://perioskoup.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="About Perioskoup | Dental AI Built in Bucharest" />
        <meta name="twitter:description" content="A periodontist, an engineer, and an AI specialist walk into a dental chair... and build the companion they always wished existed. EFP Digital Innovation Award 2025 — 3rd Prize." />
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/about" />
        <link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/about" />
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutOrgJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(aboutFaqJsonLd)}</script>
      </Helmet>

      {GEOCapsule}
      <Navbar />

      {/* Hero */}
      <section id="main-content" style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center" }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Our Story</span>
          <h1 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(56px, 7vw, 88px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 28, marginTop: 16, transitionDelay: "0.08s" }}>
            Born in a dental chair.<br />
            <span style={{ color: "#C0E57A" }}>Built for every patient.</span>
          </h1>
          <p className="body-lg reveal" style={{ fontSize: 19, maxWidth: 600, margin: "0 auto", transitionDelay: "0.16s" }}>
            Perioskoup started with a simple observation: patients leave the dentist's office understanding very little about their condition. Dr. Anca Constantin saw this every day in her periodontal clinic in Bucharest - and decided to build the solution herself.
          </p>
          <div className="reveal" style={{ marginTop: 32, transitionDelay: "0.24s", display: "flex", justifyContent: "center" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: 15, padding: "12px 28px" }} onClick={() => capture("page_cta_clicked", { cta_text: "Join the Waitlist", page: "about", position: "hero" })}>
              Join the Waitlist
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* EFP Award */}
      <section style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="label-tag reveal" style={{ marginBottom: 32, display: "inline-flex" }}>Recognition</span>
          <div className="reveal-scale grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-[#234966]" style={{ maxWidth: 900, width: "100%" }}>
            {/* Photo */}
            <div className="relative min-h-[240px] md:min-h-[360px] overflow-hidden">
              <img src={AWARD_IMG} alt="EFP Digital Innovation Award 2025 ceremony" loading="lazy" decoding="async" width={900} height={360} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #1D3449)" }} />
            </div>
            {/* Content */}
            <div className="bg-[#1D3449] p-6 md:p-10 flex flex-col justify-center gap-4">
              <span style={{ display: "inline-block", fontFamily: "Gabarito, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0A171E", background: "#C0E57A", padding: "5px 12px", borderRadius: 100, width: "fit-content" }}>
                3rd Prize · EFP Award 2025
              </span>
              <blockquote style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, fontStyle: "italic", fontWeight: 600, lineHeight: 1.6, color: "#F5F9EA", borderLeft: "3px solid #C0E57A", paddingLeft: 20, margin: 0 }}>
                "Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health."
              </blockquote>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#93A793", margin: 0 }}>
                - European Federation of Periodontology
              </p>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, lineHeight: 1.7, color: "#93A793", margin: 0 }}>
                Selected from 20 submissions across 17 national societies, recognized by an international expert jury including Professors James Deschner, David Herrera, and Andreas Stavropoulos.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 8, borderTop: "1px solid #234966" }}>
                {["EFP", "Haleon", "EuroPerio11"].map((l) => (
                  <span key={l} style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#93A793" }}>{l}</span>
                ))}
              </div>
              <a href="https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/" target="_blank" rel="noopener noreferrer" className="btn-text">
                Read the EFP announcement
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "clamp(64px, 8vw, 120px) 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Mission</span>
              <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 24, marginTop: 16, transitionDelay: "0.08s" }}>
                Close the gap<br />
                <span style={{ color: "#C0E57A" }}>between visits.</span>
              </h2>
              <p className="body-lg reveal" style={{ marginBottom: 20, transitionDelay: "0.16s" }}>
                Periodontal disease affects 1 in 2 adults worldwide, yet most patients don't understand their condition, forget their care instructions within 48 hours, and don't return for follow-up appointments.
              </p>
              <p className="body-lg reveal" style={{ transitionDelay: "0.24s" }}>
                Perioskoup exists to change that. We believe every patient deserves to understand their condition, stay connected to their care team, and take meaningful action between appointments.
              </p>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.08s" }}>
              <div className="bg-[#1D3449] border border-[#234966] rounded-2xl p-6 lg:p-10">
                {[
                  { value: "62%", label: "of adults have periodontitis worldwide", source: "Bernabe et al. 2020, JCP", href: "https://doi.org/10.1111/jcpe.13217" },
                  { value: "40–80%", label: "of care instructions forgotten within 48h", source: "Kessels 2003, J R Soc Med", href: "https://journals.sagepub.com/doi/10.1177/014107680309600504" },
                  { value: "87%", label: "of mHealth studies show improved outcomes", source: "Toniazzo et al. 2019, JCP", href: "https://doi.org/10.1111/jcpe.13064" },
                ].map((stat, i) => (
                  <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 0", borderBottom: i < 2 ? "1px solid #234966" : "none" }}>
                    <span style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: 32, color: "#C0E57A", minWidth: 60 }}>{stat.value}</span>
                    <div>
                      <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#93A793", display: "block" }}>{stat.label}</span>
                      <a href={stat.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 11, color: "#93A793", textDecoration: "none" }}>{stat.source}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dr. Anca Quote */}
      <section style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="reveal" style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <img src={ANCA_IMG} alt="Dr. Anca Laura Constantin" loading="lazy" decoding="async" width={80} height={80} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", objectPosition: "center 25%", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 280 }}>
              <blockquote style={{ borderLeft: "3px solid #C0E57A", paddingLeft: 20, margin: 0 }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 17, fontStyle: "italic", color: "rgba(245,249,234,0.85)", lineHeight: 1.65 }}>
                  "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes."
                </p>
              </blockquote>
              <div style={{ marginTop: 12, paddingLeft: 20 }}>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, fontWeight: 600, color: "#F5F9EA" }}>Dr. Anca Laura Constantin</p>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#C0E57A" }}>CEO & Co-founder, Periodontist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section style={{ padding: "clamp(48px, 6vw, 80px) 0" }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 56px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20 }}>
            Why now?
          </h2>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#93A793", lineHeight: 1.7, marginTop: 8 }}>
            Three things changed at the same time - making the AI dental companion possible for the first time.
          </p>
          <div className="reveal" style={{ transitionDelay: "0.08s" }}>
            <p className="body-lg" style={{ marginBottom: 16 }}>
              Three things changed. AI became capable of personalising recommendations at scale. Smartphones became the primary health interface. And patients began expecting continuous digital support between appointments.
            </p>
            <p className="body-lg">
              Perioskoup exists at the intersection of these shifts - an AI dental companion built for a world where care doesn't end when the appointment does.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#050C10", padding: "clamp(64px, 8vw, 120px) 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>The Team</span>
            <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 5vw, 72px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, transitionDelay: "0.08s" }}>
              Built by clinicians,<br />
              <span style={{ color: "#C0E57A" }}>for clinicians.</span>
            </h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#93A793", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
              The Perioskoup founding team combines clinical periodontology, full-stack engineering, and AI expertise - united by the mission to improve dental outcomes through technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[900px] mx-auto">
            {[
              { img: ANCA_IMG, name: "Dr. Anca Laura Constantin", role: "CEO & Co-founder, Periodontist", creds: "DMD, PhD in Periodontology", bio: "Dr. Anca founded Perioskoup after recognizing that the biggest barrier to treatment success wasn't clinical skill - it was the communication gap between chair and home.", linkedin: "https://www.linkedin.com/in/anca-constantin-99800633b/" },
              { img: EDI_IMG, name: "Eduard Ciugulea", role: "CGO & Co-Founder", creds: "Full-stack engineer & growth strategist", bio: "Eduard brings the technical architecture and growth strategy that transforms Anca's clinical vision into a scalable product built for both patients and clinics.", linkedin: "https://www.linkedin.com/in/eduard-ciugulea/" },
              { img: PETRICA_IMG, name: "Petrica Nancu", role: "CTO & Head of AI", creds: "AI & machine learning specialist", bio: "Petrica leads the AI engine powering Perioskoup's oral health intelligence - transforming raw periodontal data into actionable nudges that keep patients engaged.", linkedin: "https://www.linkedin.com/in/petrica-nancu-b16468241/" },
            ].map((f, i) => (
              <div key={f.name} className="card reveal" style={{ padding: 0, overflow: "hidden", transitionDelay: `${i * 0.08}s` }}>
                <div className="h-48 sm:h-56 lg:h-[280px] overflow-hidden relative">
                  <img src={f.img} alt={f.name} loading="lazy" decoding="async" width={300} height={280} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: f.name.includes("Anca") ? "center 25%" : "top" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #1D3449, transparent)" }} />
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 26, fontWeight: 700, color: "#F5F9EA", marginBottom: 4 }}>{f.name}</h3>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, fontWeight: 600, color: "#C0E57A", marginBottom: 4 }}>{f.role}</p>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: f.name.includes("Anca") ? "#F5F9EA" : "#93A793", fontWeight: f.name.includes("Anca") ? 600 : 400, marginBottom: 12 }}>{f.creds}</p>
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, lineHeight: 1.65, color: "#93A793", marginBottom: 12 }}>{f.bio}</p>
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${f.name} on LinkedIn`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#93A793", textDecoration: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" style={{ color: "#93A793" }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(48px, 6vw, 80px) 0", textAlign: "center" }}>
        <div className="container">
          <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 64px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20 }}>
            Want to be part of the story?
          </h2>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#93A793", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
            Perioskoup is onboarding founding clinics and early patients Join the waitlist for priority access. Join the waitlist for priority access.
          </p>
          <p className="body-lg reveal" style={{ maxWidth: 400, margin: "0 auto 32px", transitionDelay: "0.08s" }}>
            Join the founding waitlist or reach out to the team directly.
          </p>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", transitionDelay: "0.16s" }}>
            <Link href="/waitlist" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }} onClick={() => capture("page_cta_clicked", { cta_text: "Join the Waitlist", page: "about", position: "bottom" })}>
              Join the Waitlist
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
