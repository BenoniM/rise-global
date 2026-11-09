import { Link } from 'react-router-dom'
import SplitHero from '../components/SplitHero'
import { company, productGroups } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function Products() {
  usePageTitle('Products and services')
  const total = String(productGroups.length).padStart(2, '0')

  return (
    <>
      <SplitHero
        eyebrow="Products"
        title="High-quality products for every part of healthcare"
        imageSrc="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2560&q=80"
        imageAlt="Rise Global medical and pharmaceutical products"
        description={
          <>
            <p className="split-hero-lede">
              A comprehensive selection of high-quality pharmaceuticals, medical devices,
              cosmetics, food supplements, API and pharma machinery.
            </p>
            <p className="split-hero-sub">
              <a
                href={company.catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="split-hero-link"
              >
                Download the catalog (PDF) &rarr;
              </a>
            </p>
          </>
        }
      />

      <section className="pc-section" aria-labelledby="pc-heading">
        <div className="pc-intro">
          <div className="pc-intro-top">
            <p className="pc-eyebrow">Portfolio</p>
            <span className="pc-marker" aria-hidden="true" />
          </div>
          <div className="pc-intro-body">
            <h2 id="pc-heading" className="pc-heading">
              Six product groups, one certified supply chain
            </h2>
            <p className="pc-lede">
              Every product is sourced from certified manufacturers and delivered under Good
              Distribution Practice.
            </p>
          </div>
        </div>

        <ul className="pc-grid">
          {productGroups.map((g, i) => (
            <li key={g.name} id={slug(g.name)} className="pc-card">
              <div className="pc-card-top">
                <span className="pc-card-count">
                  {g.items.length} {g.items.length === 1 ? 'item' : 'items'}
                </span>
                <span className="pc-card-num" aria-hidden="true">
                  <span className="pc-card-num-main">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pc-card-num-sup">/{total}</span>
                </span>
              </div>

              <h3 className="pc-card-title">{g.name}</h3>

              <ul className="pc-card-items">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {g.more && (
                <Link to={g.more.to} className="pc-card-more">
                  {g.more.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
