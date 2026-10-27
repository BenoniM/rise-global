import type { Solution } from '../data/solutions'
import { Glyph } from './Glyphs'

/** Header image for a solution page. Uses a real photo when `image` is set, otherwise the drawn illustration. */
export default function Plate({ solution }: { solution: Solution }) {
  return (
    <div className={`plate plate--${solution.glyph}`}>
      {solution.image ? (
        <img src={solution.image} alt={solution.imageAlt ?? ''} />
      ) : (
        <Glyph id={solution.glyph} />
      )}
    </div>
  )
}
