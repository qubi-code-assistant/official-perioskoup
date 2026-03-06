/* =============================================================
   PERIOSKOUP — BLOG PAGE
   Titanium Pro: Knowledge hub listing
   ============================================================= */
import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const posts = [
  {
    category: 'Clinical',
    title: 'Why AI Is Changing Dental Patient Engagement',
    excerpt: 'Artificial intelligence is reshaping how dental practices connect with patients between visits. From personalized nudges to predictive compliance modeling, the future of patient engagement is already here.',
    read: '5 min read',
    date: 'Feb 2026',
  },
  {
    category: 'Product',
    title: 'How Perioskoup Helps Reduce No-Shows by 40%',
    excerpt: 'Missed appointments cost dental practices thousands each year. Learn how daily patient engagement through AI-powered reminders is transforming attendance rates across European practices.',
    read: '3 min read',
    date: 'Jan 2026',
  },
  {
    category: 'Industry',
    title: 'The Hidden Cost of Poor Patient Habits in Periodontal Care',
    excerpt: 'Poor daily oral care habits between dental visits carry enormous hidden costs — for patients, practices, and healthcare systems. Learn the real impact and what forward-thinking clinics are doing about it.',
    read: '4 min read',
    date: 'Jan 2026',
  },
  {
    category: 'Clinical',
    title: 'Voice-Activated Charting: The End of Manual Entry Errors',
    excerpt: 'Manual charting errors are a silent productivity killer in periodontal practices. Voice-activated charting technology is changing the game — here\'s how.',
    read: '6 min read',
    date: 'Dec 2025',
  },
  {
    category: 'Research',
    title: 'EFP 2025: What the Digital Innovation Award Means for Dental Tech',
    excerpt: 'The European Federation of Periodontology\'s recognition of digital innovation signals a major shift in how the profession views technology. We break down what it means.',
    read: '4 min read',
    date: 'Nov 2025',
  },
  {
    category: 'Product',
    title: '3D Heatmaps: Turning Clinical Data into Patient Decisions',
    excerpt: 'When patients can see their own "red zones" on a 3D map of their mouth, treatment acceptance rates soar. Here\'s the science behind visual patient education.',
    read: '5 min read',
    date: 'Oct 2025',
  },
];

export default function Blog() {
  useReveal();

  return (
    <div style={{ backgroundColor: '#0A171E', minHeight: '100vh' }}>
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container">
          <p className="perio-label reveal-up mb-4">Knowledge Hub</p>
          <h1
            className="reveal-up font-display mb-6"
            style={{
              fontFamily: 'Dongle, sans-serif',
              fontSize: 'clamp(72px, 10vw, 120px)',
              letterSpacing: '-0.04em',
              color: '#F5F9EA',
              lineHeight: 0.95,
              transitionDelay: '100ms',
            }}
          >
            Clinical<br />
            <span style={{ color: '#C0E57A' }}>Intelligence.</span>
          </h1>
          <p
            className="reveal-up text-xl max-w-xl"
            style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif', transitionDelay: '200ms' }}
          >
            Insights from the intersection of periodontics, AI, and patient psychology.
          </p>
        </div>
      </section>

      <section className="perio-section-gap">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <div
                key={post.title}
                className="reveal-up perio-card p-6 flex flex-col justify-between min-h-[280px] group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: 'rgba(192,229,122,0.12)',
                        color: '#C0E57A',
                        fontFamily: 'Gabarito, sans-serif',
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                    >
                      {post.date}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold mb-3 leading-snug group-hover:text-[#C0E57A] transition-colors"
                    style={{ color: '#F5F9EA', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span
                    className="text-xs"
                    style={{ color: '#8C9C8C', fontFamily: 'Gabarito, sans-serif' }}
                  >
                    {post.read}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-[#8C9C8C] group-hover:text-[#C0E57A] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
