/**
 * PERIOSKOUP -- PRICING PAGE
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

const PLANS = [
  {
    name: "Patient",
    price: "Free",
    period: "during beta",
    description: "For patients who want to understand and manage their periodontal health.",
    features: ["Full access to your AI dental companion", "Personalized care plan", "Daily habit reminders", "Progress tracking", "24/7 companion support"],
    note: "*During beta you have unlimited access to all features",
    cta: "Join the Waitlist",
    href: "/waitlist",
    highlighted: false,
  },
  {
    name: "Clinic",
    price: "50 limited seats",
    period: "",
    description: "For dental practices that want to improve patient engagement and outcomes.",
    features: ["Dentist dashboard", "Patient engagement visibility", "Custom care plan builder", "Appointment reminders", "Analytics & engagement reports", "Priority support"],
    note: "",
    cta: "Apply as a Founding Clinic",
    href: "/waitlist",
    highlighted: true,
  },
];

export default function Pricing() {
  useReveal();
  const { GEOCapsule } = usePageMeta("/pricing");
  const scrollRef = useScrollDepth("pricing");

  const pricingFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How much does Perioskoup cost?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is currently free for patients during the beta period. Clinic pricing will be announced closer to the public launch. Founding members who join the waitlist receive founding pricing and priority access." } },
      { "@type": "Question", "name": "Is there a free trial for dental practices?", "acceptedAnswer": { "@type": "Answer", "text": "Founding clinics that join during the beta period receive complimentary access. Contact the team through the waitlist for details on the founding clinic programme." } },
      { "@type": "Question", "name": "What is included in the Patient plan?", "acceptedAnswer": { "@type": "Answer", "text": "The Patient plan includes plain-language oral health education, personalised care plans, daily habit reminders, progress tracking, and access to the educational content library." } },
      { "@type": "Question", "name": "What does Beta mean?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup will launch in beta — a fully functional version of the app available to founding members before our public launch. During beta, patients get free unlimited access and clinics lock in founding partner pricing. You may encounter occasional updates as we refine features based on your feedback." } },
    ]
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "applicationCategory": "HealthApplication",
    "name": "Perioskoup",
    "description": "AI-powered dental companion app for personalised periodontal care between appointments.",
    "brand": { "@type": "Organization", "name": "Perioskoup" },
    "offers": [
      { "@type": "Offer", "name": "Patient Plan", "price": "0", "priceCurrency": "EUR", "availability": "https://schema.org/PreOrder", "description": "Free during beta. Includes AI-powered care plans, reminders, progress tracking, and educational content." },
      { "@type": "Offer", "name": "Clinic Plan", "availability": "https://schema.org/PreOrder", "description": "Coming soon. Includes dentist dashboard, patient engagement tracking, analytics, and priority support." }
    ]
  };

  return (
    <div ref={scrollRef} style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Perioskoup Pricing | Free for Patients, Plans for Dental Clinics</title>
        <meta name="description" content="Perioskoup is free for patients during beta. Dental clinic plans launching soon. Join the founding waitlist for priority access and founding pricing." />
        <link rel="canonical" href="https://perioskoup.com/pricing" />
        <meta property="og:title" content="Perioskoup Pricing | Free for Patients, Plans for Dental Clinics" />
        <meta property="og:description" content="Perioskoup is free for patients during beta. Clinic plans launching soon. Join the founding waitlist for priority access and locked-in pricing." />
        <meta property="og:url" content="https://perioskoup.com/pricing" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Perioskoup Pricing | Free for Patients, Plans for Clinics" />
        <meta name="twitter:description" content="Perioskoup is free for patients during beta. Dental clinic plans launching soon. Join 30+ founding clinics on the waitlist for locked-in pricing." />
        <meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
        <link rel="alternate" hrefLang="en" href="https://perioskoup.com/pricing" />
        <link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/pricing" />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {GEOCapsule}
      <Navbar />

      {/* Hero */}
      <section id="main-content" style={{ paddingTop: 140, paddingBottom: 80, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
          <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Pricing</span>
          <h1 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(56px, 7vw, 88px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20, marginTop: 16, transitionDelay: "0.08s" }}>
            Simple, transparent<br />
            <span style={{ color: "#C0E57A" }}>pricing.</span>
          </h1>
          <p className="body-lg reveal" style={{ maxWidth: 480, margin: "0 auto", transitionDelay: "0.16s" }}>
            We're in beta - so right now, Perioskoup is free for patients. Clinic pricing is coming soon.
          </p>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 24, transitionDelay: "0.24s" }}>
            <a href="https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/" target="_blank" rel="noopener noreferrer"
              className="efp-badge-hover"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 6px", background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.3)", borderRadius: 100, textDecoration: "none" }}>
              <span style={{ background: "#C0E57A", color: "#0A171E", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 100, fontFamily: "Gabarito, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>3rd Prize · EFP Award 2025</span>
              <span style={{ color: "#C0E57A", fontSize: 13, fontFamily: "Gabarito, sans-serif", fontWeight: 500 }}>Digital Innovation</span>
            </a>
            <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>30+ founding clinics</span>
          </div>
        </div>
      </section>

      {/* Beta notice + Plans */}
      <section style={{ background: "#050C10", padding: "80px 0" }}>
        <div className="container">
          {/* Beta notice */}
          <div className="reveal-scale" style={{ background: "rgba(192,229,122,0.06)", border: "1px solid rgba(192,229,122,0.2)", borderRadius: 16, padding: "20px 28px", display: "flex", alignItems: "center", gap: 16, maxWidth: 700, margin: "0 auto 48px" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(192,229,122,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontWeight: 700, fontSize: 15, color: "#F5F9EA", marginBottom: 4 }}>We're currently in private beta</p>
              <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C" }}>Founding clinic partners of this AI dental companion get locked-in pricing and direct input on the product roadmap.</p>
            </div>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[800px] mx-auto">
            {PLANS.map((plan, i) => (
              <div key={plan.name} className="card reveal p-6 sm:p-10" style={{ transitionDelay: `${i * 0.08}s`, position: "relative", overflow: "hidden", ...(plan.highlighted ? { border: "1px solid rgba(192,229,122,0.25)" } : {}) }}>
                {plan.highlighted && (
                  <div style={{ position: "absolute", top: 0, right: 0, background: "#C0E57A", color: "#0A171E", fontFamily: "Gabarito, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "6px 16px", borderBottomLeftRadius: 12 }}>
                    Founding Partner
                  </div>
                )}
                <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, fontWeight: 700, color: "#F5F9EA", marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: plan.highlighted ? 28 : 40, color: plan.highlighted ? "#C0E57A" : "#F5F9EA" }}>{plan.price}</span>
                  {plan.period && <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C", marginLeft: 8 }}>{plan.period}</span>}
                </div>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, lineHeight: 1.6, color: "#8C9C8C", marginBottom: 28 }}>{plan.description}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "rgba(245,249,234,0.65)" }}>{feat}</span>
                    </li>
                  ))}
                </ul>
                {plan.note && (
                  <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C", fontStyle: "italic", marginBottom: 20 }}>{plan.note}</p>
                )}
                <Link href={plan.href} className={plan.highlighted ? "btn-primary" : "btn-ghost"} style={{ width: "100%", justifyContent: "center", display: "flex" }} onClick={() => capture("page_cta_clicked", { cta_text: plan.cta, page: "pricing", position: plan.name.toLowerCase() })}>
                  {plan.cta}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "120px 0" }}>
        <div className="container" style={{}}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>FAQ</span>
            <h2 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(40px, 4.5vw, 64px)", color: "#F5F9EA", lineHeight: 0.95, marginTop: 16, transitionDelay: "0.08s" }}>Common questions</h2>
            <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
              Everything you need to know about Perioskoup pricing, the founding partner programme, and what's included in each plan.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { q: "Is it really free for patients?", a: "We believe access to dental health information should not be a barrier. The patient app will always have a plan that is free of charge." },
              { q: "When will clinic pricing be available?", a: "We're onboarding founding clinic partners now. If you're a dental practice, join the waitlist and we'll reach out with details before public launch." },
              { q: 'What does "founding partner" mean?', a: "A founding partner is a clinic that joins us in the early stage before launch, gets discounted locked-in pricing, and has access to new features, and direct input on the product roadmap. There are 50 limited spots available." },
              { q: "Is patient data secure?", a: "Yes. Perioskoup is GDPR-compliant, uses end-to-end encryption, and all data is stored on EU servers." },
              { q: 'What does "Beta" mean?', a: "Perioskoup will launch in beta — a fully functional version of the app available to founding members before our public launch. During beta, patients get free unlimited access and clinics lock in founding partner pricing. You may encounter occasional updates as we refine features based on your feedback." },
            ].map((item, i, arr) => (
              <div key={item.q} className="reveal" style={{ padding: "24px 0", borderBottom: i < arr.length - 1 ? "1px solid #234966" : "none", transitionDelay: `${i * 0.06}s` }}>
                <h3 style={{ fontFamily: "Dongle, sans-serif", fontSize: 24, fontWeight: 700, color: "#F5F9EA", marginBottom: 10 }}>{item.q}</h3>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, lineHeight: 1.7, color: "#8C9C8C" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
