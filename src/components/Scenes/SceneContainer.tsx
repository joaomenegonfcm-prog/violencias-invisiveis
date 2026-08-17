import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import { getNode } from '@/content/nodes'
import type { DialogueBeat, NodeContent } from '@/types/game.types'
import { RevealCard } from '@/components/Reveal/RevealCard'
import { useSceneFlow } from './useSceneFlow'

// Fallback tipado pro caso defensivo de activeNodeId não corresponder a
// nenhum nó (não deve acontecer em uso normal — OPEN_NODE sempre recebe um
// NodeId válido). Existe só pra manter useSceneFlow chamado incondicionalmente
// (regra dos hooks), sem recorrer a cast inseguro.
const EMPTY_NODE: NodeContent = {
  id: 'sintese',
  kind: 'narrative',
  title: '',
  mapLabel: '',
  position: { x: 0, y: 0 },
  intro: '',
  beats: [],
  reveal: { term: '', explanation: '', signs: [] },
}

const CONTINUE_BUTTON_CLASS =
  'min-h-11 self-start rounded-full bg-amber-glow px-6 py-2.5 font-mono text-sm font-medium text-dusk-950 transition-colors duration-150 hover:bg-amber-dim'

const QUIET_CONTINUE_BUTTON_CLASS =
  'min-h-11 rounded-full border border-mist-100/20 px-6 py-2.5 font-mono text-sm text-mist-100 transition-colors duration-150 hover:border-amber-glow hover:text-amber-glow'

const OPTION_BUTTON_CLASS =
  'min-h-11 rounded-xl border border-mist-100/10 bg-dusk-900 px-4 py-3 text-left text-sm text-mist-100 transition-colors duration-150 hover:border-amber-glow/50 hover:bg-dusk-800'

interface BeatChoicesProps {
  beat: DialogueBeat
  chosenResponse: string | null
  onChoose: (optionId: string) => void
  onAdvance: () => void
  continueClassName?: string
}

function BeatChoices({
  beat,
  chosenResponse,
  onChoose,
  onAdvance,
  continueClassName = CONTINUE_BUTTON_CLASS,
}: BeatChoicesProps) {
  const hasOptions = !!beat.options && beat.options.length > 0

  return (
    <>
      {hasOptions && !chosenResponse && (
        <div className="flex flex-col gap-3">
          {beat.options!.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChoose(option.id)}
              className={OPTION_BUTTON_CLASS}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {chosenResponse && (
        <p aria-live="polite" className="text-sm text-mist-300 italic">
          {chosenResponse}
        </p>
      )}

      {(!hasOptions || chosenResponse) && (
        <button type="button" onClick={onAdvance} className={continueClassName}>
          Continuar
        </button>
      )}
    </>
  )
}

export function SceneContainer() {
  const { state, dispatch } = useGame()
  const prefersReducedMotion = useReducedMotion()
  const beatRegionRef = useRef<HTMLDivElement>(null)

  const node = state.activeNodeId ? getNode(state.activeNodeId) : undefined

  const { beatIndex, chosenResponse, showReveal, advance, choose } = useSceneFlow(
    node ?? EMPTY_NODE,
  )

  useEffect(() => {
    beatRegionRef.current?.focus()
  }, [beatIndex, showReveal])

  if (!node) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-dusk-950 px-6 text-center">
        <p className="text-mist-300">Não foi possível carregar esta cena.</p>
        <button
          type="button"
          onClick={() => dispatch({ type: 'CLOSE_SCENE' })}
          className={CONTINUE_BUTTON_CLASS}
        >
          ← Voltar ao mapa
        </button>
      </div>
    )
  }

  const handleChoose = (optionId: string) => {
    dispatch({ type: 'RECORD_CHOICE', beatIndex, optionId })
    choose(optionId)
  }

  const handleReturnToTrail = () => {
    dispatch({ type: 'COMPLETE_NODE', nodeId: node.id })
    dispatch({ type: 'CLOSE_SCENE' })
  }

  const beatVariants: Variants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        enter: { opacity: 0, y: 16 },
        center: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
      }

  const beat = node.beats[beatIndex]

  return (
    <div className="min-h-screen bg-gradient-to-b from-dusk-950 to-dusk-900 px-6 py-12">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
        <header className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => dispatch({ type: 'CLOSE_SCENE' })}
            className="inline-flex min-h-11 items-center self-start rounded-md px-3 font-mono text-xs text-mist-300 transition-colors duration-150 hover:text-amber-glow"
          >
            ← Voltar ao mapa
          </button>
          <p className="font-mono text-xs tracking-widest text-amber-glow uppercase">
            {node.mapLabel}
          </p>
          <h1 className="font-display text-3xl text-mist-100">{node.title}</h1>
          <p className="text-sm text-mist-300">{node.intro}</p>
        </header>

        <AnimatePresence mode="wait">
          {showReveal ? (
            <RevealCard key="reveal" node={node} onReturn={handleReturnToTrail} />
          ) : (
            <motion.div
              key={`beat-${beatIndex}`}
              ref={beatRegionRef}
              tabIndex={-1}
              variants={beatVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="outline-none"
            >
              {node.kind === 'phone' ? (
                <div className="mx-auto w-full max-w-xs rounded-[2.5rem] border-4 border-dusk-800 bg-dusk-950 p-3 shadow-2xl">
                  <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-dusk-800" />
                  <div className="flex min-h-72 flex-col gap-4 rounded-[1.75rem] bg-dusk-900 p-4">
                    <div className="rounded-xl border border-mist-100/10 bg-dusk-800/80 px-4 py-3">
                      <p className="font-mono text-[0.65rem] tracking-wide text-amber-glow uppercase">
                        {beat.speaker}
                      </p>
                      <p className="mt-1 text-sm text-mist-100">{beat.text}</p>
                    </div>
                    <BeatChoices
                      beat={beat}
                      chosenResponse={chosenResponse}
                      onChoose={handleChoose}
                      onAdvance={advance}
                    />
                  </div>
                </div>
              ) : node.kind === 'narrative' ? (
                <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
                  <p className="text-lg leading-relaxed text-mist-100">{beat.text}</p>
                  <button
                    type="button"
                    onClick={advance}
                    className={QUIET_CONTINUE_BUTTON_CLASS}
                  >
                    Continuar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="max-w-md self-start rounded-2xl rounded-tl-sm border border-mist-100/10 bg-dusk-800 px-5 py-4">
                    <p className="font-mono text-xs text-rose-complete">{beat.speaker}</p>
                    <p className="mt-1 text-mist-100">{beat.text}</p>
                  </div>
                  <BeatChoices
                    beat={beat}
                    chosenResponse={chosenResponse}
                    onChoose={handleChoose}
                    onAdvance={advance}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
