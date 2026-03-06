/**
 * PERIOSKOUP -- PRIVACY POLICY PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";

const SECTIONS = [
  { title: "1. Introduction", content: 'Perioskoup ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect information about you when you use our application and website. We comply with the General Data Protection Regulation (GDPR) and applicable Romanian and EU data protection laws.' },
  { title: "2. Data We Collect", content: "We collect information you provide directly (name, email, role), health-related data you enter into the app (periodontal records, care plan responses), usage data (app interactions, feature usage), and device information (operating system, app version). We do not sell your data to third parties." },
  { title: "3. How We Use Your Data", content: "We use your data to provide and improve the Perioskoup service, personalize your care plan and reminders, enable communication between patients and clinicians, send service-related notifications, and comply with legal obligations. We process health data only with your explicit consent." },
  { title: "4. Data Storage & Security", content: "All data is stored on servers located within the European Union. We use industry-standard encryption (TLS in transit, AES-256 at rest) and access controls. Health data is stored separately from account data and is accessible only to you and your authorized clinician." },
  { title: "5. Your Rights", content: "Under GDPR, you have the right to access, rectify, erase, restrict, or port your personal data. You may withdraw consent at any time. To exercise your rights, contact us at privacy@perioskoup.com. We will respond within 30 days." },
  { title: "6. Cookies", content: "We use essential cookies for authentication and session management, and analytics cookies (with your consent) to understand how the app is used. You can manage cookie preferences at any time through your browser settings." },
  { title: "7. Contact", content: "For privacy-related enquiries, contact our Data Protection Officer at: privacy@perioskoup.com. Perioskoup SRL, Bucharest, Romania." },
];

export default function Privacy() {
  return (
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <Helmet>
        <title>Privacy Policy | Perioskoup Data Protection</title>
        <meta name="description" content="How Perioskoup collects, stores, and protects your health data in line with GDPR and EU data protection law." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://perioskoup.com/privacy" />
        <meta property="og:title" content="Privacy Policy | Perioskoup" />
        <meta property="og:description" content="How Perioskoup collects, stores, and protects your health data in line with GDPR and EU data protection law." />
        <meta property="og:url" content="https://perioskoup.com/privacy" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Privacy Policy | Perioskoup" />
        <meta name="twitter:description" content="How Perioskoup collects, stores, and protects your health data in line with GDPR and EU data protection law." />
      </Helmet>
      <Navbar />

      <section id="main-content" style={{ paddingTop: 140, paddingBottom: 100, position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
          <span className="label-tag" style={{ marginBottom: 16, display: "inline-flex" }}>Legal</span>
          <h1 style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 0.95, color: "#F5F9EA", marginBottom: 12, marginTop: 16 }}>Privacy Policy</h1>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 14, color: "#8C9C8C", marginBottom: 48 }}>Last updated: March 2026</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {SECTIONS.map((section) => (
              <div key={section.title} style={{ borderTop: "1px solid #234966", paddingTop: 32 }}>
                <h2 style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: 24, color: "#F5F9EA", marginBottom: 12 }}>{section.title}</h2>
                <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 15, lineHeight: 1.75, color: "#8C9C8C" }}>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
