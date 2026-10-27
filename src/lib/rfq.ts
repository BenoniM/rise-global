import { company } from '../data/site'

export interface RfqPayload {
  name: string
  company: string
  email: string
  phone: string
  country: string
  solutions: string[]
  message: string
}

/**
 * Sends a quote request.
 * - If VITE_RFQ_ENDPOINT is set, POSTs the payload as JSON (Formspree, a serverless function, etc.).
 * - Otherwise opens the visitor's email app with the request pre-written.
 * Returns which route was used so the UI can say the right thing.
 */
export async function submitRfq(data: RfqPayload): Promise<'sent' | 'mailto'> {
  const endpoint = import.meta.env.VITE_RFQ_ENDPOINT
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    return 'sent'
  }

  const lines = [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.country && `Country: ${data.country}`,
    data.solutions.length > 0 && `Solutions: ${data.solutions.join(', ')}`,
    '',
    data.message,
  ].filter((l) => l !== false)

  const subject = `Quote request from ${data.company || data.name}`
  window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  return 'mailto'
}
