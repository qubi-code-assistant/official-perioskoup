/* =============================================================
   PERIOSKOUP — HOME PAGE
   Titanium Pro: Apple Maximalist Dark
   Sections: Hero, Comparison, Bento, Authority, Workflow, Blog, CTA
   ============================================================= */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  ChevronDown, Star, CheckCircle2, XCircle, Bell, BarChart3,
  Scan, Sparkles, Smartphone, ArrowRight, Shield, Lock, Globe,
  ArrowUpRight, Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const APP_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/app_start_d3a7804e.png';
const ANCA_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/anca_797894db.jpeg';
const EDI_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/edi_a29f7a9f.jpeg';
const PETRICA_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/petrica_3bdf1c06.png';

// ─── Scroll Reveal Hook ───────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);
}

// ─── Counter Hook ─────────────────────────────────────────────
function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const e = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(e * target) + '+';
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return ref;
}

// ─── Waitlist Form ────────────────────────────────────────────
function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'rgba(192,229,122,0.15)' }}>
          <CheckCircle2 size={32} className="text-[#C0E57A]" />
        </div>
        <h3 className="text-2xl font-bold text-[#F5F9EA] mb-2" style={{ fontFamily: 'Gabarito, sans-serif' }}>
          You're on the list!
        </h3>
        <p className="text-[#8C9C8C]" style={{ fontFamily: 'Gabarito, sans-serif' }}>
          We'll reach out when founding access opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {!compact && (
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="perio-input"
        />
      )}
      <input
        type="email"
        placeholder="Your email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="perio-input"
        required
      />
      {!compact && (
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
      )}
      <button type="submit" className="perio-btn-primary justify-center text-base py-4">
        Join the Waitlist <ArrowRight size={16} />
      </button>
      <p className="text-center text-xs text-[#8C9C8C]" style={{ fontFamily: 'Gabarito, sans-serif' }}>
        <Lock size={11} className="inline mr-1" />
        Encrypted. No spam. Unsubscribe anytime.{' '}
        <Link href="/privacy" className="underline hover:text-[#C0E57A]">Privacy policy</Link>
      </p>
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Home() {
  useReveal();
  const counterRef = useCountUp(30);

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ backgroundColor: '#0A171E' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 20%, rgba(192,229,122,0.08) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 80%, rgba(29,52,73,0.6) 0%, transparent 60%)',
          }}
        />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[calc(100vh-80px)]">
            {/* Left: Text */}
            <div className="flex flex-col justify-center py-16 lg:py-0">
              {/* Badge */}
              <div className="reveal-up inline-flex items-center gap-2 mb-8 w-fit">
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

              {/* Headline */}
              <div className="reveal-up" style={{ transitionDelay: '100ms' }}>
                <h1
                  className="font-display leading-none mb-6"
                  style={{
                    fontFamily: 'Dongle, sans-serif',
                    fontSize: 'clamp(96px, 12vw, 160px)',
                    letterSpacing: '-0.04em',
                    color: '#F5F9EA',
                    lineHeight: 0.9,
                  }}
                >
                  Precision<br />
                  <span style={{ color: '#C0E57A' }}>Perio.</span>
                </h1>
              </div>

              {/* Quote */}
              <div className="reveal-up perio-quote-border mb-8" style={{ transitionDelay: '200ms' }}>
                <blockquote
                  className="text-base italic leading-relaxed mb-2"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes."
                </blockquote>
                <cite
                  className="text-sm font-medium not-italic"
                  style={{ color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
                >
                  — Dr. Anca Constantin
                </cite>
              </div>

              {/* CTA */}
              <div className="reveal-up flex flex-col sm:flex-row items-start gap-4" style={{ transitionDelay: '300ms' }}>
                <Link href="/waitlist">
                  <button className="perio-btn-primary text-base px-8 py-4">
                    Join the Waitlist <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/features">
                  <button className="perio-btn-ghost text-base px-8 py-4">
                    Explore Features
                  </button>
                </Link>
              </div>
              <p
                className="reveal-up mt-3 text-sm"
                style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '400ms' }}
              >
                Free for early adopters
              </p>
            </div>

            {/* Right: Phone mockup */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div
                className="reveal-right relative"
                style={{
                  transitionDelay: '200ms',
                  transform: 'rotate(-6deg)',
                  filter: 'drop-shadow(0 40px 80px rgba(5,12,16,0.8)) drop-shadow(0 0 40px rgba(192,229,122,0.08))',
                }}
              >
                <img
                  src={APP_IMG}
                  alt="Perioskoup App"
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg object-contain"
                  style={{ borderRadius: '48px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
          >
            Scroll
          </span>
          <ChevronDown size={18} className="text-[#C0E57A] bounce-slow" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: COMPARISON
          ═══════════════════════════════════════════════════════ */}
      <section className="perio-section-gap relative" style={{ backgroundColor: '#0A171E' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="perio-label reveal-up mb-4">The New Standard</p>
            <h2
              className="reveal-up text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Gabarito, sans-serif', color: '#F5F9EA', transitionDelay: '100ms' }}
            >
              A Tale of Two Clinics
            </h2>
            <p
              className="reveal-up text-lg max-w-2xl mx-auto"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
            >
              Discover how AI-driven insights transform the daily chaos of periodontal care into a streamlined, patient-centric workflow.
            </p>
          </div>

          {/* Comparison grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Headers */}
            <div
              className="reveal-left perio-card p-6 text-center"
              style={{ opacity: 0.7, transitionDelay: '100ms' }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
              >
                The Standard
              </span>
            </div>
            <div
              className="reveal-right perio-card p-6 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(192,229,122,0.08) 0%, rgba(29,52,73,1) 50%)',
                transitionDelay: '100ms',
              }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
              >
                With Perioskoup
              </span>
            </div>

            {/* Rows */}
            {[
              {
                bad: { title: 'Monday Morning Chaos', desc: 'Patient forgets floss instructions given last week. Hygienist spends 15 minutes re-explaining basics, putting the schedule behind.' },
                good: { title: 'Monday Morning Clarity', desc: 'Patient receives AI nudge based on pocket depth on Sunday. Arrives prepped with questions about their progress trends.' },
              },
              {
                bad: { title: 'Charting Fatigue', desc: 'Manual charting errors slow down intake. Assistant struggles to hear measurements over suction noise.' },
                good: { title: 'Voice-Activated Flow', desc: '"3-2-3." Voice-activated charting auto-syncs to the visual dashboard instantly. Zero friction, zero errors.' },
              },
              {
                bad: { title: 'Treatment Stalls', desc: 'Treatment acceptance stalls at 40%. Patients don\'t "feel" the urgency of 5mm pockets because they can\'t see the risk.' },
                good: { title: 'Visual Conversion', desc: '3D Heatmaps boost acceptance to 85%. Patients see the "red zones" on their own phone and ask: "How do we fix this?"' },
              },
              {
                bad: { title: 'Clinician Burnout', desc: 'Exhaustion from repetitive explanations. The team feels like they are selling dentistry rather than treating health.' },
                good: { title: 'Automated Education', desc: 'Automated education handles the basics before the patient sits down. The team focuses on complex care and relationships.' },
              },
            ].map((row, i) => (
              <div key={`row-${i}`} className="contents">
                <div
                  className="reveal-left perio-card p-6"
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <XCircle size={20} className="text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                      >
                        {row.bad.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: '#6B7B6B', fontFamily: 'Gabarito, sans-serif' }}
                      >
                        {row.bad.desc}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="reveal-right perio-card p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(192,229,122,0.05) 0%, #1D3449 60%)',
                    transitionDelay: `${(i + 1) * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#C0E57A] mt-0.5 shrink-0" />
                    <div>
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                      >
                        {row.good.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                      >
                        {row.good.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 reveal-up">
            <Link href="/features">
              <button className="perio-btn-primary text-base px-8 py-4">
                See the Dashboard <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: BENTO FEATURES
          ═══════════════════════════════════════════════════════ */}
      <section className="perio-section-gap" style={{ backgroundColor: '#0A171E' }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="perio-label reveal-up mb-4">Platform</p>
            <h2
              className="reveal-up text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Gabarito, sans-serif', color: '#F5F9EA', transitionDelay: '100ms' }}
            >
              Built for the{' '}
              <span style={{ color: '#C0E57A' }}>modern clinic.</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {/* AI Companion — 2 cols × 2 rows */}
            <div
              className="reveal-up md:col-span-2 md:row-span-2 perio-card p-8 flex flex-col justify-between min-h-[420px]"
              style={{ transitionDelay: '100ms' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(192,229,122,0.15)' }}
                  >
                    <Sparkles size={16} className="text-[#C0E57A]" />
                  </div>
                  <span className="perio-label">AI Companion</span>
                </div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  Analyze. Predict. Prevent.
                </h3>
                <p className="text-sm mb-6" style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}>
                  Real-time clinical intelligence at your fingertips.
                </p>
              </div>

              {/* Mock chat */}
              <div className="flex flex-col gap-3">
                <div
                  className="flex gap-3 items-start"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(192,229,122,0.2)' }}
                  >
                    <Sparkles size={12} className="text-[#C0E57A]" />
                  </div>
                  <div
                    className="perio-card-inner p-3 text-sm flex-1"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    Based on yesterday's scan, I've detected a{' '}
                    <strong className="text-[#C0E57A]">12% reduction</strong> in pocket depth for Patient #402. Inflammation markers are trending down.
                  </div>
                </div>
                <div className="flex gap-3 items-start justify-end">
                  <div
                    className="perio-card-inner p-3 text-sm"
                    style={{
                      color: '#F5F9EA',
                      fontFamily: 'Gabarito, sans-serif',
                      backgroundColor: 'rgba(192,229,122,0.08)',
                      border: '1px solid rgba(192,229,122,0.15)',
                    }}
                  >
                    Generate a comparison chart for their next visit.
                  </div>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: '#1D3449' }}
                  >
                    <span className="text-xs font-bold text-[#C0E57A]">Dr</span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(192,229,122,0.2)' }}
                  >
                    <Sparkles size={12} className="text-[#C0E57A]" />
                  </div>
                  <div
                    className="perio-card-inner p-3"
                    style={{ backgroundColor: 'rgba(29,52,73,0.8)' }}
                  >
                    <div className="flex gap-1.5">
                      <div className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#C0E57A' }} />
                      <div className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#C0E57A' }} />
                      <div className="typing-dot w-2 h-2 rounded-full" style={{ backgroundColor: '#C0E57A' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Habit Tracking */}
            <div
              className="reveal-up perio-card p-6 flex flex-col justify-between min-h-[200px]"
              style={{ transitionDelay: '200ms' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(192,229,122,0.15)' }}
                  >
                    <BarChart3 size={16} className="text-[#C0E57A]" />
                  </div>
                  <span className="perio-label">Habit Tracking</span>
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  Gamified engagement.
                </h3>
              </div>
              {/* Bar chart */}
              <div className="flex flex-col gap-2 mt-4">
                {[
                  { label: 'Floss', pct: 45, color: '#8C9C8C' },
                  { label: 'Brush', pct: 82, color: '#C0E57A' },
                  { label: 'Rinse', pct: 60, color: '#8C9C8C' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span
                      className="text-xs w-10 shrink-0"
                      style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {item.label}
                    </span>
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                    <span
                      className="text-xs w-8 text-right"
                      style={{ color: item.color, fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Reminders */}
            <div
              className="reveal-up perio-card p-6 flex flex-col justify-between min-h-[200px]"
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(192,229,122,0.15)' }}
                >
                  <Bell size={16} className="text-[#C0E57A]" />
                </div>
                <span className="perio-label">Smart Reminders</span>
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
              >
                Timely nudges.
              </h3>
              {/* Mock notification */}
              <div
                className="perio-card-inner p-4 flex items-start gap-3"
              >
                <div className="relative">
                  <Bell size={22} className="text-[#C0E57A]" />
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                    style={{ backgroundColor: '#C0E57A', color: '#0A171E' }}
                  >
                    2
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm font-medium mb-0.5"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    Time to floss!
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    Your evening routine builds consistency.
                  </p>
                </div>
              </div>
            </div>

            {/* Dentist Dashboard — 2 cols */}
            <div
              className="reveal-up md:col-span-2 perio-card p-6 flex flex-col min-h-[180px]"
              style={{ transitionDelay: '400ms' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(192,229,122,0.15)' }}
                  >
                    <Zap size={16} className="text-[#C0E57A]" />
                  </div>
                  <span className="perio-label">Dentist Dashboard</span>
                </div>
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 'rgba(192,229,122,0.12)',
                    color: '#C0E57A',
                    fontFamily: 'Gabarito, sans-serif',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C0E57A] pulse-live" />
                  LIVE DATA
                </div>
              </div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
              >
                Clinical Oversight.
              </h3>
              {/* SVG line chart */}
              <div className="flex-1 relative h-24">
                <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C0E57A" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C0E57A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,60 C40,55 80,45 120,40 C160,35 200,50 240,35 C280,20 320,25 360,15 L400,10 L400,80 L0,80 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M0,60 C40,55 80,45 120,40 C160,35 200,50 240,35 C280,20 320,25 360,15 L400,10"
                    fill="none"
                    stroke="#C0E57A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {([[0,60],[120,40],[240,35],[360,15],[400,10]] as [number,number][]).map(([x,y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#C0E57A" />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: AUTHORITY & PROOF
          ═══════════════════════════════════════════════════════ */}
      <section
        className="perio-section-gap relative"
        style={{ backgroundColor: '#050C10' }}
      >
        {/* Lime ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(192,229,122,0.07) 0%, transparent 70%)',
          }}
        />
        <div className="container relative z-10">
          {/* EFP Badge */}
          <div className="text-center mb-20">
            <div className="reveal-up inline-flex flex-col items-center gap-4 mb-12">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(192,229,122,0.1)',
                  border: '2px solid rgba(192,229,122,0.25)',
                }}
              >
                <Shield size={36} className="text-[#C0E57A]" />
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
              >
                Recognized by the European Federation of Periodontology
              </p>
            </div>

            {/* Counter */}
            <div className="reveal-up mb-4" style={{ transitionDelay: '100ms' }}>
              <span
                ref={counterRef as React.RefObject<HTMLSpanElement>}
                className="font-display"
                style={{
                  fontFamily: 'Dongle, sans-serif',
                  fontSize: 'clamp(80px, 12vw, 140px)',
                  color: '#C0E57A',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                0+
              </span>
              <p
                className="text-2xl font-bold mt-2"
                style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
              >
                Clinics
              </p>
            </div>
            <p
              className="reveal-up text-lg max-w-xl mx-auto mb-8"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
            >
              Already transforming patient engagement across Europe's top periodontal practices.
            </p>

            {/* Founding waitlist badge */}
            <div
              className="reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'rgba(192,229,122,0.08)',
                border: '1px solid rgba(192,229,122,0.2)',
                transitionDelay: '300ms',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C0E57A] pulse-live" />
              <span
                className="text-sm font-medium"
                style={{ color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
              >
                Founding Waitlist Open
              </span>
            </div>
          </div>

          {/* Founders */}
          <div className="mb-20">
            <p className="perio-label text-center reveal-up mb-12">The Team</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  img: ANCA_IMG,
                  name: 'Dr. Anca Laura Constantin',
                  role: 'Periodontist & CEO',
                  creds: 'DMD, PhD in Periodontology',
                  quote: '"We built Perioskoup to bridge the gap between clinical precision and patient psychology."',
                  delay: '100ms',
                },
                {
                  img: EDI_IMG,
                  name: 'Eduard Ciugulea',
                  role: 'CGO & Technical Co-Founder',
                  creds: 'Full-stack engineer & growth strategist',
                  quote: '"Technology should make dentistry feel effortless for both the clinician and the patient."',
                  delay: '200ms',
                },
                {
                  img: PETRICA_IMG,
                  name: 'Petrica Nancu',
                  role: 'CTO & Head of AI',
                  creds: 'AI & machine learning specialist',
                  quote: '"The future of healthcare is predictive, personalized, and always in your pocket."',
                  delay: '300ms',
                },
              ].map((founder) => (
                <div
                  key={founder.name}
                  className="reveal-up flex flex-col items-center text-center"
                  style={{ transitionDelay: founder.delay }}
                >
                  <div
                    className="w-32 h-32 rounded-full mb-5 overflow-hidden"
                    style={{
                      border: '3px solid #C0E57A',
                      boxShadow: '0 0 24px rgba(192,229,122,0.2)',
                    }}
                  >
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <h4
                    className="text-lg font-bold mb-1"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.name}
                  </h4>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.role}
                  </p>
                  <p
                    className="text-xs mb-4"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.creds}
                  </p>
                  <p
                    className="text-sm italic"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-8 reveal-up">
            {[
              { icon: Shield, label: 'GDPR Ready' },
              { icon: Lock, label: 'End-to-End Encrypted' },
              { icon: Globe, label: 'Privacy-First' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} className="text-[#C0E57A]" />
                <span
                  className="text-sm font-medium"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: WORKFLOW
          ═══════════════════════════════════════════════════════ */}
      <section className="perio-section-gap" style={{ backgroundColor: '#0A171E' }}>
        <div className="container">
          <div className="text-center mb-20">
            <p className="perio-label reveal-up mb-4">Seamless Integration</p>
            <h2
              className="reveal-up text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Gabarito, sans-serif', color: '#F5F9EA', transitionDelay: '100ms' }}
            >
              From Chair{' '}
              <span style={{ color: '#C0E57A' }}>to Chat.</span>
            </h2>
            <p
              className="reveal-up text-lg max-w-2xl mx-auto"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
            >
              The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps.
            </p>
          </div>

          {/* Steps */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px"
              style={{ backgroundColor: 'rgba(192,229,122,0.2)' }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  icon: Scan,
                  title: 'Scan',
                  desc: 'Sync intraoral data instantly from your existing scanner.',
                  delay: '100ms',
                  offset: false,
                },
                {
                  num: '02',
                  icon: Sparkles,
                  title: 'Analyze',
                  desc: 'AI maps risk zones & translates perio charts into habits.',
                  delay: '200ms',
                  offset: true,
                },
                {
                  num: '03',
                  icon: Smartphone,
                  title: 'Engage',
                  desc: 'Patients receive actionable nudges on their device.',
                  delay: '300ms',
                  offset: false,
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className={`reveal-up flex flex-col items-center text-center ${step.offset ? 'md:mt-12' : ''}`}
                  style={{ transitionDelay: step.delay }}
                >
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center mb-6 relative"
                    style={{
                      backgroundColor: '#1D3449',
                      border: '2px solid rgba(192,229,122,0.25)',
                      boxShadow: '0 0 40px rgba(192,229,122,0.08)',
                    }}
                  >
                    <step.icon size={40} className="text-[#C0E57A]" />
                    <span
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: '#C0E57A', color: '#0A171E', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16 reveal-up">
            <Link href="/features">
              <button className="perio-btn-ghost text-base px-8 py-4">
                Explore Integration <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: KNOWLEDGE HUB
          ═══════════════════════════════════════════════════════ */}
      <section className="perio-section-gap" style={{ backgroundColor: '#0A171E' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="perio-label reveal-up mb-4">Knowledge Hub</p>
              <h2
                className="reveal-up text-5xl md:text-6xl font-bold"
                style={{ fontFamily: 'Gabarito, sans-serif', color: '#F5F9EA', transitionDelay: '100ms' }}
              >
                Clinical{' '}
                <span style={{ color: '#8C9C8C' }}>Intelligence.</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="reveal-up flex items-center gap-2 text-sm font-medium hover:text-[#C0E57A] transition-colors"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
            >
              View all articles <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: 'Clinical',
                title: 'Why AI Is Changing Dental Patient Engagement',
                excerpt: 'Artificial intelligence is reshaping how dental practices connect with patients between visits.',
                read: '5 min read',
                delay: '100ms',
              },
              {
                category: 'Product',
                title: 'How Perioskoup Helps Reduce No-Shows by 40%',
                excerpt: 'Missed appointments cost dental practices thousands each year. Learn how daily patient engagement is transforming attendance.',
                read: '3 min read',
                delay: '200ms',
              },
              {
                category: 'Industry',
                title: 'The Hidden Cost of Poor Patient Habits in Periodontal Care',
                excerpt: 'Poor daily oral care habits between dental visits carry enormous hidden costs. Learn the real impact.',
                read: '4 min read',
                delay: '300ms',
              },
            ].map((card) => (
              <Link key={card.title} href="/blog">
                <div
                  className="reveal-up perio-card p-6 flex flex-col justify-between min-h-[280px] group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    transitionDelay: card.delay,
                    boxShadow: '0 0 0 rgba(192,229,122,0)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(192,229,122,0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,229,122,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 rgba(192,229,122,0)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                      style={{
                        backgroundColor: 'rgba(192,229,122,0.12)',
                        color: '#C0E57A',
                        fontFamily: 'Gabarito, sans-serif',
                      }}
                    >
                      {card.category}
                    </span>
                    <h3
                      className="text-lg font-bold mb-3 leading-snug group-hover:text-[#C0E57A] transition-colors"
                      style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {card.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <span
                      className="text-xs"
                      style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {card.read}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-[#8C9C8C] group-hover:text-[#C0E57A] transition-colors"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: FINAL CTA / WAITLIST
          ═══════════════════════════════════════════════════════ */}
      <section
        className="perio-section-gap relative overflow-hidden lime-ambient-top"
        style={{ backgroundColor: '#050C10' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(192,229,122,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <p className="perio-label reveal-up mb-6">Membership</p>
            <h2
              className="reveal-up font-display mb-6"
              style={{
                fontFamily: 'Dongle, sans-serif',
                fontSize: 'clamp(56px, 8vw, 96px)',
                letterSpacing: '-0.04em',
                color: '#F5F9EA',
                lineHeight: 1,
                transitionDelay: '100ms',
              }}
            >
              Titanium access<br />
              <span style={{ color: '#C0E57A' }}>closing soon</span>
            </h2>
            <p
              className="reveal-up text-lg mb-12"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
            >
              Join the inner circle. Be the first to experience the future of periodontal care intelligence.
            </p>
            <div className="reveal-up" style={{ transitionDelay: '300ms' }}>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
