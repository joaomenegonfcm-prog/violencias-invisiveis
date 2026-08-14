import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Phone, MessageCircle, MapPin, HeartHandshake, type LucideIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface HelpResource {
  title: string
  subtitle?: string
  description: string
  icon: LucideIcon
}

const RESOURCES: HelpResource[] = [
  {
    title: 'Ligue 180',
    subtitle: 'Central de Atendimento à Mulher',
    description: 'Ligação gratuita, 24h, em todo o Brasil',
    icon: Phone,
  },
  {
    title: 'CVV — 188',
    subtitle: 'Apoio emocional e prevenção do suicídio',
    description: 'Ligação, chat ou e-mail, 24h — cvv.org.br',
    icon: MessageCircle,
  },
  {
    title: 'Delegacia da Mulher (DEAM)',
    description: 'Busque a unidade mais próxima da sua cidade',
    icon: MapPin,
  },
  {
    title: 'Mapa do Acolhimento',
    description:
      'Encaminhamento gratuito a psicólogas e advogadas voluntárias — mapadoacolhimento.org',
    icon: HeartHandshake,
  },
]

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
        <TooltipProvider delayDuration={300}>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {RESOURCES.map((resource) => (
              <div
                key={resource.title}
                className="help-card flex flex-col gap-3 rounded-xl border border-mist-100/10 bg-dusk-900 p-6"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      tabIndex={0}
                      aria-label={`Mais informações sobre ${resource.title}`}
                      className="inline-flex size-11 items-center justify-center rounded-full bg-plum-700/60 text-amber-glow"
                    >
                      <resource.icon className="size-5" aria-hidden="true" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Clique para mais informações</TooltipContent>
                </Tooltip>
                <div className="flex flex-col gap-1">
                  <p className="font-display text-lg text-mist-100">{resource.title}</p>
                  {resource.subtitle && (
                    <p className="text-sm text-mist-300">{resource.subtitle}</p>
                  )}
                  <p className="text-sm text-mist-300">{resource.description}</p>
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  )
}
