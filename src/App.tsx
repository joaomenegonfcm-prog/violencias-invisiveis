import { useState } from 'react'
import { GameProvider, useGame } from '@/context/GameContext'
import { QuickExitButton } from '@/components/QuickExit/QuickExitButton'
import { useQuickExitShortcut } from '@/components/QuickExit/useQuickExitShortcut'
import { Home } from '@/components/Home/Home'
import { TrailMap } from '@/components/Map/TrailMap'
import { SceneContainer } from '@/components/Scenes/SceneContainer'
import { ContentWarningDialog } from '@/components/Scenes/ContentWarningDialog'

function AppContent() {
  const { state, dispatch } = useGame()
  useQuickExitShortcut()

  // Persiste só durante esta sessão do app (reseta ao recarregar a página) —
  // fica fora do GameContext de propósito, não é progresso do jogo.
  const [obstetricaWarningSeen, setObstetricaWarningSeen] = useState(false)

  const showContentWarning =
    state.currentView === 'scene' &&
    state.activeNodeId === 'obstetrica' &&
    !obstetricaWarningSeen

  return (
    <>
      <QuickExitButton />
      {state.currentView === 'home' && <Home />}
      {state.currentView === 'map' && <TrailMap />}
      {state.currentView === 'scene' &&
        (showContentWarning ? (
          <ContentWarningDialog
            onContinue={() => setObstetricaWarningSeen(true)}
            onSkip={() => dispatch({ type: 'CLOSE_SCENE' })}
          />
        ) : (
          <SceneContainer />
        ))}
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
