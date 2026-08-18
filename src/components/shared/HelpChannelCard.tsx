import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HelpChannelCardProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
}

export function HelpChannelCard({
  icon: Icon,
  title,
  description,
  href,
}: HelpChannelCardProps) {
  const isPhone = href?.startsWith('tel:') ?? false
  const isExternal = href ? /^https?:/.test(href) : false

  const className = cn(
    'group relative flex h-full items-start gap-4 overflow-hidden rounded-xl border border-mist-100/10 bg-dusk-900 p-6',
    href &&
      'cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:border-mist-100/20 focus-visible:scale-[1.02]',
  )

  const content = (
    <>
      {/* Eco do mesmo tratamento de luz das lanternas do mapa e do RevealCard. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-8 size-24 rounded-full bg-amber-glow/25 opacity-70 blur-2xl transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-amber-glow/70 bg-radial from-amber-glow/25 to-transparent text-amber-glow">
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <span className="relative flex min-w-0 flex-col gap-1">
        <span className="font-display text-lg text-mist-100">{title}</span>
        <span className="text-sm text-mist-300">{description}</span>
        {href && (
          <span className="mt-1 font-mono text-xs text-amber-glow">
            {isPhone ? 'Ligar agora' : 'Abrir site'}
            {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
          </span>
        )}
      </span>
    </>
  )

  if (!href) {
    return <div className={className}>{content}</div>
  }

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
    >
      {content}
    </a>
  )
}
