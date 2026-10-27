import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Solution } from '../data/solutions'
import { Glyph } from './Glyphs'
import InteractiveDotCanvas from './InteractiveDotCanvas'

interface SolutionHeroProps {
  solution: Solution
}

export default function SolutionHero({ solution }: SolutionHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const quoteTo = `/contact?solution=${solution.slug}`

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let rafId: number | null = null

    const updateScroll = () => {
      const rect = track.getBoundingClientRect()
      const scrollDist = track.offsetHeight - window.innerHeight

      if (scrollDist <= 0) {
        if (cardRef.current) {
          cardRef.current.style.transform = 'translate3d(0, 0%, 0)'
        }
        return
      }

      // scrolled starts at 0 when the top of the track hits the top of viewport
      const scrolled = -rect.top
      const rawP = Math.min(Math.max(scrolled / scrollDist, 0), 1)

      // Dwell phase:
      // Card reaches top: 0 (translateY 0%) by rawP = 0.65
      // From rawP = 0.65 to 1.0, the card stays 100% locked & aligned alongside the title
      const cardP = Math.min(Math.max(rawP / 0.65, 0), 1)
      // Smooth cubic ease-out so it settles into perfect alignment smoothly
      const eased = 1 - Math.pow(1 - cardP, 3)
      const translateY = (1 - eased) * 100

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(0, ${translateY.toFixed(3)}%, 0)`
      }
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        updateScroll()
        rafId = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateScroll()

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      className="aspen-hero-track"
      ref={trackRef}
      aria-label={`${solution.name} Hero Presentation`}
    >
      <div className="aspen-hero-sticky" ref={stickyRef}>
        {/* 2x2 Quadrant Grid */}
        <div className="aspen-grid">
          {/* ===============================================================
              QUADRANT 1: TOP-LEFT (Title Only)
              =============================================================== */}
          <div className="aspen-quadrant aspen-quadrant--top-left">
            <div className="aspen-title-box">
              <h1 className="aspen-hero-title">
                {solution.name}
              </h1>
            </div>
          </div>

          {/* ===============================================================
              QUADRANT 2: TOP-RIGHT (Interactive Dot Pattern with soft top fade)
              =============================================================== */}
          <div className="aspen-quadrant aspen-quadrant--top-right">
            <InteractiveDotCanvas fadeTop={true} />
          </div>

          {/* ===============================================================
              QUADRANT 3: BOTTOM-LEFT (Interactive Dot Pattern)
              =============================================================== */}
          <div className="aspen-quadrant aspen-quadrant--bottom-left">
            <InteractiveDotCanvas />
          </div>

          {/* ===============================================================
              QUADRANT 4: BOTTOM-RIGHT (Empty area with Interactive Dot Pattern)
              =============================================================== */}
          <div className="aspen-quadrant aspen-quadrant--bottom-right">
            <InteractiveDotCanvas />
          </div>
        </div>

        {/* ===============================================================
            SLIDING TWO-PART CARD (Spans Right Column, moves from Bottom-Right to Top-Right)
            =============================================================== */}
        <div
          className="aspen-sliding-card"
          ref={cardRef}
          style={{ transform: `translate3d(0, 100%, 0)` }}
        >
          {/* SUB-BOX A: Dark Charcoal Half with Description & Action Link */}
          <div className="aspen-card-half aspen-card-half--dark">
            <div className="aspen-card-body">
              <p className="aspen-card-summary">
                {solution.summary}
              </p>
            </div>

            <div className="aspen-card-footer">
              <Link to={quoteTo} className="aspen-conversation-btn">
                <span>REQUEST A QUOTE</span>
                <span className="aspen-btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* SUB-BOX B: Brand Sage Half with Icon / Drawing Only */}
          <div className="aspen-card-half aspen-card-half--sage">
            <div className="aspen-drawing-container">
              <div className={`aspen-glyph-frame plate--${solution.glyph}`}>
                {solution.image ? (
                  <img
                    src={solution.image}
                    alt={solution.imageAlt ?? `${solution.name} equipment illustration`}
                    className="aspen-drawing-img"
                  />
                ) : (
                  <Glyph id={solution.glyph} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
