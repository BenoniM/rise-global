/** Company copy and constants. Source: the live site at risegmbh.de, edited for the new structure. */

export const company = {
  name: 'Rise Global GmbH',
  email: 'info@risegmbh.de',
  phone: '+49 160 755 4757',
  phoneHref: 'tel:+491607554757',
  address: ['Robert-Perthel-Straße 3', '50739 Cologne', 'Germany'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Robert-Perthel-Stra%C3%9Fe+3%2C+50739+K%C3%B6ln',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rise-gmbh/' },
    { label: 'Instagram', href: 'https://www.instagram.com/riseglobalgmbh' },
    { label: 'Facebook', href: 'https://web.facebook.com/share/p/1GxnHbuyeP/' },
  ],
  catalogUrl: 'https://www.risegmbh.de/assets/catalog.pdf',
  builder: { label: 'Droga Consulting Services', href: 'https://drogaconsulting.com' },
}

export const nav = [
  { label: 'Company', to: '/company' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'Products', to: '/products' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Contact', to: '/contact' },
]

export const countries = ['Ethiopia', 'Somalia', 'Rwanda', 'Tanzania', 'Uganda', 'South Sudan']

export const vision =
  'To be the most innovative and reliable global supplier of pharmaceuticals, recognized for excellence in quality, compliance and customer trust, contributing to a healthier world.'

export const mission =
  'To provide quality, innovative and affordable pharmaceutical products to global markets while ensuring regulatory compliance, supply chain efficiency and customer satisfaction.'

export const values = [
  { title: 'Integrity', text: 'We act with honesty and transparency in all our dealings.' },
  { title: 'Excellence', text: 'We deliver the highest standards in products and service.' },
  { title: 'Innovation', text: 'We embrace new ideas and technologies to drive progress.' },
  { title: 'Partnership', text: 'We build strong partnerships based on trust and respect.' },
]

export const assurance = [
  {
    title: 'Quality assurance',
    text: 'We work only with certified manufacturers and carefully vetted suppliers, so every product meets international standards, including GMP, ISO, CE and FDA certifications where applicable.',
  },
  {
    title: 'Regulatory compliance',
    text: 'We follow the national and international regulations that apply across our supply chain. Our internal processes align with Good Distribution Practice (GDP) and industry best practice, for safe, effective and timely delivery.',
  },
  {
    title: 'Ethical standards',
    text: 'Integrity and transparency guide every interaction with clients, partners and regulators. We keep strict policies against conflicts of interest, bribery and unethical conduct.',
  },
]

export const esg = [
  {
    title: 'Environment',
    text: 'We work to reduce our environmental impact. That means sourcing from eco-certified or low-impact suppliers, partnering with eco-friendly manufacturers, treating and disposing of pharmaceutical waste properly, optimizing delivery routes to cut our carbon footprint, and complying with environmental regulations.',
  },
  {
    title: 'Social',
    text: 'We aim to have a positive effect on people across our supply chain: employees, customers and communities. We support ethical and equitable access to healthcare through affordable medical products, ethical labor practice, responsible marketing, transparent pricing, capacity building in local health systems, community engagement, and strict anti-bribery and anti-corruption standards.',
  },
  {
    title: 'Governance',
    text: 'We run transparent, ethical management structures that support responsible decisions, legal compliance, risk mitigation and long-term business integrity. This rests on ethical practice, regulatory compliance, corporate governance, risk management and data security, stakeholder engagement, and transparent reporting.',
  },
]

export interface ProductGroup {
  name: string
  items: string[]
  /** Internal route that carries on from this group, if any. */
  more?: { label: string; to: string }
}

/** Product names are copied as they appear on the live site. */
export const productGroups: ProductGroup[] = [
  { name: 'Pharmaceuticals', items: ['Dorzy-T', 'Optifrresh-Plus', 'Visomer'] },
  {
    name: 'Medical devices',
    items: ['Blood glucose test strips', 'Blood glucose monitoring system'],
  },
  {
    name: 'Cosmetics',
    items: ['Hyaluronic organic serum', 'Retinol serum', 'Vitamin C serum', '24h face cream'],
  },
  {
    name: 'Food supplements',
    items: [
      'Vitamin C',
      'Fertility men capsules',
      'Pumpkin seed capsules',
      'Herbal shield effervescent tablets',
    ],
  },
  {
    name: 'API and pharma machineries',
    items: ['Process, packaging and facility equipment', 'Active pharmaceutical ingredients and excipients'],
    more: { label: 'See all solutions', to: '/solutions' },
  },
  { name: 'Services', items: ['Consulting service'] },
]
