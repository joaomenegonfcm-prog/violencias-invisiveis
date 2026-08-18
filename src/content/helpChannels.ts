import {
  HeartHandshake,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from 'lucide-react'

export interface HelpChannel {
  id: string
  icon: LucideIcon
  title: string
  description: string
  href: string
}

// Fonte única dos canais de ajuda, consumida pela Home e pela Síntese para
// que as duas telas nunca divirjam em conteúdo ou destino dos links.
export const HELP_CHANNELS: HelpChannel[] = [
  {
    id: 'ligue-180',
    icon: Phone,
    title: 'Ligue 180',
    description:
      'Central de Atendimento à Mulher. Ligação gratuita, 24h, em todo o Brasil.',
    href: 'tel:180',
  },
  {
    id: 'cvv-188',
    icon: MessageCircle,
    title: 'CVV 188',
    description:
      'Apoio emocional e prevenção do suicídio. Ligação, chat ou e-mail, 24h. cvv.org.br',
    href: 'tel:188',
  },
  {
    id: 'deam',
    icon: MapPin,
    title: 'Delegacia da Mulher (DEAM)',
    description: 'Busque a unidade mais próxima da sua cidade.',
    href: 'https://www.google.com/maps/search/delegacia+da+mulher',
  },
  {
    id: 'mapa-do-acolhimento',
    icon: HeartHandshake,
    title: 'Mapa do Acolhimento',
    description:
      'Encaminhamento gratuito a psicólogas e advogadas voluntárias. mapadoacolhimento.org',
    href: 'https://mapadoacolhimento.org',
  },
]
