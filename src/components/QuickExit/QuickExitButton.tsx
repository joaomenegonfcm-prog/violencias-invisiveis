/**
 * Saída Rápida — feature de segurança presente em todas as telas do app.
 *
 * O visual é deliberadamente invertido em relação ao resto do site (pill
 * claro sobre fundo escuro, sempre 100% opaco): precisa ser reconhecido
 * instantaneamente sobre gradiente, partículas ou cena escura, sem depender
 * de hover para aparecer.
 *
 * Teste manual (não há teste automatizado nesta fase):
 * 1. Suba o app (`npm run dev`) e, em cada uma das 4 views (Home, Mapa,
 *    Cena e Síntese), confirme que o botão "Sair deste site" aparece fixo no
 *    canto superior direito, por cima de qualquer outro conteúdo da tela.
 * 2. Clique no botão em cada view: a aba deve navegar instantaneamente
 *    para https://www.google.com, sem confirmação e sem animação de saída.
 * 3. Depois de sair, clique em "voltar" no navegador: a página do app NÃO
 *    deve reaparecer no histórico (window.location.replace substitui a
 *    entrada atual em vez de empilhar uma nova).
 * 4. Sem usar o mouse, dê Tab até focar o botão: deve aparecer o contorno
 *    âmbar de :focus-visible. O botão é opaco em repouso — não existe mais
 *    fade-in por hover/foco (comportamento removido de propósito).
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
import { LogOut } from 'lucide-react'

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
      aria-label="Sair deste site imediatamente para o Google"
      className="fixed inline-flex min-h-11 items-center gap-2 rounded-full bg-mist-100 px-4 py-2.5 font-body text-sm font-bold text-dusk-950 shadow-lg shadow-dusk-950/50 transition-colors duration-150 hover:bg-amber-glow"
      style={{
        top: 'max(1rem, env(safe-area-inset-top))',
        right: 'max(1rem, env(safe-area-inset-right))',
        zIndex: 9999,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <LogOut className="size-4 shrink-0" aria-hidden="true" />
      Sair deste site
    </a>
  )
}
