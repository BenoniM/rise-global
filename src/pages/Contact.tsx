import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import SplitHero from '../components/SplitHero'
import { company, countries } from '../data/site'
import { findSolution, solutions } from '../data/solutions'
import { submitRfq } from '../lib/rfq'
import { usePageTitle } from '../lib/usePageTitle'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

export default function Contact() {
  usePageTitle('Contact and quote request')
  const [params] = useSearchParams()
  const preselected = findSolution(params.get('solution'))
  const [selected, setSelected] = useState<string[]>(preselected ? [preselected.slug] : [])
  const [status, setStatus] = useState<Status>('idle')

  const toggle = (slug: string) =>
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const field = (k: string) => String(form.get(k) ?? '').trim()
    setStatus('sending')
    try {
      const result = await submitRfq({
        name: field('name'),
        company: field('company'),
        email: field('email'),
        phone: field('phone'),
        country: field('country'),
        solutions: selected.map((s) => findSolution(s)?.name ?? s),
        message: field('message'),
      })
      setStatus(result)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SplitHero
        eyebrow="Contact"
        title="Tell us what you are planning"
        imageSrc="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2560&q=80"
        imageAlt="Rise Global consultation and quote request"
        description={
          <p className="split-hero-lede">
            Select every solution that applies and our global team will reply with a tailored
            scope and a quote.
          </p>
        }
      />

      <section className="ct-section" aria-labelledby="ct-heading">
        <div className="ct-inner">
          <h2 id="ct-heading" className="ct-statement">
            Reach Rise Global through the quote form or the contact details opposite.
          </h2>

          <div className="ct-grid">
            <form className="ct-form" onSubmit={onSubmit}>
              <fieldset className="ct-choices">
                <legend className="ct-label">Solutions you need</legend>
                <div className="ct-choice-grid">
                  {solutions.map((s) => (
                    <label key={s.slug} className="ct-choice">
                      <input
                        type="checkbox"
                        checked={selected.includes(s.slug)}
                        onChange={() => toggle(s.slug)}
                      />
                      <span>{s.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="ct-row">
                <label className="ct-field">
                  <span className="ct-label">
                    Full name<span aria-hidden="true">*</span>
                  </span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label className="ct-field">
                  <span className="ct-label">
                    Company<span aria-hidden="true">*</span>
                  </span>
                  <input name="company" type="text" autoComplete="organization" required />
                </label>
              </div>

              <div className="ct-row">
                <label className="ct-field">
                  <span className="ct-label">
                    Email<span aria-hidden="true">*</span>
                  </span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <label className="ct-field">
                  <span className="ct-label">Phone or WhatsApp (optional)</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
              </div>

              <label className="ct-field">
                <span className="ct-label">Country</span>
                <input name="country" type="text" autoComplete="country-name" list="countries" />
                <datalist id="countries">
                  {countries.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </label>

              <label className="ct-field">
                <span className="ct-label">
                  Your project<span aria-hidden="true">*</span>
                </span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  placeholder="Products you manufacture, capacity, site location and target dates."
                />
              </label>

              <button type="submit" className="ct-submit" disabled={status === 'sending'}>
                <span className="ct-submit-dot" aria-hidden="true" />
                {status === 'sending' ? 'Sending' : 'Send request'}
              </button>

              <div role="status" aria-live="polite" className="form-status">
                {status === 'sent' && (
                  <p>Thank you. We have your request and will reply by email.</p>
                )}
                {status === 'mailto' && (
                  <p>
                    Your email app should now open with the request ready to send. If nothing
                    opens, write to <a href={`mailto:${company.email}`}>{company.email}</a>.
                  </p>
                )}
                {status === 'error' && (
                  <p className="form-error">
                    We could not send your request. Try again, or email{' '}
                    <a href={`mailto:${company.email}`}>{company.email}</a>.
                  </p>
                )}
              </div>
            </form>

            <aside className="ct-side">
              <div className="ct-block">
                <h3 className="ct-side-label">Direct contact:</h3>
                <Arrow />
                <address className="ct-side-value">
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                  <a href={company.phoneHref}>{company.phone}</a>
                </address>
              </div>

              <div className="ct-block">
                <h3 className="ct-side-label">Postal address:</h3>
                <Arrow />
                <address className="ct-side-value">
                  <span>{company.name}</span>
                  {company.address.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
                <a href={company.mapsUrl} target="_blank" rel="noreferrer" className="ct-side-link">
                  Open in Google Maps
                </a>
              </div>

              <div className="ct-block">
                <h3 className="ct-side-label">Follow us:</h3>
                <ul className="ct-social">
                  {company.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

function Arrow() {
  return (
    <svg className="ct-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 4 L15 15 M15 6 V15 H6" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  )
}
