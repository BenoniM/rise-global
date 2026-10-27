import type { Breakdown as BreakdownData } from '../data/solutions'

/** Structured breakdown of scope / equipment: a table when rows are labelled, a plain list otherwise. */
export default function Breakdown({ data }: { data: BreakdownData }) {
  if (!data.headings) {
    return (
      <ul className="scope-list">
        {data.rows.flatMap((r) => r.items).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return (
    <table className="spec">
      <caption className="sr-only">{data.title}</caption>
      <thead>
        <tr>
          <th scope="col">{data.headings[0]}</th>
          <th scope="col">{data.headings[1]}</th>
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row) => (
          <tr key={row.label}>
            <th scope="row">{row.label}</th>
            <td>
              <ul className={row.items.length > 5 ? 'spec-items spec-items--cols' : 'spec-items'}>
                {row.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
