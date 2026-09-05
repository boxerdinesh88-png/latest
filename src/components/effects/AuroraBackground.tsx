import { useEffect, useState } from 'react'
import { Shader, Aurora, isWebGPUSupported } from 'shaders/react'
import { useTheme } from '../../lib/theme'
import GradientMesh from './GradientMesh'

/**
 * Ambient page background.
 * - WebGPU available -> GPU-accelerated Aurora (brand palette, reactive to theme).
 * - Otherwise (or on failure / reduced motion) -> falls back to the CSS gradient mesh.
 */
export default function AuroraBackground() {
  const { theme } = useTheme()
  const [ok, setOk] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') return null
    return isWebGPUSupported()
  })
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Not supported (or reduced motion) -> graceful CSS fallback
  if (ok === false || reduced) {
    return <GradientMesh />
  }

  // Detection pending -> keep the page clean until we know
  if (ok === null || ok === undefined) {
    return null
  }

  const dark = theme === 'dark'

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Shader
        className="absolute inset-0 h-full w-full opacity-[0.55] dark:opacity-[0.8]"
        disableTelemetry
        onUnavailable={() => setOk(false)}
      >
        <Aurora
          colorA={dark ? '#7c3aed' : '#8b5cf6'}
          colorB={dark ? '#ec4899' : '#f472b6'}
          colorC={dark ? '#22d3ee' : '#38bdf8'}
          intensity={dark ? 40 : 24}
          speed={3.5}
          height={100}
          waviness={32}
          rayDensity={14}
          balance={46}
          curtainCount={4}
          seed={7}
        />
      </Shader>

      {/* legibility veil over the aurora */}
      <div className="absolute inset-0 bg-base/85 dark:bg-base/[0.62]" />
    </div>
  )
}