import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Sparkles, Text, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../lib/theme'

/* ------------------------------------------------------------------ */
/*  Palette resolved from the active theme                            */
/* ------------------------------------------------------------------ */

interface Palette {
  surface: string
  surfaceSide: string
  ink: string
  accent: string
  pink: string
  cyan: string
  amber: string
  green: string
  text: string
}

const DARK: Palette = {
  surface: '#1a1b2a',
  surfaceSide: '#0d0e1a',
  ink: '#e8e8f0',
  accent: '#8b5cf6',
  pink: '#f472b6',
  cyan: '#22d3ee',
  amber: '#fbbf24',
  green: '#34d399',
  text: '#8f93b2',
}

const LIGHT: Palette = {
  surface: '#ffffff',
  surfaceSide: '#f2f2f7',
  ink: '#101022',
  accent: '#7c3aed',
  pink: '#ec4899',
  cyan: '#0891b2',
  amber: '#d97706',
  green: '#059669',
  text: '#5a5d78',
}

function darken(hex: string, amt: number) {
  const n = hex.replace('#', '')
  const r = Math.max(0, parseInt(n.slice(0, 2), 16) - amt)
  const g = Math.max(0, parseInt(n.slice(2, 4), 16) - amt)
  const b = Math.max(0, parseInt(n.slice(4, 6), 16) - amt)
  return `rgb(${r},${g},${b})`
}

/* ------------------------------------------------------------------ */
/*  Energy points circling the workstation                            */
/* ------------------------------------------------------------------ */

function EnergyPoints({ count = 26, radius = 3.1 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2
      const r = radius + Math.sin(i * 7.3) * 0.5
      arr[i * 3] = Math.cos(t) * r
      arr[i * 3 + 1] = Math.sin(i * 2.9) * 1.5
      arr[i * 3 + 2] = Math.sin(t) * r
    }
    return arr
  }, [count, radius])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.05
    ref.current.rotation.x += delta * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8b5cf6"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Code editor window                                                */
/* ------------------------------------------------------------------ */

function CodeWindow({ palette }: { palette: Palette }) {
  const lines = [
    { c: palette.pink, t: { len: 10, color: palette.pink } },
    { c: palette.cyan, t: { len: 14, color: palette.cyan } },
    { c: palette.accent, t: { len: 18, color: palette.accent } },
    { c: palette.text, t: { len: 12, color: palette.text } },
  ]
  return (
    <group position={[0, 0, 0]}>
      <RoundedBox args={[1.5, 1.02, 0.06]} radius={0.025} smoothness={4}>
        <meshStandardMaterial color={palette.surface} metalness={0.2} roughness={0.35} />
      </RoundedBox>
      {/* screen */}
      <RoundedBox args={[1.42, 0.94, 0.03]} radius={0.02} smoothness={4} position={[0, 0, 0.05]}>
        <meshStandardMaterial color={palette.surfaceSide} roughness={0.55} metalness={0.05} />
      </RoundedBox>
      {/* chrome bar */}
      <mesh position={[0, 0.405, 0.075]}>
        <planeGeometry args={[1.34, 0.12]} />
        <meshBasicMaterial color={palette.surfaceSide} />
      </mesh>
      {/* traffic lights */}
      {[
        { x: -0.6, c: palette.pink },
        { x: -0.52, c: palette.amber },
        { x: -0.44, c: palette.green },
      ].map((d) => (
        <mesh key={d.x} position={[d.x, 0.405, 0.082]}>
          <circleGeometry args={[0.02, 14]} />
          <meshBasicMaterial color={d.c} />
        </mesh>
      ))}
      {/* code lines */}
      {lines.map((line, i) => (
        <mesh key={i} position={[-0.64 + (line.c === palette.pink ? 0 : 0), 0.24 - i * 0.17, 0.075]}>
          <planeGeometry args={[0.13 * line.t.len, 0.026]} />
          <meshBasicMaterial color={line.t.color} />
        </mesh>
      ))}
      {/* caret */}
      <mesh position={[-0.62, 0.24 + 0.055, 0.075]}>
        <planeGeometry args={[0.014, 0.03]} />
        <meshBasicMaterial color={palette.cyan} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Design canvas with palette                                         */
/* ------------------------------------------------------------------ */

function DesignCanvas({ palette }: { palette: Palette }) {
  const swatches = [palette.accent, palette.pink, palette.cyan, palette.amber, palette.green, '#e11d48']
  return (
    <group>
      <RoundedBox args={[1.0, 1.32, 0.06]} radius={0.025} smoothness={4}>
        <meshStandardMaterial color={palette.surface} metalness={0.2} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[0.94, 1.26, 0.03]} radius={0.02} smoothness={4} position={[0, 0, 0.05]}>
        <meshStandardMaterial color={palette.surfaceSide} roughness={0.55} metalness={0.05} />
      </RoundedBox>
      <Text position={[-0.32, 0.5, 0.075]} fontSize={0.05} color={palette.text} anchorX="left" anchorY="middle" fontWeight={700}>
        DESIGN
      </Text>
      {/* vector shapes */}
      <mesh position={[-0.2, 0.05, 0.075]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color={palette.pink} roughness={0.3} />
      </mesh>
      <mesh position={[0.16, -0.12, 0.075]}>
        <boxGeometry args={[0.22, 0.22, 0.02]} />
        <meshStandardMaterial color={palette.accent} roughness={0.3} />
      </mesh>
      <mesh position={[-0.18, -0.32, 0.075]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.06, 0.24, 0.02]} />
        <meshBasicMaterial color={palette.cyan} />
      </mesh>
      {/* palette swatches */}
      {swatches.map((c, i) => (
        <mesh key={i} position={[-0.39 + i * 0.156, -0.52, 0.08]}>
          <circleGeometry args={[0.048, 20]} />
          <meshBasicMaterial color={c} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Terminal window                                                   */
/* ------------------------------------------------------------------ */

function TerminalWindow({ palette }: { palette: Palette }) {
  return (
    <group>
      <RoundedBox args={[1.15, 0.82, 0.06]} radius={0.025} smoothness={4}>
        <meshStandardMaterial color={palette.surface} metalness={0.2} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[1.07, 0.74, 0.03]} radius={0.02} smoothness={4} position={[0, 0, 0.05]}>
        <meshStandardMaterial color={darken(palette.surfaceSide, 10)} roughness={0.6} />
      </RoundedBox>
      <Text position={[-0.44, 0.2, 0.075]} fontSize={0.045} color={palette.cyan} anchorX="left">
        $ runserver
      </Text>
      <Text position={[-0.44, 0.03, 0.075]} fontSize={0.04} color={palette.text} anchorX="left">
        ✓ Development server ready
      </Text>
      <Text position={[-0.44, -0.14, 0.075]} fontSize={0.04} color={palette.text} anchorX="left">
        ✓ database migrated · 200 OK
      </Text>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating geometry                                                 */
/* ------------------------------------------------------------------ */

function WireCube({ scale = 1, palette }: { scale?: number; palette: Palette }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.35
    ref.current.rotation.y += delta * 0.42
  })
  return (
    <mesh ref={ref} scale={scale}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={palette.accent} roughness={0.25} metalness={0.6} transparent opacity={0.85} />
    </mesh>
  )
}

function TorusRing({ palette }: { palette: Palette }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.2
    ref.current.rotation.y += delta * 0.35
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.18
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.24, 0.075, 90, 12]} />
      <meshStandardMaterial color={palette.pink} roughness={0.3} metalness={0.75} />
    </mesh>
  )
}

function Icosahedron({ position, size = 0.22, color, palette }: { position: [number, number, number]; size?: number; color: keyof Palette | string; palette: Palette }) {
  const ref = useRef<THREE.Mesh>(null)
  const col = typeof color === 'string' && color in palette ? palette[color as keyof Palette] : color
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z += 0.008
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.9) * 0.12
  })
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={col} roughness={0.2} metalness={0.7} transparent opacity={0.92} flatShading />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Mouse parallax rig + floating group                               */
/* ------------------------------------------------------------------ */

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    const x = state.pointer.x * 0.34
    const y = state.pointer.y * 0.22
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.045)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.045)
  })
  return <group ref={group}>{children}</group>
}

/* ------------------------------------------------------------------ */
/*  Scene                                                             */
/* ------------------------------------------------------------------ */

function Scene({ reduce, palette }: { reduce: boolean; palette: Palette }) {
  return (
    <>
      <ambientLight intensity={palette.ink === '#e8e8f0' ? 0.5 : 0.8} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <pointLight position={[-4, 2, -2]} intensity={12} color="#7c3aed" />
      <pointLight position={[4, -1, -2]} intensity={10} color="#ec4899" />
      <pointLight position={[0, 4, 4]} intensity={8} color="#22d3ee" />

      <Rig>
        <group>
          {/* primary float group: laptop + design canvas */}
          <Float speed={1.35} rotationIntensity={0.22} floatIntensity={0.8} floatingRange={[-0.12, 0.12]}>
            <group position={[0, 0.1, 0]} rotation={[0.05, 0.06, 0]}>
              {/* laptop base */}
              <RoundedBox args={[1.85, 0.1, 1.15]} radius={0.035} smoothness={4} position={[0, -0.12, 0]}>
                <meshStandardMaterial color={darken(palette.surface, 12)} metalness={0.3} roughness={0.35} />
              </RoundedBox>
              {/* laptop screen holding the code editor */}
              <group position={[0, 0, -0.28]} rotation={[-0.38, 0, 0]}>
                <RoundedBox args={[1.7, 1.2, 0.08]} radius={0.03} smoothness={4}>
                  <meshStandardMaterial color={darken(palette.surface, 8)} metalness={0.25} roughness={0.4} />
                </RoundedBox>
                <group position={[0, -0.01, 0.06]}>
                  <Scale3D x={0.86} y={0.8}>
                    <CodeWindow palette={palette} />
                  </Scale3D>
                </group>
              </group>
              {/* design canvas standing to the side */}
              <group position={[1.18, 0.42, -0.2]} rotation={[0.05, -0.5, 0.04]}>
                <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.05, 0.05]}>
                  <DesignCanvas palette={palette} />
                </Float>
              </group>
              {/* small palette cube on desk */}
              <Float speed={1.9} rotationIntensity={0.4} floatIntensity={0.5} floatingRange={[-0.04, 0.04]}>
                <WireCube scale={0.72} palette={palette} />
              </Float>
            </group>
          </Float>

          {/* terminal top-right */}
          <Float speed={1.9} rotationIntensity={0.18} floatIntensity={1.1} floatingRange={[-0.15, 0.15]}>
            <group position={[1.75, 1.2, -0.75]} rotation={[0.02, -0.6, 0.02]}>
              <TerminalWindow palette={palette} />
            </group>
          </Float>

          {/* geometric accents */}
          {!reduce && (
            <>
              <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
                <group position={[2.0, -0.7, 0.3]}>
                  <WireCube scale={1.15} palette={palette} />
                </group>
              </Float>
              <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.2} floatingRange={[-0.18, 0.18]}>
                <group position={[-1.95, -1.0, -0.4]}>
                  <TorusRing palette={palette} />
                </group>
              </Float>
              <Icosahedron position={[0.35, 1.75, 0.4]} color="cyan" palette={palette} />
              <Icosahedron position={[-2.0, 1.05, 0.6]} size={0.15} color="#a78bfa" palette={palette} />
              <Icosahedron position={[2.25, 0.4, -0.9]} size={0.17} color="#f0abfc" palette={palette} />
              <Sparkles count={60} scale={5.5} size={2.2} speed={0.32} color="#c4b5fd" opacity={0.55} />
            </>
          )}

          <EnergyPoints count={reduce ? 16 : 28} />

          {/* soft floor disc */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]}>
            <circleGeometry args={[2.7, 48]} />
            <meshStandardMaterial color={palette.surfaceSide} transparent opacity={0.14} roughness={1} />
          </mesh>
        </group>
      </Rig>
    </>
  )
}

function Scale3D({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <group>
      <group scale={[x, y, x]}>{children}</group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  WebGL detection                                                   */
/* ------------------------------------------------------------------ */

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

interface HeroSceneProps {
  reduced?: boolean
  className?: string
}

export default function HeroScene({ reduced = false, className }: HeroSceneProps) {
  const { theme } = useTheme()
  const palette = theme === 'dark' ? DARK : LIGHT

  const [webgl] = useMemo(() => [supportsWebGL()], [])
  const isMobile =
    typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)

  if (!webgl) return <FallbackScene />

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 5.6], fov: 42 }}
        dpr={reduced || isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene reduce={reduced || isMobile} palette={palette} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Static fallback for non-WebGL devices                              */
/* ------------------------------------------------------------------ */

function FallbackScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px] [perspective:1000px]" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center [transform:rotateX(6deg)_rotateZ(-3deg)]">
        <div className="relative h-72 w-72 rounded-3xl border border-ink/10 bg-panel/70 p-4 shadow-2xl shadow-ink/10 backdrop-blur-xl">
          <div className="flex h-full w-full flex-col gap-2 rounded-2xl bg-ink/[0.04] p-4">
            <div className="h-3 w-20 rounded-full bg-ink/15" />
            <div className="h-2 w-full rounded-full" style={{ background: '#ec4899', opacity: 0.6 }} />
            <div className="h-2 w-4/5 rounded-full" style={{ background: '#7c3aed', opacity: 0.6 }} />
            <div className="h-2 w-full rounded-full" style={{ background: '#22d3ee', opacity: 0.6 }} />
            <div className="mt-auto grid grid-cols-3 gap-2">
              {['#7c3aed', '#ec4899', '#22d3ee', '#f59e0b', '#34d399', '#e11d48'].map((c) => (
                <div key={c} className="h-9 rounded-lg" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-8 rounded-xl border border-ink/10 bg-panel/70 px-3 py-2 font-mono text-xs font-semibold text-ink backdrop-blur-xl animate-float-y">
        {'</>'} CODE
      </div>
      <div className="absolute bottom-10 right-0 rounded-xl border border-ink/10 bg-panel/70 px-3 py-2 font-mono text-xs font-semibold text-ink backdrop-blur-xl animate-float-y [animation-delay:1.5s]">
        DESIGN ✦
      </div>
    </div>
  )
}