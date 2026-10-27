import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import { esg } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'

export default function Sustainability() {
  usePageTitle('Sustainability')
  return (
    <>
      <PageHero
        title="SUSTAINABILITY"
        imageSrc="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2560&q=80"
        imageAlt="Rise Global commitment to sustainability and healthcare"
        description={
          <p className="who-desc-lede">
            We work to promote better health in developing countries by building our
            environmental, social and governance commitments, and the Sustainable Development
            Goals, into how we operate.
          </p>
        }
      />

      <section className="section section--white">
        <div className="container">
          <div className="esg">
            {esg.map((e) => (
              <div key={e.title} id={e.title.toLowerCase()}>
                <h2 className="h-section">{e.title}</h2>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Questions about how we work?"
        primary={{ label: 'Contact us', to: '/contact' }}
      />
    </>
  )
}
