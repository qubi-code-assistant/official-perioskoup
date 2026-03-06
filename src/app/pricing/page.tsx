import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata = createMetadata({
  title: 'Pricing',
  description:
    'Perioskoup pricing plans for dental practices. Currently in beta — join our founding clinics for lifetime early-adopter pricing.',
  path: '/pricing',
})

const tiers = [
  {
    name: 'Starter',
    price: '€49',
    period: '/mo',
    features: ['Up to 50 patients', 'Basic AI guidance', 'Email support'],
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '€99',
    period: '/mo',
    badge: 'Most Popular',
    features: [
      'Up to 200 patients',
      'Advanced AI insights',
      'Priority support',
      'Custom branding',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited patients',
      'API access',
      'Multi-location support',
      'Dedicated account manager',
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  const jsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing', url: '/pricing' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto text-center hero-enter">
          <p className="perio-label mb-6">
            Plans
          </p>
          <h1 className="font-heading text-[clamp(4rem,8vw,6rem)] leading-[0.8] text-lime-50">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg text-navy-300 max-w-2xl mx-auto">
            Choose the plan that fits your practice.
          </p>
        </div>
      </section>

      {/* Pricing Grid with Blur + Beta Overlay */}
      <section className="relative overflow-hidden pb-24 md:pb-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto relative">
          {/* Ambient glow behind pricing grid */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lime-400/10 blur-[160px]"
            aria-hidden="true"
          />

          {/* Blurred pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 select-none blur-[6px]">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-navy-800 border rounded-[2rem] p-8 flex flex-col ${
                  tier.highlighted
                    ? 'border-lime-400/50'
                    : 'border-white/5'
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime-400 text-navy-950 text-xs uppercase tracking-[0.2em] font-semibold px-4 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}

                <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] leading-[0.85] text-lime-50">
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-lime-50">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-navy-300 text-lg">{tier.period}</span>
                  )}
                </div>

                <ul className="mt-8 space-y-4 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-navy-300"
                    >
                      <svg
                        className="w-5 h-5 mt-0.5 shrink-0 text-lime-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-4 rounded-full text-lg font-semibold transition-all duration-200 ${
                    tier.highlighted
                      ? 'bg-lime-400 text-navy-950 hover:bg-lime-300 hover:scale-105 shadow-[0_0_20px_rgba(192,229,122,0.3)]'
                      : 'bg-navy-700/50 text-lime-50 hover:bg-navy-700'
                  }`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          {/* Beta Overlay — card style */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="relative bg-gradient-to-b from-navy-800/90 to-navy-900/90 border border-lime-400/20 rounded-[2rem] p-10 md:p-14 max-w-lg w-full text-center perio-glow backdrop-blur-sm">
              {/* Beta badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse-live" />
                <span className="text-lime-400 text-xs uppercase tracking-[0.15em] font-semibold">Beta</span>
              </div>

              <h2 className="font-heading text-[clamp(3rem,6vw,5rem)] leading-[0.8] text-lime-400 mb-4">
                We&apos;re in Beta
              </h2>
              <p className="text-lg md:text-xl text-navy-300 max-w-sm mx-auto mb-8 leading-relaxed">
                Founding clinic pricing is locked in for life
              </p>
              <Link
                href="/waitlist"
                className="perio-btn-primary justify-center w-full sm:w-auto"
              >
                Join the Waitlist
              </Link>
              <p className="text-navy-500 text-xs mt-6 flex items-center justify-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
