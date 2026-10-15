# documentation.md — Project Documentation

Overview of the jewellery e-commerce website: what it does, its modules, data, and user flows.

> Keep this file current. When a feature ships, update the matching section.

---

## 1. Overview

**Name:** Jelwo (Luxury Jewelry E-commerce Store)
**What it is:** An online luxury jewellery shop where customers browse collections, view detailed product information, add to wishlist and cart, and buy securely.
**Goals:** Present products beautifully, build trust with transparent specs and high-resolution visuals, make browsing fluid with client-side SPA routing, and optimize load speed on mobile devices.
**Primary users:** Shoppers (guest and registered), luxury jewelry buyers, gift shoppers.

## 2. Feature Modules

| Module | What it does | Status |
|---|---|---|
| Layout | Sticky Header with mega-menu, live search, top announcement bar, mobile drawer, multi-column Footer | **Live** |
| Home | Hero Slider, category grid, new arrivals, promotional banners, best products video/image carousel, Instagram feed | **Live** |
| Collections | 19 jewelry collection cards with item counts, hover zoom, and category routing | **Live** |
| Catalog | ProductsPage with sidebar filters (category, availability, price slider, colors), sort, and multi-view grid/list | **Live** |
| Product Detail | ProductDetailPage with gallery, thumbnail sync, zoom, variant swatches, countdown, care/specs tabs | **Live** |
| Wishlist | WishlistPage with local storage persistence, count badge in header, add/remove toggles, toast notifications | **Live** |
| Content Pages | 11 dedicated pages: About 1 & 2, Contact 1 & 2, FAQ, Store Location, Privacy Policy, Terms, Refund, Shipping | **Live** |
| Blog & News | Blog listing and News article page with community comments system and recent post sidebar | **Live** |
| 404 Not Found | NotFoundPage with custom vector illustration, helpful message, and continue shopping CTA | **Live** |
| Cart | Drawer + full cart page with quantity adjustments, subtotal calculation, free shipping bar | Planned |
| Checkout | Multi-step contact, shipping, payment gateway integration, order confirmation | Planned |
| Accounts | Customer login, registration modal, order history, profile management | In progress |

## 3. Product Categories

Rings · Necklaces · Pendants · Earrings · Bracelets · Bangles · Sets · Gifts **[CONFIRM list]**

Possible filters: metal, purity, price range, stone, occasion (bridal, daily wear, gifting), size.

## 4. Data Models (draft)

```js
Product {
  id, slug, name, category, description, careInstructions,
  price,            // integer, smallest currency unit
  compareAtPrice,   // optional
  metal, purity, weightGrams,
  stones: [{ type, count, carat }],
  sizeOptions: [],
  images: [{ src, alt }],
  stock,            // integer
  tags: [], collections: [],
  certification     // only if real
}

CartItem  { productId, size, quantity }

Order {
  id, customer: { name, email, phone },
  shippingAddress, items: [{ productId, name, price, quantity, size }],
  subtotal, shipping, tax, discount, total,
  paymentStatus, orderStatus, createdAt
}

User { id, name, email, addresses: [], wishlist: [] }
```

Order status flow: `placed → paid → packed → shipped → delivered` (also `cancelled`, `returned`).

## 5. Key User Flows

**Buy a product**
Home → category → product → choose size → add to cart → cart → checkout → pay → confirmation.

**Returning customer**
Login → order history → track order.

**Gift buyer**
Collection "Gifts" → filter by price → product → add gift note **[CONFIRM feature]** → checkout.

## 6. Pages & Routes
 
| Route | Page Component | Description |
|---|---|---|
| `/` | `HomePage` | Full storefront hero, categories, new arrivals, best picks, insta feed |
| `/collections` | `CollectionsPage` | 19 jewelry collection cards with item counts and category routing |
| `/products` | `ProductsPage` | Filterable product catalog with price slider, colors, sorting, and view modes |
| `/products/:slug` | `ProductDetailPage` | Rich product details, image gallery, swatches, countdown, policies, and reviews |
| `/wishlist` | `WishlistPage` | Saved items with badge counter, instant remove, and add to cart |
| `/blogs` | `BlogPage` | Editorial jewelry journal and styling advice articles |
| `/blogs/news`, `/blogs/news/:slug` | `NewsPage` | Full article view with community comments and related news |
| `/about-1` | `About1Page` | Heritage story, founder quote, values, stats, team members, testimonials |
| `/about-2` | `About2Page` | Visual brand campaign, artisanal craftsmanship, mission and vision |
| `/contact-1` | `Contact1Page` | Contact form, boutique address pillars, interactive Google Map embed |
| `/contact-2` | `Contact2Page` | Minimalist customer concierge and support channels |
| `/faq` | `FaqPage` | Categorized accordion FAQs (Orders, Shipping, Sizing, Care) |
| `/store-location` | `StoreLocationPage` | Flagship locations in London, Melbourne, Ansolt Park with hours |
| `/privacy-policy` | `PrivacyPolicyPage` | Data protection, GDPR & consumer privacy guidelines |
| `/terms-and-condition` | `TermsAndConditionPage` | Store conditions of use, intellectual property, warranty clauses |
| `/refund-policy` | `RefundPolicyPage` | 30-day return policy, eligibility rules, and refund timeline |
| `/shipping-and-return` | `ShippingAndReturnPage` | Domestic & international shipping rates, packaging, and parcel tracking |
| `*` | `NotFoundPage` | 404 error page with decorative illustration and return-home action |

## 7. Design System Summary

- Palette (tokens in `theme.css`): brand terracotta, ink, cream family, soft borders, discount green, star yellow.
- Layout classes: `.site-container`, `.section-header`, `.grid-responsive-*`.
- Buttons: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-icon`.
- Cards: `.product-card`, `.product-img-wrap`, `.img-zoom`.
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280` (no `2xl`).

Details: `.agents/rules/rules.md`, `docs/skill.md`.

## 8. Third-Party Services **[CONFIRM]**

| Purpose | Service |
|---|---|
| Payments | |
| Email (order confirmation) | |
| Shipping / tracking | |
| Analytics | |
| Image hosting / CDN | |
| Error monitoring | |

## 9. Generating or Updating Docs

If a UI for generating documentation is wanted (the last handwritten line was unclear), a simple option is a script
that reads the product data and component folders and writes this file's tables. Decide after Sprint 1.

## 10. Related Docs

`CLAUDE.md` · `AGENTS.md` · `docs/skill.md` · `docs/sprint.md` · `docs/code-structure.md` · `docs/development-guide.md` · `docs/audit-report.md`
