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
      <section className="pt-32 md:pt-40 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto">
            Choose the plan that fits your practice.
          </p>
        </div>
      </section>

      {/* Pricing Grid with Blur + Beta Overlay */}
      <section className="pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto relative">
          {/* Blurred pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 select-none blur-[6px]">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-navy-800/40 border rounded-2xl p-8 flex flex-col ${
                  tier.highlighted
                    ? 'border-lime-400/50'
                    : 'border-navy-700/50'
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime-400 text-navy-950 text-sm font-semibold px-4 py-1 rounded-full">
                    {tier.badge}
                  </span>
                )}

                <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-lime-50">
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
                      className="flex items-start gap-3 text-lime-50"
                    >
                      <svg
                        className="w-5 h-5 mt-0.5 shrink-0 text-lime-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
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
                  className={`mt-8 w-full py-3.5 rounded-full text-lg font-semibold transition-colors ${
                    tier.highlighted
                      ? 'bg-lime-400 text-navy-950 hover:bg-lime-300'
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

          {/* Beta Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-tight text-lime-400">
              We&apos;re in Beta
            </h2>
            <p className="mt-4 text-lg md:text-xl text-lime-50 max-w-lg">
              Join our founding clinics for lifetime early-adopter pricing
            </p>
            <a
              href="/waitlist"
              className="mt-8 inline-block bg-lime-400 text-navy-950 px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-lime-300 transition-colors"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
