# Project Rules — E-commerce (Jewellery)

Companion to `rules.md` (which covers colors, Tailwind, responsive, performance, a11y).
This file covers **shop behaviour**: products, prices, cart, checkout, security, SEO, content.

---

## 1. Product Data

Every product must have these fields. Do not render a product page with missing required fields.

| Field | Required | Notes |
|---|---|---|
| `id`, `slug` | Yes | `slug` is kebab-case, used in URLs |
| `name` | Yes | |
| `category` | Yes | ring, necklace, earrings, bracelet, bangle, pendant, set, other |
| `price` | Yes | Stored as integer in the smallest currency unit |
| `compareAtPrice` | No | Shows a discount only if higher than `price` |
| `metal` | Yes | e.g. gold, silver, platinum, rose gold |
| `purity` | Yes for metals | e.g. 18K, 22K, 925 |
| `weightGrams` | Yes | Net weight |
| `stones` | No | Type, count, carat, cut |
| `size` / `sizeOptions` | If applicable | Rings, bangles, chains |
| `images` | Yes (min 3) | Front, detail, on-model or scale |
| `stock` | Yes | Integer, from the server |
| `description`, `careInstructions` | Yes | |
| `certification` / `hallmark` | Only if true | Never invent |

## 2. Prices & Money

- Store and calculate money as **integers** (paise/cents), never floats.
- Format with one shared helper (`formatPrice`) using `Intl.NumberFormat`. Do not format prices by hand.
- Show the currency symbol everywhere a price appears.
- Jewellery price may depend on metal rate **[CONFIRM: fixed price or live gold-rate pricing]**. If dynamic, show "price valid until" and re-check at checkout.
- Show whether tax is included or added. Show making/shipping charges before the final step, not at the end.
- The **server is the source of truth** for price, discount, stock, and total. The browser only displays.

## 3. Cart

- Cart holds `productId`, `variant` (size), `quantity`. Prices are looked up, not trusted from storage.
- Max quantity per line follows `stock`. Show a clear message when limited.
- Cart persists across reloads (localStorage for guests, server for logged-in users).
- Every cart action gives feedback (toast, drawer update, or button state).
- Empty cart has a helpful empty state with a link to collections.

## 4. Checkout

- Guest checkout allowed. Account creation is optional.
- Steps: contact → shipping address → delivery → payment → review. Keep it plain and fast; no decorative motion here.
- Validate on the client for convenience, **and again on the server**.
- Never store card data. Use the gateway's hosted checkout or hosted fields.
- Confirm orders only after verified payment (server-side webhook/verification), never from the redirect alone.
- Show order number, summary, and expected delivery on the confirmation page.

## 5. Security & Privacy

- No secrets in the frontend bundle. Only public keys use the `VITE_` prefix.
- Sanitize any user-generated text (reviews, names) before rendering. Never use `dangerouslySetInnerHTML` with user input.
- Protect account/order routes. Check authorization on the server, not just by hiding UI.
- Collect only the data needed for the order. Link a privacy policy at checkout and in the footer.
- Do not log personal data (phone, address, email) to the console or analytics.

## 6. Content & Trust

- Honest copy only. No fake scarcity, fake reviews, or invented certificates.
- Every product page shows: purity, weight, care, shipping time, return/exchange policy.
- Required static pages: About, Contact, Shipping, Returns/Exchange, Privacy, Terms, Size Guide, Jewellery Care.
- Photography: consistent background, at least one detail shot, one scale shot. Alt text describes the item
  (e.g. "Rose gold solitaire ring with round diamond"), not "image1".
- Tone: warm, specific, plain language. Avoid filler words like "elevate", "seamless", "unleash".

## 7. SEO & Sharing

- One `<h1>` per page. Unique `<title>` and meta description per page.
- Product pages include structured data (`schema.org/Product` with price, availability, images).
- Clean URLs: `/collections/rings`, `/products/rose-gold-solitaire-ring`.
- Provide Open Graph image and title for products and collections.
- `sitemap.xml` and `robots.txt` maintained.

## 8. Performance Targets (shop-specific)

- Product images: WebP/AVIF, responsive `srcset`, hero image preloaded, everything else lazy.
- Listing pages paginate or load more. Do not render hundreds of cards at once.
- Largest Contentful Paint under 2.5 s on a mid-range phone **[verify with Lighthouse]**.
- No layout shift when images load (fixed aspect-ratio frames).

## 9. Analytics (if added)

- Track: product view, add to cart, begin checkout, purchase.
- Respect consent where required. No personal data in event payloads.

## 10. Precedence

1. `rules.md` and this file
2. `CLAUDE.md` / `AGENTS.md`
3. Design skills in `.agents/skills/`

Example: a skill suggests a hardcoded `#FDFBF7`. Instead, use the matching token from `theme.css`
(`bg-cream-light`), or add a new token there first.
