'use client'

import { useRef, useEffect } from 'react'

/**
 * Homepage-specific animations: hero entrance, parallax, clinic counter, step line.
 * Generic scroll reveals (fade-up, stagger, titanium-card) are handled by ScrollReveal in layout.
 */
export default function HomeAnimations({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap')['default']['context']> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          /* Hero entrance */
          const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
          heroTl
            .fromTo(
              '[data-gsap="hero-text"]',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
            )
            .fromTo(
              '[data-gsap="hero-phone"]',
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
              '-=0.4'
            )

          /* Hero parallax */
          gsap.to('[data-gsap="hero-phone"]', {
            y: -100,
            scrollTrigger: {
              trigger: '[data-hero-section]',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          })

          /* 30-clinic counter */
          const clinicCounter = document.querySelector<HTMLElement>('[data-clinic-counter]')
          if (clinicCounter) {
            const target = { val: 0 }
            gsap.fromTo(
              clinicCounter,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: { trigger: clinicCounter, start: 'top 85%', once: true },
              }
            )
            gsap.to(target, {
              val: 30,
              duration: 2.5,
              ease: 'power1.out',
              scrollTrigger: { trigger: clinicCounter, start: 'top 85%', once: true },
              onUpdate: () => {
                clinicCounter.textContent = `${Math.round(target.val)}+`
              },
            })
          }

          /* Steps connector line */
          gsap.fromTo(
            '[data-gsap="step-line"]',
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: '[data-steps-section]',
                start: 'top 80%',
                once: true,
              },
            }
          )
        })
      }, containerRef)
    }

    init()
    return () => { ctx?.revert() }
  }, [])

  return <div ref={containerRef} className="overflow-x-hidden">{children}</div>
}
