import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useGame } from '@/context/GameContext'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PARAGRAPHS = [
  'A trilha é um mapa com pontos espalhados: cada lanterna representa uma cena. Não existe ordem certa, você escolhe por onde começar e pode visitar os nós na sequência que preferir.',
  'Cada nó abre uma cena curta do cotidiano: uma troca de mensagens, uma ligação, um momento qualquer. Não é um texto explicativo. A explicação só aparece depois, quando a cena revela o que estava por trás dela.',
  'Você pode explorar com tranquilidade: as escolhas dentro de cada cena não têm certo ou errado, elas só mudam como a cena se desenrola. A reflexão sobre o que aconteceu vem sempre depois, no card de revelação.',
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { dispatch } = useGame()

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const paragraphs = gsap.utils.toArray<HTMLElement>('.about-paragraph')

      if (prefersReducedMotion) {
        gsap.set(paragraphs, { opacity: 1, y: 0 })
        return
      }

      paragraphs.forEach((paragraph) => {
        gsap.from(paragraph, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraph,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="bg-dusk-900 px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <h2 className="font-display text-3xl text-mist-100">Como funciona</h2>
        <div className="flex flex-col gap-5">
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="about-paragraph text-mist-300">
              {paragraph}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'START_TRAIL' })}
          className="min-h-11 rounded-full bg-amber-glow px-8 py-3 font-mono text-sm font-medium text-dusk-950 transition-colors duration-150 hover:bg-amber-dim"
        >
          Iniciar Trilha
        </button>
      </div>
    </section>
  )
}
