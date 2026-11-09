import InteractiveCtaSection from '../components/InteractiveCtaSection'
import { Link } from 'react-router-dom'
import SplitHero from '../components/SplitHero'
import MissionVisionSection from '../components/MissionVisionSection'
import ValuesSection from '../components/ValuesSection'
import CompanyFindUs from '../components/CompanyFindUs'
import { usePageTitle } from '../lib/usePageTitle'

export default function Company() {
  usePageTitle('About')
  return (
    <>
      <SplitHero
        eyebrow="About"
        title="The link between medical technology and the people who rely on it"
        imageSrc="https://images.pexels.com/photos/7250797/pexels-photo-7250797.jpeg?auto=compress&cs=tinysrgb&w=2560"
        imageAlt="Rise Global healthcare and medical facility"
        description={
          <>
            <p className="split-hero-lede">
              Rise Global GmbH advances healthcare by delivering high-quality medical solutions to
              clients around the world, primarily in Africa and Asia.
            </p>
            <p className="split-hero-sub">
              Our products and services cover pharmaceuticals, medical devices, cosmetics, food
              supplements, API and pharma machineries, and services.{' '}
              <Link to="/products" className="split-hero-link">
                See products and services &rarr;
              </Link>
            </p>
          </>
        }
      />

      <ValuesSection />

      <MissionVisionSection />

      <CompanyFindUs imageSrc="https://images.pexels.com/photos/7380397/pexels-photo-7380397.jpeg" />

      <InteractiveCtaSection
        id="work-with-us"
        title="Work with us"
        text="Tell us what you are building. We will come back with a scope and a quote."
        primary={{ label: 'Request a quote', to: '/contact' }}
        secondary={{ label: 'View solutions', to: '/solutions' }}
      />
    </>
  )
}
