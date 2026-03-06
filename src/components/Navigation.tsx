'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/for-dentists', label: 'For Dentists' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'perio-nav-blur'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="relative z-50 flex items-center gap-2">
          <Image
            src="/logo-white.svg"
            alt="Perioskoup"
            width={140}
            height={32}
            priority
          />
          <span className="text-lime-50 text-lg font-heading leading-none hidden sm:block">Perioskoup</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors text-sm font-medium tracking-wide ${
                pathname === link.href
                  ? 'text-lime-400'
                  : 'text-navy-300 hover:text-lime-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/waitlist"
            className="perio-btn-primary !py-2.5 !px-6 !text-sm"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span
            aria-hidden="true"
            className={`block w-6 h-0.5 bg-lime-50 transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            aria-hidden="true"
            className={`block w-6 h-0.5 bg-lime-50 transition-all duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>

        {/* Mobile menu overlay */}
        <div
          role="dialog"
          aria-label="Mobile navigation menu"
          aria-modal={isOpen ? 'true' : undefined}
          aria-hidden={!isOpen}
          className={`fixed inset-0 bg-navy-950 z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 md:hidden ${
            isOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              className={`text-2xl font-heading tracking-wide transition-colors ${
                pathname === link.href
                  ? 'text-lime-400'
                  : 'text-lime-50 hover:text-lime-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/waitlist"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
            className="mt-4 bg-lime-400 text-navy-950 px-8 py-3 rounded-full text-lg font-semibold hover:bg-lime-300 transition-colors"
          >
            Join Waitlist
          </Link>
        </div>
      </nav>
    </header>
  )
}
