/* =============================================================
   PERIOSKOUP — FEATURES PAGE
   Titanium Pro: Deep-dive feature showcase
   ============================================================= */
import { useEffect } from 'react';
import { Link } from 'wouter';
import { Sparkles, BarChart3, Bell, Zap, Scan, Shield, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const APP_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/app_start_d3a7804e.png';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const features = [
  {
    icon: Sparkles,
    title: 'AI Companion',
    subtitle: 'Analyze. Predict. Prevent.',
    desc: 'Our AI engine processes clinical data from your existing scanners and translates complex periodontal measurements into clear, actionable patient guidance. No diagnostic claims — pure engagement intelligence.',
    bullets: [
      'Real-time pocket depth trend analysis',
      'Inflammation marker tracking',
      'Automated patient progress summaries',
      'Natural language clinical reports',
    ],
  },
  {
    icon: BarChart3,
    title: 'Habit Tracking',
    subtitle: 'Gamified engagement.',
    desc: 'Transform daily oral care into a habit loop. Patients track brushing, flossing, and rinsing with visual progress bars and streak rewards — making compliance feel like an achievement, not a chore.',
    bullets: [
      'Daily habit logging with streaks',
      'Visual progress dashboards',
      'Gamification and milestone rewards',
      'Weekly compliance reports for clinicians',
    ],
  },
  {
    icon: Zap,
    title: 'Dentist Dashboard',
    subtitle: 'Clinical Oversight.',
    desc: 'A unified command center for your practice. Monitor patient compliance, review AI-generated summaries, and prepare for appointments with full context — all before the patient sits in the chair.',
    bullets: [
      'Patient compliance heatmaps',
      'Appointment preparation briefs',
      'Multi-patient practice overview',
      'Exportable clinical summaries',
    ],
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    subtitle: 'Timely nudges.',
    desc: 'AI-powered reminders adapt to each patient\'s routine and compliance patterns. Nudges are sent at the right moment — not random push notifications, but clinically-informed prompts.',
    bullets: [
      'Personalized reminder timing',
      'Habit-based nudge frequency',
      'Appointment reminder sequences',
      'Opt-in patient communication',
    ],
  },
  {
    icon: Scan,
    title: 'Scanner Integration',
    subtitle: 'Seamless data sync.',
    desc: 'Perioskoup connects with your existing intraoral scanners and practice management software. No rip-and-replace — just a powerful layer of intelligence on top of your current workflow.',
    bullets: [
      'Compatible with major scanner brands',
      'Automatic data sync on scan completion',
      'Voice-activated charting support',
      'Zero manual data entry required',
    ],
  },
  {
    icon: Shield,
    title: 'Privacy & Compliance',
    subtitle: 'GDPR-ready by design.',
    desc: 'Patient data is end-to-end encrypted and processed in compliance with GDPR and EU healthcare data regulations. Privacy is not a feature — it\'s the foundation.',
    bullets: [
      'End-to-end encryption',
      'GDPR Article 9 compliant',
      'Patient data portability',
      'Right to erasure built-in',
    ],
  },
];

export default function Features() {
  useReveal();

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(192,229,122,0.07) 0%, transparent 60%)' }}
        />
        <div className="container relative z-10">
          <p className="perio-label reveal-up mb-4">Platform</p>
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
            Every feature<br />
            <span style={{ color: '#C0E57A' }}>earns its place.</span>
          </h1>
          <p
            className="reveal-up text-xl max-w-2xl"
            style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
          >
            Perioskoup is built with surgical precision. No bloat, no fluff — just the tools that move the needle on patient engagement and clinical efficiency.
          </p>
        </div>
      </section>

      {/* App preview */}
      <section className="pb-20">
        <div className="container">
          <div className="reveal-up flex justify-center">
            <img
              src={APP_IMG}
              alt="Perioskoup App"
              className="w-64 md:w-80"
              style={{
                borderRadius: '40px',
                filter: 'drop-shadow(0 40px 80px rgba(5,12,16,0.8)) drop-shadow(0 0 40px rgba(192,229,122,0.1))',
              }}
            />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="perio-section-gap">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="reveal-up perio-card p-8 flex flex-col"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(192,229,122,0.12)' }}
                >
                  <f.icon size={22} className="text-[#C0E57A]" />
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {f.subtitle}
                </p>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {f.desc}
                </p>
                <ul className="flex flex-col gap-2 mt-auto">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[#C0E57A] mt-0.5 shrink-0" />
                      <span
                        className="text-sm"
                        style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-40">
        <div className="container text-center">
          <div className="reveal-up perio-card p-12 max-w-2xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(192,229,122,0.06) 0%, #1D3449 100%)' }}>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
            >
              Ready to transform your practice?
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
            >
              Join founding clinics and shape the future of periodontal care.
            </p>
            <Link href="/waitlist">
              <button className="perio-btn-primary text-base px-8 py-4">
                Join the Waitlist <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
