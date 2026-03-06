/* =============================================================
   PERIOSKOUP — FOOTER
   Titanium Pro: deep dark, minimal, logo left
   ============================================================= */
import { Link } from 'wouter';
import { Shield, Lock, Globe } from 'lucide-react';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/logo-white_5a87fc5c.svg';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#050C10' }} className="border-t border-white/5">
      <div className="container py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Perioskoup" className="h-9 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
            <span className="text-[#F5F9EA] font-semibold text-lg" style={{ fontFamily: 'Gabarito, sans-serif' }}>
              Perioskoup
            </span>
          </div>
          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Features', href: '/features' },
              { label: 'For Dentists', href: '/for-dentists' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Blog', href: '/blog' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#8C9C8C] hover:text-[#C0E57A] transition-colors"
                style={{ fontFamily: 'Gabarito, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-6 mb-12">
          {[
            { icon: Shield, label: 'GDPR Ready' },
            { icon: Lock, label: 'End-to-End Encrypted' },
            { icon: Globe, label: 'Privacy-First' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[#8C9C8C] text-sm">
              <Icon size={14} className="text-[#C0E57A]" />
              <span style={{ fontFamily: 'Gabarito, sans-serif' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-[#8C9C8C] text-sm" style={{ fontFamily: 'Gabarito, sans-serif' }}>
            © 2026 Perioskoup. Designed in Europe.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#8C9C8C] hover:text-[#F5F9EA] transition-colors"
                style={{ fontFamily: 'Gabarito, sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
