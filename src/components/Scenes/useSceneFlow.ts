import { useState } from 'react'
import type { NodeContent } from '@/types/game.types'

export function useSceneFlow(node: NodeContent) {
  const [beatIndex, setBeatIndex] = useState(0)
  const [chosenResponse, setChosenResponse] = useState<string | null>(null)
  const [showReveal, setShowReveal] = useState(false)

  function choose(optionId: string) {
    const beat = node.beats[beatIndex]
    const option = beat?.options?.find((candidate) => candidate.id === optionId)
    if (option) {
      setChosenResponse(option.response)
    }
  }

  function advance() {
    const isLastBeat = beatIndex >= node.beats.length - 1

    if (isLastBeat) {
      setShowReveal(true)
      return
    }

    setBeatIndex((index) => index + 1)
    setChosenResponse(null)
  }

  return { beatIndex, chosenResponse, showReveal, advance, choose }
}
