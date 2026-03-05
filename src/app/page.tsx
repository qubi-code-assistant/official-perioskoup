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

const FEATURES = [
  {
    title: 'AI Companion',
    description:
      'Personalized daily support that helps patients build lasting oral care routines between visits.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: 'Habit Tracking',
    description:
      'Simple, visual tracking that keeps patients engaged and motivated every single day.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'Dentist Dashboard',
    description:
      'Real-time visibility into patient engagement patterns across your entire practice.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
  {
    title: 'Smart Reminders',
    description:
      "Gentle, timely nudges that fit naturally into your patients' daily lives.",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Connect',
    description: 'Add your patients to Perioskoup in seconds from your existing practice software.',
  },
  {
    number: '02',
    title: 'Engage',
    description:
      'Patients receive personalized daily routines, habit prompts, and educational content.',
  },
  {
    number: '03',
    title: 'Grow',
    description: 'Track engagement patterns and strengthen the connection with every patient.',
  },
]

const BLOG_POSTS = [
  {
    title: 'Why AI Is Changing Dental Patient Engagement',
    excerpt:
      'Artificial intelligence is reshaping how dental practices connect with patients between visits. Discover how AI-powered tools are building stronger habits and healthier outcomes.',
    date: '28 Feb 2026',
    category: 'Clinical',
    slug: '/blog/why-ai-is-changing-dental-patient-engagement',
  },
  {
    title: 'How Perioskoup Helps Reduce No-Shows by 40%',
    excerpt:
      'Missed appointments cost dental practices thousands each year. Learn how daily patient engagement and smart habit support are transforming appointment attendance.',
    date: '21 Feb 2026',
    category: 'Product',
    slug: '/blog/how-perioskoup-helps-reduce-no-shows',
  },
  {
    title: 'The Hidden Cost of Poor Patient Habits in Periodontal Care',
    excerpt:
      'Poor daily oral care habits between dental visits carry enormous hidden costs for practices and patients. Learn the real impact and how to turn the tide.',
    date: '14 Feb 2026',
    category: 'Industry',
    slug: '/blog/hidden-cost-of-poor-patient-habits-in-periodontal-care',
  },
]

const WITHOUT_ITEMS = [
  'Patients forget their routines between visits',
  'Low engagement leads to missed appointments',
  'Limited visibility into daily habits',
  'Time lost re-educating at every visit',
]

const WITH_ITEMS = [
  'Daily habit support keeps patients engaged',
  'Smart reminders reduce missed appointments',
  'Full visibility into engagement patterns',
  'Patients arrive prepared and informed',
]

const STATS = [
  { value: 15, suffix: 'min', label: 'Saved per patient visit' },
  { value: 40, suffix: '%', label: 'Fewer missed appointments' },
  { value: 92, suffix: '%', label: 'Patient engagement rate' },
  { value: 3, suffix: 'x', label: 'Better habit consistency' },
]

/* ─── Component ─── */

export default function Home() {
  return (
    <HomeAnimations>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        data-hero-section
        className="relative min-h-screen flex items-center pt-24 md:pt-20 pb-16 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p
              data-gsap="hero-text"
              className="text-lime-400 text-sm md:text-base tracking-widest uppercase mb-4"
            >
              AI Dental Companion
            </p>
            <blockquote data-gsap="hero-text" className="mb-8">
              <p className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-lime-50">
                &ldquo;Perioskoup was born out of two big challenges that we face in practice: a
                shortage of time and the lack of patient engagement, which leads to poor
                outcomes.&rdquo;
              </p>
            </blockquote>
            <p data-gsap="hero-text" className="text-navy-300 text-base md:text-lg mb-1">
              &mdash; Dr. Anca Constantin, Co-Founder &amp; Periodontist
            </p>
            <p data-gsap="hero-text" className="text-lime-400 text-sm mb-8">
              EFP Digital Innovation Award Winner 2025
            </p>
            <div
              data-gsap="hero-text"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                href="/waitlist"
                className="bg-lime-400 text-navy-950 px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-lime-300 transition-colors"
              >
                Join the Waitlist
              </Link>
              <span className="text-navy-300 text-sm">Free for early adopters</span>
            </div>
          </div>

          <div data-gsap="hero-phone" className="relative flex justify-center lg:justify-end">
            <div className="relative w-[280px] md:w-[320px] lg:w-[360px]">
              <Image
                src="/app-screens/app_image.webp"
                alt="Perioskoup app showing daily oral care routine tracking"
                width={360}
                height={720}
                priority
                className="rounded-3xl shadow-2xl shadow-navy-950/50"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-300 text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-navy-400 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════ PROBLEM / SOLUTION ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div data-gsap="fade-up" className="text-center mb-16">
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
              A Week in Two Practices
            </h2>
            <p className="mt-4 text-navy-300 text-lg max-w-2xl mx-auto">
              See the difference when patients stay connected between visits.
            </p>
          </div>

          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div
              data-gsap="stagger-item"
              className="bg-navy-900/50 border border-navy-700/50 rounded-2xl p-8"
            >
              <p className="text-navy-300 text-sm uppercase tracking-widest mb-6">
                Without Perioskoup
              </p>
              <ul className="space-y-4">
                {WITHOUT_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy-300">
                    <span aria-hidden="true" className="mt-1.5 w-2 h-2 rounded-full bg-navy-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-gsap="stagger-item"
              className="bg-navy-800/30 border border-lime-400/20 rounded-2xl p-8"
            >
              <p className="text-lime-400 text-sm uppercase tracking-widest mb-6">
                With Perioskoup
              </p>
              <ul className="space-y-4">
                {WITH_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lime-50">
                    <span aria-hidden="true" className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="font-heading text-[clamp(3rem,6vw,4.5rem)] text-lime-400 leading-none"
                  data-gsap
                  data-count-to={stat.value}
                  data-count-suffix={stat.suffix}
                >
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-navy-300 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <div data-gsap="fade-up" className="text-center mb-16">
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
              Everything Your Practice Needs
            </h2>
            <p className="mt-4 text-navy-300 text-lg max-w-2xl mx-auto">
              One platform to engage patients, build habits, and strengthen connections between
              visits.
            </p>
          </div>

          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                data-gsap="stagger-item"
                className="group bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8 hover:border-lime-400/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center mb-6 group-hover:bg-lime-400/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-[clamp(1.8rem,3vw,2.5rem)] text-lime-50 mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-navy-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOCIAL PROOF ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-gsap="fade-up">
              <Image
                src="/award_ceremony.webp"
                alt="Dr. Anca Constantin receiving the EFP Digital Innovation Award 2025"
                width={640}
                height={427}
                className="rounded-2xl"
              />
              <p className="text-navy-300 text-sm mt-4">
                EFP Digital Innovation Award Ceremony, 2025
              </p>
            </div>

            <div>
              <div data-gsap="fade-up" className="mb-12">
                <p className="text-lime-400 text-sm uppercase tracking-widest mb-4">
                  Trusted by Professionals
                </p>
                <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50 mb-6">
                  Award-Winning Innovation
                </h2>
                <p className="text-navy-300 text-lg leading-relaxed">
                  Perioskoup won the EFP Digital Innovation Award 2025, recognised by Europe&rsquo;s
                  leading periodontology federation for transforming how dental practices connect
                  with patients between visits.
                </p>
              </div>

              <div data-gsap="fade-up" className="flex items-center gap-8 mb-8">
                <div className="text-center">
                  <p
                    data-clinic-counter
                    data-gsap
                    className="font-heading text-[clamp(3.5rem,7vw,5rem)] text-lime-400 leading-none"
                  >
                    30+
                  </p>
                  <p className="text-navy-300 text-sm mt-1">Clinics on Waitlist</p>
                </div>
                <div className="w-px h-16 bg-navy-700" />
                <div>
                  <p className="text-lime-50 font-semibold mb-1">Dr. Anca Laura Constantin</p>
                  <p className="text-navy-300 text-sm">Periodontist &amp; CEO</p>
                  <p className="text-navy-300 text-sm">EFP Award Winner 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section
        data-steps-section
        className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy-900/30"
      >
        <div className="max-w-7xl mx-auto">
          <div data-gsap="fade-up" className="text-center mb-16">
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
              How It Works
            </h2>
            <p className="mt-4 text-navy-300 text-lg max-w-2xl mx-auto">
              Get started in minutes, not months.
            </p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div
              data-gsap="step-line"
              className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-lime-400/30 origin-left"
            />

            <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {STEPS.map((step) => (
                <div key={step.number} data-gsap="stagger-item" className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-navy-800 border border-lime-400/30 mb-6">
                    <span aria-hidden="true" className="font-heading text-[2.5rem] text-lime-400 leading-none">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-heading text-[clamp(2rem,3vw,2.8rem)] text-lime-50 mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-navy-300 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ BLOG PREVIEW ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div
            data-gsap="fade-up"
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
                From the Blog
              </h2>
              <p className="mt-2 text-navy-300 text-lg">
                Insights on patient engagement and dental innovation.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-lime-400 text-sm hover:text-lime-300 transition-colors shrink-0"
            >
              View all posts &rarr;
            </Link>
          </div>

          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={post.slug}
                data-gsap="stagger-item"
                className="group block bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8 hover:border-lime-400/30 transition-colors"
              >
                <p className="text-lime-400 text-xs uppercase tracking-widest mb-3">
                  {post.category}
                </p>
                <h3 className="font-heading text-[clamp(1.5rem,2.5vw,2rem)] text-lime-50 mb-3 leading-tight group-hover:text-lime-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <p className="text-navy-300 text-xs">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ WAITLIST FORM ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy-900/30">
        <div className="max-w-2xl mx-auto">
          <div data-gsap="fade-up" className="text-center mb-12">
            <h2 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
              Ready to Transform Your Practice?
            </h2>
            <p className="mt-4 text-navy-300 text-lg">
              Join 30+ clinics already on the waitlist. Free for early adopters.
            </p>
          </div>

          <div data-gsap="fade-up">
            <WaitlistForm />
            <p className="text-navy-300 text-xs text-center mt-6">
              No spam, ever. Read our{' '}
              <Link href="/privacy" className="text-lime-400 hover:text-lime-300 underline">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </HomeAnimations>
  )
}
