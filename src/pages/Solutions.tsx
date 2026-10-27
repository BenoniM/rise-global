import { Link } from 'react-router-dom'
import { Glyph } from '../components/Glyphs'
import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import { solutions } from '../data/solutions'
import { usePageTitle } from '../lib/usePageTitle'

export default function Solutions() {
  usePageTitle('Solutions')
  return (
    <>
      <PageHero
        title="SOLUTIONS"
        imageSrc="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=2560&q=80"
        imageAlt="Rise Global turnkey engineering and medical facilities"
        description={
          <p className="who-desc-lede">
            Rise Global supplies the technology, the equipment and the facility around it. From
            transferring a formulation to commissioning the cleanroom, water, power and cold storage
            that keep it running, we deliver as one team and one qualified system.
          </p>
        }
      />

      <section className="section section--tight">
        <div className="container">
          <ul className="solution-list">
            {solutions.map((s) => (
              <li key={s.slug} className={`solution-row solution-row--${s.code.toLowerCase()}`}>
                <Link to={`/solutions/${s.slug}`}>
                  <span className="solution-thumb">
                    <Glyph id={s.glyph} />
                  </span>
                  <span className="solution-main">
                    <span className="solution-name">{s.name}</span>
                    <span className="solution-short">{s.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        text="Describe your project and we will point you to the solutions it needs."
        primary={{ label: 'Request a quote', to: '/contact' }}
      />
    </>
  )
}
