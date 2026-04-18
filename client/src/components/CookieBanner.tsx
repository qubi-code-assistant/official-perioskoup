import { useState, useEffect } from "react";
import { Link } from "wouter";
import { getCookieConsent, setCookieConsent } from "@/lib/cookies";
import { initAnalytics, capture } from "@/lib/analytics";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setCookieConsent("accepted");
    initAnalytics();
    capture("cookie_consent_accepted");
    setVisible(false);
  }

  function handleDecline() {
    setCookieConsent("declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#1D3449",
        borderTop: "1px solid #234966",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Text */}
      <p
        style={{
          fontFamily: "Gabarito, sans-serif",
          fontSize: 14,
          color: "#93A793",
          lineHeight: 1.6,
          margin: 0,
          flex: "1 1 280px",
        }}
      >
        We use cookies to measure site performance and improve your experience.{" "}
        <Link
          href="/privacy"
          style={{ color: "#C0E57A", textDecoration: "underline" }}
        >
          Privacy Policy
        </Link>
      </p>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
        <button
          type="button"
          onClick={handleDecline}
          style={{
            fontFamily: "Gabarito, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            padding: "9px 20px",
            borderRadius: 100,
            border: "1px solid #234966",
            background: "transparent",
            color: "#93A793",
            cursor: "pointer",
          }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={handleAccept}
          style={{
            fontFamily: "Gabarito, sans-serif",
            fontSize: 14,
            fontWeight: 700,
            padding: "9px 20px",
            borderRadius: 100,
            border: "none",
            background: "#C0E57A",
            color: "#0A171E",
            cursor: "pointer",
          }}
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
