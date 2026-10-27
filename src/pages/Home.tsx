import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PlantMap from '../components/PlantMap'
import CologneSection from '../components/CologneSection'
import QualityScrollSection from '../components/QualityScrollSection'
import InteractiveCtaSection from '../components/InteractiveCtaSection'
import { usePageTitle } from '../lib/usePageTitle'

export default function Home() {
  usePageTitle()

  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let targetMouseX = 0
    let targetMouseY = 0
    let currMouseX = 0
    let currMouseY = 0
    let rafId: number | null = null

    const render = () => {
      // Smooth lerp towards cursor offset
      currMouseX += (targetMouseX - currMouseX) * 0.08
      currMouseY += (targetMouseY - currMouseY) * 0.08

      const y = window.scrollY
      const vh = window.innerHeight

      if (y <= vh * 1.5) {
        // 1. Hero background moves slower with scroll (depth)
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.36}px, 0)`
        }

        // 2. Title text slightly moves with CURSOR MOVEMENT (X & Y) + slight scroll drift
        if (titleRef.current) {
          const scrollYOffset = y * -0.22
          titleRef.current.style.transform = `translate3d(${currMouseX.toFixed(2)}px, ${(scrollYOffset + currMouseY).toFixed(2)}px, 0)`
          titleRef.current.style.opacity = `${Math.max(0, 1 - y / (vh * 0.85))}`
        }

        // 3. Bottom description & card drift subtly on scroll
        if (bottomRef.current) {
          bottomRef.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`
          bottomRef.current.style.opacity = `${Math.max(0, 1 - y / (vh * 0.6))}`
        }
      }

      // Keep animation loop alive until cursor translation settles
      const moving =
        Math.abs(targetMouseX - currMouseX) > 0.02 || Math.abs(targetMouseY - currMouseY) > 0.02
      if (moving) {
        rafId = window.requestAnimationFrame(render)
      } else {
        rafId = null
      }
    }

    const startLoop = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(render)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      // Normalize from window center: -1 to +1
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      // Subtly shift title: ±20px horizontally, ±14px vertically with cursor
      targetMouseX = nx * 20
      targetMouseY = ny * 14
      startLoop()
    }

    const onMouseLeave = () => {
      targetMouseX = 0
      targetMouseY = 0
      startLoop()
    }

    const onScroll = () => {
      startLoop()
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <section className="hero-fullbleed">
        <div className="hero-fullbleed-bg" ref={bgRef} aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?auto=format&fit=crop&w=2560&q=85"
            alt="Pharmaceutical manufacturing cleanroom machinery"
            className="hero-fullbleed-img"
          />
          <div className="hero-fullbleed-overlay" />
        </div>

        <div className="hero-fullbleed-content">
          <div className="hero-fullbleed-top" ref={titleRef}>
            <h1 className="hero-fullbleed-title">
              One Partner For The<br className="hero-title-br" />
              Whole Pharmaceutical Plant.
            </h1>
          </div>

          <div className="hero-fullbleed-bottom" ref={bottomRef}>
            <div className="hero-fullbleed-desc">
              <p>
                Rise Global GmbH transfers the technology, supplies the equipment and delivers the
                facility around it, from cleanrooms and water systems to power and raw materials, for
                manufacturers across Africa and Asia.
              </p>
            </div>

            <Link to="/solutions" className="hero-fullbleed-card" aria-label="Explore Vetted Global Suppliers">
              <div className="hero-card-content">
                <div className="hero-card-tag">
                  <span className="hero-card-dot" aria-hidden="true" />
                  <span>VETTED GLOBAL SUPPLIERS</span>
                </div>
                <div className="hero-card-headline">
                  GMP &amp; ISO Certified Manufacturing Network
                </div>
                <div className="hero-card-sub">
                  Sourced from Cologne, Germany &amp; leading European manufacturers for turnkey pharma plants.
                </div>
              </div>
              <div className="hero-card-media" aria-hidden="true">
                <img
                  src="https://images.unsplash.com/photo-1745420052704-f70b1d30c8b7?auto=format&fit=crop&w=300&q=80"
                  alt="Certified pharma machinery"
                  className="hero-card-img"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-solutions-glass" id="solutions">
        <PlantMap intro />
      </section>

      <CologneSection />

      <QualityScrollSection />

      <InteractiveCtaSection
        title="Planning a new plant, or upgrading one?"
        text="Tell us what you are building. We will come back with a scope and a quote."
        primary={{ label: 'Request a quote', to: '/contact' }}
        secondary={{ label: 'Products', to: '/products' }}
        backgroundImage="https://images.pexels.com/photos/3849594/pexels-photo-3849594.jpeg"
      />
    </>
  )
}
