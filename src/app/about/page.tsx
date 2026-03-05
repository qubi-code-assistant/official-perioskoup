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
  },
  {
    title: 'Privacy-First',
    description:
      'GDPR-ready from day one. Patient data is encrypted, protected, and never sold. Trust is non-negotiable.',
  },
  {
    title: 'Outcome-Focused',
    description:
      'We measure success by healthier habits and stronger connections \u2014 not vanity metrics.',
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
      <section className="pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-tight text-lime-50">
            Our Story
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-navy-300 leading-relaxed">
            Perioskoup was born in a dental clinic — from the real frustrations
            of a periodontist who saw too many patients struggle between visits.
            We&apos;re building the bridge between the chair and daily life.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-tight text-lime-50 text-center">
            Meet the Team
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8 flex flex-col"
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={400}
                  height={533}
                  className="rounded-2xl object-cover w-full aspect-[3/4]"
                />
                <h3 className="font-heading text-[clamp(1.5rem,3vw,2rem)] leading-tight text-lime-50 mt-6">
                  {member.name}
                </h3>
                <p className="text-lime-400 text-sm mt-1">{member.role}</p>
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
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-tight text-lime-50 text-center">
            Our Values
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-navy-800/40 border border-navy-700/50 rounded-2xl p-8"
              >
                <h3 className="font-heading text-[clamp(1.5rem,3vw,2rem)] leading-tight text-lime-400">
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
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-navy-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-tight text-lime-50">
            EFP Digital Innovation Award 2025
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-navy-300 leading-relaxed">
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
