import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import type { GameAction, GameState, NodeId } from '@/types/game.types'

const STORAGE_KEY = 'violencias-invisiveis:progress'

function loadCompletedNodes(): Set<NodeId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed as NodeId[])
  } catch {
    return new Set()
  }
}

function createInitialState(): GameState {
  return {
    currentView: 'home',
    activeNodeId: null,
    completedNodes: loadCompletedNodes(),
    choicesMade: {},
  }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_TRAIL':
      return { ...state, currentView: 'map' }

    case 'OPEN_NODE':
      return { ...state, currentView: 'scene', activeNodeId: action.nodeId }

    case 'CLOSE_SCENE':
      return { ...state, currentView: 'map', activeNodeId: null }

    case 'RECORD_CHOICE': {
      const key = `${state.activeNodeId}:${action.beatIndex}`
      return {
        ...state,
        choicesMade: { ...state.choicesMade, [key]: action.optionId },
      }
    }

    case 'COMPLETE_NODE': {
      const completedNodes = new Set(state.completedNodes)
      completedNodes.add(action.nodeId)
      return { ...state, completedNodes }
    }

    case 'OPEN_SUMMARY':
      return { ...state, currentView: 'summary' }

    case 'GO_HOME':
      return { ...state, currentView: 'home', activeNodeId: null }

    case 'RESET':
      return {
        currentView: 'home',
        activeNodeId: null,
        completedNodes: new Set(),
        choicesMade: {},
      }

    default:
      return state
  }
}

interface GameContextValue {
  state: GameState
  dispatch: Dispatch<GameAction>
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(state.completedNodes)))
    } catch {
      // localStorage indisponível ou cheio, progresso segue apenas em memória
    }
  }, [state.completedNodes])

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame deve ser usado dentro de um GameProvider')
  }
  return context
}
