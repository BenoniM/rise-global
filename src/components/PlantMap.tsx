import { Link } from 'react-router-dom'
import { Glyph } from './Glyphs'
import { solutions } from '../data/solutions'

interface PlantMapProps {
  /** Link to the Solutions page. Turn off when rendering on that page. */
  showMore?: boolean
}

export default function PlantMap({ showMore = true }: PlantMapProps) {
  return (
    <div className="divisions-container">
      <div className="divisions-header">
        <h2 className="divisions-title">Nine Integrated Divisions. One Partner.</h2>
        <p className="divisions-lede">
          From technology transfer and formulation know-how to turnkey cleanrooms, process machinery,
          utilities, and raw materials.
        </p>
      </div>

      <ul className="divisions-grid">
        {solutions.map((solution) => (
          <li key={solution.slug}>
            <Link to={`/solutions/${solution.slug}`} className="division-tile">
              <span className="division-tile-icon">
                <Glyph id={solution.glyph} />
              </span>
              <span className="division-tile-title">{solution.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {showMore && (
        <div className="divisions-more">
          <Link to="/solutions" className="divisions-more-link">
            See more
            <span className="divisions-more-arrow" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M3 1l7 5-7 5z" />
              </svg>
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}
