import type { ReactNode } from 'react'
import type { GlyphId } from '../data/solutions'

/**
 * Line illustrations for the ten solutions. All drawn in a 240 x 160 box.
 * Colours come from CSS variables set by the parent (.tile / .plate):
 *   stroke  -> currentColor
 *   .gf     -> --tile-fill  (soft accent fill)
 *   .gb     -> --tile-bg    (matches the background, used to hide shapes behind)
 *   .gl     -> --amber      (indicator lamps)
 */

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      className="glyph"
      viewBox="0 0 240 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

const Transfer = () => (
  <Frame>
    {/* back sheet */}
    <rect className="gf" x="60" y="26" width="96" height="116" rx="3" />
    {/* front sheet with process flow diagram */}
    <rect className="gb" x="82" y="14" width="96" height="120" rx="3" />
    <rect x="106" y="28" width="48" height="16" rx="2" />
    <path d="M130 44v14" />
    <path d="M130 58l18 12-18 12-18-12z" />
    <path d="M130 82v14" />
    <rect x="106" y="96" width="48" height="16" rx="2" />
    <path d="M98 70h-6M98 104h-6" />
    {/* validated stamp */}
    <circle className="gb" cx="188" cy="118" r="22" />
    <circle className="gf" cx="188" cy="118" r="22" />
    <path d="M177 118l8 8 15-17" />
    {/* know-how moving across */}
    <path d="M14 76h40M46 68l8 8-8 8" />
  </Frame>
)

const Machinery = () => (
  <Frame>
    {/* octagonal blender on trunnion stand */}
    <path d="M36 142h168" />
    <path d="M48 142V88M192 142V88" />
    <circle cx="48" cy="82" r="6" />
    <circle cx="192" cy="82" r="6" />
    <path d="M24 82h18M198 82h18" />
    <path className="gf" d="M62 70v24l36 20h44l36-20V70l-36-20H98z" />
    <path d="M98 50v64M142 50v64" />
    {/* charging hatch */}
    <path d="M112 50v-8h16v8M108 42h24" />
    {/* discharge valve and drum below */}
    <path d="M116 114v8h8v-8" />
    <path d="M102 142v-14h36v14" />
  </Frame>
)

const Packaging = () => (
  <Frame>
    {/* direction of flow */}
    <path className="flow" d="M28 28h176" strokeDasharray="5 6" />
    <path d="M198 22l8 6-8 6" />
    {/* conveyor */}
    <rect x="14" y="114" width="212" height="14" rx="7" />
    <path d="M40 128v18M120 128v18M200 128v18M30 146h20M110 146h20M190 146h20" />
    {/* blister, carton, case: primary to tertiary */}
    <rect className="gf" x="26" y="96" width="36" height="18" rx="2" />
    <circle cx="36" cy="105" r="3.5" />
    <circle cx="48" cy="105" r="3.5" />
    <rect className="gf" x="84" y="76" width="44" height="38" rx="2" />
    <path d="M84 88h44M94 98h16" />
    <rect className="gf" x="152" y="46" width="64" height="68" rx="2" />
    <path d="M184 46v22M152 68h64" />
    <rect className="gb" x="162" y="82" width="26" height="18" rx="1" />
  </Frame>
)

const Cleanroom = () => (
  <Frame>
    {/* room */}
    <rect x="16" y="12" width="208" height="132" rx="2" />
    <path d="M16 28h208" />
    {/* epoxy floor */}
    <rect className="gf" x="16" y="132" width="208" height="12" />
    {/* HEPA modules */}
    <rect className="gf" x="64" y="28" width="32" height="10" />
    <rect className="gf" x="104" y="28" width="32" height="10" />
    <rect className="gf" x="144" y="28" width="32" height="10" />
    {/* laminar airflow */}
    <g className="flow" strokeDasharray="4 6">
      <path d="M80 46v46M120 46v46M160 46v46" />
    </g>
    <path d="M74 86l6 8 6-8M114 86l6 8 6-8M154 86l6 8 6-8" />
    {/* LAF bench */}
    <rect x="82" y="104" width="76" height="8" rx="1" />
    <path d="M90 112v20M150 112v20" />
    {/* door with interlock lamp */}
    <rect className="gb" x="26" y="64" width="26" height="68" rx="1" />
    <path d="M44 100v8" />
    <circle className="gl" cx="39" cy="54" r="5" />
    {/* pass box */}
    <rect className="gb" x="186" y="84" width="38" height="36" />
    <rect x="192" y="92" width="26" height="20" />
    <circle className="gl" cx="205" cy="76" r="4" />
  </Frame>
)

const Laboratory = () => (
  <Frame>
    {/* bench */}
    <path d="M12 142h216" />
    {/* instrument with chromatogram */}
    <rect x="22" y="30" width="108" height="88" rx="4" />
    <rect className="gf" x="32" y="40" width="88" height="48" rx="2" />
    <path d="M36 80h14l5-26 5 26h14l4-16 4 16h8l5-34 5 34h12" />
    <circle cx="42" cy="104" r="5" />
    <circle cx="58" cy="104" r="5" />
    <path d="M84 104h30" />
    <path d="M34 118v24M110 118v24" />
    {/* Erlenmeyer flask */}
    <path d="M166 40h26M172 40v28l-24 52q-4 14 10 14h48q14 0 10-14l-24-52V40" />
    <path className="gf" d="M158 104h66l6 16q4 14-10 14h-58q-14 0-10-14z" />
    <circle cx="176" cy="116" r="3" />
    <circle cx="196" cy="110" r="2" />
    <circle cx="204" cy="122" r="3" />
  </Frame>
)

const Water = () => (
  <Frame>
    {/* storage tank */}
    <rect x="20" y="34" width="46" height="96" rx="8" />
    <path className="gf" d="M20 78h46v44a8 8 0 0 1-8 8H28a8 8 0 0 1-8-8z" />
    <path d="M14 78h6" />
    {/* pump */}
    <path d="M66 106h20M108 106h22" />
    <circle cx="97" cy="106" r="11" />
    <path d="M91 100l12 6-12 6z" />
    {/* RO membrane vessel */}
    <rect className="gf" x="130" y="92" width="86" height="28" rx="14" />
    <path d="M150 92v28M196 92v28" />
    {/* return loop */}
    <path d="M216 106h10v42H43v-18" />
    {/* drop */}
    <path className="gf" d="M178 22c0 0-17 20-17 32a17 17 0 0 0 34 0c0-12-17-32-17-32z" />
    <path d="M178 66v26" />
  </Frame>
)

const Electrical = () => (
  <Frame>
    {/* switchboard */}
    <rect x="22" y="18" width="92" height="124" rx="3" />
    <path d="M68 18v124" />
    <rect x="32" y="30" width="26" height="10" />
    <rect x="32" y="46" width="26" height="10" />
    <rect x="32" y="62" width="26" height="10" />
    <rect x="32" y="78" width="26" height="10" />
    <circle cx="91" cy="44" r="13" />
    <path d="M91 44l7-7" />
    <circle className="gl" cx="80" cy="82" r="4" />
    <circle className="gf" cx="91" cy="82" r="4" />
    <circle className="gf" cx="102" cy="82" r="4" />
    <path d="M80 104h22M80 114h22M80 124h22" />
    {/* monitoring screen */}
    <rect className="gf" x="130" y="30" width="90" height="62" rx="3" />
    <path d="M140 80l14-16 12 8 18-24 14 12 16-20" />
    <path d="M175 92v20M156 112h38" />
    {/* cable to the board */}
    <path d="M114 128h62v-16" />
  </Frame>
)

const ColdRoom = () => (
  <Frame>
    {/* insulated door */}
    <rect x="60" y="14" width="88" height="128" rx="4" />
    <rect className="gf" x="70" y="24" width="68" height="108" rx="2" />
    <rect className="gb" x="122" y="66" width="8" height="34" rx="4" />
    <path d="M60 36h-6M60 120h-6" />
    <text
      x="104"
      y="54"
      textAnchor="middle"
      fontSize="15"
      fontWeight="650"
      fill="currentColor"
      stroke="none"
      className="glyph-text"
    >
      2–8°C
    </text>
    {/* snowflake */}
    <path d="M28 62v36M12 71l32 18M12 89l32-18" />
    <path d="M22 62l6 6 6-6M22 98l6-6 6 6" />
    {/* thermometer */}
    <rect x="178" y="22" width="16" height="80" rx="8" />
    <circle className="gf" cx="186" cy="114" r="14" />
    <path d="M186 44v70" strokeWidth={4} />
    <path d="M202 40h10M202 58h10M202 76h10M202 94h10" />
  </Frame>
)

const Power = () => (
  <Frame>
    {/* skid */}
    <rect x="18" y="132" width="164" height="10" />
    {/* acoustic enclosure */}
    <rect x="26" y="58" width="148" height="74" rx="4" />
    <rect className="gf" x="40" y="72" width="62" height="46" rx="2" />
    <rect className="gb" x="48" y="80" width="26" height="14" />
    <circle className="gl" cx="90" cy="87" r="4" />
    <path d="M48 106h46" />
    {/* louvres */}
    <path d="M124 72h38M124 84h38M124 96h38M124 108h38M124 120h38" />
    {/* exhaust */}
    <path d="M52 58V30h14v28M48 30h22" />
    <path d="M60 22q-6-8 0-14" />
    {/* bolt */}
    <path className="gf" d="M206 24l-22 52h18l-12 52 36-62h-20l14-42z" />
  </Frame>
)

const Materials = () => (
  <Frame>
    {/* pallet */}
    <rect x="18" y="132" width="204" height="10" />
    <path d="M58 132v10M120 132v10M182 132v10" />
    {/* drums */}
    <path className="gf" d="M30 74v54a24 6 0 0 0 48 0V74z" />
    <ellipse cx="54" cy="74" rx="24" ry="6" />
    <path d="M30 92a24 6 0 0 0 48 0M30 112a24 6 0 0 0 48 0" />
    <path className="gf" d="M88 74v54a24 6 0 0 0 48 0V74z" />
    <ellipse cx="112" cy="74" rx="24" ry="6" />
    <path d="M88 92a24 6 0 0 0 48 0M88 112a24 6 0 0 0 48 0" />
    {/* sack */}
    <path className="gf" d="M150 130V86q0-8 8-10l18-8 20 8q8 2 8 10v44z" />
    <path d="M156 94h40" />
    <rect className="gb" x="162" y="102" width="28" height="16" rx="1" />
    {/* molecule */}
    <path d="M138 32l-9 15.6h-18L102 32l9-15.6h18z" transform="translate(9 -4)" />
    <circle cx="120" cy="28" r="8" />
    <path d="M147 28h14" />
    <circle cx="165" cy="28" r="4" />
  </Frame>
)

const map: Record<GlyphId, () => ReactNode> = {
  transfer: Transfer,
  machinery: Machinery,
  packaging: Packaging,
  cleanroom: Cleanroom,
  laboratory: Laboratory,
  water: Water,
  electrical: Electrical,
  coldroom: ColdRoom,
  power: Power,
  materials: Materials,
}

export function Glyph({ id }: { id: GlyphId }) {
  const Component = map[id]
  return <>{Component()}</>
}
