/* =============================================================
   PERIOSKOUP — NAVBAR
   Titanium Pro: sticky, blurred, lime CTA
   ============================================================= */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/logo-white_5a87fc5c.svg';

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'For Dentists', href: '/for-dentists' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'perio-nav-blur' : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src={LOGO_URL}
                alt="Perioskoup"
                className="h-8 md:h-10 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span
                className="text-[#F5F9EA] font-semibold text-lg tracking-tight hidden sm:block"
                style={{ fontFamily: 'Gabarito, sans-serif' }}
              >
                Perioskoup
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location === link.href
                      ? 'text-[#C0E57A]'
                      : 'text-[#8C9C8C] hover:text-[#F5F9EA]'
                  }`}
                  style={{ fontFamily: 'Gabarito, sans-serif' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link href="/waitlist" className="hidden md:block">
                <button className="perio-btn-primary text-sm px-5 py-2.5">
                  Join Waitlist
                </button>
              </Link>
              <button
                className="md:hidden p-2 text-[#F5F9EA]"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: '#0D1F2D' }}
        >
          <div className="flex flex-col h-full p-8 pt-24">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-[#F5F9EA] hover:text-[#C0E57A] transition-colors py-3 border-b border-white/5"
                style={{ fontFamily: 'Gabarito, sans-serif', animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8">
              <Link href="/waitlist">
                <button className="perio-btn-primary w-full justify-center">
                  Join Waitlist
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
