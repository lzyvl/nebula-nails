# nebula nails

Website for Nebula Nails (@nebulanailsuk), a gel nail artist in Redditch. Next.js 16, React 19, TypeScript, Tailwind v4.

## run it

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## booking form

The form posts to `/api/book`, which validates the request (same zod schema as the browser) and emails it to the owner through Resend. Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`: from resend.com
- `BOOKING_TO_EMAIL`: where requests should arrive
- `BOOKING_FROM_EMAIL`: optional. Needs a domain verified in Resend; the default `onboarding@resend.dev` can only email the Resend account owner.
- `NEXT_PUBLIC_SITE_URL`: the live URL, used for metadata and the sitemap

Without the first two, the form shows a message pointing people to Instagram. The rate limit (5 per hour per IP) is held in memory, so it resets on deploy and is per server instance.

## where things live

- `src/data/prices.ts`: all prices
- `src/data/reviews.ts`, `src/data/gallery.ts`: reviews and photos (images are in `public/gallery`)
- `src/data/site.ts`: name, Instagram handle, deposit amount

## verified so far

Lint, typecheck and production build pass. The API was tested with valid, invalid, honeypot, unconfigured and rate-limited requests, and a successful send against a local mock of Resend. The form was run in headless Chromium at phone and desktop widths. A real email through Resend has not been sent, and the site has not been deployed.
