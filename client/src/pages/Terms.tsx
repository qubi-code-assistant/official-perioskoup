/**
 * PERIOSKOUP -- TERMS OF SERVICE PAGE
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
  { title: "1. Acceptance of Terms", content: "By accessing or using Perioskoup, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform." },
  { title: "2. Description of Service", content: "Perioskoup is a patient engagement and habit tracking companion for dental practices. It is not a medical device and does not provide diagnoses, treatment recommendations, or medical advice. All clinical decisions remain the sole responsibility of qualified dental professionals." },
  { title: "3. SaMD Disclaimer", content: "Perioskoup is a wellness and engagement companion, not a Software as a Medical Device (SaMD). It does not analyze, interpret, or act upon clinical data for diagnostic or therapeutic purposes. Any clinical data displayed is for informational and educational purposes only." },
  { title: "4. User Responsibilities", content: "Dentist users are responsible for ensuring appropriate use of the platform within their practice and for maintaining patient confidentiality in accordance with applicable healthcare regulations. Patient users are responsible for the accuracy of information they provide." },
  { title: "5. Intellectual Property", content: "All content, features, and functionality of Perioskoup are owned by Perioskoup SRL and are protected by international copyright, trademark, and other intellectual property laws." },
  { title: "6. Limitation of Liability", content: "Perioskoup SRL shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim." },
  { title: "7. Governing Law", content: "These Terms are governed by the laws of the European Union and the jurisdiction of Romania. Any disputes shall be resolved in the courts of Romania." },
  { title: "8. Contact", content: "For questions about these Terms, contact us at legal@perioskoup.com." },
];

export default function Terms() {
  return (
    <div style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Terms of Service | Perioskoup</title>
        <meta name="description" content="Terms governing the use of the Perioskoup dental companion application, including wellness disclaimer and data responsibilities." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://perioskoup.com/terms" />
        <meta property="og:title" content="Terms of Service | Perioskoup" />
        <meta property="og:description" content="Terms governing the use of the Perioskoup dental companion application." />
        <meta property="og:url" content="https://perioskoup.com/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Terms of Service | Perioskoup" />
        <meta name="twitter:description" content="Terms governing the use of the Perioskoup dental companion application, including wellness disclaimer and data responsibilities." />
      </Helmet>
      <Navbar />

      <section id="main-content" style={{ paddingTop: 140, paddingBottom: 100, position: "relative", overflow: "hidden" }}>
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
          <span className="label-tag" style={{ marginBottom: 16, display: "inline-flex" }}>Legal</span>
          <h1 style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 0.95, color: "#F5F9EA", marginBottom: 12, marginTop: 16 }}>Terms of Service</h1>
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
