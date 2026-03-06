/* =============================================================
   PERIOSKOUP — FOR DENTISTS PAGE
   Titanium Pro: ROI-focused, B2B messaging
   ============================================================= */
import { useEffect } from 'react';
import { Link } from 'wouter';
import { TrendingUp, Clock, Users, DollarSign, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const stats = [
  { value: '85%', label: 'Treatment acceptance rate', sub: 'vs. industry avg of 40%' },
  { value: '40%', label: 'Reduction in no-shows', sub: 'through daily engagement' },
  { value: '3×', label: 'Patient lifetime value', sub: 'with consistent compliance' },
  { value: '15min', label: 'Saved per appointment', sub: 'on re-education time' },
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Increase Treatment Acceptance',
    desc: '3D heatmaps help patients visualize their periodontal risk. When patients see their "red zones" on their own phone, they ask: "How do we fix this?" — not "Do I really need this?"',
  },
  {
    icon: Clock,
    title: 'Reclaim Clinical Time',
    desc: 'Automated patient education handles the basics before the patient sits down. Your team focuses on complex care and relationship-building — not repeating flossing instructions for the fifth time.',
  },
  {
    icon: Users,
    title: 'Reduce No-Shows',
    desc: 'AI-powered reminders and daily habit nudges keep patients engaged between visits. Engaged patients don\'t forget appointments — they look forward to showing their progress.',
  },
  {
    icon: DollarSign,
    title: 'Grow Practice Revenue',
    desc: 'Higher acceptance rates, fewer cancellations, and improved patient retention compound into significant revenue growth. Perioskoup pays for itself within the first month.',
  },
];

export default function ForDentists() {
  useReveal();

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[700px] h-[700px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(192,229,122,0.06) 0%, transparent 60%)' }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
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
                Built by a periodontist, for periodontists
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
              Your practice.<br />
              <span style={{ color: '#C0E57A' }}>Amplified.</span>
            </h1>
            <p
              className="reveal-up text-xl max-w-2xl"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
            >
              Perioskoup is the B2B SaaS platform that turns your clinical expertise into a 24/7 patient engagement engine. Your patients pay nothing. You get everything.
            </p>
            <div className="reveal-up flex flex-wrap gap-4 mt-8" style={{ transitionDelay: '300ms' }}>
              <Link href="/waitlist">
                <button className="perio-btn-primary text-base px-8 py-4">
                  Join Founding Clinics <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/pricing">
                <button className="perio-btn-ghost text-base px-8 py-4">
                  View Pricing
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ backgroundColor: '#050C10' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="reveal-up text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="font-display mb-2"
                  style={{
                    fontFamily: 'Dongle, sans-serif',
                    fontSize: 'clamp(48px, 6vw, 72px)',
                    color: '#C0E57A',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-xs"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="perio-section-gap">
        <div className="container">
          <div className="text-center mb-16">
            <p className="perio-label reveal-up mb-4">Why Perioskoup</p>
            <h2
              className="reveal-up text-5xl md:text-6xl font-bold"
              style={{ fontFamily: 'Gabarito, sans-serif', color: '#F5F9EA', transitionDelay: '100ms' }}
            >
              The ROI is{' '}
              <span style={{ color: '#C0E57A' }}>undeniable.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="reveal-up perio-card p-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(192,229,122,0.12)' }}
                >
                  <b.icon size={22} className="text-[#C0E57A]" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {b.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business model callout */}
      <section className="pb-40">
        <div className="container">
          <div
            className="reveal-up perio-card p-12 max-w-3xl mx-auto text-center"
            style={{ background: 'linear-gradient(135deg, rgba(192,229,122,0.06) 0%, #1D3449 100%)' }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
            >
              Simple business model.
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
            >
              Dentists pay a monthly subscription. Patients use Perioskoup for free. Your investment in better patient outcomes pays for itself — and then some.
            </p>
            <div className="flex flex-col gap-3 mb-8 text-left max-w-sm mx-auto">
              {[
                'Unlimited patient accounts',
                'Full AI companion access',
                'Practice dashboard & analytics',
                'Priority support',
                'Free onboarding & training',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#C0E57A] shrink-0" />
                  <span
                    className="text-base"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/waitlist">
              <button className="perio-btn-primary text-base px-8 py-4">
                Get Early Access <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
