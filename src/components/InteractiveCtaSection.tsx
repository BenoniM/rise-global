import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

interface InteractiveCtaProps {
  id?: string
  title?: string
  text?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
  backgroundImage?: string
}

export default function InteractiveCtaSection({
  id = 'contact-cta',
  title = 'Planning a new plant, or upgrading one?',
  text = 'Tell us what you are building. We will come back with a scope and a quote.',
  primary = { label: 'Request a quote', to: '/contact' },
  secondary = { label: 'Products', to: '/products' },
  backgroundImage = 'https://images.pexels.com/photos/3849594/pexels-photo-3849594.jpeg',
}: InteractiveCtaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    let rafId: number | null = null

    const updatePosition = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight

      // rect.top is the distance from top of viewport to top of section.
      // When section enters from bottom, rect.top is vh.
      // When section top reaches top of viewport, rect.top is 0.
      const entryProgress = Math.min(Math.max((vh - rect.top) / vh, 0), 1)

      // When entryProgress is 1 (in focus or scrolled past), translateY is 0 (centered).
      // When entryProgress < 1, translateY moves down from offscreen top towards center.
      const travelDistance = Math.max(vh * 0.65, 380)
      const translateY = -(1 - entryProgress) * travelDistance

      content.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`
    }

    const onScrollOrResize = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        updatePosition()
        rafId = null
      })
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    document.addEventListener('scroll', onScrollOrResize, { passive: true })

    updatePosition()

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      document.removeEventListener('scroll', onScrollOrResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="interactive-cta-section"
      id={id}
      aria-label={title}
    >
      {/* Background Image with Extremely Soft Overlay */}
      <div className="interactive-cta-bg" aria-hidden="true">
        <img
          src={backgroundImage}
          alt=""
          className="interactive-cta-img"
          loading="lazy"
        />
        <div className="interactive-cta-overlay" />
      </div>

      {/* Center Animated Content */}
      <div className="interactive-cta-center-stage">
        <div ref={contentRef} className="interactive-cta-content">
          <h2 className="interactive-cta-title">{title}</h2>
          {text && <p className="interactive-cta-text">{text}</p>}
          <div className="interactive-cta-actions">
            <Link to={primary.to} className="interactive-btn interactive-btn--primary">
              {primary.label}
            </Link>
            {secondary && (
              <Link to={secondary.to} className="interactive-btn interactive-btn--secondary">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
