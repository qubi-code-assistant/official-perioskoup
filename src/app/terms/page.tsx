import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = createMetadata({
  title: 'Terms of Service',
  description:
    'Perioskoup terms of service. Understand the terms governing your use of our AI dental companion platform.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Terms of Service', url: '/terms' },
            ])
          ),
        }}
      />

      <section className="relative pt-32 md:pt-40 pb-24 md:pb-40 px-6 md:px-12 lg:px-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <div className="hero-enter">
            <span className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold block mb-4">
              Legal
            </span>
            <h1 className="font-heading text-[clamp(4rem,10vw,7rem)] leading-[0.8] text-lime-50 mb-4">
              Terms of Service
            </h1>
            <p className="text-navy-500 text-sm mb-12">
              Last updated: March 2026
            </p>
          </div>

          <div className="space-y-10">
            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                Overview
              </h2>
              <p className="text-navy-300 leading-relaxed">
                Perioskoup is an AI-powered wellness and engagement platform
                designed for dental professionals and their patients. By
                accessing or using our services, you agree to be bound by these
                terms.
              </p>
            </div>

            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                Nature of the Service
              </h2>
              <p className="text-navy-300 leading-relaxed">
                Perioskoup is a wellness and engagement platform. It is not a
                medical device and does not provide medical advice, diagnosis, or
                treatment. The platform offers habit tracking, educational
                content, reminders, and engagement tools to support healthy oral
                care routines.
              </p>
            </div>

            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                User Accounts
              </h2>
              <p className="text-navy-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. Notify us immediately of any unauthorised use.
              </p>
            </div>

            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                Acceptable Use
              </h2>
              <p className="text-navy-300 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="space-y-3">
                {[
                  'Use the platform for any unlawful purpose',
                  'Attempt to reverse-engineer or copy the platform',
                  'Share patient data outside the platform without proper consent',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy-300">
                    <span className="mt-2 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                Intellectual Property
              </h2>
              <p className="text-navy-300 leading-relaxed">
                All content, features, and functionality of the Perioskoup
                platform are owned by Perioskoup and protected by international
                copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                Limitation of Liability
              </h2>
              <p className="text-navy-300 leading-relaxed">
                Perioskoup provides wellness and engagement tools only. We are
                not liable for any health outcomes. Always consult a qualified
                dental professional for clinical decisions.
              </p>
            </div>

            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                Changes to Terms
              </h2>
              <p className="text-navy-300 leading-relaxed">
                We may update these terms from time to time. We will notify
                registered users of any material changes via email.
              </p>
            </div>

            <div className="reveal">
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-lime-50 mb-3 leading-[0.85]">
                Contact
              </h2>
              <p className="text-navy-300 leading-relaxed">
                For questions about these terms, contact us at{' '}
                <a
                  href="mailto:legal@perioskoup.com"
                  className="text-lime-400 hover:text-lime-300 transition-colors underline"
                >
                  legal@perioskoup.com
                </a>
                .
              </p>
            </div>

            <div className="reveal pt-8 border-t border-white/5">
              <p className="text-navy-500 text-sm">
                These terms of service will be expanded with comprehensive legal
                language before our public launch, including detailed sections on
                data processing, subscription terms, and dispute resolution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
