/* =============================================================
   PERIOSKOUP — PRICING PAGE
   Titanium Pro: Blurred cards with "We're in Beta" overlay
   ============================================================= */
import { useEffect } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, ArrowRight, Lock } from 'lucide-react';
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

const plans = [
  {
    name: 'Starter',
    price: '€149',
    period: '/month',
    desc: 'Perfect for solo practitioners getting started with AI-driven patient engagement.',
    features: ['Up to 50 active patients', 'AI Companion', 'Habit Tracking', 'Smart Reminders', 'Email support'],
    cta: 'Join Waitlist',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '€349',
    period: '/month',
    desc: 'The complete platform for growing periodontal practices.',
    features: ['Unlimited patients', 'All Starter features', 'Dentist Dashboard', 'Voice charting', 'Priority support', 'Onboarding session'],
    cta: 'Join Founding Clinics',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For multi-location practices and dental groups.',
    features: ['Everything in Professional', 'Multi-location management', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  useReveal();

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20">
        <div className="container text-center">
          <p className="perio-label reveal-up mb-4">Pricing</p>
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
            Simple.<br />
            <span style={{ color: '#C0E57A' }}>Transparent.</span>
          </h1>
          <p
            className="reveal-up text-xl max-w-xl mx-auto"
            style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
          >
            Dentists pay monthly. Patients use Perioskoup for free. Always.
          </p>
        </div>
      </section>

      {/* Pricing cards with blur overlay */}
      <section className="perio-section-gap">
        <div className="container">
          <div className="relative">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' }}>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="perio-card p-8 flex flex-col"
                  style={plan.highlighted ? {
                    background: 'linear-gradient(135deg, rgba(192,229,122,0.08) 0%, #1D3449 60%)',
                    border: '1px solid rgba(192,229,122,0.3)',
                  } : {}}
                >
                  {plan.highlighted && (
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit"
                      style={{ backgroundColor: 'rgba(192,229,122,0.15)', color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      Most Popular
                    </div>
                  )}
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span
                      className="font-display"
                      style={{
                        fontFamily: 'Dongle, sans-serif',
                        fontSize: '56px',
                        color: plan.highlighted ? '#C0E57A' : '#F5F9EA',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-6"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {plan.desc}
                  </p>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#C0E57A] shrink-0" />
                        <span
                          className="text-sm"
                          style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={plan.highlighted ? 'perio-btn-primary justify-center' : 'perio-btn-ghost justify-center'}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Beta overlay */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ zIndex: 10 }}
            >
              <div
                className="perio-card p-10 text-center max-w-md mx-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(10,23,30,0.97) 0%, rgba(29,52,73,0.97) 100%)',
                  border: '1px solid rgba(192,229,122,0.3)',
                  boxShadow: '0 0 60px rgba(192,229,122,0.1)',
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{
                    backgroundColor: 'rgba(192,229,122,0.12)',
                    border: '1px solid rgba(192,229,122,0.25)',
                    color: '#C0E57A',
                    fontFamily: 'Gabarito, sans-serif',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#C0E57A] pulse-live" />
                  We're in Beta
                </div>
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  Founding clinic pricing is locked in
                </h2>
                <p
                  className="text-base mb-8"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  Join the founding waitlist now and lock in your rate before public pricing launches. Early adopters get the best deal — forever.
                </p>
                <Link href="/waitlist">
                  <button className="perio-btn-primary text-base px-8 py-4 w-full justify-center">
                    Join Founding Clinics <ArrowRight size={16} />
                  </button>
                </Link>
                <p
                  className="mt-4 text-xs"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  <Lock size={11} className="inline mr-1" />
                  No credit card required during beta
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
