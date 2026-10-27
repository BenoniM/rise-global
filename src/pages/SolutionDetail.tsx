import { Link, useParams } from 'react-router-dom'
import Breakdown from '../components/Breakdown'
import CtaBand from '../components/CtaBand'
import SolutionHero from '../components/SolutionHero'
import { findSolution, solutions } from '../data/solutions'
import { usePageTitle } from '../lib/usePageTitle'
import NotFound from './NotFound'

export default function SolutionDetail() {
  const { slug } = useParams()
  const solution = findSolution(slug)
  usePageTitle(solution?.name)

  if (!solution) return <NotFound />

  const index = solutions.indexOf(solution)
  const prev = solutions[(index - 1 + solutions.length) % solutions.length]
  const next = solutions[(index + 1) % solutions.length]
  const quoteTo = `/contact?solution=${solution.slug}`

  return (
    <>
      <SolutionHero solution={solution} />

      <section className="section">
        <div className="container">
          <h2 className="h-section">{solution.breakdown.title}</h2>
          <Breakdown data={solution.breakdown} />
        </div>
      </section>

      <nav className="pager" aria-label="More solutions">
        <div className="container pager-inner">
          <Link to={`/solutions/${prev.slug}`} rel="prev">
            <span>Previous</span>
            {prev.name}
          </Link>
          <Link to={`/solutions/${next.slug}`} rel="next">
            <span>Next</span>
            {next.name}
          </Link>
        </div>
      </nav>

      <CtaBand
        title="Tell us about your project"
        text="Share your product range, capacity and timeline. We will reply with a scope and a quote."
        primary={{ label: solution.ctaLabel, to: quoteTo }}
        secondary={{ label: 'All solutions', to: '/solutions' }}
      />
    </>
  )
}
