import { MotionConfig, motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { NODES } from '@/content/nodes'
import type { NodeStatus } from '@/types/game.types'
import { MapNode } from './MapNode'

const TRAIL_NODES = NODES.filter((node) => node.kind !== 'summary')
const SUMMARY_NODE = NODES.find((node) => node.kind === 'summary')!

function buildTrailPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ''

  let d = `M ${points[0].x} ${points[0].y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midX = (prev.x + curr.x) / 2
    const midY = (prev.y + curr.y) / 2

    const dx = curr.x - prev.x
    const dy = curr.y - prev.y
    const length = Math.hypot(dx, dy) || 1
    const perpX = -dy / length
    const perpY = dx / length
    const offset = (i % 2 === 0 ? 1 : -1) * length * 0.15

    const controlX = midX + perpX * offset
    const controlY = midY + perpY * offset

    d += ` Q ${controlX} ${controlY} ${curr.x} ${curr.y}`
  }

  return d
}

const TRAIL_PATH_D = buildTrailPath([
  ...TRAIL_NODES.map((node) => node.position),
  SUMMARY_NODE.position,
])

export function TrailMap() {
  const { state, dispatch } = useGame()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-dusk-950 via-dusk-900 to-plum-700 px-6 py-12">
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,120 C80,80 160,140 240,100 C320,60 360,110 400,90 L400,200 L0,200 Z"
          fill="var(--color-dusk-800)"
          opacity="0.4"
        />
        <path
          d="M0,160 C100,130 200,170 300,140 C350,125 380,150 400,140 L400,200 L0,200 Z"
          fill="var(--color-dusk-950)"
          opacity="0.5"
        />
      </svg>

      <header className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={() => dispatch({ type: 'GO_HOME' })}
          className="inline-flex min-h-11 items-center self-start rounded-md px-3 font-mono text-xs text-mist-300 transition-colors duration-150 hover:text-amber-glow"
        >
          ← Início
        </button>
        <p className="font-mono text-xs tracking-widest text-amber-glow uppercase">
          Uma trilha ao entardecer
        </p>
        <h1 className="font-display text-4xl text-mist-100 sm:text-5xl">
          Violências Invisíveis
        </h1>
        <p className="max-w-md text-sm text-mist-300">
          Cada lanterna guarda uma cena. Escolha por onde quiser começar — não
          existe ordem certa.
        </p>
        <p className="font-mono text-xs text-mist-300">
          {state.completedNodes.size} de {TRAIL_NODES.length} lanternas
          acesas
        </p>
      </header>

      <MotionConfig reducedMotion="user">
        <div className="relative z-10 mx-auto mt-10 aspect-4/5 w-full max-w-md">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={TRAIL_PATH_D}
              fill="none"
              stroke="var(--color-mist-300)"
              strokeWidth="2"
              strokeDasharray="6 5"
              strokeLinecap="round"
              opacity="0.4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {TRAIL_NODES.map((node, index) => {
            const status: NodeStatus = state.completedNodes.has(node.id)
              ? 'completed'
              : 'available'

            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
              >
                <MapNode
                  node={node}
                  status={status}
                  delay={index * 0.1}
                  onSelect={() => dispatch({ type: 'OPEN_NODE', nodeId: node.id })}
                />
              </div>
            )
          })}

          <motion.button
            type="button"
            onClick={() => dispatch({ type: 'OPEN_SUMMARY' })}
            aria-label={`${SUMMARY_NODE.mapLabel} — sempre disponível`}
            className="group absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 p-3"
            style={{
              left: `${SUMMARY_NODE.position.x}%`,
              top: `${SUMMARY_NODE.position.y}%`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: TRAIL_NODES.length * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
            whileFocus={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-4 m-auto size-14 rounded-full bg-amber-glow/50 opacity-80 blur-lg transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="relative flex size-12 items-center justify-center rounded-full border-2 border-amber-glow bg-dusk-900 text-amber-glow">
              <Flame className="size-6" aria-hidden="true" />
            </span>
            <span className="max-w-24 text-center font-mono text-xs leading-tight text-mist-300">
              {SUMMARY_NODE.mapLabel}
            </span>
          </motion.button>
        </div>
      </MotionConfig>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-dusk-950" />
    </div>
  )
}
