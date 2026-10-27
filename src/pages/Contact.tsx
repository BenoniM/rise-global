import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
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
      <PageHero
        title="REQUEST A QUOTE"
        imageSrc="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2560&q=80"
        imageAlt="Rise Global consultation and quote request"
        description={
          <p className="who-desc-lede">
            Tell us what you are planning. Select every solution that applies and our global team
            will reply with a tailored scope and a quote.
          </p>
        }
      />

      <section className="section section--tight">
        <div className="container contact-grid">
          <form className="form" onSubmit={onSubmit}>
            <div className="field-row">
              <label className="field">
                <span>Full name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className="field">
                <span>Company</span>
                <input name="company" type="text" autoComplete="organization" required />
              </label>
            </div>
            <div className="field-row">
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className="field">
                <span>Phone or WhatsApp (optional)</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
            </div>
            <label className="field">
              <span>Country</span>
              <input name="country" type="text" autoComplete="country-name" list="countries" />
              <datalist id="countries">
                {countries.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>

            <fieldset className="field choices">
              <legend>Solutions you need</legend>
              <div className="choice-grid">
                {solutions.map((s) => (
                  <label key={s.slug} className="choice">
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

            <label className="field">
              <span>Your project</span>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="Products you manufacture, capacity, site location and target dates."
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending' : 'Send request'}
              </button>
            </div>

            <div role="status" aria-live="polite" className="form-status">
              {status === 'sent' && (
                <p>Thank you. We have your request and will reply by email.</p>
              )}
              {status === 'mailto' && (
                <p>
                  Your email app should now open with the request ready to send. If nothing opens,
                  write to <a href={`mailto:${company.email}`}>{company.email}</a>.
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

          <aside className="contact-side">
            <h2 className="h-small">Rise Global GmbH</h2>
            <address className="address">
              {company.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p>
              <a href={company.mapsUrl} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </p>
            <h2 className="h-small">Direct contact</h2>
            <address className="address">
              <a href={company.phoneHref}>{company.phone}</a>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </address>
            <ul className="side-social">
              {company.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
