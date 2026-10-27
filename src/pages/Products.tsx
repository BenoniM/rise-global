import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { company, productGroups } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'

export default function Products() {
  usePageTitle('Products and services')
  return (
    <>
      <PageHero
        title="PRODUCTS"
        imageSrc="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2560&q=80"
        imageAlt="Rise Global medical and pharmaceutical products"
        description={
          <>
            <p className="who-desc-lede">
              A comprehensive selection of high-quality pharmaceuticals, medical devices,
              cosmetics, food supplements, API and pharma machinery.
            </p>
            <p className="who-desc-sub">
              <a
                href={company.catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="who-link"
              >
                Download the catalog (PDF) &rarr;
              </a>
            </p>
          </>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <table className="spec spec--plain">
            <caption className="sr-only">Product groups</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Group</th>
                <th scope="col">Examples</th>
              </tr>
            </thead>
            <tbody>
              {productGroups.map((g) => (
                <tr key={g.name} id={g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                  <th scope="row">{g.name}</th>
                  <td>
                    <ul className="spec-items">
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                    {g.more && (
                      <p className="spec-more">
                        <Link to={g.more.to}>{g.more.label}</Link>
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
