/* =============================================================
   PERIOSKOUP — ABOUT PAGE
   Titanium Pro: Team + company story
   ============================================================= */
import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ANCA_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/anca_797894db.jpeg';
const EDI_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/edi_a29f7a9f.jpeg';
const PETRICA_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/petrica_3bdf1c06.png';

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

const founders = [
  {
    img: ANCA_IMG,
    name: 'Dr. Anca Laura Constantin',
    role: 'Periodontist & CEO',
    creds: 'DMD, PhD in Periodontology',
    bio: 'Dr. Anca Constantin is a practicing periodontist with a PhD in Periodontology. She founded Perioskoup after recognizing that the biggest barrier to treatment success wasn\'t clinical skill — it was the communication gap between chair and home. Her vision: a world where every patient understands their periodontal health as clearly as their dentist does.',
    delay: '100ms',
  },
  {
    img: EDI_IMG,
    name: 'Eduard Ciugulea',
    role: 'CGO & Technical Co-Founder',
    creds: 'Full-stack engineer & growth strategist',
    bio: 'Eduard brings the technical architecture and growth strategy that transforms Anca\'s clinical vision into a scalable product. With experience building B2B SaaS platforms, he ensures Perioskoup is not just clinically sound — but commercially unstoppable.',
    delay: '200ms',
  },
  {
    img: PETRICA_IMG,
    name: 'Petrica Nancu',
    role: 'CTO & Head of AI',
    creds: 'AI & machine learning specialist',
    bio: 'Petrica leads the AI engine that powers Perioskoup\'s clinical intelligence. His work in machine learning and predictive modeling transforms raw periodontal data into the actionable nudges that keep patients engaged and compliant between visits.',
    delay: '300ms',
  },
];

export default function About() {
  useReveal();

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(192,229,122,0.06) 0%, transparent 60%)' }}
        />
        <div className="container relative z-10 max-w-3xl">
          <p className="perio-label reveal-up mb-4">Our Story</p>
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
            Born in the<br />
            <span style={{ color: '#C0E57A' }}>clinic.</span>
          </h1>
          <p
            className="reveal-up text-xl"
            style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
          >
            Perioskoup didn't start in a boardroom. It started in a dental chair, where a periodontist watched a patient nod politely — and then forget everything she'd just explained.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="pb-20">
        <div className="container max-w-3xl">
          <div className="reveal-up perio-card p-10 mb-8">
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
            >
              Dr. Anca Constantin had been practicing periodontology for years when she noticed a pattern: patients left appointments with the best intentions and the worst follow-through. Not because they didn't care — but because complex clinical information doesn't survive the commute home.
            </p>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
            >
              She partnered with Eduard and Petrica to build what she wished existed: a companion that translates the clinical language of periodontics into the daily habits of real people. Not a diagnostic tool. Not a replacement for clinical judgment. A bridge.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
            >
              In 2025, Perioskoup was recognized by the European Federation of Periodontology with the Digital Innovation Award — validating what the team had built from first principles: technology that serves the clinician-patient relationship, not replaces it.
            </p>
          </div>

          {/* EFP recognition */}
          <div
            className="reveal-up flex items-center gap-4 p-6 rounded-2xl"
            style={{
              backgroundColor: 'rgba(192,229,122,0.06)',
              border: '1px solid rgba(192,229,122,0.2)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(192,229,122,0.12)' }}
            >
              <Shield size={22} className="text-[#C0E57A]" />
            </div>
            <div>
              <p
                className="text-sm font-semibold mb-1"
                style={{ color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
              >
                EFP Digital Innovation Award 2025
              </p>
              <p
                className="text-sm"
                style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
              >
                Recognized by the European Federation of Periodontology for advancing patient engagement in periodontal care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="perio-section-gap" style={{ backgroundColor: '#050C10' }}>
        <div className="container">
          <div className="text-center mb-16">
            <p className="perio-label reveal-up mb-4">The Team</p>
            <h2
              className="reveal-up text-5xl md:text-6xl font-bold"
              style={{ fontFamily: 'Gabarito, sans-serif', color: '#F5F9EA', transitionDelay: '100ms' }}
            >
              Three founders.<br />
              <span style={{ color: '#C0E57A' }}>One mission.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-12 max-w-4xl mx-auto">
            {founders.map((founder, i) => (
              <div
                key={founder.name}
                className={`reveal-up flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                style={{ transitionDelay: founder.delay }}
              >
                <div className="shrink-0">
                  <div
                    className="w-40 h-40 rounded-full overflow-hidden"
                    style={{
                      border: '3px solid #C0E57A',
                      boxShadow: '0 0 30px rgba(192,229,122,0.2)',
                    }}
                  >
                    <img
                      src={founder.img}
                      alt={founder.name}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.name}
                  </h3>
                  <p
                    className="text-base font-medium mb-1"
                    style={{ color: '#C0E57A', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.role}
                  </p>
                  <p
                    className="text-sm mb-4"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.creds}
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="perio-section-gap">
        <div className="container text-center">
          <div className="reveal-up max-w-xl mx-auto">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
            >
              Join us on the journey.
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
            >
              We're building the future of periodontal care intelligence. Come be part of it.
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
