import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import HomeAnimations from './HomeAnimations'
import WaitlistForm from './waitlist/WaitlistForm'

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
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5ZM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'AI maps risk zones & translates perio charts into habits.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Engage',
    description: 'Patients receive actionable nudges on their device.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12 md:w-16 md:h-16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
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

/* ─── Component ─── */

export default function Home() {
  return (
    <HomeAnimations>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        data-hero-section
        className="relative min-h-screen flex items-center pt-24 md:pt-20 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left: Typography */}
          <div className="lg:col-span-5">
            {/* Badge */}
            <div
              data-gsap="hero-text"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-navy-700/50 text-navy-300 mb-8"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-lime-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <span className="text-xs uppercase tracking-[0.15em] font-medium">EFP Innovation Award 2025</span>
            </div>

            {/* Headline — Dongle at massive scale */}
            <h1 data-gsap="hero-text" className="font-heading text-[clamp(3.5rem,10vw,10rem)] leading-[0.8] tracking-[-0.04em] text-lime-50 mb-6">
              Precision<br />
              <span className="text-lime-400/90">Perio.</span>
            </h1>

            {/* Quote */}
            <div data-gsap="hero-text" className="flex flex-col gap-2 mb-10 max-w-md pl-4 border-l-2 border-lime-400/20">
              <p className="text-lg md:text-xl text-navy-300 leading-relaxed">
                &ldquo;Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes.&rdquo;
              </p>
              <span className="text-sm font-medium text-navy-400 uppercase tracking-wider">&mdash; Dr. Anca Constantin</span>
            </div>

            {/* CTA */}
            <div data-gsap="hero-text" className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/waitlist"
                className="group flex items-center gap-3 bg-lime-400 hover:bg-lime-300 text-navy-950 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(192,229,122,0.3)]"
              >
                <span className="text-base font-semibold tracking-wide">Join the Waitlist</span>
                <svg aria-hidden="true" className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="text-navy-400 text-sm">Free for early adopters</span>
            </div>
          </div>

          {/* Right: Massive phone mockup */}
          <div data-gsap="hero-phone" className="lg:col-span-7 relative flex justify-center lg:justify-end">
            <div className="relative w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] -rotate-[6deg] lg:translate-x-12">
              {/* Phone bezel */}
              <div className="bg-[#1a1a1a] rounded-[3rem] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
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

      {/* ═══════════════════ COMPARISON — "A Tale of Two Clinics" ═══════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <div data-gsap="fade-up" className="text-center mb-20 md:mb-28">
            <span className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4 block">The new standard</span>
            <h2 className="font-heading text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] tracking-tight text-lime-50">
              A Tale of Two Clinics
            </h2>
            <p className="text-navy-300 text-lg md:text-xl max-w-2xl mx-auto mt-4">
              Discover how AI-driven insights transform the daily chaos of periodontal care into a streamlined, patient-centric workflow.
            </p>
          </div>

          {/* Comparison grid */}
          <div data-gsap-stagger className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20">
            {/* Central timeline (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -ml-[1px] bg-gradient-to-b from-navy-700/30 via-lime-400/40 to-lime-400 glow-lime z-0" />

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
                <div data-gsap="stagger-item" className="flex flex-col items-end md:pr-12">
                  <div className="md:hidden text-navy-500 text-xs uppercase tracking-wider font-semibold mb-2">The Standard</div>
                  <div className="bg-navy-800/40 border border-white/5 p-8 rounded-[2rem] w-full transition-all duration-300 hover:bg-navy-800/60">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mt-1">
                        <svg aria-hidden="true" className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
                <div data-gsap="stagger-item" className="flex flex-col items-start md:pl-12">
                  <div className="md:hidden text-lime-400 text-xs uppercase tracking-wider font-semibold mb-2 mt-4">With Perioskoup</div>
                  <div className="bg-navy-800 border border-lime-400/20 p-8 rounded-[2rem] w-full shadow-[0_0_30px_-10px_rgba(192,229,122,0.1)] transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center mt-1 shadow-lg shadow-lime-400/20">
                        <svg aria-hidden="true" className="w-5 h-5 text-navy-950" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
          <div data-gsap="fade-up" className="mt-20 flex flex-col items-center text-center">
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

      {/* ═══════════════════ BENTO FEATURES ═══════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <header data-gsap="fade-up" className="mb-12">
            <h2 className="font-heading text-[clamp(3rem,8vw,7.5rem)] leading-[0.8] tracking-tight text-lime-50">
              Precision Features
            </h2>
            <p className="text-navy-300 text-xl max-w-2xl mt-4">
              A modular ecosystem designed for the modern periodontist. Experience the synergy of AI analysis and patient behavior modification.
            </p>
          </header>

          {/* Bento grid */}
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)] md:auto-rows-[minmax(320px,auto)]">
            {/* Card 1: AI Companion (2x2) */}
            <div data-gsap="stagger-item" className="titanium-card col-span-1 md:col-span-2 md:row-span-2 overflow-hidden relative flex flex-col min-h-[400px] md:min-h-0">
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

            {/* Card 2: Habit Tracking (1x2) */}
            <div data-gsap="stagger-item" className="titanium-card col-span-1 md:row-span-2 overflow-hidden flex flex-col min-h-[360px] md:min-h-0">
              <div className="flex-1 p-8 flex flex-col justify-center items-center gap-8">
                <div className="flex items-end gap-6 h-64 w-full justify-center px-4">
                  <div className="flex flex-col items-center gap-3 w-12">
                    <div className="relative w-full bg-navy-950/50 rounded-full h-48 overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full bg-navy-600/40 h-[45%] rounded-full" />
                    </div>
                    <span className="text-xs text-navy-400 uppercase tracking-wider">Floss</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 w-12">
                    <div className="relative w-full bg-navy-950/50 rounded-full h-64 overflow-hidden shadow-[0_0_15px_rgba(192,229,122,0.15)]">
                      <div className="absolute bottom-0 left-0 w-full bg-lime-400 h-[82%] rounded-full" />
                    </div>
                    <span className="text-xs text-lime-400 uppercase tracking-wider font-semibold">Brush</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 w-12">
                    <div className="relative w-full bg-navy-950/50 rounded-full h-48 overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full bg-navy-600/40 h-[60%] rounded-full" />
                    </div>
                    <span className="text-xs text-navy-400 uppercase tracking-wider">Rinse</span>
                  </div>
                </div>
              </div>
              <div className="p-8 pt-0">
                <h3 className="font-heading text-[2.5rem] leading-none text-lime-50 mb-1">Habit Tracking</h3>
                <p className="text-navy-300 font-medium">Gamified engagement.</p>
              </div>
            </div>

            {/* Card 3: Dentist Dashboard (2x1) */}
            <div data-gsap="stagger-item" className="titanium-card col-span-1 md:col-span-2 overflow-hidden relative flex flex-col min-h-[280px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <svg className="w-full h-full" fill="none" viewBox="0 0 500 150" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C0E57A" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#C0E57A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 100 C 50 100, 50 40, 100 40 C 150 40, 150 110, 200 110 C 250 110, 250 20, 300 20 C 350 20, 350 90, 400 90 C 450 90, 450 60, 500 60 L 500 150 L 0 150 Z" fill="url(#fadeGrad)" />
                  <path d="M0 100 C 50 100, 50 40, 100 40 C 150 40, 150 110, 200 110 C 250 110, 250 20, 300 20 C 350 20, 350 90, 400 90 C 450 90, 450 60, 500 60" fill="none" stroke="#C0E57A" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="100" cy="40" r="4" fill="#C0E57A" />
                  <circle cx="300" cy="20" r="4" fill="#C0E57A" />
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

            {/* Card 4: Smart Reminders (1x1) */}
            <div data-gsap="stagger-item" className="titanium-card col-span-1 overflow-hidden flex flex-col justify-between min-h-[320px]">
              <div className="flex-1 flex items-center justify-center relative">
                <div className="absolute w-32 h-32 bg-lime-400/5 rounded-full animate-ping opacity-20" />
                <div className="relative">
                  <svg aria-hidden="true" className="w-20 h-20 text-navy-400" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                  </svg>
                  <div className="absolute -top-1 -right-1 bg-lime-400 text-navy-950 font-semibold text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(192,229,122,0.6)] border-2 border-navy-800">
                    2
                  </div>
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

      {/* ═══════════════════ AUTHORITY & PROOF ═══════════════════ */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div data-gsap="fade-up" className="relative z-10 flex flex-col items-center max-w-4xl mx-auto space-y-16">
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

          {/* Stat */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-navy-800 bg-navy-800/30 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
              </span>
              <span className="text-xs tracking-[0.15em] uppercase text-navy-400 font-medium">Founding Waitlist</span>
            </div>
            <h2
              data-clinic-counter
              data-gsap
              className="font-heading text-[clamp(4rem,12vw,10rem)] leading-[0.8] tracking-[-0.04em] text-lime-400"
            >
              30+
            </h2>
            <p className="font-heading text-[clamp(2rem,5vw,5rem)] leading-[0.8] tracking-[-0.04em] text-lime-400 mt-2">
              Clinics
            </p>
            <p className="text-navy-300 text-xl max-w-md mt-6 leading-relaxed">
              Already transforming patient engagement across Europe&rsquo;s top periodontal practices.
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-navy-800 to-transparent" />

          {/* Profile card */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-navy-800/40 border border-white/5 rounded-[2rem] p-8 md:pr-12 hover:bg-navy-800/60 transition-colors duration-300">
            <div className="relative">
              <Image
                src="/team/team-anca.webp"
                alt="Dr. Anca Constantin"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-2 border-lime-400/20 grayscale"
              />
              <div className="absolute -bottom-1 -right-1 bg-navy-950 rounded-full p-1 border border-navy-800">
                <svg aria-hidden="true" className="w-5 h-5 text-lime-400 bg-navy-800 rounded-full p-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <h4 className="font-heading text-[2.5rem] leading-none text-lime-50 mb-1">Dr. Anca Constantin</h4>
              <p className="text-lime-400 text-sm uppercase tracking-[0.1em] font-medium mb-2">DMD, PhD in Periodontology</p>
              <p className="text-navy-400 text-sm max-w-xs">
                &ldquo;We built Perioskoup to bridge the gap between clinical precision and patient psychology.&rdquo;
              </p>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/5 w-full max-w-2xl">
            {['GDPR Ready', 'End-to-End Encrypted', 'Privacy-First'].map((item) => (
              <div key={item} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                <svg aria-hidden="true" className="w-5 h-5 text-navy-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <span className="text-xs text-navy-400 tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WORKFLOW — "From Chair to Chat" ═══════════════════ */}
      <section
        data-steps-section
        className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto z-10">
          <div data-gsap="fade-up" className="text-center mb-20 md:mb-28">
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
          <div data-gsap-stagger className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
            {/* Connector line (desktop) */}
            <div
              data-gsap="step-line"
              className="hidden md:block absolute top-[100px] left-[16.67%] right-[16.67%] h-px bg-lime-400/30 origin-left"
            />

            {STEPS.map((step, i) => (
              <div key={step.number} data-gsap="stagger-item" className={`flex flex-col items-center text-center ${i === 1 ? 'md:mt-16' : ''}`}>
                <div className="relative mb-8">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-navy-800 border border-white/5 flex items-center justify-center glow-lime transition-transform duration-500 hover:scale-105">
                    <div className="absolute inset-0 rounded-full border border-white/5 scale-90" />
                    <div className="text-lime-400">{step.icon}</div>
                  </div>
                  <div className={`absolute -top-2 -right-2 text-sm font-semibold px-3 py-1 rounded-full ${i === 0 ? 'bg-lime-400 text-navy-950' : 'bg-navy-800 border border-navy-700/50 text-lime-50'}`}>
                    {step.number}
                  </div>
                </div>
                <h3 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] text-lime-50 mb-2 leading-none">{step.title}</h3>
                <p className="text-navy-300 text-lg max-w-[280px]">{step.description}</p>
              </div>
            ))}
          </div>

          <div data-gsap="fade-up" className="mt-20 md:mt-28 flex justify-center">
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

      {/* ═══════════════════ KNOWLEDGE HUB / BLOG PREVIEW ═══════════════════ */}
      <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div data-gsap="fade-up" className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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

          {/* Blog grid */}
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={post.slug}
                data-gsap="stagger-item"
                className="titanium-card group p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="text-lime-400 text-xs uppercase tracking-[0.15em] font-semibold">{post.category}</span>
                  <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 leading-tight mt-3 mb-3 group-hover:text-lime-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-navy-400 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <span className="text-navy-500 text-sm">{post.readTime}</span>
                  <svg aria-hidden="true" className="w-5 h-5 text-lime-50 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA / WAITLIST ═══════════════════ */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 bg-[#050c10] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-lime-400/5 blur-[120px] rounded-full pointer-events-none" />

        <div data-gsap="fade-up" className="relative max-w-2xl mx-auto text-center z-10">
          <span className="text-lime-400 text-sm md:text-base font-semibold tracking-[0.05em] uppercase mb-4 block opacity-80">
            Membership
          </span>
          <h2 className="font-heading text-[clamp(3.5rem,8vw,7rem)] leading-[0.8] tracking-tight text-lime-50 mb-6">
            Titanium access closing soon
          </h2>
          <p className="text-navy-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-12">
            Join the inner circle. Be the first to experience the future of periodontal care intelligence.
          </p>

          <WaitlistForm />

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
    </HomeAnimations>
  )
}
