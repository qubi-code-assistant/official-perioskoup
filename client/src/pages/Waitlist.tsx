/**
 * PERIOSKOUP — WAITLIST PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-scale").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Waitlist() {
  useReveal();
  const [role, setRole] = useState<"patient" | "dentist">("dentist");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ background: "#0A171E", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ paddingTop: 140, paddingBottom: 120, position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ maxWidth: 640, position: "relative", zIndex: 2 }}>
          {submitted ? (
            <div className="reveal-scale" style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(192,229,122,0.12)", border: "1px solid rgba(192,229,122,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#C0E57A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", color: "#F5F9EA", marginBottom: 16 }}>You're on the list!</h2>
              <p className="body-lg" style={{ maxWidth: 400, margin: "0 auto 32px" }}>
                We'll reach out as soon as we're ready to onboard {role === "dentist" ? "your clinic" : "you"}. Thank you for believing in what we're building.
              </p>
              <Link href="/" className="btn-ghost">Back to Home</Link>
            </div>
          ) : (
            <>
              <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Join Waitlist" }]} />
              <span className="label-tag reveal" style={{ marginBottom: 20, display: "inline-flex" }}>Early Access</span>
              <h1 className="reveal" style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(56px, 7vw, 88px)", color: "#F5F9EA", lineHeight: 0.95, marginBottom: 20, marginTop: 16, transitionDelay: "0.08s" }}>
                Join the<br />
                <span style={{ color: "#C0E57A" }}>founding waitlist.</span>
              </h1>
              <p className="body-lg reveal" style={{ marginBottom: 48, transitionDelay: "0.16s" }}>
                Be among the first to experience Perioskoup. Patients get free early access. Clinics get founding partner pricing — locked in forever.
              </p>

              {/* Role selector */}
              <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32, transitionDelay: "0.24s" }}>
                {(["dentist", "patient"] as const).map((r) => (
                  <button key={r} onClick={() => setRole(r)} style={{
                    padding: 20, borderRadius: 16, cursor: "pointer", textAlign: "left", transition: "all 0.2s ease",
                    border: role === r ? "1px solid rgba(192,229,122,0.4)" : "1px solid #234966",
                    background: role === r ? "rgba(192,229,122,0.06)" : "#1D3449",
                  }}>
                    <div style={{ fontFamily: "Gabarito, sans-serif", fontWeight: 700, fontSize: 16, color: role === r ? "#C0E57A" : "#F5F9EA", marginBottom: 4 }}>
                      {r === "patient" ? "Patient" : "Dentist / Clinic"}
                    </div>
                    <div style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C" }}>
                      {r === "patient" ? "Free access to the app" : "Founding partner pricing"}
                    </div>
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="reveal" style={{ display: "flex", flexDirection: "column", gap: 14, transitionDelay: "0.32s" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input type="text" placeholder="First name" className="p-input" required />
                  <input type="text" placeholder="Last name" className="p-input" required />
                </div>
                <input type="email" placeholder="Email address" className="p-input" required />
                {role === "dentist" && (
                  <>
                    <input type="text" placeholder="Clinic / Practice name" className="p-input" required />
                    <input type="text" placeholder="City, Country" className="p-input" />
                  </>
                )}
                <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: 8 }}>
                  Join the Waitlist
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  {[
                    { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "No credit card" },
                    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "GDPR compliant" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d={item.icon} stroke="#C0E57A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C" }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </form>

              {/* Social proof */}
              <div className="reveal" style={{ marginTop: 48, padding: 24, background: "#1D3449", border: "1px solid #234966", borderRadius: 16, transitionDelay: "0.4s" }}>
                <div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
                  {[
                    { value: "500+", label: "on the waitlist" },
                    { value: "30+", label: "founding clinics" },
                    { value: "Winner", label: "EFP Award 2025" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "Dongle, sans-serif", fontWeight: 700, fontSize: 28, color: "#C0E57A" }}>{s.value}</div>
                      <div style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
