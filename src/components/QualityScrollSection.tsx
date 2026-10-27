import { useState, useRef, useEffect } from 'react'

export interface QualityItem {
  code: string
  title: string
  text: string
  image: string
  alt: string
}

export const qualityItems: QualityItem[] = [
  {
    code: 'USE CASE_ 001/003',
    title: 'Quality assurance',
    text: 'We work only with certified manufacturers and carefully vetted suppliers, so every product meets international standards, including GMP, ISO, CE and FDA certifications where applicable.',
    image: 'https://images.pexels.com/photos/36522029/pexels-photo-36522029.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Quality assurance facility',
  },
  {
    code: 'USE CASE_ 002/003',
    title: 'Regulatory compliance',
    text: 'We follow the national and international regulations that apply across our supply chain. Our internal processes align with Good Distribution Practice (GDP) and industry best practice, for safe, effective and timely delivery.',
    image: 'https://images.pexels.com/photos/30663290/pexels-photo-30663290.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Regulatory compliance facility',
  },
  {
    code: 'USE CASE_ 003/003',
    title: 'Ethical standards',
    text: 'Integrity and transparency guide every interaction with clients, partners and regulators. We keep strict policies against conflicts of interest, bribery and unethical conduct.',
    image: 'https://images.pexels.com/photos/8850744/pexels-photo-8850744.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Ethical standards facility',
  },
]

type FlipAction = {
  direction: 'next' | 'prev'
  prevIndex: number
  newIndex: number
  timestamp: number
} | null

export default function QualityScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flipAction, setFlipAction] = useState<FlipAction>(null)
  const timerRef = useRef<number | null>(null)

  const handleNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const nextIdx = (activeIndex + 1) % qualityItems.length
    setFlipAction({
      direction: 'next',
      prevIndex: activeIndex,
      newIndex: nextIdx,
      timestamp: Date.now(),
    })
    setActiveIndex(nextIdx)
    timerRef.current = window.setTimeout(() => {
      setFlipAction(null)
      timerRef.current = null
    }, 460)
  }

  const handlePrev = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const prevIdx = (activeIndex - 1 + qualityItems.length) % qualityItems.length
    setFlipAction({
      direction: 'prev',
      prevIndex: activeIndex,
      newIndex: prevIdx,
      timestamp: Date.now(),
    })
    setActiveIndex(prevIdx)
    timerRef.current = window.setTimeout(() => {
      setFlipAction(null)
      timerRef.current = null
    }, 460)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const getCardAnimationClass = (idx: number) => {
    const N = qualityItems.length
    const offset = (idx - activeIndex + N) % N

    if (!flipAction) {
      if (offset === 0) return 'quality-card--resting-front'
      if (offset === 1) return 'quality-card--resting-next'
      return 'quality-card--resting-back'
    }

    const { direction, prevIndex, newIndex } = flipAction

    if (direction === 'next') {
      if (idx === prevIndex) return 'quality-card--flip-to-back'
      if (idx === newIndex) return 'quality-card--rise-to-front'
      return 'quality-card--step-up'
    } else {
      if (idx === newIndex) return 'quality-card--flip-to-front'
      if (idx === prevIndex) return 'quality-card--step-down'
      return 'quality-card--step-to-back'
    }
  }

  return (
    <section className="quality-clean-section" aria-label="Quality, compliance and ethics">
      {/* SVG Clip Path for the notched image shape */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="notchedImageClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.04 A 0.04,0.04 0 0,1 0.04,0 L 0.96,0 A 0.04,0.04 0 0,1 1,0.04 L 1,0.72 A 0.035,0.035 0 0,1 0.965,0.755 L 0.835,0.755 A 0.035,0.035 0 0,0 0.80,0.79 L 0.80,0.96 A 0.04,0.04 0 0,1 0.76,1 L 0.04,1 A 0.04,0.04 0 0,1 0,0.96 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main section title & lede restored to the LEFT side */}
      <div className="quality-title-wrap">
        <h2 className="h-section">Quality, compliance and ethics</h2>
        <p className="lede">
          Our commitment to quality, regulatory compliance and ethical business practice is the
          foundation of everything we do.
        </p>
      </div>

      {/* Card stage with visible stacked boxes below and 3D flip animation */}
      <div className="quality-container">
        <div className="quality-boxes-stage">
          {qualityItems.map((item, idx) => {
            const animClass = getCardAnimationClass(idx)
            const isFront = idx === activeIndex

            return (
              <div
                key={item.title}
                className={`quality-full-box-card ${animClass} ${isFront ? 'quality-card--active' : 'quality-card--stacked'}`}
                aria-hidden={!isFront}
              >
                {/* Left: Notched Image */}
                <div className="quality-box-media">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="quality-box-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>

                {/* Right: Content with white text */}
                <div className="quality-box-content">
                  <div className="quality-box-code">{item.code}</div>
                  <h3 className="quality-box-title">{item.title}</h3>
                  <p className="quality-box-text">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Vertical Top/Down Navigation Arrows */}
        <div className="quality-nav-arrows" aria-label="Use case switcher">
          <button
            type="button"
            className="quality-arrow-btn"
            onClick={handlePrev}
            aria-label="Previous use case"
            title="Previous use case"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            type="button"
            className="quality-arrow-btn"
            onClick={handleNext}
            aria-label="Next use case"
            title="Next use case"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
