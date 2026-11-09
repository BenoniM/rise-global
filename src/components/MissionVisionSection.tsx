import { useEffect, useRef } from 'react'
import { mission, vision } from '../data/site'

// Portion of the section's scroll range over which the wipe crosses the screen.
// Before and after this window, Mission and Vision sit fully visible for reading.
const WIPE_START = 0.3
const WIPE_END = 0.7

export default function MissionVisionSection() {
  const containerRef = useRef<HTMLElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const missionLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video1 = video1Ref.current
    const video2 = video2Ref.current
    const missionLayer = missionLayerRef.current

    if (!container || !video1 || !video2 || !missionLayer) return

    // Ensure videos play smoothly
    const playVideos = () => {
      video1.play().catch(() => {})
      video2.play().catch(() => {})
    }
    playVideos()

    let rafId: number | null = null

    const update = () => {
      const rect = container.getBoundingClientRect()
      const totalScroll = container.offsetHeight - window.innerHeight
      if (totalScroll <= 0) return

      const scrolled = -rect.top
      const p = Math.min(Math.max(scrolled / totalScroll, 0), 1)

      // Ensure videos keep playing when in view
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        if (video1.paused) video1.play().catch(() => {})
        if (video2.paused) video2.play().catch(() => {})
      }

      // Linear on purpose: the wipe edge stays locked to the scroll position.
      const wipe = Math.min(Math.max((p - WIPE_START) / (WIPE_END - WIPE_START), 0), 1)

      // Mission is cut away from the bottom up, exposing Vision underneath.
      missionLayer.style.clipPath = `inset(0 0 ${(wipe * 100).toFixed(3)}% 0)`
    }

    const onScrollOrResize = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }

    // Initial calculation
    update()

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return (
    <section id="vision-mission" ref={containerRef} className="mv-scroll-container">
      <div className="mv-sticky-viewport">
        {/* Layer 2 (underneath): Vision */}
        <div className="mv-layer">
          <div className="mv-video-wrapper">
            <video
              ref={video2Ref}
              className="mv-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source
                src="https://videos.pexels.com/video-files/32386620/13814619_3840_2160_100fps.mp4"
                type="video/mp4"
              />
              <source src="https://www.pexels.com/download/video/32386620/" type="video/mp4" />
            </video>
          </div>
          <div className="mv-overlay-scrim" />
          <div className="mv-text-slide">
            <div className="mv-text-content">
              <h2 className="mv-title">Vision</h2>
              <p className="mv-body">{vision}</p>
            </div>
          </div>
        </div>

        {/* Layer 1 (on top, clipped on scroll): Mission */}
        <div ref={missionLayerRef} className="mv-layer mv-layer--top">
          <div className="mv-video-wrapper">
            <video
              ref={video1Ref}
              className="mv-video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source
                src="https://videos.pexels.com/video-files/16636200/16636200-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
              <source src="https://www.pexels.com/download/video/16636200/" type="video/mp4" />
            </video>
          </div>
          <div className="mv-overlay-scrim" />
          <div className="mv-text-slide">
            <div className="mv-text-content">
              <h2 className="mv-title">Mission</h2>
              <p className="mv-body">{mission}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
