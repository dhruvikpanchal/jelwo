# CLAUDE.md — Jewellery Shop E-commerce Website

Read this file first, every session. It tells you what this project is, how to work in it,
and which other files to read before you change anything.

> Items marked **[CONFIRM]** are assumptions. Ask the owner and update this file once known.

---

## 1. Project Summary

An online luxury jewellery store (**Jelwo**): customers browse collections, view product details, add to wishlist and cart, check out, and track orders.

- **Audience:** design-conscious shoppers buying rings, necklaces, earrings, bracelets, bangles, gifts.
- **Brand feel:** warm, premium, editorial (cream + terracotta palette, see `src/styles/theme.css`).
- **Trust matters:** jewellery is a high-value purchase. Clear photos, honest specs
  (metal, purity, weight, stone details), visible returns/shipping info, and a safe checkout.

## 2. Tech Stack

| Area | Choice | Implementation / Location |
|---|---|---|
| UI | React 19 | `src/components/`, `src/pages/` |
| Build | Vite (`npm run build`, `npm run lint`) | `vite.config.js`, `package.json` |
| Styling | Tailwind CSS v4, tokens in `theme.css` (`@theme`), shared classes in `tailwind.css` | `src/styles/` |
| Typography | Della Respira (headings), Jost & Poppins (body) | `src/styles/theme.css`, `src/styles/fonts.css` |
| Motion | `motion` (MotionConfig, reducedMotion="user") | `src/App.jsx` |
| Icons | `lucide-react` | Thin stroke widths (1.25–1.75) |
| Routing | Custom SPA History Router with code-splitting & lazy loading | `src/routes/`, `src/context/RouterContext.jsx`, `src/hooks/useRouter.js` |
| State | React Context with localStorage persistence | `src/context/WishlistContext.jsx`, `RouterContext.jsx` |
| Data | Structured mock catalog & collections data | `src/data/productsData.js`, `collectionsData.js` |
| Backend / API | Planned REST / GraphQL / Shopify Headless integration | `src/services/` |

## 3. Read Before You Work

| File | What it covers |
|---|---|
| `.agents/rules/rules.md` | Frontend rules: colors, Tailwind, mobile-first, performance, a11y, zero warnings |
| `.agents/rules/ecommerce-rules.md` | Product data, pricing, cart, checkout, security, SEO rules |
| `docs/skill.md` | Which design skill to use for which page |
| `docs/code-structure.md` | Where files live |
| `AGENTS.md` | What agents may and may not touch |
| `docs/sprint.md` | Current sprint and task list |
| `docs/development-guide.md` | Setup, git workflow, deployment |

If two files disagree: **`rules.md` and `ecommerce-rules.md` win over design skills.**

## 4. Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm run lint       # must finish with 0 warnings, 0 errors
npm run build      # must finish with 0 warnings, 0 errors
```

## 5. How to Work

1. **Understand the task.** Open the matching file in `docs/tasks/` (see `docs/sprint.md`).
   If there is none and the task is bigger than ~1 hour, create one first.
2. **Pick the design skill** from `docs/skill.md` and state a one-line "Design Read"
   before writing UI code.
3. **Make small, focused changes.** One component = one responsibility.
4. **Verify:** lint, build, and check `sm / md / lg / xl` breakpoints.
5. **Update the task file** with what changed and what is left.

## 6. Coding Standards (summary — full detail in `rules.md`)

- Colors only from `theme.css` tokens. Never hardcode hex in JSX, inline styles, or `text-[#...]`.
- Repeated Tailwind chains (3+ uses) become classes in `tailwind.css`. Keep that file under 1000 lines.
- Mobile-first. Never use `2xl:`. Test up to `xl`.
- Naming: `PascalCase` components, `camelCase` functions/variables, `kebab-case` CSS classes and non-component files.
- Group by feature (`components/product/`, `components/cart/`), not by file type.
- Lazy-load routes and heavy components. Images: WebP, explicit `width`/`height`, `loading="lazy"` below the fold.
- Semantic HTML, meaningful `alt`, visible focus states.
- Error handling: every network call has loading, error, and empty states. Never swallow errors silently.
- Packages: check what is already installed before adding one. Prefer small, tree-shakeable libraries. Ask before adding anything over ~30 KB gzipped.

## 7. Never Do

- Never commit secrets, API keys, or `.env` files.
- Never trust prices, totals, or discounts calculated in the browser. The server recalculates.
- Never store card numbers. Use the payment gateway's hosted fields/checkout.
- Never use emojis in UI text or code.
- Never leave `console.log`, commented-out code, or unused imports.
- Never mark a task done with lint/build warnings.

## 8. Definition of Done

- [ ] Works on `sm / md / lg / xl`
- [ ] `npm run lint` and `npm run build` pass with 0 warnings/errors
- [ ] No hardcoded colors, no dead code
- [ ] Loading / error / empty states handled
- [ ] Images optimized with alt text
- [ ] Keyboard accessible
- [ ] Task file in `docs/tasks/` updated
