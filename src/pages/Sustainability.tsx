import SplitHero from '../components/SplitHero'
import { esg } from '../data/site'
import { usePageTitle } from '../lib/usePageTitle'

export default function Sustainability() {
  usePageTitle('Sustainability')
  return (
    <>
      <SplitHero
        eyebrow="Sustainability"
        title="Better health, built into how we operate"
        imageSrc="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2560&q=80"
        imageAlt="Rise Global commitment to sustainability and healthcare"
        description={
          <p className="split-hero-lede">
            We work to promote better health in developing countries by building our
            environmental, social and governance commitments, and the Sustainable Development
            Goals, into how we operate.
          </p>
        }
      />

      <section className="esg-stack" aria-label="Our ESG commitments">
        {esg.map((e, i) => (
          <article
            key={e.title}
            id={e.title.toLowerCase()}
            className="esg-row"
            style={{ '--i': i } as React.CSSProperties}
          >
            <div className="esg-row-num" data-label={e.title}>{String(i + 1).padStart(2, '0')}&nbsp;&nbsp;/</div>
            <div className="esg-row-media">
              <img src={e.image} alt="" loading="lazy" />
            </div>
            <div className="esg-row-body">
              <h2 className="esg-row-label">{e.title}</h2>
              <p className="esg-row-headline">{e.headline}</p>
              <p className="esg-row-text">{e.text}</p>
            </div>
          </article>
        ))}
      </section>

    </>
  )
}
