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

      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lime-400 text-sm uppercase tracking-widest mb-4">
              Early Access
            </p>
            <h1 className="font-heading text-[clamp(3rem,6vw,5rem)] leading-tight text-lime-50">
              Join the Waitlist
            </h1>
            <p className="mt-4 text-navy-300 text-lg max-w-xl mx-auto">
              Be among the first dental practices to use Perioskoup. Early
              adopters get lifetime founding-member pricing.
            </p>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-navy-300 text-sm">
              <svg
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
              30+ clinics already joined
            </div>
            <div className="flex items-center gap-2 text-navy-300 text-sm">
              <svg
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
              No credit card required
            </div>
            <div className="flex items-center gap-2 text-navy-300 text-sm">
              <svg
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
              EFP Award Winner 2025
            </div>
          </div>

          <WaitlistForm />

          <p className="text-navy-300 text-xs text-center mt-6">
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
      </section>
    </>
  )
}
