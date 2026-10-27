# Rise Global GmbH website

React 19 + Vite + TypeScript. No UI framework; plain CSS with design tokens in `src/index.css`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
```

## Where things live

| Want to change | Edit |
| --- | --- |
| Solution copy, equipment lists, button labels | `src/data/solutions.ts` (one entry per S1–S10 from the brief) |
| Company copy, nav, countries, product groups, contact details | `src/data/site.ts` |
| Header image for a solution | set `image` / `imageAlt` on that solution (e.g. `/images/cleanroom.jpg`, file in `public/images/`). Without it, the drawn illustration is used |
| Illustrations | `src/components/Glyphs.tsx` |
| Colours, type, spacing | tokens at the top of `src/index.css` |

## Routes

`/` · `/company` · `/solutions` · `/solutions/:slug` (10 pages) · `/products` · `/sustainability` · `/contact`

`/contact?solution=cleanroom-systems` pre-selects a solution in the quote form. The “Plan a cleanroom” buttons use it.

## Quote form

By default the form opens the visitor's email app with the request pre-written (to `info@risegmbh.de`).
To send it to a service or your own endpoint instead, create `.env` with:

```
VITE_RFQ_ENDPOINT=https://your-endpoint.example/rfq
```

The form then POSTs JSON: `name, company, email, phone, country, solutions[], message`.

## Deploying

It is a single-page app with client-side routing. Configure the host to serve `index.html` for unknown paths
(Netlify: `/* /index.html 200` in `public/_redirects`; Vercel: a rewrite to `/index.html`; nginx: `try_files $uri /index.html`).

## Before launch

- Replace the text wordmark in `src/components/Layout.tsx` with the real logo.
- Add the legal notice (Impressum) page and link it in the footer; the footer's privacy link points at the live site for now.
- Fonts are self-hosted (`@fontsource-variable/archivo`), so no Google Fonts request is made.
# rise-global
