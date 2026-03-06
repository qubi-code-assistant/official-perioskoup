import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/for-dentists', label: 'For Dentists' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const TRUST_ITEMS = [
  {
    label: 'GDPR Ready',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: 'End-to-End Encrypted',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    label: 'Privacy-First',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050c10]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        {/* Row 1: Logo + Nav */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-white.svg"
              alt="Perioskoup"
              width={120}
              height={28}
            />
            <span className="text-lime-50 text-lg font-heading leading-none hidden sm:block">Perioskoup</span>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy-400 hover:text-lime-400 transition-colors text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Row 2: Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-10 border-b border-white/5">
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              {item.icon}
              <span className="text-navy-400 text-sm tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Row 3: Copyright + legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10">
          <p className="text-navy-500 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Perioskoup. Designed in Europe.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-navy-500 hover:text-lime-400 transition-colors text-xs tracking-wide">
              Privacy
            </Link>
            <Link href="/terms" className="text-navy-500 hover:text-lime-400 transition-colors text-xs tracking-wide">
              Terms
            </Link>
            <Link href="/contact" className="text-navy-500 hover:text-lime-400 transition-colors text-xs tracking-wide">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
