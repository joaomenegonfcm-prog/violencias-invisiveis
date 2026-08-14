import { useMemo } from 'react'
import { Particles, ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine, ISourceOptions } from '@tsparticles/engine'

// Precisa ser uma referência estável (fora do componente): o ParticlesProvider
// exige que o callback `init` não mude entre renders.
async function initFireflyEngine(engine: Engine) {
  await loadSlim(engine)
}

export function FireflyParticles() {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 30 },
        color: { value: '#f2a65a' },
        opacity: {
          value: { min: 0.15, max: 0.7 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        size: { value: { min: 1, max: 2.5 } },
        move: {
          enable: true,
          speed: { min: 0.15, max: 0.5 },
          random: true,
          direction: 'none',
          outModes: { default: 'out' },
        },
        links: { enable: false },
      },
    }),
    [],
  )

  return (
    <ParticlesProvider init={initFireflyEngine}>
      <Particles
        id="firefly-particles"
        options={options}
        className="pointer-events-none absolute inset-0"
      />
    </ParticlesProvider>
  )
}
