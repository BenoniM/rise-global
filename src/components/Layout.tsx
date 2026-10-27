import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import riseLogo from '../assets/rise-logo.png'
import Footer from './Footer'

function ThreeDotsArrow() {
  return (
    <span className="nav-arrow" aria-hidden="true">
      <svg viewBox="0 0 14 10" width="13" height="9" className="three-dots-arrow">
        <circle cx="2.5" cy="4.5" r="1.4" fill="currentColor" />
        <circle cx="11.5" cy="4.5" r="1.4" fill="currentColor" />
        <circle cx="7" cy="7.5" r="1.4" fill="currentColor" className="nav-arrow-dot-mid" />
      </svg>
    </span>
  )
}

interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string }[]
}

const middleNavItems: NavItem[] = [
  { label: 'Company', to: '/company' },
  {
    label: 'Solutions',
    to: '/solutions',
    children: [
      { label: 'Technology Transfer', to: '/solutions/transfer-of-technology' },
      { label: 'Pharma Production Machinery', to: '/solutions/pharma-production-machinery' },
      { label: 'Packaging Machinery', to: '/solutions/packaging-machinery' },
      { label: 'Cleanroom & HVAC', to: '/solutions/cleanroom-technology-hvac' },
      { label: 'Purified Water & WFI', to: '/solutions/purified-water-systems-wfi' },
      { label: 'Laboratory & Testing', to: '/solutions/laboratory-testing-equipment' },
      { label: 'All 10 Solutions', to: '/solutions' },
    ],
  },
  { label: 'Products', to: '/products' },
  { label: 'Sustainability', to: '/sustainability' },
]

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

function NineDotsBurger({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" width="26" height="26" className="nine-dots-svg" aria-hidden="true">
      <circle cx="4"  cy="4"  r="1.7" fill="currentColor" />
      <circle cx="16" cy="4"  r="1.7" fill="currentColor" />
      <circle cx="10" cy="10" r="1.7" fill="currentColor" />
      <circle cx="4"  cy="16" r="1.7" fill="currentColor" />
      <circle cx="16" cy="16" r="1.7" fill="currentColor" />
      <circle cx="10" cy="4"  r="1.7" fill="currentColor" className={`dot-cardinal${open ? ' disappeared' : ''}`} />
      <circle cx="10" cy="16" r="1.7" fill="currentColor" className={`dot-cardinal${open ? ' disappeared' : ''}`} />
      <circle cx="16" cy="10" r="1.7" fill="currentColor" className={`dot-cardinal${open ? ' disappeared' : ''}`} />
      <circle cx="4"  cy="10" r="1.7" fill="currentColor" className={`dot-cardinal${open ? ' disappeared' : ''}`} />
    </svg>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()
  const lastScrollY = useRef(0)

  useEffect(() => { setOpen(false); setExpandedItem(null) }, [pathname])

  useEffect(() => {
    if (open) {
      setHidden(false)
      return
    }

    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current

      // Always show when near the very top
      if (y <= 30) {
        setHidden(false)
        lastScrollY.current = y
        return
      }

      // Scrolling down → hide navbar
      if (delta > 3) {
        setHidden(true)
        lastScrollY.current = y
      }
      // Scrolling up → reveal navbar
      else if (delta < -3) {
        setHidden(false)
        lastScrollY.current = y
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      document.documentElement.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header${hidden ? ' site-header--hidden' : ''}`}>

      {/* ── Desktop navbar ─────────────────────────────────────────── */}
      <div className="navbar-edge desktop-nav">
        <div
          className="nav-piece nav-piece--logo"
          style={{ '--piece-index': 0 } as React.CSSProperties}
        >
          <Link to="/" className="nav-logo-pill" aria-label="Rise Global GmbH, Home">
            <img src={riseLogo} alt="Rise Global" className="nav-logo-img" />
          </Link>
        </div>

        <ul className="nav-middle" aria-label="Primary navigation">
          {middleNavItems.map((item, idx) => {
            const isActive = pathname.startsWith(item.to)
            const hasDropdown = Boolean(item.children?.length)
            return (
              <li
                key={item.to}
                className={`nav-group nav-piece${hasDropdown ? ' has-dropdown' : ''}`}
                style={{ '--piece-index': idx + 1 } as React.CSSProperties}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive: a }) => `nav-pill${a || isActive ? ' active' : ''}`}
                >
                  <span className="nav-label">{item.label}</span>
                  {hasDropdown && <ThreeDotsArrow />}
                </NavLink>
                {hasDropdown && item.children && (
                  <div className="nav-dropdown">
                    <div className="nav-dropdown-stack">
                      {item.children.map((sub) => (
                        <Link key={sub.to} to={sub.to} className="nav-dropdown-pill">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <div
          className="nav-piece nav-piece--cta"
          style={{ '--piece-index': middleNavItems.length + 1 } as React.CSSProperties}
        >
          <Link to="/contact" className="nav-cta-pill">Request a quote</Link>
        </div>
      </div>

      {/* ── Mobile: ONE element that physically expands ─────────────────
          Closed  → 172×56 px pill, top-right corner
          Open    → 100vw × 100dvh, full screen black
          
          The bar stays visually at 14px from top throughout because:
            top: 14px → 0   (moves up 14px)
            padding-top: 0  → 14px  (pushes bar down 14px)
          They cancel — bar doesn't move. The mob expands around it.
      ────────────────────────────────────────────────────────────────── */}
      <div
        className={`mob${open ? ' mob--open' : ''}`}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-label="Navigation menu"
      >
        {/* White bar — always visible, logo left, burger right */}
        <div className="mob-bar">
          <Link
            to="/"
            className="mob-logo"
            aria-label="Rise Global GmbH, Home"
            onClick={open ? () => setOpen(false) : undefined}
          >
            <img src={riseLogo} alt="Rise Global" className="mob-logo-img" />
          </Link>

          <div className="mob-sep" aria-hidden="true" />

          <button
            className="mob-burger"
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((v) => !v)}
          >
            <NineDotsBurger open={open} />
          </button>
        </div>

        {/* Menu body — always in DOM, clipped by mob height when closed,
            fades in once mob has expanded */}
        <div className="mob-body" aria-hidden={!open}>
          <div className="mob-items">
            {middleNavItems.map((item) => {
              const hasDropdown = Boolean(item.children?.length)
              const isExpanded = hasDropdown && expandedItem === item.to
              return (
                <div key={item.to} className="mob-group">
                  {hasDropdown ? (
                    <button
                      className={`mob-pill${isExpanded ? ' mob-pill--active' : ''}`}
                      onClick={() => setExpandedItem(isExpanded ? null : item.to)}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <ThreeDotsArrow />
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      className="mob-pill"
                      onClick={() => setOpen(false)}
                    >
                      <span>{item.label}</span>
                    </NavLink>
                  )}

                  {hasDropdown && isExpanded && item.children && (
                    <div className="mob-sub">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="mob-sub-pill"
                          onClick={() => setOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <Link to="/contact" className="mob-cta" onClick={() => setOpen(false)}>
            Request a quote
          </Link>
        </div>
      </div>

    </header>
  )
}


export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </>
  )
}
