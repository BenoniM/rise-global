import InteractiveCtaSection from '../components/InteractiveCtaSection'
import CompanyHero from '../components/CompanyHero'
import MissionVisionSection from '../components/MissionVisionSection'
import ValuesSection from '../components/ValuesSection'
import CompanyFindUs from '../components/CompanyFindUs'
import { usePageTitle } from '../lib/usePageTitle'

export default function Company() {
  usePageTitle('Company')
  return (
    <>
      <CompanyHero imageSrc="https://images.pexels.com/photos/7250797/pexels-photo-7250797.jpeg" />

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
