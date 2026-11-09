import { useEffect, useRef } from 'react'
import { countries } from '../data/site'

export default function CologneSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.play().catch(() => {})

    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {})
    }
    window.addEventListener('scroll', tryPlay, { once: true, passive: true })
    window.addEventListener('click', tryPlay, { once: true })
    window.addEventListener('touchstart', tryPlay, { once: true })

    return () => {
      window.removeEventListener('scroll', tryPlay)
      window.removeEventListener('click', tryPlay)
      window.removeEventListener('touchstart', tryPlay)
    }
  }, [])

  return (
    <section className="cologne-section">
      <video
        ref={videoRef}
        className="cologne-video"
        src="https://www.pexels.com/download/video/7033928/"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="cologne-scrim" aria-hidden="true" />

      <div className="cologne-content">
        <div>
          <h2 className="cologne-stat">Six Countries</h2>
          <div className="cologne-stat-label">Active Turnkey Operations</div>
          <p className="cologne-stat-text">
            Today delivering certified European cleanrooms, equipment and pharmaceutical
            manufacturing facilities across six nations.
          </p>
        </div>

        <ul className="cologne-countries">
          {countries.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
