import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { Hero } from './Hero'
import { About } from './About'
import { HelpResources } from './HelpResources'
import { Footer } from './Footer'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      // Reduced motion: mantém o scroll nativo do navegador, sem Lenis.
      if (prefersReducedMotion) {
        return
      }

      const lenis = new Lenis()

      lenis.on('scroll', ScrollTrigger.update)

      const syncLenisWithGsapTicker = (time: number) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(syncLenisWithGsapTicker)
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove(syncLenisWithGsapTicker)
        lenis.destroy()
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef}>
      <Hero />
      <About />
      <HelpResources />
      <Footer />
    </div>
  )
}
