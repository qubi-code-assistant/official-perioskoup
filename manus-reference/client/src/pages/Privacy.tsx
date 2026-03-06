/* =============================================================
   PERIOSKOUP — PRIVACY PAGE
   Titanium Pro: Legal, clean, readable
   ============================================================= */
import { useEffect } from 'react';
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

const sections = [
  {
    title: '1. Who We Are',
    content: 'Perioskoup is a dental companion application developed and operated by Perioskoup Ltd. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable EU healthcare data regulations.',
  },
  {
    title: '2. Data We Collect',
    content: 'We collect information you provide directly, including your name, email address, professional role, and practice information when you join our waitlist or use our platform. We also collect usage data to improve our services.',
  },
  {
    title: '3. How We Use Your Data',
    content: 'Your data is used to provide and improve the Perioskoup platform, communicate with you about your account and our services, and comply with legal obligations. We do not sell your personal data to third parties.',
  },
  {
    title: '4. Data Security',
    content: 'All data transmitted through Perioskoup is end-to-end encrypted. We implement industry-standard security measures including AES-256 encryption at rest and TLS 1.3 in transit. Patient health data is processed in compliance with GDPR Article 9.',
  },
  {
    title: '5. Your Rights',
    content: 'Under GDPR, you have the right to access, rectify, erase, restrict processing of, and port your personal data. You also have the right to object to processing and to withdraw consent at any time. Contact us at privacy@perioskoup.com to exercise these rights.',
  },
  {
    title: '6. Data Retention',
    content: 'We retain your personal data for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time, subject to legal retention requirements.',
  },
  {
    title: '7. Contact',
    content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@perioskoup.com or write to Perioskoup Ltd, Europe.',
  },
];

export default function Privacy() {
  useReveal();

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container max-w-3xl">
          <p className="perio-label reveal-up mb-4">Legal</p>
          <h1
            className="reveal-up text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Gabarito, sans-serif', color: '#F5F9EA', transitionDelay: '100ms' }}
          >
            Privacy Policy
          </h1>
          <p
            className="reveal-up text-base mb-16"
            style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
          >
            Last updated: March 2026
          </p>

          <div className="flex flex-col gap-8">
            {sections.map((section, i) => (
              <div
                key={section.title}
                className="reveal-up"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h2
                  className="text-xl font-bold mb-3"
                  style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                >
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
