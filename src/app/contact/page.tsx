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
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div data-gsap="fade-up" className="max-w-3xl mx-auto text-center relative">
          <span className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold block mb-4">
            Get in Touch
          </span>
          <h1 className="font-heading text-[clamp(4rem,10vw,7rem)] leading-[0.8] text-lime-50">
            Contact Us
          </h1>
          <p className="mt-6 text-navy-300 text-lg max-w-xl mx-auto">
            Have a question about Perioskoup? Want to learn more about joining
            our early adopter programme? We&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-24 md:pb-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div data-gsap="fade-up" className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact info */}
          <div data-gsap="fade-up" className="lg:col-span-2 space-y-8">
            <div className="titanium-card p-8">
              <h2 className="font-heading text-[2.5rem] text-lime-50 mb-6 leading-none">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-lime-400 text-xs uppercase tracking-[0.15em] font-semibold mb-2">
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
                  <p className="text-lime-400 text-xs uppercase tracking-[0.15em] font-semibold mb-2">
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
                  <p className="text-lime-400 text-xs uppercase tracking-[0.15em] font-semibold mb-2">
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
