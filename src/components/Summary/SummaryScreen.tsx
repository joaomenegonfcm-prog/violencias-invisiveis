import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Check, Diamond } from 'lucide-react'
import { useGame } from '@/context/GameContext'
import { NODES, getNode } from '@/content/nodes'
import { HELP_CHANNELS } from '@/content/helpChannels'
import { HelpChannelCard } from '@/components/shared/HelpChannelCard'
import { cn } from '@/lib/utils'

const TRAIL_NODES = NODES.filter((node) => node.kind !== 'summary')
const SUMMARY_NODE = getNode('sintese')!

export function SummaryScreen() {
  const { state, dispatch } = useGame()
  const prefersReducedMotion = useReducedMotion()

  // Contado a partir dos nós de trilha (e não de completedNodes.size) para que
  // uma entrada inesperada no localStorage não infle o progresso.
  const completedCount = TRAIL_NODES.filter((node) =>
    state.completedNodes.has(node.id),
  ).length
  const remaining = TRAIL_NODES.length - completedCount
  const isTrailComplete = remaining === 0

  const returnToMap = () => dispatch({ type: 'CLOSE_SCENE' })

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.07 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.35,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-gradient-to-b from-dusk-950 to-dusk-900 px-6 py-12"
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <button
            type="button"
            onClick={returnToMap}
            className="inline-flex min-h-11 items-center self-start rounded-md px-3 font-mono text-xs text-mist-300 transition-colors duration-150 hover:text-amber-glow"
          >
            ← Voltar ao mapa
          </button>
          <p className="font-mono text-xs tracking-widest text-amber-glow uppercase">
            {isTrailComplete
              ? 'Trilha concluída'
              : `${completedCount} de ${TRAIL_NODES.length} lanternas acesas`}
          </p>
          <h1 className="font-display text-3xl text-mist-100 sm:text-4xl">
            {SUMMARY_NODE.reveal.term}
          </h1>
          <p className="text-sm leading-relaxed text-mist-300">
            {SUMMARY_NODE.reveal.explanation}
          </p>
        </header>

        {!isTrailComplete && (
          <div className="rounded-xl border border-amber-glow/25 bg-amber-glow/10 p-5">
            <p className="text-sm leading-relaxed text-mist-100">
              {remaining === 1
                ? 'Ainda falta 1 lanterna para acender na trilha.'
                : `Ainda faltam ${remaining} lanternas para acender na trilha.`}{' '}
              Se quiser, volte ao mapa antes de seguir, mas esta síntese
              continua aqui, disponível a qualquer momento.
            </p>
          </div>
        )}

        <motion.ul
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {TRAIL_NODES.map((node) => {
            const isNodeComplete = state.completedNodes.has(node.id)

            return (
              <motion.li
                key={node.id}
                variants={itemVariants}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-4',
                  isNodeComplete
                    ? 'border-rose-complete/40 bg-dusk-900'
                    : 'border-mist-100/10 bg-dusk-900/60',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full border-2',
                    isNodeComplete
                      ? 'border-rose-complete text-rose-complete'
                      : 'border-mist-300/40 text-mist-300',
                  )}
                >
                  {isNodeComplete ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Diamond className="size-4" aria-hidden="true" />
                  )}
                </span>
                <span
                  className={cn(
                    'min-w-0 text-sm',
                    isNodeComplete ? 'text-mist-100' : 'text-mist-300',
                  )}
                >
                  {node.mapLabel}
                  <span className="sr-only">
                    {isNodeComplete ? ': concluído' : ': ainda não visitado'}
                  </span>
                </span>
              </motion.li>
            )
          })}
        </motion.ul>

        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs tracking-widest text-rose-complete uppercase">
            Rede de Apoio
          </h2>
          <motion.ul
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {HELP_CHANNELS.map((channel) => (
              <motion.li key={channel.id} variants={itemVariants}>
                <HelpChannelCard
                  icon={channel.icon}
                  title={channel.title}
                  description={channel.description}
                  href={channel.href}
                />
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <button
          type="button"
          onClick={returnToMap}
          className="min-h-11 self-center rounded-full bg-amber-glow px-8 py-3 font-mono text-sm font-medium text-dusk-950 transition-colors duration-150 hover:bg-amber-dim"
        >
          Voltar à trilha
        </button>
      </div>
    </motion.div>
  )
}
