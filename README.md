# Violências Invisíveis

*Uma trilha ao entardecer por formas de violência que nem sempre deixam marca.*

![status](https://img.shields.io/badge/status-em%20desenvolvimento-f2a65a)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=white)

## Sobre o projeto

Este projeto nasceu de um briefing do CIEE para desenvolver uma peça de conscientização social em formato interativo. O tema escolhido foi **violências invisíveis**: formas de violência doméstica — psicológica, patrimonial, digital, obstétrica, institucional — que raramente deixam marcas físicas e por isso são mais difíceis de nomear e reconhecer, tanto por quem sofre quanto por quem observa de fora.

A experiência é construída como uma **trilha em formato de mapa**, percorrida ao entardecer: cada ponto do mapa representa uma cena curta (diálogo, ligação telefônica, narrativa) que termina revelando o nome técnico daquela violência, sua explicação e os sinais de alerta associados. A estética de lanternas e névoa reforça a ideia central — trazer luz para o que normalmente permanece invisível.

## Como rodar localmente

```bash
git clone https://github.com/joaomenegonfcm-prog/violencias-invisiveis.git
cd violencias-invisiveis
npm install
npm run dev
```

## Arquitetura

O estado global do jogo (view atual, nó ativo, progresso, escolhas do jogador) é gerenciado com **`useReducer` + Context API** nativos do React (`src/context/GameContext.tsx`), sem Redux ou Zustand. Para o escopo do projeto — uma árvore de estado única, sem necessidade de middlewares, dados assíncronos complexos ou seletores otimizados — uma dependência externa de gerenciamento de estado adicionaria peso e complexidade sem benefício real. O progresso concluído é persistido em `localStorage`, enquanto a navegação (view/nó ativo) sempre reinicia na Home ao recarregar a página.

Componentes do [shadcn/ui](https://ui.shadcn.com) são usados pontualmente, apenas onde exigem padrões de acessibilidade complexos (foco preso em modais, ARIA Dialog pattern) — o restante da interface é construído do zero sobre os design tokens do projeto.

## Roadmap

- [x] Fase 0 — Setup do projeto (Vite, Tailwind, fontes, tokens, shadcn/ui)
- [x] Fase 1 — Tipos e estado global do jogo
- [ ] Fase 2 — Conteúdo (roteiro completo dos 6 nós)
- [ ] Fase 3 — Saída Rápida (feature de segurança)
- [ ] Fase 4 — Home completa (Hero, Sobre, CTA, Canais de Ajuda)
- [ ] Fase 5 — Mapa ilustrado da trilha
- [ ] Fase 6 — Motor de cenas (dialogue / phone / narrative + revelação)
- [ ] Fase 7 — Síntese / rede de apoio
- [ ] Fase 8 — Polimento (responsividade, acessibilidade, reduced-motion)
- [ ] Fase 9 — Deploy (Vercel)

## Preview

_(screenshots em breve)_

## Créditos

Projeto acadêmico desenvolvido no âmbito do **CIEE**, em parceria com a **Fatec Rio Preto**.
