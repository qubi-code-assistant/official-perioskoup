/* =============================================================
   PERIOSKOUP -- NAVBAR
   Apple-style: frosted glass on scroll, minimal links, pill CTA
   Animation: JS hover mutations replaced with CSS .nav-link-item class.
   Mobile drawer uses CSS keyframe slide-in + staggered link reveals.
   A05: Focus trap for mobile drawer (WCAG 2.1.2 / 2.4.3)
   A06: aria-current="page" on active links (WCAG 4.1.2)
   ============================================================= */
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { LogoFull } from './Logo';

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/for-dentists', label: 'For Dentists' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // Lock background scroll while drawer is open.
  // Set overflow:hidden on <html> (not body) to avoid creating a
  // containing block that breaks the drawer's position:fixed sizing.
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
      };
    }
  }, [menuOpen]);

  // A05: Focus trap + initial focus + Escape close for mobile drawer (WCAG 2.1.2 / 2.4.3)
  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;

    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Move focus to first focusable element when drawer opens
    const firstFocusable = drawerRef.current.querySelector<HTMLElement>(FOCUSABLE);
    firstFocusable?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = Array.from(
        drawerRef.current!.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
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
          <Link href="/" aria-label="Perioskoup home">
            <div style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <LogoFull height={28} color="#C0E57A" />
            </div>
          </Link>

          {/* Desktop nav -- CSS hover via .nav-link-item, no JS style mutations */}
          {/* A06: aria-current="page" on active link anchor (WCAG 4.1.2) */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={location === href ? 'page' : undefined}
              >
                <span className={`nav-link-item${location === href ? ' active' : ''}`}>
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/waitlist" aria-label="Join the waitlist">
              <span className="btn-primary hidden md:inline-flex" style={{ fontSize: '13px', padding: '9px 20px' }}>
                Join Waitlist
              </span>
            </Link>
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#FFFFFF',
                width: '44px',
                height: '44px',
              }}
              className="flex md:hidden items-center justify-center"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              type="button"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </nav>



      {/* Mobile drawer -- full-screen overlay with staggered link reveals */}
      {/* A05: ref={drawerRef} enables the focus trap implemented in useEffect above */}
      {menuOpen && (
        <div
          ref={drawerRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="mobile-drawer"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '100dvh',
            zIndex: 55,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(10,23,30,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Drawer header with close button — fixed at top */}
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '64px',
              flexShrink: 0,
            }}
          >
            <LogoFull height={28} color="#C0E57A" />
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#FFFFFF',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close menu"
              type="button"
            >
              <X size={17} />
            </button>
          </div>

          {/* Nav links — scrollable area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div className="container" style={{ paddingTop: '24px', paddingBottom: '48px', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {NAV_LINKS.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={location === href ? 'page' : undefined}
                >
                  <div
                    className="mobile-drawer-link"
                    style={{
                      fontFamily: 'Dongle, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(36px, 10vw, 48px)',
                      color: location === href ? '#C0E57A' : '#F5F9EA',
                      letterSpacing: '-0.04em',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                      animationDelay: `${0.05 + i * 0.06}s`,
                    }}
                  >
                    {label}
                  </div>
                </Link>
              ))}
              <div
                className="mobile-drawer-link"
                style={{
                  marginTop: '32px',
                  animationDelay: `${0.05 + NAV_LINKS.length * 0.06}s`,
                }}
              >
                <Link href="/waitlist" aria-label="Join the waitlist">
                  <span className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '16px 24px' }}>
                    Join the Waitlist
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
