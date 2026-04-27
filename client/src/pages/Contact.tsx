/**
 * PERIOSKOUP -- CONTACT PAGE
 * Colors: #0A171E bg, #1D3449 surface, #C0E57A lime, #F5F9EA text, #8C9C8C muted
 * Fonts: Dongle (display) + Gabarito (body/UI)
 */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHeroBg from "@/components/ParallaxHeroBg";
import HeroGlow from "@/components/HeroGlow";
import Breadcrumb from "@/components/Breadcrumb";
import { useReveal } from "@/hooks/useReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { capture } from "@/lib/analytics";
import { useFormTracking } from "@/hooks/useFormTracking";
import { useScrollDepth } from "@/hooks/useScrollDepth";

export default function Contact() {
  useReveal();
  const { GEOCapsule, meta } = usePageMeta("/contact");
  const { onFieldFocus, markSubmitted } = useFormTracking("contact", "contact");
  const scrollRef = useScrollDepth("contact");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): Record<string, string> {
    const errs: Record<string, string> = {};
    const firstName = (
      form.elements.namedItem("contact-first-name") as HTMLInputElement
    )?.value.trim();
    const email = (
      form.elements.namedItem("contact-email") as HTMLInputElement
    )?.value.trim();
    const role = (form.elements.namedItem("contact-role") as HTMLSelectElement)
      ?.value;
    const message = (
      form.elements.namedItem("contact-message") as HTMLTextAreaElement
    )?.value.trim();
    const lastName = (
      form.elements.namedItem("contact-last-name") as HTMLInputElement
    )?.value.trim();
    if (!firstName) errs["contact-first-name"] = "First name is required.";
    if (!lastName) errs["contact-last-name"] = "Last name is required.";
    if (!email) errs["contact-email"] = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs["contact-email"] = "Please enter a valid email address.";
    if (!role) errs["contact-role"] = "Please select your role.";
    if (!message) errs["contact-message"] = "Message is required.";
    else if (message.length < 10) errs["contact-message"] = "Message must be at least 10 characters.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    setSubmitError(null);
    if (Object.keys(errs).length > 0) return;

    const role = (form.elements.namedItem("contact-role") as HTMLSelectElement)
      ?.value;
    const payload = {
      first_name: (
        form.elements.namedItem("contact-first-name") as HTMLInputElement
      ).value.trim(),
      last_name: (
        form.elements.namedItem("contact-last-name") as HTMLInputElement
      ).value.trim(),
      email: (
        form.elements.namedItem("contact-email") as HTMLInputElement
      ).value.trim(),
      user_type: role,
      message: (
        form.elements.namedItem("contact-message") as HTMLTextAreaElement
      ).value.trim(),
    };

    setLoading(true);
    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("Server error");
      markSubmitted();
      capture("contact_message_sent", { role: payload.user_type });
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      if (err instanceof DOMException && err.name === "TimeoutError") {
        setSubmitError("Request timed out. Please check your connection and try again.");
      } else if (err instanceof TypeError) {
        setSubmitError("Unable to reach the server. Please check your connection.");
      } else {
        setSubmitError("Something went wrong. Please try again or email us at support@perioskoup.com.");
      }
    } finally {
      setLoading(false);
    }
  }

  const contactFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I contact Perioskoup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Perioskoup via email at hello@perioskoup.com for general enquiries or support@perioskoup.com for clinic partnerships and support. You can also use the contact form on this page. We respond within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "When does Perioskoup launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Perioskoup is launching soon. Founding clinics and early patients on the waitlist receive priority access.",
        },
      },
      {
        "@type": "Question",
        name: "Is Perioskoup available in my country?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Perioskoup is based in Buzău, Romania and is initially launching across Europe. The platform is designed for dental clinics and patients in the EU, UK, and beyond. Contact us for availability in your region.",
        },
      },
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://perioskoup.com/#organization",
    name: "Perioskoup",
    legalName: "Perioskoup SRL",
    description:
      "AI-powered dental companion app for personalised periodontal care between appointments.",
    url: "https://perioskoup.com",
    email: "support@perioskoup.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Victoriei nr. 20, etaj 2",
      addressLocality: "Buzău",
      addressRegion: "Județul Buzău",
      postalCode: "120209",
      addressCountry: "RO",
    },
    foundingDate: "2025-06",
    founders: [
      { "@id": "https://perioskoup.com/#anca-constantin" },
      {
        "@type": "Person",
        name: "Eduard Ciugulea",
        jobTitle: "Co-founder & CGO",
      },
      {
        "@type": "Person",
        name: "Petrica Nancu",
        jobTitle: "CTO & Head of AI",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/perioskoup-ai",
      "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/",
    ],
  };

  return (
    <div ref={scrollRef} style={{ background: "#0A171E", minHeight: "100svh" }}>
      <Helmet>
        <title>Contact Perioskoup | Dental AI Enquiries</title>
        <meta
          name="description"
          content="Reach the Perioskoup team for press, clinic partnerships, investor enquiries, or product questions. We respond within 24 hours."
        />
        <link rel="canonical" href="https://perioskoup.com/contact" />
        <meta
          property="og:title"
          content="Contact Perioskoup | Dental AI Enquiries"
        />
        <meta
          property="og:description"
          content="Get in touch with the Perioskoup team for press, clinic partnerships, or general enquiries. Based in Buzău, Romania, serving clinics across Europe."
        />
        <meta property="og:url" content="https://perioskoup.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Contact Perioskoup" />
        <meta
          name="twitter:description"
          content="Reach the Perioskoup team for press, clinic partnerships, investor enquiries, or product questions. We respond within 24 hours."
        />
        <meta
          property="og:image"
          content={meta?.ogImage}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={meta?.ogImage}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://perioskoup.com/contact"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://perioskoup.com/contact"
        />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqJsonLd) }}
      />
      {GEOCapsule}
      <Navbar />

      {/* Hero */}
      <section
        id="main-content"
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ParallaxHeroBg />
        <HeroGlow />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          <span
            className="label-tag reveal"
            style={{ marginBottom: 20, display: "inline-flex" }}
          >
            Contact
          </span>
          <h1
            className="reveal"
            style={{
              fontFamily: "Dongle, sans-serif",
              fontSize: "clamp(56px, 7vw, 88px)",
              color: "#F5F9EA",
              lineHeight: 0.95,
              marginBottom: 20,
              marginTop: 16,
              transitionDelay: "0.08s",
            }}
          >
            Let's talk
            <br />
            <span style={{ color: "#C0E57A" }}>dental health.</span>
          </h1>
          <p
            className="body-lg reveal"
            style={{ maxWidth: 480, transitionDelay: "0.16s" }}
          >
            Whether you're a patient, a dentist, an investor, or just curious -
            we'd love to hear from you.
          </p>
          <p
            className="reveal"
            style={{
              fontFamily: "Gabarito, sans-serif",
              fontSize: 14,
              color: "#8C9C8C",
              marginTop: 12,
              transitionDelay: "0.24s",
            }}
          >
            Perioskoup is the AI dental companion bridging clinic and home.
          </p>
        </div>
      </section>

      {/* Content */}
      <section id="contact-form" style={{ background: "#050C10", padding: "80px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px] items-start">
            {/* Left: info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {[
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  label: "Email",
                  value: "support@perioskoup.com",
                  sub: "We reply within 24 hours.",
                },
                {
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                  label: "Location",
                  value: "Str. Victoriei nr. 20, etaj 2, Buzău",
                  sub: "Județul Buzău, România · 120209",
                },
              ].map(item => (
                <div
                  key={item.label}
                  className="reveal"
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "rgba(192,229,122,0.08)",
                      border: "1px solid rgba(192,229,122,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d={item.icon}
                        stroke="#C0E57A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "Gabarito, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "#8C9C8C",
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "Gabarito, sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#F5F9EA",
                        marginBottom: 2,
                      }}
                    >
                      {item.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "Gabarito, sans-serif",
                        fontSize: 13,
                        color: "#8C9C8C",
                      }}
                    >
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: form */}
            <div className="card reveal" style={{ padding: 40 }}>
              {sent ? (
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  style={{ textAlign: "center", padding: "40px 0" }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "rgba(192,229,122,0.12)",
                      border: "1px solid rgba(192,229,122,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#C0E57A"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2
                    style={{
                      fontFamily: "Dongle, sans-serif",
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#F5F9EA",
                      marginBottom: 8,
                    }}
                  >
                    Message sent!
                  </h2>
                  <p
                    style={{
                      fontFamily: "Gabarito, sans-serif",
                      fontSize: 15,
                      color: "#8C9C8C",
                    }}
                  >
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <h2
                    style={{
                      fontFamily: "Dongle, sans-serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#F5F9EA",
                      marginBottom: 8,
                    }}
                  >
                    Send a message
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="contact-first-name"
                        style={{
                          fontFamily: "Gabarito, sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#8C9C8C",
                          letterSpacing: "0.04em",
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        First name
                      </label>
                      <input
                        id="contact-first-name"
                        type="text"
                        placeholder="John"
                        autoComplete="given-name"
                        className="p-input"
                        required
                        onFocus={onFieldFocus}
                        aria-required="true"
                        aria-invalid={!!errors["contact-first-name"]}
                        aria-describedby={
                          errors["contact-first-name"]
                            ? "contact-first-name-error"
                            : undefined
                        }
                      />
                      {errors["contact-first-name"] && (
                        <span
                          id="contact-first-name-error"
                          role="alert"
                          style={{
                            fontFamily: "Gabarito, sans-serif",
                            fontSize: 12,
                            color: "#F87171",
                            marginTop: 4,
                            display: "block",
                          }}
                        >
                          {errors["contact-first-name"]}
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-last-name"
                        style={{
                          fontFamily: "Gabarito, sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#8C9C8C",
                          letterSpacing: "0.04em",
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        Last name
                      </label>
                      <input
                        id="contact-last-name"
                        type="text"
                        placeholder="Doe"
                        autoComplete="family-name"
                        className="p-input"
                        required
                        aria-required="true"
                        aria-invalid={!!errors["contact-last-name"]}
                        aria-describedby={errors["contact-last-name"] ? "contact-last-name-error" : undefined}
                      />
                      {errors["contact-last-name"] && (
                        <span id="contact-last-name-error" role="alert" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#F87171", marginTop: 4, display: "block" }}>
                          {errors["contact-last-name"]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        fontFamily: "Gabarito, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#8C9C8C",
                        letterSpacing: "0.04em",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="p-input"
                      required
                      aria-required="true"
                      aria-invalid={!!errors["contact-email"]}
                      aria-describedby={
                        errors["contact-email"]
                          ? "contact-email-error"
                          : undefined
                      }
                    />
                    {errors["contact-email"] && (
                      <span
                        id="contact-email-error"
                        role="alert"
                        style={{
                          fontFamily: "Gabarito, sans-serif",
                          fontSize: 12,
                          color: "#F87171",
                          marginTop: 4,
                          display: "block",
                        }}
                      >
                        {errors["contact-email"]}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-role"
                      style={{
                        fontFamily: "Gabarito, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#8C9C8C",
                        letterSpacing: "0.04em",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      I am a...
                    </label>
                    <select
                      id="contact-role"
                      className="p-select"
                      required
                      aria-required="true"
                      aria-invalid={!!errors["contact-role"]}
                      aria-describedby={
                        errors["contact-role"]
                          ? "contact-role-error"
                          : undefined
                      }
                    >
                      <option value="">Select your role</option>
                      <option value="patient">Patient</option>
                      <option value="dentist">Dentist / Periodontist</option>
                      <option value="clinic">Clinic Owner</option>
                      <option value="investor">Investor</option>
                      <option value="press">Press / Media</option>
                      <option value="other">Other</option>
                    </select>
                    {errors["contact-role"] && (
                      <span
                        id="contact-role-error"
                        role="alert"
                        style={{
                          fontFamily: "Gabarito, sans-serif",
                          fontSize: 12,
                          color: "#F87171",
                          marginTop: 4,
                          display: "block",
                        }}
                      >
                        {errors["contact-role"]}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        fontFamily: "Gabarito, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#8C9C8C",
                        letterSpacing: "0.04em",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Tell us what's on your mind..."
                      className="p-input"
                      rows={4}
                      required
                      aria-required="true"
                      aria-invalid={!!errors["contact-message"]}
                      aria-describedby={
                        errors["contact-message"]
                          ? "contact-message-error"
                          : undefined
                      }
                      style={{ resize: "vertical" }}
                    />
                    {errors["contact-message"] && (
                      <span
                        id="contact-message-error"
                        role="alert"
                        style={{
                          fontFamily: "Gabarito, sans-serif",
                          fontSize: 12,
                          color: "#F87171",
                          marginTop: 4,
                          display: "block",
                        }}
                      >
                        {errors["contact-message"]}
                      </span>
                    )}
                  </div>
                  {submitError && (
                    <p
                      role="alert"
                      style={{
                        fontFamily: "Gabarito, sans-serif",
                        fontSize: 14,
                        color: "#F87171",
                        textAlign: "center",
                      }}
                    >
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      justifyContent: "center",
                      opacity: loading ? 0.6 : 1,
                    }}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h14M12 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
