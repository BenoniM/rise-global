import { useEffect, useRef } from 'react'
import { mission, vision } from '../data/site'

export default function MissionVisionSection() {
  const containerRef = useRef<HTMLElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const missionTextRef = useRef<HTMLDivElement>(null)
  const visionTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const video1 = video1Ref.current
    const video2 = video2Ref.current
    const missionText = missionTextRef.current
    const visionText = visionTextRef.current

    if (!container || !video1 || !video2 || !missionText || !visionText) return

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

      // Smooth cosine easing function for buttery changes
      const easeInOut = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t)

      const travelDist = Math.min(window.innerHeight * 0.28, 200)

      // ----------------------------------------------------
      // 1. Mission Text (Bottom -> Middle -> Top)
      // ----------------------------------------------------
      let mOpacity = 0
      let mTranslateY = travelDist

      if (p < 0.20) {
        // Enters from bottom to center (0.00 -> 0.20)
        const t = Math.max(p / 0.20, 0)
        const ease = easeInOut(t)
        mOpacity = ease
        mTranslateY = (1 - ease) * travelDist
      } else if (p >= 0.20 && p <= 0.38) {
        // Resting in center (0.20 -> 0.38) - generous reading time
        mOpacity = 1
        mTranslateY = 0
      } else if (p > 0.38 && p <= 0.48) {
        // Moves up and fades out (0.38 -> 0.48)
        const t = (p - 0.38) / 0.10
        const ease = easeInOut(t)
        mOpacity = 1 - ease
        mTranslateY = -ease * travelDist
      } else {
        // Fully faded out
        mOpacity = 0
        mTranslateY = -travelDist
      }

      missionText.style.opacity = mOpacity.toFixed(3)
      missionText.style.transform = `translate3d(0, ${mTranslateY.toFixed(1)}px, 0)`
      missionText.style.pointerEvents = mOpacity > 0.1 ? 'auto' : 'none'

      // ----------------------------------------------------
      // 2. Video 1 & Video 2 Direct Crossfade (no black gap)
      // ----------------------------------------------------
      // Both videos share the same transition window (0.42 → 0.57)
      // Video 1 fades out while Video 2 simultaneously fades in
      let v1Opacity = 1
      let v2Opacity = 0

      if (p > 0.42 && p <= 0.57) {
        const t = (p - 0.42) / 0.15
        const ease = easeInOut(t)
        v1Opacity = 1 - ease
        v2Opacity = ease
      } else if (p > 0.57) {
        v1Opacity = 0
        v2Opacity = 1
      }

      video1.style.opacity = v1Opacity.toFixed(3)
      video2.style.opacity = v2Opacity.toFixed(3)

      // ----------------------------------------------------
      // 3. Vision Text (Bottom -> Middle -> Top)
      // ----------------------------------------------------
      let visOpacity = 0
      let visTranslateY = travelDist

      if (p >= 0.58 && p < 0.74) {
        // Enters from bottom to center (0.58 -> 0.74)
        const t = (p - 0.58) / 0.16
        const ease = easeInOut(t)
        visOpacity = ease
        visTranslateY = (1 - ease) * travelDist
      } else if (p >= 0.74 && p <= 0.88) {
        // Resting in center (0.74 -> 0.88) - generous reading time
        visOpacity = 1
        visTranslateY = 0
      } else if (p > 0.88 && p <= 0.99) {
        // Moves up and fades out (0.88 -> 0.99)
        const t = (p - 0.88) / 0.11
        const ease = easeInOut(t)
        visOpacity = 1 - ease
        visTranslateY = -ease * travelDist
      } else if (p > 0.99) {
        visOpacity = 0
        visTranslateY = -travelDist
      }

      visionText.style.opacity = visOpacity.toFixed(3)
      visionText.style.transform = `translate3d(0, ${visTranslateY.toFixed(1)}px, 0)`
      visionText.style.pointerEvents = visOpacity > 0.1 ? 'auto' : 'none'
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
    video1.addEventListener('loadedmetadata', update)
    video2.addEventListener('loadedmetadata', update)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      video1.removeEventListener('loadedmetadata', update)
      video2.removeEventListener('loadedmetadata', update)
    }
  }, [])

  return (
    <section id="vision-mission" ref={containerRef} className="mv-scroll-container">
      <div className="mv-sticky-viewport">
        {/* Background Video 1: Mission */}
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

        {/* Background Video 2: Vision */}
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

        {/* Cinematic dark scrim overlay */}
        <div className="mv-overlay-scrim" />

        {/* Slide 1: Mission */}
        <div ref={missionTextRef} className="mv-text-slide">
          <div className="mv-text-content">
            <h2 className="mv-title">Mission</h2>
            <p className="mv-body">{mission}</p>
          </div>
        </div>

        {/* Slide 2: Vision */}
        <div ref={visionTextRef} className="mv-text-slide">
          <div className="mv-text-content">
            <h2 className="mv-title">Vision</h2>
            <p className="mv-body">{vision}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
