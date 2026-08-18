import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HELP_CHANNELS } from '@/content/helpChannels'
import { HelpChannelCard } from '@/components/shared/HelpChannelCard'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HelpResources() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const cards = gsap.utils.toArray<HTMLElement>('.help-card')

      if (prefersReducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 })
        return
      }

      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="bg-dusk-950 px-6 py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10">
        <h2 className="font-display text-3xl text-mist-100">Canais de Ajuda</h2>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {HELP_CHANNELS.map((channel) => (
            <div key={channel.id} className="help-card">
              <HelpChannelCard
                icon={channel.icon}
                title={channel.title}
                description={channel.description}
                href={channel.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
