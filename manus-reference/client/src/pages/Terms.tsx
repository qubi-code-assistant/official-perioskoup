/* =============================================================
   PERIOSKOUP — TERMS PAGE
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
    title: '1. Acceptance of Terms',
    content: 'By accessing or using Perioskoup, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.',
  },
  {
    title: '2. Description of Service',
    content: 'Perioskoup is a patient engagement and habit tracking companion for dental practices. It is not a medical device and does not provide diagnoses, treatment recommendations, or medical advice. All clinical decisions remain the sole responsibility of qualified dental professionals.',
  },
  {
    title: '3. SaMD Disclaimer',
    content: 'Perioskoup is a wellness and engagement companion, not a Software as a Medical Device (SaMD). It does not analyze, interpret, or act upon clinical data for diagnostic or therapeutic purposes. Any clinical data displayed is for informational and educational purposes only.',
  },
  {
    title: '4. User Responsibilities',
    content: 'Dentist users are responsible for ensuring appropriate use of the platform within their practice and for maintaining patient confidentiality in accordance with applicable healthcare regulations. Patient users are responsible for the accuracy of information they provide.',
  },
  {
    title: '5. Intellectual Property',
    content: 'All content, features, and functionality of Perioskoup are owned by Perioskoup Ltd and are protected by international copyright, trademark, and other intellectual property laws.',
  },
  {
    title: '6. Limitation of Liability',
    content: 'Perioskoup Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.',
  },
  {
    title: '7. Governing Law',
    content: 'These Terms are governed by the laws of the European Union and the jurisdiction of Romania. Any disputes shall be resolved in the courts of Romania.',
  },
  {
    title: '8. Contact',
    content: 'For questions about these Terms, contact us at legal@perioskoup.com.',
  },
];

export default function Terms() {
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
            Terms of Service
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
