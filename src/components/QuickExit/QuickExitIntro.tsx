import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const STORAGE_KEY = 'violencias-invisiveis:quickexit-intro-seen'

function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    // sessionStorage indisponível (modo privado, cookies bloqueados): mostra
    // o aviso; repetir é preferível a esconder informação de segurança.
    return false
  }
}

/**
 * Aviso de segurança exibido uma única vez por visita, antes de qualquer
 * outra interação. Marcado em sessionStorage de propósito: em uma nova visita
 * a orientação aparece de novo, mas navegar entre telas não repete o aviso.
 *
 * Esc, clique fora e o X fecham o dialog e contam como "Entendi". Dispensar
 * a orientação não deve prendê-la de volta na tela.
 *
 * Nota sobre a Saída Rápida (Fase 3): o Esc que fecha este dialog continua
 * contando como a primeira das duas pressionadas do atalho de emergência,
 * pelo mesmo motivo já documentado no ContentWarningDialog.
 */
export function QuickExitIntro() {
  const [open, setOpen] = useState(() => !hasSeenIntro())

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // Sem persistência disponível: o aviso pode reaparecer, o que é aceitável.
    }
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saia deste site com segurança</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3">
              <p>
                Se este tema te colocar em risco, clique em “Sair deste site”
                (canto superior direito) para fechar rapidamente.
              </p>
              <p>
                Para navegar com mais segurança, considere limpar o histórico do
                navegador regularmente.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            type="button"
            onClick={dismiss}
            className="min-h-11 rounded-full bg-amber-glow px-6 py-2.5 font-mono text-sm font-medium text-dusk-950 transition-colors duration-150 hover:bg-amber-dim"
          >
            Entendi
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
