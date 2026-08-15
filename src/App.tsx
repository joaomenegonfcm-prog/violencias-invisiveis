import { GameProvider, useGame } from '@/context/GameContext'
import { QuickExitButton } from '@/components/QuickExit/QuickExitButton'
import { useQuickExitShortcut } from '@/components/QuickExit/useQuickExitShortcut'
import { Home } from '@/components/Home/Home'
import { TrailMap } from '@/components/Map/TrailMap'

function ScenePlaceholder() {
  const { state, dispatch } = useGame()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-dusk-950 px-6 text-center">
      <p className="font-display text-2xl text-mist-100">
        Cena: {state.activeNodeId} (em construção)
      </p>
      <button
        type="button"
        onClick={() => dispatch({ type: 'CLOSE_SCENE' })}
        className="min-h-11 rounded-full bg-amber-glow px-6 py-2.5 font-mono text-sm font-medium text-dusk-950 transition-colors duration-150 hover:bg-amber-dim"
      >
        ← Voltar ao mapa
      </button>
    </div>
  )
}

function AppContent() {
  const { state } = useGame()
  useQuickExitShortcut()

  return (
    <>
      <QuickExitButton />
      {state.currentView === 'home' && <Home />}
      {state.currentView === 'map' && <TrailMap />}
      {state.currentView === 'scene' && <ScenePlaceholder />}
      {state.currentView === 'summary' && (
        <div className="flex min-h-screen items-center justify-center bg-dusk-950">
          <h1 className="font-display text-4xl text-mist-100">
            Violências Invisíveis
          </h1>
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App
