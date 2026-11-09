import { Link } from 'react-router-dom'
import type { Solution } from '../data/solutions'
import { Glyph } from './Glyphs'
import InteractiveDotCanvas from './InteractiveDotCanvas'

interface SolutionHeroProps {
  solution: Solution
}

export default function SolutionHero({ solution }: SolutionHeroProps) {
  const quoteTo = `/contact?solution=${solution.slug}`

  return (
    <section
      className="aspen-hero-track"
      aria-label={`${solution.name} Hero Presentation`}
    >
      <div className="aspen-hero-sticky">
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
            TWO-PART CARD (fixed in the Bottom-Right quadrant)
            =============================================================== */}
        <div
          className="aspen-sliding-card">
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
