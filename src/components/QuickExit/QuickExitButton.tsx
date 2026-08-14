/**
 * Saída Rápida — feature de segurança presente em todas as telas do app.
 *
 * Teste manual (não há teste automatizado nesta fase):
 * 1. Suba o app (`npm run dev`) e, em cada uma das 4 views (Home, Mapa,
 *    Cena, Síntese — por enquanto só existe o placeholder da Home),
 *    confirme que o botão "Sair" aparece fixo no canto superior direito,
 *    por cima de qualquer outro conteúdo da tela.
 * 2. Clique no botão em cada view: a aba deve navegar instantaneamente
 *    para https://www.google.com, sem confirmação e sem animação de saída.
 * 3. Depois de sair, clique em "voltar" no navegador: a página do app NÃO
 *    deve reaparecer no histórico (window.location.replace substitui a
 *    entrada atual em vez de empilhar uma nova).
 * 4. Sem usar o mouse, dê Tab até focar o botão: deve aparecer o contorno
 *    âmbar de :focus-visible e a opacidade deve subir para 100%. Solte o
 *    foco (Tab de novo) e confirme que a opacidade volta a ~60%.
 * 5. Pressione Esc uma vez: nada deve acontecer (ou, se algum Dialog do
 *    shadcn estiver aberto na tela, ele deve fechar normalmente, sem que
 *    o app navegue pra fora). Pressione Esc de novo em menos de 1 segundo:
 *    a página deve navegar para o Google imediatamente.
 * 6. Espere mais de 1 segundo entre dois Esc: nenhuma saída deve disparar
 *    (o contador de duplo-Esc deve reiniciar).
 * 7. Opcional: desative o JavaScript do navegador e clique no link — por
 *    ser um <a href> real, o navegador ainda deve navegar via fallback
 *    nativo do HTML, sem depender do onClick.
 */
import type { MouseEvent } from 'react'

export const QUICK_EXIT_URL = 'https://www.google.com'

export function performQuickExit() {
  window.location.replace(QUICK_EXIT_URL)
}

export function QuickExitButton() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    performQuickExit()
  }

  return (
    <a
      href={QUICK_EXIT_URL}
      onClick={handleClick}
      aria-label="Sair imediatamente para o Google"
      className="fixed flex min-h-11 min-w-11 items-center justify-center rounded-md bg-dusk-950/80 px-3 py-2.5 font-mono text-xs text-mist-300 opacity-60 backdrop-blur-sm transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100"
      style={{
        top: 'max(1rem, env(safe-area-inset-top))',
        right: 'max(1rem, env(safe-area-inset-right))',
        zIndex: 9999,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      Sair
    </a>
  )
}
