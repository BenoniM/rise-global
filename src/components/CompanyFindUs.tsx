import { company } from '../data/site'

interface CompanyFindUsProps {
  imageSrc?: string
}

export default function CompanyFindUs({
  imageSrc = 'https://images.pexels.com/photos/7380397/pexels-photo-7380397.jpeg',
}: CompanyFindUsProps) {
  return (
    <section id="locations" className="company-findus-section" aria-label="Where to find us and contact information">
      <div className="company-findus-container">
        {/* Two-Column Editorial Header mirroring reference layout */}
        <div className="company-findus-header">
          <div className="company-findus-left">
            <h2 className="company-findus-title">
              Where to<br />find us
            </h2>
          </div>

          <div className="company-findus-right">
            <p className="company-findus-desc">
              Rise Global is headquartered in Cologne, Germany, serving partners and industrial clients across global markets. Reach out to schedule a consultation, visit our facilities, or discuss your upcoming projects.
            </p>

            <div className="company-findus-grid">
              {/* Cologne Address */}
              <div className="company-findus-col">
                <span className="company-findus-col-eyebrow">Headquarters</span>
                <address className="company-findus-address">
                  <strong className="company-findus-company-name">{company.name}</strong>
                  {company.address.map((line) => (
                    <span key={line} className="company-findus-address-line">{line}</span>
                  ))}
                </address>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="company-findus-map-btn"
                >
                  <span>Open in Google Maps</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              {/* Contact Information */}
              <div className="company-findus-col">
                <span className="company-findus-col-eyebrow">Get in touch</span>
                <div className="company-findus-contacts">
                  <a href={company.phoneHref} className="company-findus-contact-link">
                    <span className="company-findus-contact-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <span>{company.phone}</span>
                  </a>

                  <a href={`mailto:${company.email}`} className="company-findus-contact-link">
                    <span className="company-findus-contact-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <span>{company.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Visual Frame below the header */}
        <div className="company-findus-media-container">
          <img
            src={imageSrc}
            alt="Rise Global pharmaceutical production and quality assurance in Cologne"
            className="company-findus-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
