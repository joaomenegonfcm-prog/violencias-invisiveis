import { QuickExitButton } from '@/components/QuickExit/QuickExitButton'
import { useQuickExitShortcut } from '@/components/QuickExit/useQuickExitShortcut'

function App() {
  useQuickExitShortcut()

  return (
    <>
      <QuickExitButton />
      <div className="flex min-h-screen items-center justify-center bg-dusk-950">
        <h1 className="font-display text-4xl text-mist-100">
          Violências Invisíveis
        </h1>
      </div>
    </>
  )
}

export default App
