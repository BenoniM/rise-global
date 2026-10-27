import { Link } from 'react-router-dom'

interface Props {
  title: string
  text?: string
  primary: { label: string; to: string }
  secondary?: { label: string; to: string }
}

export default function CtaBand({ title, text, primary, secondary }: Props) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="actions">
          <Link to={primary.to} className="btn btn--light">
            {primary.label}
          </Link>
          {secondary && (
            <Link to={secondary.to} className="btn btn--outline-light">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
