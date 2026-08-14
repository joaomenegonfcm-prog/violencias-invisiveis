import { GameProvider, useGame } from '@/context/GameContext'
import { QuickExitButton } from '@/components/QuickExit/QuickExitButton'
import { useQuickExitShortcut } from '@/components/QuickExit/useQuickExitShortcut'
import { Home } from '@/components/Home/Home'

function AppContent() {
  const { state } = useGame()
  useQuickExitShortcut()

  return (
    <>
      <QuickExitButton />
      {state.currentView === 'home' ? (
        <Home />
      ) : (
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
