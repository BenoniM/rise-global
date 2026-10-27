import { useState, useCallback, useEffect, type TouchEvent } from 'react'
import { Link } from 'react-router-dom'
import { solutions } from '../data/solutions'

// Curated Unsplash/Pexels photography mapped to the 9 solutions
const solutionImages: Record<string, string> = {
  'transfer-of-technology':
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=85',
  'machinery-equipment':
    'https://images.pexels.com/photos/3849594/pexels-photo-3849594.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'packaging-lines':
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=85',
  'cleanroom-systems':
    'https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'laboratory':
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=85',
  'water-systems':
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85',
  'electrical-power':
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85',
  'cold-rooms':
    'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'raw-materials':
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1400&q=85',
}

export default function PlantMap({ intro = false }: { intro?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const total = solutions.length

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setDirection('next')
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % total)
    setTimeout(() => setIsTransitioning(false), 360)
  }, [isTransitioning, total])

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setDirection('prev')
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + total) % total)
    setTimeout(() => setIsTransitioning(false), 360)
  }, [isTransitioning, total])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const onTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
    setTouchStart(null)
  }

  // Active and upcoming items
  const current = solutions[currentIndex]
  const nextItem = solutions[(currentIndex + 1) % total]
  const currentImage = solutionImages[current.slug] || solutionImages['transfer-of-technology']
  const nextImage = solutionImages[nextItem.slug] || solutionImages['machinery-equipment']

  return (
    <div
      className={intro ? 'divisions-container divisions-container--intro' : 'divisions-container'}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Section Header */}
      <div className="divisions-header">
        <h2 className="divisions-title">Nine Integrated Divisions. One Partner.</h2>
        <p className="divisions-lede">
          From technology transfer and formulation know-how to turnkey cleanrooms, process machinery,
          utilities, and raw materials.
        </p>
      </div>

      {/* 3-Column Showcase Stage */}
      <div className="divisions-stage">
        {/* Left Card: Active Solution Image with fixed Left Navigation Button */}
        <div
          className="divisions-stage-card divisions-stage-card--image"
          onClick={handlePrev}
          role="button"
          tabIndex={0}
          aria-label="Previous division"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handlePrev()
          }}
        >
          <img
            key={`img-${current.slug}`}
            src={currentImage}
            alt={current.name}
            className="divisions-card-img"
          />
          <div className="divisions-card-overlay" />

          {/* Left Arrow Button */}
          <button
            type="button"
            className="divisions-nav-btn divisions-nav-btn--left"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="Previous division"
          >
            <span className="divisions-arrow-glyph divisions-arrow-glyph--left" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </span>
          </button>
        </div>

        {/* Center Card: Clean text-only Description Box (no icons) */}
        <div
          key={`box-${current.slug}`}
          className={`divisions-stage-card divisions-stage-card--desc ${
            isTransitioning ? `divisions-stage-card--${direction}` : ''
          }`}
        >
          <div className="divisions-desc-top">
            <div className="divisions-desc-tag">
              <span className="divisions-desc-code">{current.code}</span>
              <span className="divisions-desc-sep">·</span>
              <span className="divisions-desc-name">{current.name}</span>
            </div>
            <div className="divisions-desc-counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>

          <div className="divisions-desc-body">
            <h3 className="divisions-desc-title">{current.name}</h3>
            <p className="divisions-desc-summary">{current.summary}</p>
          </div>

          <div className="divisions-desc-bottom">
            <div className="divisions-desc-rule" />
            <Link
              to={`/solutions/${current.slug}`}
              className="divisions-desc-link"
              aria-label={`Learn more about ${current.name}`}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Card: Next Solution Image with fixed Right Navigation Button */}
        <div
          className="divisions-stage-card divisions-stage-card--image"
          onClick={handleNext}
          role="button"
          tabIndex={0}
          aria-label="Next division"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleNext()
          }}
        >
          <img
            key={`img-${nextItem.slug}`}
            src={nextImage}
            alt={nextItem.name}
            className="divisions-card-img"
          />
          <div className="divisions-card-overlay" />

          {/* Right Arrow Button */}
          <button
            type="button"
            className="divisions-nav-btn divisions-nav-btn--right"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label="Next division"
          >
            <span className="divisions-arrow-glyph divisions-arrow-glyph--right" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
