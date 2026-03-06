/* =============================================================
   PERIOSKOUP — WAITLIST PAGE
   Titanium Pro: Dedicated conversion page
   ============================================================= */
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, Star, Shield, Lock, ArrowRight, ChevronDown } from 'lucide-react';
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

export default function Waitlist() {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', role: '', practice: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      <section className="pt-40 pb-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(192,229,122,0.08) 0%, transparent 70%)' }}
        />
        <div className="container relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <div className="reveal-up inline-flex items-center gap-2 mb-8">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(192,229,122,0.12)',
                  border: '1px solid rgba(192,229,122,0.25)',
                  color: '#C0E57A',
                  fontFamily: 'Gabarito, sans-serif',
                }}
              >
                <Star size={13} fill="#C0E57A" />
                EFP Innovation Award 2025
              </div>
            </div>

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
              Join the<br />
              <span style={{ color: '#C0E57A' }}>inner circle.</span>
            </h1>
            <p
              className="reveal-up text-xl mb-12"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
            >
              Be among the first practices to experience the future of periodontal care intelligence. Founding members lock in the best rate — forever.
            </p>

            {/* Benefits */}
            <div className="reveal-up flex flex-col gap-3 mb-12 text-left" style={{ transitionDelay: '300ms' }}>
              {[
                'Founding member pricing — locked in for life',
                'Priority access to all new features',
                'Direct line to the founding team',
                'Free onboarding and training session',
                'Shape the product roadmap',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C0E57A] shrink-0" />
                  <span
                    className="text-base"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="reveal-up" style={{ transitionDelay: '400ms' }}>
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
                    You're on the list!
                  </h3>
                  <p
                    className="text-base mb-6"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    Welcome to the inner circle. We'll be in touch soon with your founding access details.
                  </p>
                  <Link href="/">
                    <button className="perio-btn-ghost">
                      Back to Home
                    </button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="perio-card p-8 flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="perio-input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Professional email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="perio-input"
                    required
                  />
                  <div className="relative">
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="perio-select"
                    >
                      <option value="">Select your role</option>
                      <option value="dentist">Dentist / Periodontist</option>
                      <option value="patient">Patient</option>
                      <option value="manager">Clinic Manager</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8C9C8C] pointer-events-none" />
                  </div>
                  <input
                    type="text"
                    placeholder="Practice or clinic name (optional)"
                    value={form.practice}
                    onChange={(e) => setForm({ ...form, practice: e.target.value })}
                    className="perio-input"
                  />
                  <button type="submit" className="perio-btn-primary justify-center text-base py-4">
                    Secure My Founding Access <ArrowRight size={16} />
                  </button>
                  <p
                    className="text-center text-xs"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    <Lock size={11} className="inline mr-1" />
                    Encrypted. No spam. Unsubscribe anytime.{' '}
                    <Link href="/privacy" className="underline hover:text-[#C0E57A]">Privacy policy</Link>
                  </p>
                </form>
              )}
            </div>

            {/* Trust */}
            <div className="reveal-up flex justify-center gap-6 mt-8">
              {[
                { icon: Shield, label: 'GDPR Ready' },
                { icon: Lock, label: 'Encrypted' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} className="text-[#C0E57A]" />
                  <span
                    className="text-xs"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
