import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Perioskoup privacy policy. Learn how we protect your data with GDPR-compliant practices from day one.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Privacy Policy', url: '/privacy' },
            ])
          ),
        }}
      />

      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-[clamp(3rem,6vw,5rem)] leading-tight text-lime-50 mb-8">
            Privacy Policy
          </h1>
          <p className="text-navy-300 text-sm mb-12">
            Last updated: March 2026
          </p>

          <div className="prose-custom space-y-8">
            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Our Commitment to Privacy
              </h2>
              <p className="text-navy-300 leading-relaxed">
                At Perioskoup, privacy is not an afterthought &mdash; it&rsquo;s
                a founding principle. We are GDPR-ready from day one and believe
                that trust is earned through transparency and action.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Data We Collect
              </h2>
              <p className="text-navy-300 leading-relaxed mb-4">
                When you join our waitlist or contact us, we collect:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-navy-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                  Name and email address
                </li>
                <li className="flex items-start gap-3 text-navy-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                  Clinic name and country
                </li>
                <li className="flex items-start gap-3 text-navy-300">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                  Professional role
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                How We Use Your Data
              </h2>
              <p className="text-navy-300 leading-relaxed">
                We use your information solely to communicate about Perioskoup,
                including early access updates, product news, and relevant
                educational content. We never sell your data to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Data Protection
              </h2>
              <p className="text-navy-300 leading-relaxed">
                All data is encrypted in transit and at rest. We implement
                industry-standard security measures and regularly review our
                practices to ensure your information remains protected.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Your Rights
              </h2>
              <p className="text-navy-300 leading-relaxed">
                Under GDPR, you have the right to access, correct, or delete
                your personal data at any time. To exercise these rights, contact
                us at{' '}
                <a
                  href="mailto:privacy@perioskoup.com"
                  className="text-lime-400 hover:text-lime-300 transition-colors underline"
                >
                  privacy@perioskoup.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                Contact
              </h2>
              <p className="text-navy-300 leading-relaxed">
                For privacy-related questions, reach us at{' '}
                <a
                  href="mailto:privacy@perioskoup.com"
                  className="text-lime-400 hover:text-lime-300 transition-colors underline"
                >
                  privacy@perioskoup.com
                </a>
                .
              </p>
            </div>

            <div className="pt-8 border-t border-navy-700/50">
              <p className="text-navy-300 text-sm">
                This privacy policy will be updated with comprehensive terms
                before our public launch. The full policy will cover cookies,
                analytics, data processing agreements, and sub-processors.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
