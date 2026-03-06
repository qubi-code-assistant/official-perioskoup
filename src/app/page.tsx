import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import ClinicCounter from '@/components/ClinicCounter'
import InlineWaitlistForm from '@/components/InlineWaitlistForm'

export const metadata = createMetadata({
  title: 'Home',
  path: '/',
})

/* ─── Data ─── */

const COMPARISON_ROWS = [
  {
    problem: {
      title: 'Monday Morning Chaos',
      text: 'Patient forgets floss instructions given last week. Hygienist spends 15 minutes re-explaining basics, putting the schedule behind.',
    },
    solution: {
      title: 'Monday Morning Clarity',
      text: 'Patient receives AI nudge based on pocket depth on Sunday. Arrives prepped with questions about their progress trends.',
    },
  },
  {
    problem: {
      title: 'Charting Fatigue',
      text: 'Manual charting errors slow down intake. Assistant struggles to hear measurements over suction noise.',
    },
    solution: {
      title: 'Voice-Activated Flow',
      text: '"3-2-3." Voice-activated charting auto-syncs to the visual dashboard instantly. Zero friction, zero errors.',
    },
  },
  {
    problem: {
      title: 'Treatment Stalls',
      text: "Treatment acceptance stalls at 40%. Patients don't \"feel\" the urgency of 5mm pockets because they can't see the risk.",
    },
    solution: {
      title: 'Visual Conversion',
      text: '3D Heatmaps boost acceptance to 85%. Patients see the "red zones" on their own phone and ask: "How do we fix this?"',
    },
  },
  {
    problem: {
      title: 'Clinician Burnout',
      text: 'Exhaustion from repetitive explanations. The team feels like they are selling dentistry rather than treating health.',
    },
    solution: {
      title: 'Automated Education',
      text: 'Automated education handles the basics before the patient sits down. The team focuses on complex care and relationships.',
    },
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Scan',
    description: 'Sync intraoral data instantly from your existing scanner.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14">
        <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'AI maps risk zones & translates perio charts into habits.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Engage',
    description: 'Patients receive actionable nudges on their device.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14">
        <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
        <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3h6.75C16.496 3 17 3.504 17 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" />
      </svg>
    ),
  },
]

const BLOG_POSTS = [
  {
    title: 'Why AI Is Changing Dental Patient Engagement',
    excerpt:
      'Artificial intelligence is reshaping how dental practices connect with patients between visits.',
    date: '28 Feb 2026',
    category: 'Clinical',
    slug: '/blog/why-ai-is-changing-dental-patient-engagement',
    readTime: '5 min read',
  },
  {
    title: 'How Perioskoup Helps Reduce No-Shows by 40%',
    excerpt:
      'Missed appointments cost dental practices thousands each year. Learn how daily patient engagement is transforming attendance.',
    date: '21 Feb 2026',
    category: 'Product',
    slug: '/blog/how-perioskoup-helps-reduce-no-shows',
    readTime: '3 min read',
  },
  {
    title: 'The Hidden Cost of Poor Patient Habits in Periodontal Care',
    excerpt:
      'Poor daily oral care habits between dental visits carry enormous hidden costs. Learn the real impact.',
    date: '14 Feb 2026',
    category: 'Industry',
    slug: '/blog/hidden-cost-of-poor-patient-habits-in-periodontal-care',
    readTime: '4 min read',
  },
]

const FOUNDERS = [
  {
    name: 'Dr. Anca Constantin',
    role: 'Periodontist & CEO',
    creds: 'DMD, PhD in Periodontology',
    quote: 'We built Perioskoup to bridge the gap between clinical precision and patient psychology.',
    photo: '/team/team-anca.webp',
  },
  {
    name: 'Eduard Ciugulea',
    role: 'CGO & Technical Co-Founder',
    creds: 'Full-Stack Engineer & Growth',
    quote: 'Technology should amplify the dentist, not replace them.',
    photo: '/team/team-eduard.webp',
  },
  {
    name: 'Petrica Nancu',
    role: 'CTO & Head of AI',
    creds: 'AI & Machine Learning',
    quote: 'The best AI is the one patients never notice — it just works.',
    photo: '/team/team-petrica.webp',
  },
]

const TRUST_BADGES = [
  {
    label: 'HIPAA Compliant',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: 'SOC2 Certified',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
  },
  {
    label: 'End-to-End Encrypted',
    icon: (
      <svg aria-hidden="true" className="w-4 h-4 text-navy-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
]

/* ─── Component ─── */

export default function Home() {
  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        className="relative min-h-screen flex items-center pt-24 md:pt-20 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left: Typography */}
          <div className="lg:col-span-5">
            {/* Badge */}
            <div
              className="hero-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-navy-700/50 text-navy-300 mb-8 backdrop-blur-md bg-navy-950/40"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-lime-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <span className="text-xs uppercase tracking-[0.15em] font-medium">EFP Innovation Award 2025</span>
            </div>

            {/* Headline — Dongle at massive scale */}
            <h1 className="hero-enter hero-enter-delay-1 font-heading text-[clamp(3.5rem,10vw,10rem)] leading-[0.8] tracking-[-0.04em] text-lime-50 mb-6">
              Precision<br />
              <span className="text-lime-400/90">Perio.</span>
            </h1>

            {/* Quote */}
            <div className="hero-enter hero-enter-delay-2 flex flex-col gap-2 mb-10 max-w-md pl-4 border-l-2 border-lime-400/20">
              <p className="text-lg md:text-xl text-navy-300 leading-relaxed">
                &ldquo;Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes.&rdquo;
              </p>
              <span className="text-sm font-medium text-navy-400 uppercase tracking-wider">&mdash; Dr. Anca Constantin</span>
            </div>

            {/* CTA */}
            <div className="hero-enter hero-enter-delay-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/waitlist"
                className="group flex items-center gap-3 bg-lime-400 hover:bg-lime-300 text-navy-950 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(192,229,122,0.3)]"
              >
                <span className="text-base font-semibold tracking-wide">Join the Waitlist</span>
                <svg aria-hidden="true" className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="bg-lime-400/10 border border-lime-400/20 text-lime-400 px-4 py-1.5 rounded-full text-sm font-medium">
                Free for early adopters
              </span>
            </div>
          </div>

          {/* Right: Massive phone mockup */}
          <div className="hero-enter hero-enter-delay-4 lg:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-[240px] sm:w-[320px] md:w-[400px] lg:w-[600px] xl:w-[720px] -rotate-[6deg] lg:translate-x-24 xl:translate-x-32">
              {/* Phone bezel */}
              <div className="bg-[#1d3449] rounded-[3rem] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-lime-400/10">
                <div className="rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/app-screens/app_image.webp"
                    alt="Perioskoup app showing daily oral care routine tracking and AI companion interface"
                    width={480}
                    height={960}
                    priority
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-500 text-xs animate-bounce">
          <span className="uppercase tracking-[0.2em]">Scroll</span>
          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ COMPARISON — "A Tale of Two Clinics" ═══════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <div className="reveal text-center mb-20 md:mb-28">
            <span className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">The new standard</span>
            <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] tracking-tight text-lime-50">
              A Tale of Two Clinics
            </h2>
            <p className="text-navy-300 text-lg md:text-xl max-w-2xl mx-auto mt-4">
              Discover how AI-driven insights transform the daily chaos of periodontal care into a streamlined, patient-centric workflow.
            </p>
          </div>

          {/* Comparison grid */}
          <div className="reveal-stagger relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20">
            {/* Central timeline (desktop) — thicker */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -ml-[1.5px] bg-gradient-to-b from-navy-700/30 via-lime-400/40 to-lime-400 glow-lime z-0" />

            {/* Column headers */}
            <div className="hidden md:block text-center pb-6 border-b border-white/5">
              <h3 className="font-heading text-[2.5rem] text-navy-500 leading-none">The Standard</h3>
            </div>
            <div className="hidden md:block text-center pb-6 border-b border-white/5">
              <h3 className="font-heading text-[2.5rem] text-lime-50 leading-none">With Perioskoup</h3>
            </div>

            {/* Rows */}
            {COMPARISON_ROWS.map((row, i) => (
              <div key={i} className="contents">
                {/* Problem card */}
                <div className="reveal-item flex flex-col items-end md:pr-12">
                  <div className="md:hidden text-navy-500 text-xs uppercase tracking-wider font-semibold mb-2">The Standard</div>
                  <div className="bg-red-500/5 border border-white/5 border-l-2 border-l-red-400/30 p-8 rounded-[2rem] w-full transition-all duration-300 hover:bg-navy-800/60">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mt-1">
                        <svg aria-hidden="true" className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-navy-300 text-lg mb-2">{row.problem.title}</h4>
                        <p className="text-navy-400 leading-relaxed text-sm">{row.problem.text}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solution card */}
                <div className="reveal-item flex flex-col items-start md:pl-12">
                  <div className="md:hidden text-lime-400 text-xs uppercase tracking-wider font-semibold mb-2 mt-4">With Perioskoup</div>
                  <div className="bg-navy-800 border border-lime-400/30 border-l-2 border-l-lime-400 p-8 rounded-[2rem] w-full shadow-[0_0_30px_-10px_rgba(192,229,122,0.1)] transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center mt-1 shadow-lg shadow-lime-400/20">
                        <svg aria-hidden="true" className="w-6 h-6 text-navy-950" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lime-50 text-lg mb-2">{row.solution.title}</h4>
                        <p className="text-lime-50/80 leading-relaxed text-sm">{row.solution.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal mt-20 flex flex-col items-center text-center">
            <p className="text-navy-400 uppercase tracking-[0.2em] text-sm mb-6">Ready to upgrade?</p>
            <Link
              href="/features"
              className="group flex items-center gap-3 rounded-[1rem] h-14 px-8 bg-navy-800 border border-lime-400/30 hover:border-lime-400 transition-all duration-300 text-lime-50 text-lg font-semibold"
            >
              <span>See the Dashboard</span>
              <svg aria-hidden="true" className="w-5 h-5 text-lime-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ BENTO FEATURES ═══════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <header className="reveal mb-12">
            <h2 className="font-heading text-[clamp(3rem,8vw,7.5rem)] leading-[0.8] tracking-tight text-lime-50">
              Precision Features
            </h2>
            <p className="text-navy-300 text-xl max-w-2xl mt-4">
              A modular ecosystem designed for the modern periodontist. Experience the synergy of AI analysis and patient behavior modification.
            </p>
          </header>

          {/* Bento grid — 3-column */}
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: AI Companion — spans 2 cols + 2 rows */}
            <div className="reveal-item titanium-card overflow-hidden relative flex flex-col min-h-[400px] md:min-h-[520px] md:col-span-2 md:row-span-2 shadow-[0_0_60px_-20px_rgba(192,229,122,0.08)]">
              <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-lime-400/5 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-navy-800 via-navy-800/90 to-transparent pt-20">
                <h3 className="font-heading text-[2.5rem] leading-none text-lime-50 mb-1">AI Companion</h3>
                <p className="text-navy-300 font-medium">Analyze. Predict. Prevent.</p>
              </div>
              <div className="flex-1 p-8 pb-32 flex flex-col justify-end relative">
                <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
                  {/* AI message */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center shrink-0 border border-lime-400/30">
                      <svg aria-hidden="true" className="w-4 h-4 text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                      </svg>
                    </div>
                    <div className="bg-navy-800 border border-navy-700/50 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                      <p className="text-sm text-navy-300 leading-relaxed">
                        Based on yesterday&apos;s scan, I&apos;ve detected a <span className="text-lime-400 font-semibold">12% reduction</span> in pocket depth for Patient #402. Inflammation markers are trending down.
                      </p>
                    </div>
                  </div>
                  {/* User message */}
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center shrink-0">
                      <svg aria-hidden="true" className="w-4 h-4 text-lime-50" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
                      </svg>
                    </div>
                    <div className="bg-lime-400 text-navy-950 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                      <p className="text-sm font-semibold leading-relaxed">
                        Generate a comparison chart for their next visit.
                      </p>
                    </div>
                  </div>
                  {/* Typing indicator */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center shrink-0 border border-lime-400/30">
                      <svg aria-hidden="true" className="w-4 h-4 text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                      </svg>
                    </div>
                    <div className="bg-navy-800 border border-navy-700/50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-lime-400/60 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-lime-400/60 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-lime-400/60 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                  {/* Input mock */}
                  <div className="mt-4 w-full bg-navy-950/50 border border-navy-700/30 rounded-full h-12 flex items-center px-4 justify-between">
                    <span className="text-navy-500 text-sm">Ask Perioskoup...</span>
                    <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                      <svg aria-hidden="true" className="w-4 h-4 text-navy-950" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Habit Tracking — horizontal bars for 1-col fit */}
            <div className="reveal-item titanium-card overflow-hidden flex flex-col min-h-[280px] shadow-[0_0_60px_-20px_rgba(192,229,122,0.08)]">
              <div className="flex-1 p-8 flex flex-col justify-center gap-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-lime-400 uppercase tracking-wider font-semibold w-12 shrink-0">Brush</span>
                  <div className="flex-1 h-3 bg-navy-900 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-400 rounded-full shadow-[0_0_10px_rgba(192,229,122,0.3)]" style={{ width: '82%' }} />
                  </div>
                  <span className="text-xs text-lime-400 font-semibold w-8 text-right">82%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-navy-400 uppercase tracking-wider w-12 shrink-0">Floss</span>
                  <div className="flex-1 h-3 bg-navy-900 rounded-full overflow-hidden">
                    <div className="h-full bg-navy-600/60 rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="text-xs text-navy-400 w-8 text-right">45%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-navy-400 uppercase tracking-wider w-12 shrink-0">Rinse</span>
                  <div className="flex-1 h-3 bg-navy-900 rounded-full overflow-hidden">
                    <div className="h-full bg-navy-600/60 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <span className="text-xs text-navy-400 w-8 text-right">60%</span>
                </div>
              </div>
              <div className="p-8 pt-0">
                <h3 className="font-heading text-[2.5rem] leading-none text-lime-50 mb-1">Habit Tracking</h3>
                <p className="text-navy-300 font-medium">Gamified engagement.</p>
              </div>
            </div>

            {/* Card 3: Dentist Dashboard — spans 2 cols */}
            <div className="reveal-item titanium-card overflow-hidden relative flex flex-col min-h-[280px] md:min-h-[300px] md:col-span-2 shadow-[0_0_60px_-20px_rgba(192,229,122,0.08)]">
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <svg className="w-full h-full" fill="none" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C0E57A" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#C0E57A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#234966" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#234966" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#234966" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#234966" strokeWidth="0.5" strokeDasharray="4 4" />
                  {/* Wave fill + line */}
                  <path d="M0 100 C 50 100, 50 40, 100 40 C 150 40, 150 110, 200 110 C 250 110, 250 20, 300 20 C 350 20, 350 90, 400 90 C 450 90, 450 60, 500 60 L 500 150 L 0 150 Z" fill="url(#fadeGrad)" />
                  <path d="M0 100 C 50 100, 50 40, 100 40 C 150 40, 150 110, 200 110 C 250 110, 250 20, 300 20 C 350 20, 350 90, 400 90 C 450 90, 450 60, 500 60" fill="none" stroke="#C0E57A" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="40" r="5" fill="#C0E57A" />
                  <circle cx="300" cy="20" r="5" fill="#C0E57A" />
                </svg>
              </div>
              <div className="absolute top-6 right-6 bg-navy-950/80 border border-navy-700/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-xs text-lime-400 font-mono font-semibold tracking-wider">LIVE DATA</span>
              </div>
              <div className="mt-auto p-8 relative z-20">
                <h3 className="font-heading text-[2.5rem] leading-none text-lime-50 mb-1">Dentist Dashboard</h3>
                <p className="text-navy-300 font-medium">Clinical Oversight.</p>
              </div>
            </div>

            {/* Card 4: Smart Reminders */}
            <div className="reveal-item titanium-card overflow-hidden flex flex-col justify-between min-h-[280px] md:min-h-[300px] shadow-[0_0_60px_-20px_rgba(192,229,122,0.08)]">
              <div className="flex-1 flex flex-col items-center justify-center relative p-8">
                <div className="absolute w-32 h-32 bg-lime-400/5 rounded-full animate-ping opacity-20" />
                <div className="relative">
                  <svg aria-hidden="true" className="w-20 h-20 text-navy-400" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                  <div className="absolute -top-1 -right-1 bg-lime-400 text-navy-950 font-semibold text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(192,229,122,0.6)] border-2 border-navy-800">
                    2
                  </div>
                </div>
                {/* Notification preview */}
                <div className="mt-6 bg-navy-950/50 border border-navy-700/30 rounded-2xl p-4 max-w-[220px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center">
                      <svg aria-hidden="true" className="w-3 h-3 text-lime-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                      </svg>
                    </div>
                    <span className="text-lime-50 text-[11px] font-medium">Perioskoup</span>
                    <span className="text-navy-500 text-[10px] ml-auto">now</span>
                  </div>
                  <p className="text-navy-300 text-xs leading-relaxed">Time to floss! Your evening routine builds consistency.</p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <h3 className="font-heading text-[2.5rem] leading-none text-lime-50 mb-1">Smart Reminders</h3>
                <p className="text-navy-300 font-medium">Timely nudges.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ AUTHORITY & PROOF ═══════════════════ */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="reveal relative z-10 flex flex-col items-center max-w-4xl mx-auto space-y-16">
          {/* EFP badge */}
          <div className="flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-default">
            <div className="h-20 w-20 border border-navy-700/40 rounded-full flex items-center justify-center">
              <svg aria-hidden="true" className="w-10 h-10 text-navy-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-navy-400 text-center leading-relaxed">
              Recognized by the<br />European Federation of Periodontology
            </p>
          </div>

          {/* Stat — combined on ONE line */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-navy-800 bg-navy-800/30 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
              </span>
              <span className="text-xs tracking-[0.15em] uppercase text-navy-400 font-medium">Founding Waitlist</span>
            </div>
            <ClinicCounter className="font-heading text-[clamp(5rem,14vw,12rem)] leading-[0.8] tracking-[-0.04em] text-lime-400" />
            <p className="text-navy-300 text-xl max-w-md mt-6 leading-relaxed">
              Already transforming patient engagement across Europe&rsquo;s top periodontal practices.
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-navy-800 to-transparent" />

          {/* The Team label */}
          <p className="perio-label text-center">The Team</p>

          {/* 3-founder grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {FOUNDERS.map((founder) => (
              <div key={founder.name} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    width={112}
                    height={112}
                    className="w-28 h-28 rounded-full object-cover border-2 border-lime-400/30 shadow-[0_0_30px_-5px_rgba(192,229,122,0.2)]"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-navy-950 rounded-full p-1 border border-navy-800">
                    <svg aria-hidden="true" className="w-5 h-5 text-lime-400 bg-navy-800 rounded-full p-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                </div>
                <h4 className="font-heading text-[2rem] leading-none text-lime-50 mb-1">{founder.name}</h4>
                <p className="text-lime-400 text-xs uppercase tracking-[0.1em] font-medium mb-1">{founder.role}</p>
                <p className="text-navy-500 text-xs mb-3">{founder.creds}</p>
                <p className="text-navy-400 text-sm max-w-[220px]">
                  &ldquo;{founder.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Trust row — pill styling with distinct icons */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8 border-t border-white/5 w-full max-w-2xl">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity bg-navy-800/30 px-4 py-2 rounded-full border border-navy-700/30">
                {badge.icon}
                <span className="text-xs text-navy-400 tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ WORKFLOW — "From Chair to Chat" ═══════════════════ */}
      <section
        className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto z-10">
          <div className="reveal text-center mb-20 md:mb-28">
            <span className="inline-block py-1 px-3 rounded-full border border-navy-700/40 text-navy-400 text-xs uppercase tracking-[0.15em] font-medium mb-4">
              Seamless Integration
            </span>
            <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.85] text-lime-50">
              From Chair <span className="text-lime-400">to Chat.</span>
            </h2>
            <p className="mt-6 text-navy-300 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps.
            </p>
          </div>

          {/* Steps */}
          <div className="reveal-stagger relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
            {/* SVG curved connector (desktop) */}
            <div
              className="reveal hidden md:block absolute top-0 left-0 right-0 h-[320px] pointer-events-none"
            >
              <svg className="w-full h-full" viewBox="0 0 1200 320" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="stepGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2f5f84" />
                    <stop offset="100%" stopColor="#c0e57a" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,100 C200,100 350,200 600,200 C850,200 1000,100 1200,100"
                  stroke="url(#stepGrad)"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {STEPS.map((step, i) => (
              <div key={step.number} className={`reveal-item flex flex-col items-center text-center ${i === 1 ? 'md:mt-20' : ''}`}>
                <div className="relative mb-8">
                  <div className={`${i === 1 ? 'w-44 h-44 md:w-48 md:h-48' : 'w-40 h-40 md:w-44 md:h-44'} rounded-full bg-navy-800 border border-navy-700/40 flex items-center justify-center relative transition-transform duration-500 hover:scale-105`}>
                    <div className="absolute inset-3 rounded-full border border-navy-700/30" />
                    <div className="text-lime-400">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 text-sm font-semibold px-3 py-1 rounded-full bg-lime-400 text-navy-950">
                    {step.number}
                  </div>
                </div>
                <h3 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-lime-50 mb-2 leading-none">{step.title}</h3>
                <p className="text-navy-300 text-lg max-w-[280px]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-20 md:mt-28 flex justify-center">
            <Link
              href="/features"
              className="group flex items-center gap-3 border border-navy-700/40 hover:border-lime-400 text-lime-50 px-8 py-4 rounded-full transition-all duration-300 hover:bg-navy-800/50"
            >
              <span className="font-medium text-lg tracking-wide">Explore Integration</span>
              <svg aria-hidden="true" className="w-5 h-5 text-lime-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════ KNOWLEDGE HUB / BLOG PREVIEW ═══════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="reveal mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold block mb-2">Knowledge Hub</span>
              <h2 className="font-heading text-[clamp(3rem,7vw,6rem)] leading-[0.85] text-lime-50">
                Clinical<br /><span className="text-navy-400">Intelligence.</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-lime-50 hover:text-lime-400 transition-colors text-lg font-medium"
            >
              <span>View all articles</span>
              <svg aria-hidden="true" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Blog grid — featured layout */}
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured post */}
            <Link
              href={BLOG_POSTS[0].slug}
              className="reveal-item titanium-card group md:col-span-2 md:row-span-2 relative overflow-hidden flex flex-col justify-end min-h-[400px] md:min-h-0"
            >
              {/* Abstract background */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/80 to-navy-800/40" />
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 600 400" fill="none">
                  <circle cx="150" cy="200" r="80" stroke="#c0e57a" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="300" cy="150" r="120" stroke="#3578aa" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="450" cy="250" r="60" stroke="#c0e57a" strokeWidth="0.5" opacity="0.3" />
                  <line x1="150" y1="200" x2="300" y2="150" stroke="#3578aa" strokeWidth="0.3" opacity="0.4" />
                  <line x1="300" y1="150" x2="450" y2="250" stroke="#c0e57a" strokeWidth="0.3" opacity="0.4" />
                  <line x1="150" y1="200" x2="450" y2="250" stroke="#3578aa" strokeWidth="0.3" opacity="0.2" />
                </svg>
              </div>
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-lime-400 text-navy-950 text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Featured</span>
                  <span className="text-navy-400 text-xs flex items-center gap-1.5">
                    <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {BLOG_POSTS[0].readTime}
                  </span>
                </div>
                <h3 className="font-heading text-[clamp(2.5rem,5vw,4rem)] text-lime-50 leading-tight mb-3 group-hover:text-lime-400 transition-colors">
                  {BLOG_POSTS[0].title}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-lg">{BLOG_POSTS[0].excerpt}</p>
                <div className="flex items-center gap-3">
                  <Image src="/team/team-anca.webp" alt="Dr. Anca Constantin" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-lime-50 text-sm font-medium">Dr. Anca Constantin</p>
                    <p className="text-navy-500 text-xs">PhD, Periodontology</p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Side cards */}
            {BLOG_POSTS.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={post.slug}
                className="reveal-item titanium-card group p-6 md:p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-lime-400 text-xs uppercase tracking-[0.15em] font-semibold">{post.category}</span>
                  <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 leading-tight mt-2 mb-2 group-hover:text-lime-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-navy-400 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <span className="text-navy-500 text-sm">{post.readTime}</span>
                  <svg aria-hidden="true" className="w-5 h-5 text-lime-50 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-3 mt-10">
            {['All Articles', 'Clinical Studies', 'AI Technology', 'Practice Growth'].map((cat, i) => (
              <Link
                key={cat}
                href="/blog"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? 'bg-lime-400 text-navy-950'
                    : 'border border-navy-700/40 text-navy-400 hover:border-lime-400/40 hover:text-lime-50'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA / WAITLIST ═══════════════════ */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 bg-[#050c10] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-lime-400/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="reveal relative max-w-2xl mx-auto text-center z-10">
          <span className="text-lime-400 text-sm md:text-base font-semibold tracking-[0.05em] uppercase mb-4 block opacity-80">
            Membership
          </span>
          <h2 className="font-heading text-[clamp(3.5rem,8vw,7rem)] leading-[0.8] tracking-tight text-lime-50 mb-6">
            Titanium access closing soon
          </h2>
          <p className="text-navy-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-12">
            Join the inner circle. Be the first to experience the future of periodontal care intelligence.
          </p>

          <InlineWaitlistForm />

          <p className="text-navy-500 text-xs text-center mt-6 flex items-center justify-center gap-2">
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Encrypted. No spam. Unsubscribe anytime. Read our{' '}
            <Link href="/privacy" className="text-lime-400 hover:text-lime-300 underline">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
