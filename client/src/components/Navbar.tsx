/* =============================================================
   PERIOSKOUP — NAVBAR
   Apple-style: frosted glass on scroll, minimal links, pill CTA
   ============================================================= */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { LogoFull } from './Logo';

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/for-dentists', label: 'For Dentists' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled ? 'rgba(10,23,30,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
          borderBottom: scrolled ? '1px solid #234966' : '1px solid transparent',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          {/* Logo */}
          <Link href="/">
            <div style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <LogoFull height={28} color="#C0E57A" />
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hide-mobile">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>
                <span
                  style={{
                    fontFamily: 'Gabarito, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: location === href ? '#C0E57A' : 'rgba(245,249,234,0.65)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    display: 'block',
                    transition: 'color 0.2s ease',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5F9EA'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = location === href ? '#C0E57A' : 'rgba(245,249,234,0.65)'; }}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/waitlist">
              <span className="btn-primary hide-mobile" style={{ fontSize: '13px', padding: '9px 20px' }}>
                Join Waitlist
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#FFFFFF',
                width: '38px',
                height: '38px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="show-mobile-flex"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-flex { display: none !important; }
        }
      `}</style>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'rgba(10,23,30,0.97)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <div className="container" style={{ paddingTop: '96px', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>
                <div
                  style={{
                    fontFamily: 'Dongle, sans-serif',
                    fontWeight: 700,
                    fontSize: '48px',
                    color: '#F5F9EA',
                    letterSpacing: '-0.04em',
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </div>
              </Link>
            ))}
            <div style={{ marginTop: '32px' }}>
              <Link href="/waitlist">
                <span className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '16px 24px' }}>
                  Join the Waitlist
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
