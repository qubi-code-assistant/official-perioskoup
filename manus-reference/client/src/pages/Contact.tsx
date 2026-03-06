/* =============================================================
   PERIOSKOUP — CONTACT PAGE
   Titanium Pro: Clean contact form
   ============================================================= */
import { useEffect, useState } from 'react';
import { CheckCircle2, Mail, MapPin, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container">
          <p className="perio-label reveal-up mb-4">Contact</p>
          <h1
            className="reveal-up font-display mb-6"
            style={{
              fontFamily: 'Dongle, sans-serif',
              fontSize: 'clamp(72px, 10vw, 120px)',
              letterSpacing: '-0.04em',
              color: '#F5F9EA',
              lineHeight: 0.95,
              transitionDelay: '100ms',
            }}
          >
            Let's<br />
            <span style={{ color: '#C0E57A' }}>talk.</span>
          </h1>
        </div>
      </section>

      <section className="perio-section-gap">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Left: info */}
            <div>
              <div className="reveal-up mb-12">
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  We'd love to hear from you.
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  Whether you're a periodontist curious about joining our founding clinics, a patient with questions, or a journalist covering dental tech — we're here.
                </p>
              </div>
              <div className="reveal-up flex flex-col gap-6">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@perioskoup.com' },
                  { icon: MapPin, label: 'Based in', value: 'Europe — Romania & UK' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(192,229,122,0.12)' }}
                    >
                      <Icon size={18} className="text-[#C0E57A]" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-medium mb-0.5"
                        style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-base"
                        style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal-up">
              {submitted ? (
                <div className="perio-card p-10 text-center">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: 'rgba(192,229,122,0.15)' }}
                  >
                    <CheckCircle2 size={32} className="text-[#C0E57A]" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    Message sent!
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="perio-card p-8 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="perio-input"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="perio-input"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="perio-input"
                    style={{ borderRadius: '16px' }}
                  />
                  <textarea
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="perio-input resize-none"
                    style={{ borderRadius: '16px' }}
                    required
                  />
                  <button type="submit" className="perio-btn-primary justify-center text-base py-4">
                    Send Message <ArrowRight size={16} />
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
