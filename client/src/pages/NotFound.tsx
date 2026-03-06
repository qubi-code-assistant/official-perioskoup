/**
 * PERIOSKOUP -- 404 NOT FOUND PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";

export default function NotFound() {
  return (
    <div style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Page Not Found | Perioskoup</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <ParallaxHeroBg />

      <section id="main-content" style={{ paddingTop: 180, paddingBottom: 120, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ maxWidth: 560, position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: "clamp(120px, 15vw, 200px)", color: "#C0E57A", lineHeight: 0.9, marginBottom: 16, opacity: 0.2 }}>
            404
          </div>
          <h1 style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 16 }}>
            Page not found.
          </h1>
          <p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 17, color: "#8C9C8C", lineHeight: 1.65, marginBottom: 40 }}>
            Sorry, the page you're looking for doesn't exist. It may have been moved or deleted.
          </p>
          <Link href="/" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
            Back to Home
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
