/**
 * PhoneMockup — Coded iPhone 15 Pro frame with Perioskoup "Select your role" screen
 * Animation: Logo image uses .img-load/.loaded for fade-in on load.
 */

import { useState, useEffect } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/Logomark-dark_ca2bbedd.png";

export default function PhoneMockup() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 340,
        maxWidth: "100%",
        filter:
          "drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 0 60px rgba(192,229,122,0.1))",
      }}
    >
      {/* iPhone outer frame */}
      <div
        style={{
          position: "relative",
          borderRadius: 50,
          border: "3px solid rgba(100,120,140,0.35)",
          background: "linear-gradient(180deg, #2A2A2E 0%, #1A1A1E 100%)",
          padding: 10,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        {/* Screen area */}
        <div
          style={{
            borderRadius: 40,
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(180deg, #1D3A50 0%, #152D40 40%, #0C1E2C 100%)",
            aspectRatio: "390 / 844",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Status bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 26px 0",
              position: "relative",
              zIndex: 10,
              flexShrink: 0,
              height: 52,
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#F5F9EA",
                letterSpacing: "-0.02em",
                width: 50,
              }}
            >
              {time}
            </span>

            {/* Dynamic Island */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 28,
                background: "#000",
                borderRadius: 16,
                zIndex: 20,
              }}
            />

            {/* Right icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="9" width="3" height="3" rx="0.5" fill="#F5F9EA" />
                <rect x="4" y="6" width="3" height="6" rx="0.5" fill="#F5F9EA" />
                <rect x="8" y="3" width="3" height="9" rx="0.5" fill="#F5F9EA" />
                <rect x="12" y="0" width="3" height="12" rx="0.5" fill="#F5F9EA" />
              </svg>
              <svg width="14" height="11" viewBox="0 0 24 18" fill="none">
                <path d="M1 5C5.5 0.5 18.5 0.5 23 5" stroke="#F5F9EA" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 9.5C8.5 6 15.5 6 19 9.5" stroke="#F5F9EA" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 14C10.5 12.5 13.5 12.5 15 14" stroke="#F5F9EA" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="1.5" fill="#F5F9EA" />
              </svg>
              <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                <div
                  style={{
                    width: 24,
                    height: 11,
                    border: "1.5px solid rgba(245,249,234,0.5)",
                    borderRadius: 3,
                    padding: 1.5,
                  }}
                >
                  <div style={{ width: "78%", height: "100%", background: "#C0E57A", borderRadius: 1.5 }} />
                </div>
                <div style={{ width: 2, height: 5, background: "rgba(245,249,234,0.5)", borderRadius: "0 1px 1px 0" }} />
              </div>
            </div>
          </div>

          {/* App content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 28px",
              marginTop: -8,
            }}
          >
            {/* Logo — fades in once loaded */}
            <img
              src={LOGO_URL}
              alt="Perioskoup logo"
              className="img-load"
              onLoad={(e) => e.currentTarget.classList.add("loaded")}
              style={{
                width: 108,
                height: 108,
                borderRadius: "50%",
                marginBottom: 18,
                objectFit: "cover",
              }}
            />

            <div
              style={{
                fontFamily: "Dongle, sans-serif",
                fontSize: 38,
                fontWeight: 700,
                color: "#C0E57A",
                lineHeight: 1.05,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              Your Personal
            </div>
            <div
              style={{
                fontFamily: "Dongle, sans-serif",
                fontSize: 38,
                fontWeight: 700,
                color: "#C0E57A",
                lineHeight: 1.05,
                marginBottom: 36,
                textAlign: "center",
              }}
            >
              Dental Companion
            </div>

            <div
              style={{
                fontFamily: "Gabarito, sans-serif",
                fontSize: 13,
                color: "rgba(140,156,140,0.7)",
                marginBottom: 22,
                letterSpacing: "0.02em",
              }}
            >
              Select your role
            </div>

            {/* Patient button */}
            <div
              style={{
                width: "82%",
                background: "rgba(192,229,122,0.12)",
                border: "1px solid rgba(192,229,122,0.25)",
                borderRadius: 14,
                padding: "15px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#C0E57A" strokeWidth="1.8" />
                <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#C0E57A" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, fontWeight: 600, color: "#C0E57A" }}>
                Patient
              </span>
            </div>

            {/* Dentist button */}
            <div
              style={{
                width: "82%",
                background: "rgba(192,229,122,0.12)",
                border: "1px solid rgba(192,229,122,0.25)",
                borderRadius: 14,
                padding: "15px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#C0E57A" strokeWidth="1.8" />
                <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="#C0E57A" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M17 11h4M19 9v4" stroke="#C0E57A" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, fontWeight: 600, color: "#C0E57A" }}>
                Dentist
              </span>
            </div>
          </div>

          {/* Home indicator */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              paddingBottom: 10,
              paddingTop: 16,
            }}
          >
            <div style={{ width: 130, height: 5, background: "rgba(245,249,234,0.25)", borderRadius: 3 }} />
          </div>
        </div>
      </div>

      {/* Side button (power) */}
      <div style={{ position: "absolute", right: -5, top: 140, width: 3, height: 60, background: "linear-gradient(180deg, #3A3A3E, #2A2A2E)", borderRadius: "0 2px 2px 0" }} />

      {/* Volume buttons */}
      <div style={{ position: "absolute", left: -5, top: 118, width: 3, height: 28, background: "linear-gradient(180deg, #3A3A3E, #2A2A2E)", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -5, top: 158, width: 3, height: 52, background: "linear-gradient(180deg, #3A3A3E, #2A2A2E)", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -5, top: 220, width: 3, height: 52, background: "linear-gradient(180deg, #3A3A3E, #2A2A2E)", borderRadius: "2px 0 0 2px" }} />
    </div>
  );
}
