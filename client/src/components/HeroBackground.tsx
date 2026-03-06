/**
 * HeroBackground — Reusable animated hero background component
 * 
 * Brand: #0A171E (dark navy), #1D3449 (mid navy), #C0E57A (lime), #8C9C8C (sage)
 * Each variant provides a unique subtle animated background for secondary pages.
 * Designed to be discrete, well-integrated, and non-distracting.
 */

import { type CSSProperties } from "react";

type Variant =
  | "orbs"        // Floating lime/teal orbs — For Dentists, Features
  | "grid"        // Subtle grid with scan line — Pricing
  | "rings"       // Concentric rings pulse — About
  | "particles"   // Rising particles — Waitlist, Contact
  | "wave"        // Horizontal wave — Privacy, Terms
  ;

interface HeroBackgroundProps {
  variant: Variant;
  /** Extra CSS class on the wrapper */
  className?: string;
  /** Override wrapper style */
  style?: CSSProperties;
}

export default function HeroBackground({ variant, className = "", style }: HeroBackgroundProps) {
  return (
    <div
      className={`hero-bg-wrapper ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    >
      {variant === "orbs" && <OrbsVariant />}
      {variant === "grid" && <GridVariant />}
      {variant === "rings" && <RingsVariant />}
      {variant === "particles" && <ParticlesVariant />}
      {variant === "wave" && <WaveVariant />}

      {/* Bottom fade to dark */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to bottom, transparent, #0A171E)",
          zIndex: 2,
        }}
      />
    </div>
  );
}

/* ── Variant: Floating Orbs ── */
function OrbsVariant() {
  return (
    <>
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
    </>
  );
}

/* ── Variant: Grid with scan line ── */
function GridVariant() {
  return (
    <>
      <div className="hero-grid" />
      <div className="hero-scan-line" />
      <div className="hero-orb hero-orb-1" style={{ opacity: 0.15, width: 500, height: 500 }} />
    </>
  );
}

/* ── Variant: Concentric rings ── */
function RingsVariant() {
  return (
    <>
      <div className="hero-ring hero-ring-1" />
      <div className="hero-ring hero-ring-2" />
    </>
  );
}

/* ── Variant: Rising particles ── */
function ParticlesVariant() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{
            left: `${8 + (i * 7.5) % 85}%`,
            animationDelay: `${(i * 0.7) % 5}s`,
            animationDuration: `${4 + (i % 3) * 2}s`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
          }}
        />
      ))}
      <div className="hero-orb hero-orb-2" style={{ opacity: 0.1 }} />
    </>
  );
}

/* ── Variant: Horizontal wave ── */
function WaveVariant() {
  return (
    <>
      <svg
        className="hero-wave-svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: "30%",
          left: 0,
          width: "200%",
          height: 200,
          opacity: 0.08,
        }}
      >
        <path
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L0,320Z"
          fill="#C0E57A"
        />
      </svg>
      <svg
        className="hero-wave-svg hero-wave-svg-2"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: "20%",
          left: 0,
          width: "200%",
          height: 160,
          opacity: 0.05,
        }}
      >
        <path
          d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,245.3C672,256,768,224,864,202.7C960,181,1056,171,1152,186.7C1248,203,1344,245,1392,266.7L1440,288L1440,320L0,320Z"
          fill="#C0E57A"
        />
      </svg>
      <div className="hero-orb hero-orb-3" style={{ opacity: 0.08 }} />
    </>
  );
}
