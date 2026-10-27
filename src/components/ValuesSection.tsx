import { useEffect, useRef } from 'react'

const slides = [
  {
    index: '01',
    title: 'Integrity',
    desc: 'We act with honesty and transparency in all our dealings.',
    image: 'https://images.pexels.com/photos/18306998/pexels-photo-18306998.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Integrity',
  },
  {
    index: '02',
    title: 'Excellence',
    desc: 'We deliver the highest standards in products and service.',
    image: 'https://images.pexels.com/photos/17891261/pexels-photo-17891261.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Excellence',
  },
  {
    index: '03',
    title: 'Innovation',
    desc: 'We embrace new ideas and technologies to drive progress.',
    image: 'https://images.pexels.com/photos/7460046/pexels-photo-7460046.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Innovation',
  },
  {
    index: '04',
    title: 'Partnership',
    desc: 'We build strong partnerships based on trust and respect.',
    image: 'https://images.pexels.com/photos/31406894/pexels-photo-31406894.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Partnership',
  },
]

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const right = rightRef.current
    if (!section || !track || !right) return

    let rafId: number | null = null

    const update = () => {
      const rect = section.getBoundingClientRect()
      const totalScroll = section.offsetHeight - window.innerHeight
      if (totalScroll <= 0) return

      const scrolled = Math.max(-rect.top, 0)
      const rawProgress = Math.min(scrolled / totalScroll, 1)
      // Finish horizontal slide translation smoothly at 94% of scroll distance
      const p = Math.min(rawProgress / 0.94, 1)

      const trackW = track.scrollWidth
      const rightW = right.offsetWidth
      const maxTranslate = Math.max(trackW - rightW, 0)

      track.style.transform = `translateX(${-(p * maxTranslate).toFixed(2)}px)`
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }

    const ro = new ResizeObserver(() => {
      update()
    })
    ro.observe(track)

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section id="values" ref={sectionRef} className="vs-section">
      <div className="vs-sticky">

        {/* Outer left column – anchored label + summary */}
        <div className="vs-left">
          <div className="vs-left-top">
            <p className="vs-eyebrow">Values</p>
          </div>
          <div className="vs-left-bottom">
            <p className="vs-left-desc">
              We provide reliable solutions, build strong partnerships and create a positive impact.
            </p>
          </div>
        </div>

        {/* Right – clipping viewport for the scrolling strip */}
        <div className="vs-right" ref={rightRef}>
          <div className="vs-track" ref={trackRef}>
            {slides.map((s) => (
              <div key={s.title} className="vs-slide">

                {/* Left strip within slide: number top, text bottom */}
                <div className="vs-slide-meta">
                  <span className="vs-slide-num">{s.index}</span>
                  <div className="vs-slide-text">
                    <p className="vs-slide-title">{s.title}</p>
                    <p className="vs-slide-desc">{s.desc}</p>
                  </div>
                </div>

                {/* Image – fills the rest of the slide width */}
                <div className="vs-img-area">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="vs-img"
                    draggable={false}
                  />
                </div>

              </div>
            ))}

            {/* Trailing white space spacer so the final image completes its full visage with breathing room */}
            <div className="vs-slide-spacer" aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  )
}
