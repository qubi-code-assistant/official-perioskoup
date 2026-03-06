import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import {
  softwareApplicationSchema,
  faqPageSchema,
  breadcrumbSchema,
} from '@/lib/schema'

export const metadata = createMetadata({
  title: 'Features',
  description:
    'Explore Perioskoup features: Patient App for daily habit tracking, Dentist Dashboard for engagement visibility, and AI Companion for personalized oral care support.',
  path: '/features',
})

/* ─── Data ─── */

const FEATURES = [
  {
    label: 'Patient App',
    title: "Your patients' daily oral care companion",
    items: [
      'Personalized daily routines with gentle reminders',
      'Visual habit tracking that motivates consistency',
      "Educational content tailored to each patient's needs",
      'Progress sharing with their dental team',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    label: 'Dentist Dashboard',
    title: 'Complete visibility into patient engagement',
    items: [
      'Real-time engagement patterns across your practice',
      'Patient-by-patient activity insights',
      'Automated routine suggestions based on patient profiles',
      'Easy patient onboarding in seconds',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
  {
    label: 'AI Companion',
    title: 'Intelligent support between visits',
    items: [
      'Personalized daily oral care guidance',
      'Smart habit reminders that adapt to each patient',
      'Educational content recommendations',
      'Engagement pattern insights for dental teams',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
]

const FAQS = [
  {
    question: 'Is Perioskoup a medical device?',
    answer:
      'No. Perioskoup is a wellness and engagement platform. It helps patients build healthy oral care habits through reminders, educational content, and routine tracking. It is not a medical device and does not provide clinical guidance.',
  },
  {
    question: 'How do patients use the app?',
    answer:
      'Patients receive personalized daily oral care routines, habit tracking tools, and educational content through the Perioskoup app. The experience is designed to be simple, engaging, and motivating.',
  },
  {
    question: 'What data can dentists see?',
    answer:
      'Dentists get visibility into patient engagement patterns — how consistently patients follow their routines and interact with educational content. This helps practices understand which patients may need extra support.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most practices are up and running in under 10 minutes. Simply add your patients and Perioskoup handles the rest.',
  },
]

/* ─── Page ─── */

export default function FeaturesPage() {
  const schemas = [
    softwareApplicationSchema(),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Features', url: '/features' },
    ]),
  ]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-40 px-6 md:px-12 lg:px-20">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto text-center relative" data-gsap="fade-up">
          <p className="perio-label mb-6 font-body">
            Platform Overview
          </p>
          <h1 className="font-heading text-[clamp(4rem,8vw,6rem)] leading-[0.8] text-lime-50">
            Features Built for Dental Teams
          </h1>
          <p className="mt-6 text-navy-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-body">
            Perioskoup brings together a patient-facing app, a dentist dashboard,
            and an AI companion to keep your patients engaged and building healthy
            habits between every visit.
          </p>
        </div>
      </section>

      {/* ═══════════════════ FEATURE SECTIONS ═══════════════════ */}
      {FEATURES.map((feature, index) => (
        <section
          key={feature.label}
          className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20"
        >
          {/* Ambient glow — alternate sides per section */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none ${
              index % 2 === 0 ? 'right-0 translate-x-1/3' : 'left-0 -translate-x-1/3'
            }`}
          />
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text side */}
              <div className={index % 2 !== 0 ? 'lg:order-2' : ''} data-gsap="fade-up">
                <p className="perio-label mb-4 font-body">
                  {feature.label}
                </p>
                <h2 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-lime-50 leading-[0.85] mb-6">
                  {feature.title}
                </h2>
                <ul className="space-y-4">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-lime-400 shrink-0" aria-hidden="true" />
                      <span className="text-navy-300 leading-relaxed font-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual side */}
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''} data-gsap="fade-up">
                <div className="titanium-card p-8 flex items-center justify-center aspect-[4/3] relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-400/8 via-navy-700/10 to-transparent pointer-events-none" />
                  {/* Secondary radial glow */}
                  <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-lime-400/5 rounded-full blur-[80px] pointer-events-none" />
                  <div className="w-20 h-20 rounded-2xl bg-lime-400/10 text-lime-400 flex items-center justify-center relative">
                    {feature.icon}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 relative">
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lime-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto text-center relative" data-gsap="fade-up">
          <h2 className="font-heading text-[clamp(4rem,8vw,6rem)] leading-[0.8] text-lime-50 mb-6">
            Ready to See It in Action?
          </h2>
          <p className="text-navy-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-body">
            Join 30+ clinics already on the waitlist. Get early access and lifetime
            early-adopter pricing when we launch.
          </p>
          <Link
            href="/waitlist"
            className="inline-block bg-lime-400 text-navy-950 px-8 py-4 rounded-full text-lg font-semibold hover:bg-lime-300 hover:scale-105 shadow-[0_0_20px_rgba(192,229,122,0.3)] transition-all font-body"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20">
        {/* Ambient glow */}
        <div className="absolute top-1/3 right-0 translate-x-1/4 w-[400px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16" data-gsap="fade-up">
            <p className="perio-label mb-4 font-body">
              FAQ
            </p>
            <h2 className="font-heading text-[clamp(4rem,8vw,6rem)] leading-[0.8] text-lime-50">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6" data-gsap-stagger>
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="titanium-card p-8"
                data-gsap="stagger-item"
              >
                <h3 className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] text-lime-50 mb-3 leading-[0.85]">
                  {faq.question}
                </h3>
                <p className="text-navy-300 leading-relaxed font-body">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
