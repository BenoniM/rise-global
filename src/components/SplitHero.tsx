import { type ReactNode, useEffect, useRef } from 'react'

interface SplitHeroProps {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  imageSrc: string
  imageAlt: string
}

/**
 * Editorial split hero: a ruled two-column grid (eyebrow + headline top-left,
 * description bottom-right) followed by a full-bleed photo with a scroll parallax.
 */
export default function SplitHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
}: SplitHeroProps) {
  const mediaRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const media = mediaRef.current
    const img = imgRef.current
    if (!media || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number | null = null

    const update = () => {
      rafId = null
      const rect = media.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.bottom < 0 || rect.top > vh) return
      // 0 when the band enters at the bottom, 1 when it leaves at the top
      const p = (vh - rect.top) / (vh + rect.height)
      const shift = (p - 0.5) * 2 * rect.height * 0.15
      img.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="split-hero" aria-label={eyebrow}>
      <div className="split-hero-grid">
        <div className="split-hero-cell split-hero-cell--title">
          <p className="split-hero-eyebrow">{eyebrow}</p>
          <h1 className="split-hero-title">{title}</h1>
        </div>
        <div className="split-hero-cell split-hero-cell--blank" aria-hidden="true" />
        <div className="split-hero-cell split-hero-cell--blank" aria-hidden="true" />
        <div className="split-hero-cell split-hero-cell--desc">{description}</div>
      </div>

      <div className="split-hero-media" ref={mediaRef}>
        <img ref={imgRef} src={imageSrc} alt={imageAlt} className="split-hero-img" />
      </div>
    </section>
  )
}
