/**
 * Content source: "Rise Global Website — Development Brief & Requirements".
 * Each entry maps to S1–S10 in the brief. Edit copy here; pages render from this file.
 */

export type GlyphId =
  | 'transfer'
  | 'machinery'
  | 'packaging'
  | 'cleanroom'
  | 'laboratory'
  | 'water'
  | 'electrical'
  | 'coldroom'
  | 'power'
  | 'materials'

export interface BreakdownRow {
  /** Left column. Omit for flat lists (a single-column list of items). */
  label?: string
  items: string[]
}

export interface Breakdown {
  /** Column headings. Omit for flat lists. */
  headings?: [string, string]
  /** Short title above the breakdown. */
  title: string
  rows: BreakdownRow[]
}

export interface Solution {
  /** Reference from the brief (S1–S10). Not shown in the UI. */
  code: string
  slug: string
  name: string
  /** One line, used on the plant map and the overview list. */
  short: string
  /** One-paragraph summary, used in the sub-page header. */
  summary: string
  breakdown: Breakdown
  glyph: GlyphId
  /**
   * Header image. Leave undefined to use the drawn illustration.
   * Drop a photo into /public/images and set e.g. '/images/cleanroom.jpg'.
   */
  image?: string
  imageAlt?: string
  /** Label of the quote button on the sub-page. */
  ctaLabel: string
}

export const solutions: Solution[] = [
  {
    code: 'S1',
    slug: 'transfer-of-technology',
    name: 'Transfer of technology',
    short: 'Process know-how, documentation and training that come with the equipment.',
    summary:
      'Rise Global works as your technology-transfer partner. Process know-how, formulation support, transfer documentation and training accompany every equipment supply, so your team can run the plant, not just receive it.',
    glyph: 'transfer',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Scope',
      headings: ['Area', 'Covers'],
      rows: [
        {
          label: 'Process and formulation technology transfer',
          items: ['Oral solids', 'Liquids', 'Ointments and creams', 'Injectables'],
        },
        {
          label: 'Technology transfer documentation package',
          items: [
            'Process flow diagrams',
            'Master formula records',
            'Batch manufacturing record templates',
          ],
        },
        {
          label: 'Training of operations, QA and maintenance staff',
          items: ['On site', 'At OEM facilities'],
        },
        {
          label: 'Validation and regulatory readiness',
          items: ['IQ / OQ / PQ / DQ support', 'EFDA readiness', 'WHO-GMP readiness'],
        },
      ],
    },
  },
  {
    code: 'S2',
    slug: 'machinery-equipment',
    name: 'Machinery and equipment supply',
    short: 'Process, manufacturing and packaging machinery for every dosage form.',
    summary:
      'The core of our catalogue: process, manufacturing and packaging machinery for solid, liquid, semi-solid and sterile dosage forms.',
    glyph: 'machinery',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Equipment',
      headings: ['Sub-category', 'Representative equipment'],
      rows: [
        {
          label: 'Granulation and drying',
          items: [
            'Rapid mixer granulator (RMG)',
            'Fluid bed dryer (FBD)',
            'Fluid bed processor (granulation, drying, coating)',
            'Multi-mill / cone mill',
            'Vibro sifter',
          ],
        },
        {
          label: 'Blending',
          items: [
            'Octagonal blender',
            'V-blender',
            'Double-cone blender',
            'Ribbon blender',
            'Bin blender with IBC handling',
          ],
        },
        {
          label: 'Compression and coating',
          items: [
            'Rotary tablet press',
            'Single-station tablet press',
            'Perforated coating pan / auto-coater',
            'Tablet de-duster and metal detector',
          ],
        },
        {
          label: 'Capsule filling',
          items: [
            'Automatic capsule filling machine',
            'Capsule polishing and sorting / inspection machine',
          ],
        },
        {
          label: 'Liquids and syrups',
          items: [
            'Jacketed manufacturing vessel',
            'Homogenizer',
            'Storage tanks',
            'Liquid filling machine',
            'Bottle washing, ROPP capping and induction sealing machines',
          ],
        },
        {
          label: 'Ointments, creams and gels',
          items: [
            'Vacuum homogenizer / ointment manufacturing plant',
            'Tube filling and sealing machine',
          ],
        },
        {
          label: 'Sterile and parenteral',
          items: [
            'Vial washing machine',
            'Dehydrogenation tunnel',
            'Vial filling and stoppering machine',
            'Ampoule filling and sealing machine',
            'Lyophilizer (freeze dryer)',
            'Autoclaves',
            'Isolators / RABS',
          ],
        },
        {
          label: 'Inspection and quality',
          items: [
            'Tablet and capsule inspection machines',
            'Automatic visual inspection systems for vials and ampoules',
            'Checkweighers',
            'Metal detectors',
          ],
        },
      ],
    },
  },
  {
    code: 'S3',
    slug: 'packaging-lines',
    name: 'Packaging line machinery',
    short: 'Primary, secondary and end-of-line packaging equipment.',
    summary:
      'Primary, secondary and tertiary packaging equipment for pharmaceutical products, from the first blister to the last pallet.',
    glyph: 'packaging',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Equipment',
      headings: ['Sub-category', 'Representative equipment'],
      rows: [
        {
          label: 'Primary packaging',
          items: [
            'Blister packing machine (Alu-PVC / Alu-Alu)',
            'Strip packing machine',
            'Bottle filling and counting machine',
            'Cap sealing and induction sealing machines',
          ],
        },
        {
          label: 'Secondary packaging',
          items: [
            'Cartoning machine',
            'Leaflet folding and inserting machine',
            'Shrink wrapping machine',
            'Track-and-trace / serialization systems',
          ],
        },
        {
          label: 'Tertiary and end-of-line',
          items: [
            'Case packer',
            'Carton sealing / taping machine',
            'Self-adhesive labeling machine',
            'Checkweigher',
            'Palletizer',
          ],
        },
      ],
    },
  },
  {
    code: 'S4',
    slug: 'cleanroom-systems',
    name: 'Turnkey cleanroom systems',
    short: 'Modular cleanrooms with HVAC, doors, access control and flooring, qualified as one system.',
    summary:
      'Complete controlled-environment delivery, from modular fabric and doors to HVAC, equipment, access control and flooring, engineered as one qualified system.',
    glyph: 'cleanroom',
    ctaLabel: 'Plan a cleanroom',
    breakdown: {
      title: 'Scope',
      headings: ['System', 'Includes'],
      rows: [
        {
          label: 'Modular cleanroom systems',
          items: ['Insulated / GMP wall and ceiling panel systems', 'Grid ceilings', 'Coving'],
        },
        {
          label: 'Cleanroom doors and interlocking',
          items: ['Mechanical and electronic interlocks', 'Airlocks'],
        },
        {
          label: 'HVAC systems',
          items: [
            'Air handling units (AHUs)',
            'Terminal HEPA filtration',
            'Ducting and dampers',
            'Pressure cascade control',
          ],
        },
        {
          label: 'Cleanroom equipment',
          items: [
            'Laminar air flow (LAF) benches',
            'Reverse laminar air flow (RLAF) units',
            'Dynamic and static pass boxes',
            'Air showers',
            'Garment and change-room fixtures',
          ],
        },
        {
          label: 'Access control systems',
          items: [
            'Biometric / card access',
            'Interlocking control panels',
            'Environmental monitoring integration',
          ],
        },
        {
          label: 'Epoxy and PU flooring',
          items: ['For cleanrooms and production areas'],
        },
      ],
    },
  },
  {
    code: 'S5',
    slug: 'laboratory',
    name: 'Laboratory equipment and furniture',
    short: 'Instruments and furniture for QC, QA, R&D and microbiology labs.',
    summary:
      'Instruments and furniture for QC, QA, R&D and microbiology laboratories.',
    glyph: 'laboratory',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Equipment',
      headings: ['Sub-category', 'Representative equipment'],
      rows: [
        {
          label: 'Analytical instruments',
          items: [
            'HPLC',
            'Gas chromatograph (GC)',
            'UV-Vis spectrophotometer',
            'FTIR spectrophotometer',
            'Karl Fischer titrator',
            'Polarimeter',
            'Refractometer',
            'TOC analyzer',
            'Particle size analyzer',
          ],
        },
        {
          label: 'Physical testing',
          items: [
            'Dissolution test apparatus',
            'Disintegration test apparatus',
            'Tablet hardness tester',
            'Friability tester',
            'Melting point apparatus',
            'Viscometer',
          ],
        },
        {
          label: 'General and support equipment',
          items: [
            'Analytical balances',
            'Muffle furnace',
            'Hot air oven',
            'Stability chambers (walk-in and tabletop)',
            'BOD / microbiology incubators',
            'Water bath',
            'pH meters',
          ],
        },
        {
          label: 'Microbiology and sterility',
          items: [
            'Laminar air flow cabinet',
            'Microbiological safety cabinet',
            'Autoclave (lab-scale)',
            'Colony counter',
          ],
        },
        {
          label: 'Laboratory furniture',
          items: [
            'Fume hoods',
            'Laboratory benches and workstations',
            'Chemical and reagent storage cabinets',
            'Gas manifold systems',
          ],
        },
      ],
    },
  },
  {
    code: 'S6',
    slug: 'water-systems',
    name: 'Water systems',
    short: 'Purified water, WFI and pure steam, from generation to distribution.',
    summary:
      'Pharmaceutical-grade water generation, storage and distribution.',
    glyph: 'water',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Scope',
      headings: ['System', 'Includes'],
      rows: [
        {
          label: 'Purified Water (PW) system',
          items: [
            'Multimedia filtration',
            'Softener',
            'Reverse osmosis (RO)',
            'Electrodeionization (EDI)',
          ],
        },
        {
          label: 'Water for Injection (WFI) system',
          items: ['Vapor compression or multiple-effect distillation still'],
        },
        {
          label: 'Pure steam generation system',
          items: ['For sterilization and clean utilities'],
        },
        {
          label: 'Storage and distribution',
          items: [
            'Sanitary stainless steel storage tanks',
            'Ozonation / UV sanitization',
            'Hot and ambient distribution loops',
            'Sanitary pumps and self-draining piping',
          ],
        },
      ],
    },
  },
  {
    code: 'S7',
    slug: 'electrical-power',
    name: 'Electrical systems and power generation',
    short: 'Power distribution, standby generation, UPS and centralized BMS monitoring.',
    summary:
      'Power distribution, standby and prime generation, UPS systems and centralized building management (BMS/EMS).',
    glyph: 'electrical',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Scope',
      rows: [
        { items: ['LT / HT electrical panels, transformers and distribution boards'] },
        { items: ['Diesel generator sets (standby and prime power ratings) and synchronization panels'] },
        { items: ['UPS systems for critical loads (control systems, lab instruments)'] },
        {
          items: [
            'Building Management System (BMS) for HVAC, utilities and energy monitoring',
          ],
        },
        {
          items: [
            'Environmental Monitoring System (EMS) integration for cleanroom temperature, humidity, differential pressure and particle counts',
          ],
        },
        { items: ['Acoustic enclosures, solar-hybrid and energy-efficiency add-ons'] },
      ],
    },
  },
  {
    code: 'S8',
    slug: 'cold-rooms',
    name: 'Cold room systems',
    short: 'Temperature-controlled storage at 2–8°C and –20°C.',
    summary:
      'Temperature-controlled storage for raw materials, intermediates and finished products.',
    glyph: 'coldroom',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Scope',
      rows: [
        { items: ['Insulated cold room panels and refrigeration units for 2–8°C and –20°C storage'] },
        {
          items: [
            'Temperature mapping, monitoring and alarm systems (21 CFR Part 11 / data-integrity aware where applicable)',
          ],
        },
        {
          items: [
            'Walk-in and reach-in configurations sized to warehouse and QC retention-sample needs',
          ],
        },
      ],
    },
  },
  {
    code: 'S9',
    slug: 'raw-materials',
    name: 'Raw materials: APIs and excipients',
    short: 'APIs and excipients sourced to your formulations.',
    summary:
      'Sourcing and supply of active pharmaceutical ingredients and excipients to support your production plans.',
    glyph: 'materials',
    ctaLabel: 'Request a quote',
    breakdown: {
      title: 'Scope',
      headings: ['Material', 'Includes'],
      rows: [
        {
          label: 'Active Pharmaceutical Ingredients (APIs)',
          items: [
            'Sourced against your formulations and specifications',
            'Regulatory documentation support (DMF / CoA)',
          ],
        },
        {
          label: 'Excipients',
          items: [
            'Binders',
            'Diluents',
            'Disintegrants',
            'Lubricants',
            'Glidants',
            'Coating agents',
            'Preservatives',
          ],
        },
      ],
    },
  },
]

export const findSolution = (slug: string | null | undefined) => {
  if (!slug) return undefined
  const aliases: Record<string, string> = {
    'electrical-bms': 'electrical-power',
    'power-generation': 'electrical-power',
    'cleanroom-technology-hvac': 'cleanroom-systems',
    'pharma-production-machinery': 'machinery-equipment',
    'packaging-machinery': 'packaging-lines',
    'purified-water-systems-wfi': 'water-systems',
    'laboratory-testing-equipment': 'laboratory',
  }
  const resolved = aliases[slug] || slug
  return solutions.find((s) => s.slug === resolved)
}
