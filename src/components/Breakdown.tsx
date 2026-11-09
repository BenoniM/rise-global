import type { Breakdown as BreakdownData } from '../data/solutions'

/**
 * Scope / equipment breakdown rendered as a grid of frosted-glass cards.
 * Labelled rows: label is the card title, items are listed beneath it.
 * Flat rows (no label): the single item becomes the card title.
 */
export default function Breakdown({ data }: { data: BreakdownData }) {
  const total = String(data.rows.length).padStart(2, '0')

  return (
    <ul className="bd-grid" aria-label={data.title}>
      {data.rows.map((row, i) => {
        const title = row.label ?? row.items[0]
        const items = row.label ? row.items : row.items.slice(1)
        return (
          <li key={title} className="bd-card">
            <div className="bd-card-num" aria-hidden="true">
              <span className="bd-card-num-main">{String(i + 1).padStart(2, '0')}</span>
              <span className="bd-card-num-sup">/{total}</span>
            </div>

            <div className="bd-card-body">
              <h3 className="bd-card-title">{title}</h3>
              {items.length > 0 && (
                <ul className="bd-card-items">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
