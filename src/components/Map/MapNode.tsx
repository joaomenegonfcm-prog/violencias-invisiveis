import { motion } from 'framer-motion'
import { Check, Diamond } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NodeContent, NodeStatus } from '@/types/game.types'

interface MapNodeProps {
  node: NodeContent
  status: NodeStatus
  onSelect: () => void
  delay: number
}

export function MapNode({ node, status, onSelect, delay }: MapNodeProps) {
  const isCompleted = status === 'completed'
  const ariaLabel = isCompleted ? `${node.mapLabel} — concluído` : node.mapLabel

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={ariaLabel}
      className="group relative flex min-h-11 min-w-11 flex-col items-center gap-2 p-3"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.08 }}
      whileFocus={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 top-3 m-auto size-10 rounded-full opacity-60 blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100',
          isCompleted ? 'bg-rose-complete/50' : 'bg-amber-glow/40',
        )}
      />
      <span
        className={cn(
          'relative flex size-8 items-center justify-center rounded-full border-2 bg-dusk-900',
          isCompleted ? 'border-rose-complete text-rose-complete' : 'border-amber-glow text-amber-glow',
        )}
      >
        {isCompleted ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Diamond className="size-4" aria-hidden="true" />
        )}
      </span>
      <span className="max-w-20 text-center font-mono text-[0.65rem] leading-tight text-mist-300">
        {node.mapLabel}
      </span>
    </motion.button>
  )
}
