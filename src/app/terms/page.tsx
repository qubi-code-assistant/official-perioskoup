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

      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-[clamp(4rem,8vw,6rem)] leading-tight text-lime-50 mb-8">
            Terms of Service
          </h1>
          <p className="text-navy-400 text-sm mb-12">
            Last updated: March 2026
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Overview
              </h2>
              <p className="text-navy-400 leading-relaxed">
                Perioskoup is an AI-powered wellness and engagement platform
                designed for dental professionals and their patients. By
                accessing or using our services, you agree to be bound by these
                terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Nature of the Service
              </h2>
              <p className="text-navy-400 leading-relaxed">
                Perioskoup is a wellness and engagement platform. It is not a
                medical device and does not provide medical advice, diagnosis, or
                treatment. The platform offers habit tracking, educational
                content, reminders, and engagement tools to support healthy oral
                care routines.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                User Accounts
              </h2>
              <p className="text-navy-400 leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. Notify us immediately of any unauthorised use.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Acceptable Use
              </h2>
              <p className="text-navy-400 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-navy-400">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                  Use the platform for any unlawful purpose
                </li>
                <li className="flex items-start gap-3 text-navy-400">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                  Attempt to reverse-engineer or copy the platform
                </li>
                <li className="flex items-start gap-3 text-navy-400">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                  Share patient data outside the platform without proper consent
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Intellectual Property
              </h2>
              <p className="text-navy-400 leading-relaxed">
                All content, features, and functionality of the Perioskoup
                platform are owned by Perioskoup and protected by international
                copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Limitation of Liability
              </h2>
              <p className="text-navy-400 leading-relaxed">
                Perioskoup provides wellness and engagement tools only. We are
                not liable for any health outcomes. Always consult a qualified
                dental professional for clinical decisions.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Changes to Terms
              </h2>
              <p className="text-navy-400 leading-relaxed">
                We may update these terms from time to time. We will notify
                registered users of any material changes via email.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Contact
              </h2>
              <p className="text-navy-400 leading-relaxed">
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

            <div className="pt-8 border-t border-white/5">
              <p className="text-navy-400 text-sm">
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
