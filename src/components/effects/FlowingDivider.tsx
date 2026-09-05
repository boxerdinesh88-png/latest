import { useState } from 'react'
import { Shader, FlowingGradient } from 'shaders/react'
import { useTheme } from '../../lib/theme'

/**
 * WebGPU flowing-gradient band used behind the CODE -> DESIGN -> MOTION marquee.
 * Renders a theme-aware Shader if the GPU supports it; otherwise stays transparent
 * (the parent keeps its plain panel styling).
 */
export default function FlowingDivider() {
  const { theme } = useTheme()
  const [ok, setOk] = useState(true)
  const dark = theme === 'dark'

  if (!ok) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Shader
        className="absolute inset-0 h-full w-full opacity-90 dark:opacity-95"
        disableTelemetry
        onUnavailable={() => setOk(false)}
      >
        <FlowingGradient
          colorA={dark ? '#0a0714' : '#fdfbff'}
          colorB={dark ? '#7c3aed' : '#d8b4fe'}
          colorC={dark ? '#ec4899' : '#fbcfe8'}
          colorD={dark ? '#22d3ee' : '#a5f3fc'}
          speed={1.2}
          distortion={0.35}
          seed={3}
        />
      </Shader>
      {/* legibility veil so the marquee text stays crisp */}
      <div className="absolute inset-0 bg-base/70 dark:bg-base/50" />
    </div>
  )
}