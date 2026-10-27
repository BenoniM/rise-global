import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="page-head">
      <div className="container">
        <h1 className="page-title">We could not find that page</h1>
        <p className="lede">The link may be out of date. Try the solutions list or head back home.</p>
        <div className="actions">
          <Link to="/solutions" className="btn btn--primary">
            View solutions
          </Link>
          <Link to="/" className="btn btn--ghost">
            Go home
          </Link>
        </div>
      </div>
    </section>
  )
}
