/**
 * PERIOSKOUP FOOTER
 * Design: Deep dark footer with brand colors
 * Animation: JS onMouseEnter/Leave replaced with CSS .footer-link class.
 */
import { Link } from 'wouter';
import { LogoFull } from './Logo';
import { capture } from '@/lib/analytics';

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
                3rd Prize · EFP Award 2025
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
                  <Link key={href} href={href} onClick={() => capture("footer_link_clicked", { label, href, category })}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="https://www.linkedin.com/company/perioskoup-ai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-link" style={{ display: 'flex' }} onClick={() => capture("external_link_clicked", { url: "linkedin", label: "LinkedIn", page: "footer" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" stroke="#8C9C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="https://www.instagram.com/perioskoup.ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-link" style={{ display: 'flex' }} onClick={() => capture("external_link_clicked", { url: "instagram", label: "Instagram", page: "footer" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#8C9C8C" strokeWidth="1.5"/><circle cx="12" cy="12" r="5" stroke="#8C9C8C" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="#8C9C8C"/></svg>
              </a>
              <a href="https://www.tiktok.com/@perioskoup" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-link" style={{ display: 'flex' }} onClick={() => capture("external_link_clicked", { url: "tiktok", label: "TikTok", page: "footer" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="#8C9C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
