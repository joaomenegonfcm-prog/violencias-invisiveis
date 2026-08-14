import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { FireflyParticles } from './FireflyParticles'

gsap.registerPlugin(useGSAP)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  useGSAP(
    () => {
      gsap.from('.hero-title, .hero-tagline, .hero-lead', {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 20,
        duration: prefersReducedMotion ? 0 : 0.9,
        stagger: prefersReducedMotion ? 0 : 0.15,
        ease: 'power2.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-dusk-950 to-plum-700 px-6 text-center"
    >
      {!prefersReducedMotion && <FireflyParticles />}
      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-4">
        <h1 className="hero-title font-display text-5xl text-mist-100 sm:text-6xl">
          Violências Invisíveis
        </h1>
        <p className="hero-tagline font-mono text-sm tracking-widest text-amber-glow uppercase">
          Uma trilha ao entardecer
        </p>
        <p className="hero-lead text-base text-mist-300 sm:text-lg">
          Nem toda violência deixa marca visível. Esta é uma trilha de 5 a 8
          minutos sobre reconhecer o que muitas vezes passa despercebido.
        </p>
      </div>
    </section>
  )
}
