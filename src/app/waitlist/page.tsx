import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import WaitlistForm from './WaitlistForm'

export const metadata: Metadata = createMetadata({
  title: 'Join the Waitlist',
  description:
    'Join 30+ dental clinics on the Perioskoup waitlist. Free for early adopters — get lifetime early-adopter pricing.',
  path: '/waitlist',
})

export default function WaitlistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Join the Waitlist', url: '/waitlist' },
            ])
          ),
        }}
      />

      <section className="relative pt-32 md:pt-40 pb-24 md:pb-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="max-w-2xl mx-auto">
            <div data-gsap="fade-up" className="text-center mb-12">
              <span className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold block mb-4">
                Early Access
              </span>
              <h1 className="font-heading text-[clamp(4rem,10vw,7rem)] leading-[0.8] text-lime-50">
                Join the Waitlist
              </h1>
              <p className="mt-6 text-navy-300 text-lg max-w-xl mx-auto">
                Be among the first dental practices to use Perioskoup. Early
                adopters get lifetime founding-member pricing.
              </p>
            </div>

            {/* Trust signals */}
            <div data-gsap="fade-up" className="flex flex-wrap items-center justify-center gap-6 mb-12">
              {[
                '30+ clinics already joined',
                'No credit card required',
                'EFP Award Winner 2025',
              ].map((text) => (
                <div key={text} className="flex items-center gap-2 text-navy-400 text-sm">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5 text-lime-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {text}
                </div>
              ))}
            </div>

            <div data-gsap="fade-up">
              <WaitlistForm />
            </div>

            <p className="text-navy-500 text-xs text-center mt-6">
              No spam, ever. Read our{' '}
              <a
                href="/privacy"
                className="text-lime-400 hover:text-lime-300 underline"
              >
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
