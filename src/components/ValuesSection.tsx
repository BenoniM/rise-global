import { useState } from 'react'

const items = [
  {
    title: 'Integrity',
    desc: 'We act with honesty and transparency in all our dealings.',
    image: 'https://images.pexels.com/photos/18306998/pexels-photo-18306998.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Excellence',
    desc: 'We deliver the highest standards in products and service.',
    image: 'https://images.pexels.com/photos/17891261/pexels-photo-17891261.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Innovation',
    desc: 'We embrace new ideas and technologies to drive progress.',
    image: 'https://images.pexels.com/photos/7460046/pexels-photo-7460046.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Partnership',
    desc: 'We build strong partnerships based on trust and respect.',
    image: 'https://images.pexels.com/photos/31406894/pexels-photo-31406894.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

export default function ValuesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="values" className="vs-section" aria-labelledby="vs-heading">
      <div className="vs-intro">
        <div className="vs-intro-top">
          <p className="vs-eyebrow">Values</p>
          <span className="vs-marker" aria-hidden="true" />
        </div>
        <h2 id="vs-heading" className="vs-heading">
          We provide reliable solutions, build strong partnerships and create a positive impact
        </h2>
      </div>

      <div className="vs-list">
        {items.map((item, i) => {
          const isOpen = openIndex === i
          const panelId = `vs-panel-${i}`
          const buttonId = `vs-trigger-${i}`

          return (
            <div key={item.title} className={`vs-item${isOpen ? ' is-open' : ''}`}>
              <h3 className="vs-item-heading">
                <button
                  type="button"
                  id={buttonId}
                  className="vs-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.title}</span>
                  <span className="vs-icon" aria-hidden="true" />
                </button>
              </h3>

              <div id={panelId} className="vs-panel" role="region" aria-labelledby={buttonId}>
                <div className="vs-panel-inner">
                  <div className="vs-panel-content">
                    <p className="vs-desc">{item.desc}</p>
                    <img src={item.image} alt="" className="vs-img" loading="lazy" draggable={false} />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
