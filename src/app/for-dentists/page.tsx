import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = createMetadata({
  title: 'For Dentists',
  description:
    'Save 15 minutes per patient visit. Perioskoup gives dental practices real-time visibility into patient engagement between visits.',
  path: '/for-dentists',
})

const STATS = [
  { value: '15 min', label: 'Saved per patient visit' },
  { value: '40%', label: 'Fewer missed appointments' },
  { value: '92%', label: 'Patient engagement rate' },
  { value: '3x', label: 'Better habit consistency' },
]

const BENEFITS = [
  {
    title: 'Extend Your Connection',
    description:
      'Stay connected with patients between visits through personalized daily routines and educational content. No extra staff time required.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.813a4.5 4.5 0 0 0-1.242-7.244l4.5-4.5a4.5 4.5 0 0 1 6.364 6.364l-1.757 1.757"
        />
      </svg>
    ),
  },
  {
    title: 'Visibility Without the Overhead',
    description:
      'See which patients are engaged and who might need extra support — all from a simple dashboard. No calls, no follow-ups.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
        />
      </svg>
    ),
  },
  {
    title: 'Stand Out From Every Other Practice',
    description:
      'Offer something no other practice in your area does: an AI-powered companion that makes oral care personal and engaging.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
        />
      </svg>
    ),
  },
]

export default function ForDentists() {
  const jsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'For Dentists', url: '/for-dentists' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-[80vh] flex items-center pt-32 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto w-full text-center">
          <p className="text-lime-400 text-sm md:text-base tracking-widest uppercase mb-6">
            For Dental Practices
          </p>
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-lime-50 mb-6 max-w-4xl mx-auto">
            How Much Time Are You Losing?
          </h1>
          <p className="text-navy-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            The average dental practice spends 15+ minutes per patient re-educating on oral care
            routines. Perioskoup keeps patients engaged between visits, so they arrive prepared.
          </p>
          <Link
            href="/waitlist"
            className="inline-block bg-lime-400 text-navy-950 px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-lime-300 transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* ═══════════════════ ROI STATS ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-lime-400 text-sm uppercase tracking-widest mb-4">
              The Impact
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
              Results That Speak for Themselves
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8 text-center"
              >
                <p className="font-heading text-[clamp(3rem,6vw,4.5rem)] text-lime-400 leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-navy-300 text-sm leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BENEFITS ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-lime-400 text-sm uppercase tracking-widest mb-4">
              Why Perioskoup
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
              Built for Modern Dental Practices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-navy-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOCIAL PROOF STRIP ═══════════════════ */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-6 h-6 text-lime-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <p className="text-lime-50 text-lg">
                Trusted by <span className="text-lime-400 font-semibold">30+ clinics</span> across
                Europe
              </p>
            </div>

            <div className="w-px h-8 bg-navy-700 hidden md:block" />

            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-6 h-6 text-lime-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .982-3.172M8.25 8.25a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z"
                />
              </svg>
              <p className="text-lime-50 text-lg">
                <span className="text-lime-400 font-semibold">EFP Digital Innovation Award</span>{' '}
                Winner 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50 mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-navy-300 text-lg leading-relaxed mb-10">
            Join 30+ clinics already on the waitlist. Free for early adopters.
          </p>
          <Link
            href="/waitlist"
            className="inline-block bg-lime-400 text-navy-950 px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-lime-300 transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>
    </>
  )
}
