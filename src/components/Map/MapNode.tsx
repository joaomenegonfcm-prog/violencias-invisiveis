import { motion, useReducedMotion } from 'framer-motion'
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
  const prefersReducedMotion = useReducedMotion()
  const isCompleted = status === 'completed'
  const ariaLabel = isCompleted ? `${node.mapLabel}: concluído` : node.mapLabel
  const shouldFlicker = !isCompleted && !prefersReducedMotion

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
      <span className="relative flex size-8 items-center justify-center">
        <motion.span
          aria-hidden="true"
          className={cn(
            'absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100',
            isCompleted ? 'bg-rose-complete/80' : 'bg-amber-glow/80',
          )}
          animate={
            shouldFlicker
              ? { opacity: [0.8, 1, 0.85, 0.95, 0.8], scale: [1, 1.08, 1, 1.05, 1] }
              : { opacity: 0.85, scale: 1 }
          }
          transition={
            shouldFlicker
              ? {
                  duration: 2.8 + delay,
                  delay: delay * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
        <span
          className={cn(
            'relative flex size-8 items-center justify-center rounded-full border-2 bg-dusk-900 bg-radial',
            isCompleted
              ? 'border-rose-complete from-rose-complete/90 to-transparent text-dusk-950'
              : 'border-amber-glow from-amber-glow/90 to-transparent text-dusk-950',
          )}
        >
          {isCompleted ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Diamond className="size-4" aria-hidden="true" />
          )}
        </span>
      </span>
      <span className="max-w-20 text-center font-mono text-[0.65rem] leading-tight text-mist-300">
        {node.mapLabel}
      </span>
    </motion.button>
  )
}
