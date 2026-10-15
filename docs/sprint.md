# sprint.md — Sprint & Task Planning

How big work is broken into small tasks, where task notes live, and the starting backlog.

---

## 1. How Tasks Work

1. Large feature → split into tasks that take **1–4 hours** each.
2. Each task gets its own file: `docs/tasks/TASK-###-short-name.md` (use the template below).
3. `docs/sprint.md` (this file) lists the tasks and their status. Keep it short.
4. When work starts, set `Owner` and `Status`. When done, fill in the **Result** section.

**Status values:** `Todo` · `In progress` · `In review` · `Done` · `Blocked`

## 2. Task File Template

Copy into `docs/tasks/TASK-###-name.md`:

```markdown
# TASK-### — Title

- **Status:** Todo
- **Owner:** (agent or person)
- **Sprint:** 1
- **Skill to use:** (see docs/skill.md)

## Goal
One or two sentences: what should be true when this is done.

## Files to touch
- src/...

## Acceptance criteria
- [ ] ...
- [ ] Works on sm / md / lg / xl
- [ ] npm run lint and npm run build: 0 warnings

## Notes / decisions
(Anything learned while working.)

## Result (fill when done)
- What changed:
- How to test:
- Known gaps:
```

## 3. Current Sprint

**Sprint 1 — Foundations & Core Browsing (Completed)**
**Goal:** A visitor can land on the site, browse collections, filter catalog, and open rich product pages.

| ID | Task | Skill | Status |
|---|---|---|---|
| TASK-001 | Set up `theme.css` tokens, fonts (`Della Respira` / `Jost`), `tailwind.css` base classes | rules.md | **Done** |
| TASK-002 | Site layout: Sticky Header (mega menu, search, topbar), mobile drawer, multi-column footer | design-taste-frontend | **Done** |
| TASK-003 | Home: Hero slider, category cards, new arrivals, promotional banners, best picks carousel | design-taste-frontend + high-end-visual-design | **Done** |
| TASK-004 | Shared `ProductCard` & `CollectionProductCard` (image zoom, badge, price, quick-view) | minimalist-ui | **Done** |
| TASK-005 | Product listing (`ProductsPage`): responsive grid/list, sort, category & color filters, price slider | minimalist-ui | **Done** |
| TASK-006 | Product detail (`ProductDetailPage`): gallery, thumbnail sync, specs table, size/color swatches, tabs | minimalist-ui | **Done** |
| TASK-007 | Product & collections data model (`productsData.js`, `collectionsData.js`, `collectionSidebar.js`) | ecommerce-rules.md | **Done** |
| TASK-008 | Image pipeline: WebP, fixed aspect-ratio frames, responsive layout, lazy loading | rules.md | **Done** |
| TASK-009 | Collections page (`CollectionsPage.jsx`): 19 jewelry collection cards, item count badges, category routing | minimalist-ui | **Done** |

## 4. Backlog & Next Steps

**Sprint 2 — Buying & Transaction Flow (Current Focus)**
- [x] Cart state + cart drawer + full cart page (`src/context/CartContext.jsx`, `src/components/cart/CartDrawer.jsx`, `src/pages/CartPage.jsx`) — **Done** (slide-out right drawer, free shipping indicator, item stepper, upsell recommendations, order notes accordion, responsive)
- [ ] Multi-step checkout (contact, shipping address, delivery options, payment, order review)
- [ ] Payment gateway integration (Razorpay / Stripe / PayPal sandbox)
- [ ] Order confirmation screen + order summary invoice
- [x] Coupon and promotional discount code validation (`WELCOME10`) — **Done**

**Sprint 3 — Accounts, Trust & Content (Mostly Completed)**
- [x] Wishlist page with local storage persistence, header badge counter, and add/remove toggles
- [x] Product customer reviews, star ratings, and review submission modal
- [x] 11 Content and legal policy pages (About 1 & 2, Contact 1 & 2, FAQ, Store Location, Privacy, Terms, Refund, Shipping)
- [x] 404 Not Found error page with custom graphic and home navigation
- [ ] Customer account authentication (Sign up / login / guest checkout profile)
- [ ] Order history and live shipment tracking portal

**Sprint 4 — Growth & Polish**
- Search with suggestions
- SEO: metadata, structured data, sitemap
- Analytics events
- Performance pass (Lighthouse)
- Accessibility pass
- Admin: manage products, stock, orders **[CONFIRM scope]**

## 5. Sprint Rules

- Don't start a task that has no acceptance criteria.
- Don't have more than 2 tasks `In progress` per agent.
- A task is `Done` only when the Definition of Done in `CLAUDE.md` is met.
- Run an audit (`docs/audit-report.md`) at the end of every sprint.

## 6. Sprint Log

| Sprint | Outcome | Carry-over |
|---|---|---|
| 1 | (fill at end) | |
