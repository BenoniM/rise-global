import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface CompanyHeroProps {
  imageSrc?: string
}

export default function CompanyHero({
  imageSrc = 'https://images.pexels.com/photos/7250797/pexels-photo-7250797.jpeg?auto=compress&cs=tinysrgb&w=2560',
}: CompanyHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const [, setProgress] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const sticky = stickyRef.current
    if (!track || !sticky) return

    let rafId: number | null = null

    const update = () => {
      const rect = track.getBoundingClientRect()
      const scrollDist = track.offsetHeight - window.innerHeight
      if (scrollDist <= 0) return

      const scrolled = -rect.top
      const p = Math.min(Math.max(scrolled / scrollDist, 0), 1)
      setProgress(p)

      const vh = window.innerHeight
      const vw = window.innerWidth
      const isMobile = vw < 768

      // Dimensions mapping directly to the 4 reference states
      const initialLeftH = isMobile
        ? Math.min(vh * 0.46, 400)
        : Math.min(Math.max(vh * 0.48, 360), 520)
      const initialRightH = isMobile
        ? Math.min(vh * 0.32, 280)
        : Math.min(Math.max(vh * 0.33, 240), 380)
      const headerH = isMobile ? 84 : 104
      const targetTop = isMobile ? 58 : 70

      // Dynamic curve cut-off coordinate: measured cleanly to the right of title
      const titleRect = titleWrapRef.current?.getBoundingClientRect()
      let cutX: number
      if (titleRect && titleRect.width > 0) {
        cutX = Math.min(titleRect.right + (isMobile ? 20 : 36), vw * 0.88)
      } else {
        cutX = Math.min(Math.max(vw * (isMobile ? 0.65 : 0.48), 280), 780)
      }

      // Balanced, noticeably curvier transition
      const hw = isMobile ? 36 : 56
      const xStart = Math.max(cutX - hw, 0)
      const xEnd = Math.min(cutX + hw, vw)

      // Right height: retreats to 0 by p = 0.55 (Image 3 state)
      const pRight = Math.min(p / 0.55, 1)
      const rightH = (1 - pRight) * initialRightH

      // Left height: retreats to headerH by p = 0.72, then collapses to 0 between 0.86 and 1.0 (Image 4 state)
      let leftH: number
      if (p <= 0.72) {
        const t = p / 0.72
        leftH = initialLeftH - t * (initialLeftH - headerH)
      } else if (p <= 0.86) {
        leftH = headerH
      } else {
        const t = (p - 0.86) / 0.14
        leftH = headerH * (1 - t)
      }

      // Title vertical position: keep fixed where it initially is
      const titleHeight = isMobile ? 36 : 48
      const titleBottomPad = isMobile ? 14 : 20
      const titleY = Math.max(initialLeftH - titleHeight - titleBottomPad, targetTop)

      // White title opacity on base image (revealed as white curtain vanishes)
      const whiteTitleOpacity = p < 0.84 ? 0 : Math.min((p - 0.84) / 0.14, 1)

      // Apply CSS variables directly to sticky container
      sticky.style.setProperty('--scroll-p', p.toFixed(4))
      sticky.style.setProperty('--left-h', `${leftH.toFixed(1)}px`)
      sticky.style.setProperty('--right-h', `${rightH.toFixed(1)}px`)
      sticky.style.setProperty('--cut-x', `${cutX.toFixed(1)}px`)
      sticky.style.setProperty('--title-y', `${titleY.toFixed(1)}px`)
      sticky.style.setProperty('--white-title-opacity', whiteTitleOpacity.toFixed(3))

      // Generate 16-point smooth rounded corner transition
      const numPoints = 16
      const points: string[] = []
      points.push('0 0')
      points.push('100% 0')
      points.push(`100% ${rightH.toFixed(1)}px`)
      points.push(`${xEnd.toFixed(1)}px ${rightH.toFixed(1)}px`)

      for (let i = 1; i < numPoints; i++) {
        const t = i / numPoints
        const ease = t * t * t * (t * (t * 6 - 15) + 10)
        const px = xEnd - t * (xEnd - xStart)
        const py = rightH + ease * (leftH - rightH)
        points.push(`${px.toFixed(1)}px ${py.toFixed(1)}px`)
      }

      points.push(`${xStart.toFixed(1)}px ${leftH.toFixed(1)}px`)
      points.push(`0 ${leftH.toFixed(1)}px`)

      if (curtainRef.current) {
        curtainRef.current.style.clipPath = `polygon(${points.join(', ')})`
      }
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

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="who-track" ref={trackRef} aria-label="Who We Are Introduction">
      <div className="who-sticky" ref={stickyRef}>
        {/* Background Image with Contrast Scrim */}
        <div className="who-bg-wrap">
          <img
            src={imageSrc}
            alt="Rise Global healthcare and medical facility"
            className="who-bg-img"
          />
          <div className="who-bg-scrim" />
        </div>

        {/* Base Layer: White Title (on background photo) */}
        <div className="who-title-wrap who-title-wrap--base">
          <h1 className="who-title who-title--white">WHO WE ARE</h1>
        </div>

        {/* Curved White Curtain with Dark Title (on white curtain) */}
        <div className="who-curtain" ref={curtainRef}>
          <div className="who-title-wrap who-title-wrap--curtain" ref={titleWrapRef}>
            <h1 className="who-title who-title--dark">WHO WE ARE</h1>
          </div>
        </div>

        {/* Description Placed on Bottom Right: 100% in place, unmoving */}
        <div className="who-desc-wrap">
          <p className="who-desc-lede">
            Rise Global GmbH advances healthcare by delivering high-quality medical solutions to
            clients around the world, primarily in Africa and Asia. With a foundation in
            innovation, reliability and global partnerships, we are the link between medical
            technology and the professionals who rely on it.
          </p>
          <p className="who-desc-sub">
            Our products and services cover pharmaceuticals, medical devices, cosmetics, food
            supplements, API and pharma machineries, and services.{' '}
            <Link to="/products" className="who-link">
              See products and services &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
