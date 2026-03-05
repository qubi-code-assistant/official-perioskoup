import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import ContactForm from './ContactForm'

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description:
    'Get in touch with the Perioskoup team. Questions about our AI dental companion? We would love to hear from you.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Contact', url: '/contact' },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lime-400 text-sm uppercase tracking-widest mb-4">
            Get in Touch
          </p>
          <h1 className="font-heading text-[clamp(4rem,8vw,6rem)] leading-tight text-lime-50">
            Contact Us
          </h1>
          <p className="mt-4 text-navy-400 text-lg max-w-xl mx-auto">
            Have a question about Perioskoup? Want to learn more about joining
            our early adopter programme? We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-24 md:pb-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-navy-800 border border-white/5 rounded-[2rem] p-8">
              <h2 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-6 leading-tight">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-lime-400 text-sm uppercase tracking-widest mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@perioskoup.com"
                    className="text-lime-50 hover:text-lime-400 transition-colors"
                  >
                    hello@perioskoup.com
                  </a>
                </div>

                <div>
                  <p className="text-lime-400 text-sm uppercase tracking-widest mb-1">
                    Social
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://linkedin.com/company/perioskoup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-300 hover:text-lime-400 transition-colors text-sm"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://instagram.com/perioskoup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-300 hover:text-lime-400 transition-colors text-sm"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://x.com/perioskoup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-300 hover:text-lime-400 transition-colors text-sm"
                    >
                      X
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-lime-400 text-sm uppercase tracking-widest mb-1">
                    Response Time
                  </p>
                  <p className="text-navy-300 text-sm">
                    We typically respond within 24 hours on business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
