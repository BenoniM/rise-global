import { useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../data/site'
import riseLogo from '../assets/rise-logo.png'

function ThreeDotsArrow({ isOpen }: { isOpen?: boolean }) {
  return (
    <span className={`footer-arrow${isOpen ? ' footer-arrow--open' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 14 10" width="13" height="9" className="three-dots-arrow">
        <circle cx="2.5" cy="4.5" r="1.4" fill="currentColor" />
        <circle cx="11.5" cy="4.5" r="1.4" fill="currentColor" />
        <circle cx="7" cy="7.5" r="1.4" fill="currentColor" className="nav-arrow-dot-mid" />
      </svg>
    </span>
  )
}

const footerSolutions = [
  { label: 'Technology Transfer', to: '/solutions/transfer-of-technology' },
  { label: 'Pharma Production Machinery', to: '/solutions/pharma-production-machinery' },
  { label: 'Packaging Machinery', to: '/solutions/packaging-machinery' },
  { label: 'Cleanroom & HVAC', to: '/solutions/cleanroom-technology-hvac' },
  { label: 'Purified Water & WFI', to: '/solutions/purified-water-systems-wfi' },
  { label: 'Laboratory & Testing', to: '/solutions/laboratory-testing-equipment' },
  { label: 'All Solutions', to: '/solutions' },
]

export default function Footer() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  return (
    <footer className="site-footer" id="site-footer" aria-label="Footer">
      <div className="footer-outer-backdrop">
        <div className="footer-card">
          {/* Main Top Grid: Left column & Right column */}
          <div className="footer-card-body">
            {/* ── Left Column ─────────────────────────────────── */}
            <div className="footer-col-left">
              <div className="footer-left-content">
                <p className="footer-brand-statement">
                  Pharmaceutical manufacturing technology, equipment and turnkey project solutions for Africa and Asia.
                </p>
                <p className="footer-brand-sub">
                  Contact the {company.name} team anytime.
                </p>

                <div className="footer-cta-wrapper">
                  <Link to="/contact" className="footer-action-btn">
                    Get in touch
                  </Link>
                </div>
              </div>

              {/* Giant Brand Mark at Bottom-Left */}
              <div className="footer-giant-brand" aria-label="Rise Global">
                <div className="footer-giant-brand-row">
                  <div className="footer-giant-logo-frame">
                    <img src={riseLogo} alt="Rise Global" className="footer-giant-logo-img" />
                  </div>
                  <div className="footer-giant-text-block">
                    <span className="footer-giant-rise">RISE</span>
                    <span className="footer-giant-global">GLOBAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column ────────────────────────────────── */}
            <div className="footer-col-right">
              <nav className="footer-nav-stack" aria-label="Footer Navigation">
                {/* Solutions Item with In-line Dropdown List */}
                <div className={`footer-menu-item${solutionsOpen ? ' footer-menu-item--active' : ''}`}>
                  <button
                    type="button"
                    className="footer-menu-btn"
                    onClick={() => setSolutionsOpen((v) => !v)}
                    aria-expanded={solutionsOpen}
                    aria-label={solutionsOpen ? 'Collapse solutions list' : 'Expand solutions list'}
                  >
                    <span className="footer-menu-label">Solutions</span>
                    <ThreeDotsArrow isOpen={solutionsOpen} />
                  </button>
                </div>

                {/* Sub-solutions list placed directly below Solutions as full-width rows */}
                {solutionsOpen && (
                  <div className="footer-sublinks-stack">
                    {footerSolutions.map((sub, idx) => {
                      const isAll = idx === footerSolutions.length - 1
                      return (
                        <div key={sub.to} className="footer-sublink-item">
                          <Link
                            to={sub.to}
                            className={`footer-sublink-row${isAll ? ' footer-sublink-all' : ''}`}
                          >
                            <span>{sub.label}</span>
                            {isAll && <span className="footer-sublink-arrow">→</span>}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Products */}
                <div className="footer-menu-item">
                  <Link to="/products" className="footer-menu-row">
                    <span className="footer-menu-label">Products</span>
                  </Link>
                </div>

                {/* Sustainability */}
                <div className="footer-menu-item">
                  <Link to="/sustainability" className="footer-menu-row">
                    <span className="footer-menu-label">Sustainability</span>
                  </Link>
                </div>

                {/* Company */}
                <div className="footer-menu-item">
                  <Link to="/company" className="footer-menu-row">
                    <span className="footer-menu-label">Company</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* ── Bottom Bar: Copyright & Legal ─────────────────── */}
          <div className="footer-bottom-bar">
            <p className="footer-bottom-copy">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
            <div className="footer-bottom-legal">
              <a
                href="https://www.risegmbh.de/privacyPolicy"
                target="_blank"
                rel="noreferrer"
                className="footer-legal-anchor"
              >
                Privacy Policy
              </a>
              <span className="footer-bottom-bullet">•</span>
              <span className="footer-bottom-credit">
                Powered by{' '}
                <a
                  href={company.builder.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-legal-anchor"
                >
                  {company.builder.label}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
