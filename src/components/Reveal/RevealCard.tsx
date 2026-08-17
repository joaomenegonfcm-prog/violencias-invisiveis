import { motion, useReducedMotion } from 'framer-motion'
import type { NodeContent } from '@/types/game.types'

interface RevealCardProps {
  node: NodeContent
  onReturn: () => void
}

export function RevealCard({ node, onReturn }: RevealCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -14 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-amber-glow/30 bg-dusk-900 p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-amber-glow/30 blur-3xl"
      />

      <div className="relative flex flex-col gap-5">
        <p className="font-mono text-xs tracking-widest text-amber-glow uppercase">
          A lanterna revela
        </p>
        <h2 className="font-display text-2xl text-mist-100">{node.reveal.term}</h2>
        <p className="text-sm leading-relaxed text-mist-300">{node.reveal.explanation}</p>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-widest text-mist-300 uppercase">
            Sinais de alerta
          </p>
          <ul className="flex flex-col gap-2">
            {node.reveal.signs.map((sign) => (
              <li key={sign} className="flex items-start gap-2 text-sm text-mist-100">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-complete"
                />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onReturn}
          className="mt-2 min-h-11 self-center rounded-full bg-amber-glow px-8 py-3 font-mono text-sm font-medium text-dusk-950 transition-colors duration-150 hover:bg-amber-dim"
        >
          Voltar à trilha
        </button>
      </div>
    </motion.div>
  )
}
