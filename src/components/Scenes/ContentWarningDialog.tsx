import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ContentWarningDialogProps {
  onContinue: () => void
  onSkip: () => void
}

const ACTION_BUTTON_CLASS =
  'min-h-11 rounded-full border border-mist-100/20 px-5 py-2.5 font-mono text-sm text-mist-100 transition-colors duration-150 hover:border-amber-glow hover:text-amber-glow'

/**
 * Esc, clique no X e clique fora do dialog disparam onOpenChange(false), que
 * tratamos aqui como equivalente a "Continuar" — dispensar o aviso não deve
 * ser interpretado como a escolha ativa de pular a cena, que exige clique
 * explícito em "Pular esta cena".
 *
 * Nota sobre a Saída Rápida (Fase 3): o listener de Esc-duplo em
 * useQuickExitShortcut.ts escuta em `window` sem stopPropagation, e o
 * DismissableLayer do Radix (por trás do Dialog) também não faz
 * stopPropagation no Esc. Ou seja, o Esc que fecha este dialog CONTINUA
 * contando como a primeira das duas pressionadas necessárias pra saída de
 * emergência — comportamento já esperado/documentado na Fase 3, não é um
 * bug novo introduzido aqui.
 */
export function ContentWarningDialog({ onContinue, onSkip }: ContentWarningDialogProps) {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onContinue()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Antes de continuar</DialogTitle>
          <DialogDescription>
            Esta cena trata de violência obstétrica durante um parto. Se esse
            tema for sensível pra você agora, sinta-se à vontade para pular.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button type="button" onClick={onSkip} className={ACTION_BUTTON_CLASS}>
            Pular esta cena
          </button>
          <button type="button" onClick={onContinue} className={ACTION_BUTTON_CLASS}>
            Continuar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
