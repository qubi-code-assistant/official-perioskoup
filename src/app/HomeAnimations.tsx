'use client'

import { useRef, useEffect } from 'react'

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

          /* Scroll reveals */
          document.querySelectorAll<HTMLElement>('[data-gsap="fade-up"]').forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
              }
            )
          })

          /* Stagger groups */
          document.querySelectorAll<HTMLElement>('[data-gsap-stagger]').forEach((group) => {
            const items = group.querySelectorAll('[data-gsap="stagger-item"]')
            gsap.fromTo(
              items,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: { trigger: group, start: 'top 85%', once: true },
              }
            )
          })

          /* Stat counters */
          document.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
            const endValue = parseFloat(el.getAttribute('data-count-to') || '0')
            const suffix = el.getAttribute('data-count-suffix') || ''
            el.textContent = `0${suffix}`
            const counter = { val: 0 }
            gsap.fromTo(
              el,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
              }
            )
            gsap.to(counter, {
              val: endValue,
              duration: 2,
              ease: 'power1.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
              onUpdate: () => {
                el.textContent = `${Math.round(counter.val)}${suffix}`
              },
            })
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

          /* Titanium cards: subtle scale on scroll reveal */
          document.querySelectorAll<HTMLElement>('.titanium-card').forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 30, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true },
              }
            )
          })
        })
      }, containerRef)
    }

    init()
    return () => { ctx?.revert() }
  }, [])

  return <div ref={containerRef} className="overflow-x-hidden">{children}</div>
}
