/**
 * PERIOSKOUP FOOTER
 * Design: Deep dark footer with brand colors
 * Animation: JS onMouseEnter/Leave replaced with CSS .footer-link class.
 */
import { Link } from 'wouter';
import { LogoFull } from './Logo';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'For Dentists', href: '/for-dentists' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Join Waitlist', href: '/waitlist' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#050C10', borderTop: '1px solid #1D3449' }}>
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '14px' }}>
              <LogoFull height={26} color="#C0E57A" />
            </div>
            <p style={{
              fontFamily: 'Gabarito, sans-serif',
              fontSize: '13px',
              color: '#8C9C8C',
              lineHeight: 1.7,
              maxWidth: '200px',
            }}>
              Your AI dental companion. Bridging the gap between clinic and home.
            </p>
            <div style={{ marginTop: '18px' }}>
              <a
                href="https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
                target="_blank"
                rel="noopener noreferrer"
                className="efp-badge-hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'Gabarito, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#C0E57A',
                  padding: '5px 12px',
                  borderRadius: '100px',
                  background: 'rgba(192,229,122,0.08)',
                  border: '1px solid rgba(192,229,122,0.25)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C0E57A', display: 'inline-block' }} />
                EFP Award 2025
              </a>
            </div>
          </div>

          {/* Link columns -- CSS .footer-link hover, no JS mutations */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 style={{
                fontFamily: 'Gabarito, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#8C9C8C',
                marginBottom: '16px',
              }}>
                {category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(({ label, href }) => (
                  <Link key={href} href={href}>
                    <span className="footer-link">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid #1D3449',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{ fontFamily: 'Gabarito, sans-serif', fontSize: '13px', color: '#8C9C8C' }}>
            &copy; {new Date().getFullYear()} Perioskoup. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Gabarito, sans-serif', fontSize: '13px', color: '#8C9C8C' }}>
            Made in Europe
          </p>
        </div>
      </div>
    </footer>
  );
}
