'use client'

import { useRef, useEffect } from 'react'

/**
 * Global scroll-reveal animations for all pages.
 * Uses GSAP + ScrollTrigger with data-gsap attributes.
 * Respects prefers-reduced-motion.
 *
 * Supported attributes:
 * - data-gsap="fade-up"       → fade + slide up on scroll
 * - data-gsap="stagger-item"  → staggered reveal within data-gsap-stagger parent
 * - .titanium-card            → subtle scale + fade reveal
 */
export default function ScrollReveal({ children }: { children: React.ReactNode }) {
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
          /* Scroll reveals: fade-up */
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

          /* Titanium cards: subtle scale reveal */
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

  return <div ref={containerRef}>{children}</div>
}
