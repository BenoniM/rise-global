import { useEffect, useRef } from 'react'
import { countries } from '../data/site'

export default function CologneSection() {
  const trackRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)
  const videoCardRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Autoplay configuration
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.defaultMuted = true
      videoRef.current.play().catch(() => {})
    }

    const tryPlay = () => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {})
      }
    }
    window.addEventListener('scroll', tryPlay, { once: true, passive: true })
    window.addEventListener('click', tryPlay, { once: true })
    window.addEventListener('touchstart', tryPlay, { once: true })

    const track = trackRef.current
    const sticky = stickyRef.current
    const slot = slotRef.current
    const videoCard = videoCardRef.current
    const leftCol = leftColRef.current
    const overlay = overlayRef.current

    if (!track || !sticky || !slot || !videoCard || !leftCol || !overlay) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let rafId: number | null = null

    const update = () => {
      const rect = track.getBoundingClientRect()
      const scrollDist = track.offsetHeight - window.innerHeight

      if (scrollDist <= 0) return

      // scrolled: 0 when track top hits viewport top, scrollDist when track finishes
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / scrollDist, 0), 1)

      // Dynamically match initial video slot height to text height
      const isStacked = window.innerWidth <= 900
      if (isStacked) {
        slot.style.height = '240px'
      } else {
        const textHeight = leftCol.offsetHeight
        if (textHeight > 0) {
          slot.style.height = `${textHeight}px`
        }
      }

      // Slot geometry relative to sticky container
      const stickyRect = sticky.getBoundingClientRect()
      const slotRect = slot.getBoundingClientRect()

      const initialLeft = slotRect.left - stickyRect.left
      const initialTop = slotRect.top - stickyRect.top
      const initialWidth = slotRect.width
      const initialHeight = slotRect.height

      const targetLeft = 0
      const targetTop = 0
      const targetWidth = stickyRect.width
      const targetHeight = stickyRect.height

      // Three-phase timeline:
      // 1. Resting phase: 0.00 -> 0.10 (video stays in slot, text fully readable)
      // 2. Expansion phase: 0.10 -> 0.72 (video expands to full screen)
      // 3. Dwell phase: 0.72 -> 1.00 (video locked at 100vw x 100vh with overlay)
      let ease = 0
      if (progress <= 0.10) {
        ease = 0
      } else if (progress >= 0.72) {
        ease = 1
      } else {
        const norm = (progress - 0.10) / (0.72 - 0.10)
        ease = 0.5 - 0.5 * Math.cos(norm * Math.PI)
      }

      const curLeft = initialLeft + (targetLeft - initialLeft) * ease
      const curTop = initialTop + (targetTop - initialTop) * ease
      const curWidth = initialWidth + (targetWidth - initialWidth) * ease
      const curHeight = initialHeight + (targetHeight - initialHeight) * ease
      const curRadius = 16 * (1 - ease)

      videoCard.style.left = `${curLeft.toFixed(2)}px`
      videoCard.style.top = `${curTop.toFixed(2)}px`
      videoCard.style.width = `${curWidth.toFixed(2)}px`
      videoCard.style.height = `${curHeight.toFixed(2)}px`
      videoCard.style.borderRadius = `${curRadius.toFixed(2)}px`
      videoCard.style.opacity = '1'

      // Left text fade & subtle drift
      const textOpacity = Math.max(0, 1 - ease * 1.6)
      const textShift = -ease * 36
      leftCol.style.opacity = textOpacity.toFixed(3)
      leftCol.style.transform = `translate3d(${textShift.toFixed(1)}px, 0, 0)`

      // Overlay reveal in full-screen (starts at 0.65, fully visible by 0.80)
      let overlayProgress = 0
      if (progress >= 0.80) {
        overlayProgress = 1
      } else if (progress <= 0.65) {
        overlayProgress = 0
      } else {
        const norm = (progress - 0.65) / (0.80 - 0.65)
        overlayProgress = 0.5 - 0.5 * Math.cos(norm * Math.PI)
      }

      overlay.style.opacity = overlayProgress.toFixed(3)
      overlay.style.pointerEvents = overlayProgress > 0.5 ? 'auto' : 'none'
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        update()
        rafId = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    update()
    const t1 = setTimeout(update, 50)
    const t2 = setTimeout(update, 200)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('scroll', tryPlay)
      window.removeEventListener('click', tryPlay)
      window.removeEventListener('touchstart', tryPlay)
    }
  }, [])

  return (
    <section className="cologne-track" ref={trackRef} aria-label="From Cologne to Africa and Asia">
      <div className="cologne-sticky" ref={stickyRef}>
        <div className="cologne-container">
          <div className="cologne-left-col" ref={leftColRef}>
            <h2 className="cologne-title">From Cologne to Africa and Asia</h2>
            <p className="cologne-lede">
              Our target is the whole of Africa and Asia, with Cologne as our base for sourcing,
              engineering and project management.
            </p>
          </div>

          <div className="cologne-right-col">
            <div className="cologne-video-slot" ref={slotRef} aria-hidden="true" />
          </div>
        </div>

        {/* The expanding video card */}
        <div className="cologne-expanding-card" ref={videoCardRef}>
          <video
            ref={videoRef}
            className="cologne-video-player"
            src="https://www.pexels.com/download/video/7033928/"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />

          {/* Cinematic Fullscreen Overlay (Image 4 & 5 style) */}
          <div className="cologne-fullscreen-overlay" ref={overlayRef}>
            <div className="cologne-overlay-shell">
              <div className="cologne-overlay-grid">
                <div className="cologne-overlay-left">
                  <div className="cologne-overlay-brand-name">Six Countries</div>
                  <div className="cologne-overlay-phonetic">\ Active Turnkey Operations \</div>
                </div>

                <div className="cologne-overlay-right">
                  <p className="cologne-overlay-quote">
                    Today delivering certified European cleanrooms, equipment and pharmaceutical manufacturing facilities across six nations.
                  </p>
                </div>
              </div>

              <div className="cologne-overlay-line" aria-hidden="true" />

              <div className="cologne-overlay-bottom-bar">
                <span className="cologne-overlay-tagline">Operating Footprint</span>
                <div className="cologne-overlay-countries">
                  {countries.map((c) => (
                    <span key={c} className="cologne-overlay-country-pill">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
