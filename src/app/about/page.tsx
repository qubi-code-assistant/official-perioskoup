import Image from 'next/image'
import { createMetadata } from '@/lib/metadata'
import { physicianSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata = createMetadata({
  title: 'About',
  description:
    'Meet the team behind Perioskoup — a periodontist, an engineer, and an AI specialist building the future of dental patient engagement.',
  path: '/about',
})

const team = [
  {
    name: 'Dr. Anca Laura Constantin',
    role: 'Periodontist & CEO',
    photo: '/team/team-anca.webp',
    linkedin: 'https://linkedin.com/in/anca-constantin-99800633b/',
    bio: 'Board-certified periodontist and EFP Digital Innovation Award Winner 2025. Dr. Anca brings over a decade of clinical experience and a passion for improving patient outcomes through better engagement between visits.',
  },
  {
    name: 'Eduard Ciugulea',
    role: 'CGO & Technical Co-Founder',
    photo: '/team/team-eduard.webp',
    linkedin: 'https://linkedin.com/in/eduard-ciugulea/',
    bio: 'Full-stack engineer and growth strategist with experience scaling digital health products. Eduard bridges the gap between clinical needs and technical solutions.',
  },
  {
    name: 'Petrica Nancu',
    role: 'CTO & Head of AI',
    photo: '/team/team-petrica.webp',
    linkedin: 'https://linkedin.com/in/petrica-nancu-b16468241/',
    bio: 'AI and machine learning specialist focused on building intelligent systems that make oral care more personal and engaging for every patient.',
  },
]

const values = [
  {
    title: 'Clinician-First',
    description:
      'Every feature starts with a real clinical need. We build tools that respect the dentist\u2019s time and expertise.',
    icon: (
      <svg className="w-8 h-8 text-lime-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: 'Privacy-First',
    description:
      'GDPR-ready from day one. Patient data is encrypted, protected, and never sold. Trust is non-negotiable.',
    icon: (
      <svg className="w-8 h-8 text-lime-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: 'Outcome-Focused',
    description:
      'We measure success by healthier habits and stronger connections \u2014 not vanity metrics.',
    icon: (
      <svg className="w-8 h-8 text-lime-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(physicianSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'About', url: '/about' },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div data-gsap="fade-up" className="relative z-10 max-w-[1200px] mx-auto text-center">
          <p className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold mb-6">
            Our Mission
          </p>
          <h1 className="font-heading text-[clamp(4rem,10vw,7.5rem)] leading-[0.8] tracking-tight text-lime-50">
            Our Story
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-navy-300 leading-relaxed">
            Perioskoup was born in a dental clinic — from the real frustrations
            of a periodontist who saw too many patients struggle between visits.
            We&apos;re building the bridge between the chair and daily life.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div data-gsap="fade-up" className="text-center mb-16">
            <p className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              The People
            </p>
            <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.85] tracking-tight text-lime-50">
              Meet the Team
            </h2>
          </div>
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                data-gsap="stagger-item"
                className="titanium-card p-8 flex flex-col"
              >
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role} at Perioskoup`}
                    width={400}
                    height={533}
                    className="rounded-2xl object-cover w-full aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.85] text-lime-50 mt-6">
                  {member.name}
                </h3>
                <p className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold mt-2">{member.role}</p>
                <p className="text-navy-300 text-sm leading-relaxed mt-4 flex-1">
                  {member.bio}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="mt-6 inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div data-gsap="fade-up" className="text-center mb-16">
            <p className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              What We Stand For
            </p>
            <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] leading-[0.85] tracking-tight text-lime-50">
              Our Values
            </h2>
          </div>
          <div data-gsap-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                data-gsap="stagger-item"
                className="titanium-card p-8"
              >
                <div className="mb-5">
                  {value.icon}
                </div>
                <h3 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] leading-[0.85] text-lime-400">
                  {value.title}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed mt-4">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Award */}
      <section className="relative py-24 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Ambient glow — larger for impact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-lime-400/8 rounded-full blur-[80px] pointer-events-none" />

        <div data-gsap="fade-up" className="relative z-10 max-w-[1200px] mx-auto text-center">
          <div className="inline-block py-1.5 px-4 rounded-full border border-lime-400/20 bg-lime-400/5 mb-8">
            <p className="text-lime-400 text-xs uppercase tracking-[0.2em] font-semibold">
              Recognition
            </p>
          </div>
          <h2 className="font-heading text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.8] tracking-tight text-lime-50">
            EFP Digital Innovation
            <br />
            <span className="text-lime-400">Award 2025</span>
          </h2>
          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-navy-300 leading-relaxed">
            Perioskoup was recognised by the European Federation of
            Periodontology with the Digital Innovation Award 2025 for its
            approach to strengthening the connection between dental
            professionals and patients between visits.
          </p>
        </div>
      </section>
    </>
  )
}
