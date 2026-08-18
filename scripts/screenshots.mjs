/**
 * Gera a imagem de Open Graph (public/og-image.png) e as capturas de tela do
 * README (docs/screenshots/).
 *
 * Uso: com o dev server rodando em http://localhost:5173,
 *   node scripts/screenshots.mjs
 */
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..')
const SHOTS = path.join(ROOT, 'docs/screenshots')
const BASE = process.env.BASE_URL ?? 'http://localhost:5173'

fs.mkdirSync(SHOTS, { recursive: true })

const browser = await chromium.launch()

/* ---------- imagem de Open Graph (1200x630) ---------- */
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto('file:///' + path.join(HERE, 'og-image.html').replace(/\\/g, '/'))
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(ROOT, 'public/og-image.png') })
  console.log('OK public/og-image.png')
  await page.close()
}

/* ---------- capturas da aplicação (1280x800) ---------- */
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  locale: 'pt-BR',
  deviceScaleFactor: 1,
})

// Evita o modal de primeira visita em todas as páginas deste contexto.
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem('violencias-invisiveis:quickexit-intro-seen', 'true')
  } catch {}
})

const page = await ctx.newPage()
const shot = async (name) => {
  await page.screenshot({ path: path.join(SHOTS, name) })
  console.log('OK docs/screenshots/' + name)
}

const setProgress = async (ids) => {
  await page.goto(BASE)
  await page.evaluate((list) => {
    localStorage.setItem('violencias-invisiveis:progress', JSON.stringify(list))
  }, ids)
}

/* home-hero */
await setProgress([])
await page.goto(BASE)
await page.waitForSelector('.hero-title')
await page.waitForTimeout(2500)
await shot('home-hero.png')

/* home-ajuda */
await page.evaluate(() => {
  const heading = [...document.querySelectorAll('h2')].find((h) =>
    /Canais de Ajuda/i.test(h.textContent),
  )
  heading?.scrollIntoView({ block: 'start', behavior: 'instant' })
})
await page.waitForTimeout(2500)
await shot('home-ajuda.png')

/* mapa, com dois nós concluídos para mostrar os dois estados visuais */
await setProgress(['psicologica', 'digital'])
await page.goto(BASE)
await page.waitForTimeout(1200)
await page.getByRole('button', { name: 'Iniciar Trilha' }).click()
await page.waitForTimeout(2400)
await shot('mapa.png')

/* cena-dialogo */
await page.getByRole('button', { name: 'Violência Patrimonial', exact: true }).click()
await page.waitForTimeout(1600)
await shot('cena-dialogo.png')

/* revelacao: avança os beats desta cena até o card de revelação */
for (let i = 0; i < 8; i++) {
  if ((await page.getByText('A lanterna revela').count()) > 0) break
  const options = page.locator('button[class*="text-left"]')
  if ((await options.count()) > 0) {
    await options.first().click()
  } else {
    await page.getByRole('button', { name: 'Continuar', exact: true }).first().click()
  }
  await page.waitForTimeout(1100)
}
await page.waitForTimeout(900)
await shot('revelacao.png')

/* cena-celular */
await page.getByRole('button', { name: 'Voltar à trilha' }).click()
await page.waitForTimeout(1600)
await page.getByRole('button', { name: /^Violência Digital/ }).click()
await page.waitForTimeout(1600)
await shot('cena-celular.png')

/* sintese */
await page.getByRole('button', { name: /Voltar ao mapa/ }).click()
await page.waitForTimeout(1400)
await page.getByRole('button', { name: /^Rede de Apoio/ }).click()
await page.waitForTimeout(1900)
await shot('sintese.png')

await browser.close()
console.log('DONE')
