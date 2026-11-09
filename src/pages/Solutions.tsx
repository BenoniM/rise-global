import CtaBand from '../components/CtaBand'
import PageHero from '../components/PageHero'
import PlantMap from '../components/PlantMap'
import { usePageTitle } from '../lib/usePageTitle'

export default function Solutions() {
  usePageTitle('Solutions')
  return (
    <>
      <PageHero
        title="SOLUTIONS"
        imageSrc="https://images.pexels.com/photos/33514501/pexels-photo-33514501.jpeg?auto=compress&cs=tinysrgb&w=2560"
        imageAlt="Stainless steel process vessels and hygienic piping in a production facility"
        description={
          <p className="who-desc-lede">
            Rise Global supplies the technology, the equipment and the facility around it. From
            transferring a formulation to commissioning the cleanroom, water, power and cold storage
            that keep it running, we deliver as one team and one qualified system.
          </p>
        }
      />

      <section className="section-divisions">
        <PlantMap showMore={false} />
      </section>

      <CtaBand
        title="Not sure where to start?"
        text="Describe your project and we will point you to the solutions it needs."
        primary={{ label: 'Request a quote', to: '/contact' }}
      />
    </>
  )
}
