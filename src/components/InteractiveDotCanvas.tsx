import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  originX: number
  originY: number
  baseRadius: number
  currentRadius: number
  currentOpacity: number
  vx: number
  vy: number
}

interface InteractiveDotCanvasProps {
  className?: string
  fadeTop?: boolean
}

export default function InteractiveDotCanvas({
  className = '',
  fadeTop = false,
}: InteractiveDotCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number | null = null
    let dots: Dot[] = []

    let mouseX = -9999
    let mouseY = -9999
    let targetMouseX = -9999
    let targetMouseY = -9999

    // Refined, smaller dimensions for elegant high-precision dot matrix
    const SPACING = 22
    const INFLUENCE_RADIUS = 130
    const BASE_RADIUS = 0.95   // Small, delicate dots
    const MAX_RADIUS = 2.1    // Refined cursor expansion (never bulky)

    // Palette from Rise Global:
    const COLOR_BASE = { r: 100, g: 115, b: 126 } // Subtle steel
    const COLOR_ACTIVE = { r: 20, g: 33, b: 44 }   // Process ink navy
    const COLOR_HIGHLIGHT = { r: 62, g: 98, b: 140 } // Brand blue

    const initDots = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1
      const startX = (width - (cols - 1) * SPACING) / 2
      const startY = (height - (rows - 1) * SPACING) / 2

      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * SPACING
          const y = startY + r * SPACING
          dots.push({
            x,
            y,
            originX: x,
            originY: y,
            baseRadius: BASE_RADIUS,
            currentRadius: BASE_RADIUS,
            currentOpacity: 0.28,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = e.clientX - rect.left
      targetMouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      targetMouseX = -9999
      targetMouseY = -9999
    }

    const startTime = performance.now()

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001

      // Smooth mouse follow
      if (targetMouseX === -9999) {
        mouseX = -9999
        mouseY = -9999
      } else {
        mouseX += (targetMouseX - mouseX) * 0.16
        mouseY += (targetMouseY - mouseY) * 0.16
      }

      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        // Subtle organic ripple wave (ChatGPT loading dot effect)
        const distFromCenter = Math.hypot(dot.originX - rect.width / 2, dot.originY - rect.height / 2)
        const wave = Math.sin(elapsed * 2.4 - distFromCenter * 0.014) * 0.5 + 0.5
        const wave2 = Math.cos(elapsed * 1.6 + (dot.originX + dot.originY) * 0.012) * 0.5 + 0.5
        const combinedWave = wave * 0.65 + wave2 * 0.35

        // Cursor proximity physics
        let mouseInfluence = 0
        let targetX = dot.originX
        let targetY = dot.originY

        if (mouseX !== -9999) {
          const dx = dot.originX - mouseX
          const dy = dot.originY - mouseY
          const dist = Math.hypot(dx, dy)

          if (dist < INFLUENCE_RADIUS) {
            const norm = 1 - dist / INFLUENCE_RADIUS
            mouseInfluence = norm * norm

            // Gentle elastic displacement
            const angle = Math.atan2(dy, dx)
            const pushDist = mouseInfluence * 9
            targetX = dot.originX + Math.cos(angle) * pushDist
            targetY = dot.originY + Math.sin(angle) * pushDist
          }
        }

        // Spring position
        dot.vx = (dot.vx + (targetX - dot.x) * 0.22) * 0.72
        dot.vy = (dot.vy + (targetY - dot.y) * 0.22) * 0.72
        dot.x += dot.vx
        dot.y += dot.vy

        // Target radius: base + subtle wave shimmer + mouse growth
        const targetRadius =
          dot.baseRadius +
          combinedWave * 0.35 +
          mouseInfluence * (MAX_RADIUS - dot.baseRadius)

        dot.currentRadius += (targetRadius - dot.currentRadius) * 0.22

        // Target opacity
        let targetOpacity = 0.24 + combinedWave * 0.18 + mouseInfluence * 0.55
        targetOpacity = Math.min(0.92, targetOpacity)
        dot.currentOpacity += (targetOpacity - dot.currentOpacity) * 0.2

        // Soft fade near top of quadrant to eliminate any cut-off seam under navbar
        let alpha = dot.currentOpacity
        if (fadeTop && dot.y < 80) {
          const fadeFactor = Math.max(0, Math.min(1, (dot.y - 12) / 68))
          alpha *= fadeFactor
        }

        if (alpha <= 0.01) continue

        // Color blend based on mouse influence
        let r = COLOR_BASE.r
        let g = COLOR_BASE.g
        let b = COLOR_BASE.b

        if (mouseInfluence > 0.02) {
          const t = mouseInfluence
          r = Math.round(COLOR_BASE.r * (1 - t) + COLOR_ACTIVE.r * t)
          g = Math.round(COLOR_BASE.g * (1 - t) + COLOR_HIGHLIGHT.g * t)
          b = Math.round(COLOR_BASE.b * (1 - t) + COLOR_HIGHLIGHT.b * t)
        }

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, Math.max(0.6, dot.currentRadius), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(() => {
      initDots()
    })
    resizeObserver.observe(canvas)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    initDots()
    animationFrameId = requestAnimationFrame(render)

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [fadeTop])

  return (
    <canvas
      ref={canvasRef}
      className={`interactive-dot-canvas ${className}`}
      aria-hidden="true"
    />
  )
}
