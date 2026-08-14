import { useEffect, useRef } from 'react'
import { performQuickExit } from './QuickExitButton'

const DOUBLE_PRESS_WINDOW_MS = 1000

/**
 * Atalho de teclado global: Esc pressionado duas vezes em menos de 1s
 * dispara a saída de emergência. Apenas observa (sem preventDefault ou
 * stopPropagation), então não interfere no primeiro Esc — por exemplo,
 * o Dialog do shadcn/ui continua fechando normalmente na primeira vez.
 */
export function useQuickExitShortcut() {
  const lastEscTimeRef = useRef<number | null>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return

      const now = Date.now()
      const lastEscTime = lastEscTimeRef.current

      if (lastEscTime !== null && now - lastEscTime < DOUBLE_PRESS_WINDOW_MS) {
        performQuickExit()
        return
      }

      lastEscTimeRef.current = now
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
