# KDM Tasty Temptations: website

Landing page for **KDM Tasty Temptations**, Dominican-style empanadas made with love.
_Pull up. Eat up._

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript. The page is fully
static, and the only client-side JavaScript is the mobile menu.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Where things live

| To change…                            | Edit                                              |
| ------------------------------------- | ------------------------------------------------- |
| Flavors, prices, descriptions         | `src/data/menu.ts`                                |
| Phone, Instagram, taglines, flags     | `src/config/site.ts`                              |
| Food photos / logo used on the site   | `src/assets/` (import them; `next/image` optimizes) |
| Colors, fonts, crimped edges, motion  | `src/app/globals.css`                             |
| Share card, favicon, iPhone icon      | `src/app/opengraph-image.jpg`, `icon.svg`, `apple-icon.png` |
| Original brand files (not served)     | `brand-assets/`                                   |

The menu is the single source of truth: the hero stats ("19 flavors", "$2–$4"), the scrolling
flavor tapes, the menu board and the search-engine structured data are all generated from
`src/data/menu.ts`. Add a flavor there and it appears everywhere.

## Before launch: questions for KDM

These came up while building from the flyer and menus. Each one is marked in the code.

1. **Prices.** The flyer's numbers (4 / 3 / 2) are shown as **$ per empanada**. Confirm.
2. **Chicken & Broccoli** and **Mango Habanero** aren't on the flyer, so they show under "Ask" with
   no price. Add a `priceCents` in `menu.ts` to move them into a price row.
3. **Beef.** One menu says shredded beef with green olives, another says ground beef. The site
   says "Seasoned beef with traditional spices" until you pick one.
4. **Sausage.** The flyer says "Sausages", the other menus say "Sausage & Onions". The site uses
   Sausage & Onions.
5. **Chicken** had no description anywhere. The current line was written for the site; confirm or replace.
6. **Cash App QR.** The QR code on the printed flyer doesn't scan (it isn't a valid code). Check the
   flyer before printing more. Cash App isn't on the site until there's a real $cashtag.
7. **Text ordering.** Every "order" button opens a text to (516) 673-7899 with "Hi KDM! I'd like to
   order:" pre-filled, and the copy says you'll confirm the order and total by text. Confirm that's
   the workflow you want.
8. **Pickup / delivery, hours, service area.** Not in any material. The copy says "pull up… come
   get it while it's hot" (pickup) and nothing about delivery or hours.
9. **Domain.** Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

## Deploy

Vercel is the zero-config path: import the repo, deploy, then add the custom domain and
`NEXT_PUBLIC_SITE_URL`. Security headers are set in `next.config.ts`.

## Phase 2 roadmap: online ordering

The code is shaped so these can drop in without a rewrite:

- **Stripe (checkout).** Each flavor already has a stable `id` and a `priceCents`. Map ids to
  Stripe Prices, add `src/app/api/checkout/route.ts` (creates a Checkout Session, re-reads prices
  server-side, never trusts the browser) and `src/app/api/webhooks/stripe/route.ts` (verifies the
  signature with `STRIPE_WEBHOOK_SECRET`, records the paid order). Flip
  `siteConfig.features.onlineOrdering` to swap the "Text to order" CTAs for a cart. Add a CSP that
  allows Stripe's domains before launch (see the note in `next.config.ts`).
- **Twilio (order updates).** On the Stripe webhook, text the customer "order received"; send
  "ready for pickup" from a small admin action. Keep the auth token server-only and validate
  Twilio's request signature on any inbound webhook.
- **Order tracking.** A `/order/[id]` page reading the stored order status (needs a small
  database, e.g. Vercel Postgres or Supabase).
- **Mailchimp (email list).** A sign-up form posting to `src/app/api/subscribe/route.ts`, with
  server-side validation and rate limiting.

Variable names for all three are already listed in `.env.example`. Secrets go in `.env.local`
(git-ignored) or the host's environment settings, never in code.

## Security

- No secrets exist in this repo today; the landing page needs none. When Phase 2 adds keys, they
  live only in `.env.local` / the host's environment settings (`.env*` is git-ignored).
- Security headers: `next.config.ts`. `X-Powered-By` is off.
- **If a key ever leaks** (committed, pasted in a chat, screenshotted):
  1. **Revoke and rotate it** in that provider's dashboard (Stripe / Twilio / Mailchimp) right away.
     Deleting the file or rewriting git history does not un-expose it; rotating does.
  2. **Block the source**: check the provider's logs for unexpected use; lock down the account.
  3. **Tell whoever is affected** (customers, if payment or contact data was touched).

## Imagery notes

- "Real photos" in the About section are KDM's own phone photos.
- The flavor close-ups are crops of KDM's styled marketing images, cut to remove the baked-in
  logos and labels. Four of them (Chicken, Sausage & Onions, Shrimp & Broccoli, Mango Habanero) come
  from a small menu graphic, so they're low resolution. Higher-res versions would sharpen those tiles.
- Logo cutout: `brand-assets/logo-transparent.png` (transparent background, full resolution).
