# Project Rules — Frontend / Styling / Tailwind

These rules exist so any AI editor (or human) contributing to this codebase produces
consistent, clean, and performant code without needing to re-decide conventions every time.

**Stack:** React + Vite + Tailwind CSS v4 + `motion` + `lucide-react`.
**Companion file:** `ecommerce-rules.md` (products, prices, cart, checkout, security, SEO).
**Precedence:** these rules and `ecommerce-rules.md` win over any design skill in `.agents/skills/`.

---

## 1. Colors & Theming (CRITICAL: Single Source of Truth in `theme.css`)

- All colors must be defined **once**, in `theme.css`, inside `@theme` as CSS custom properties:
  ```css
  @theme {
    /* Brand Accent */
    --color-brand: #d9714a;
    --color-brand-hover: #c4623d;
    --color-brand-dark: #993c1d;
    --color-brand-light: #f3ded4;
    --color-brand-terracotta: #d27961;

    /* Ink / Text */
    --color-ink: #1c1c1c;
    --color-ink-muted: #6b6b63;
    --color-ink-soft: #8a8a82;

    /* Backgrounds */
    --color-cream: #f5f1e8;
    --color-cream-dark: #ece5d8;
    --color-cream-light: #faf8f5;
    --color-cream-card: #f9f6f0;
    --color-banner-blue: #eef5fa;
    --color-surface: #ffffff;

    /* Borders / Dividers */
    --color-border: #e5e0d8;
    --color-border-soft: #ede7dc;
    --color-border-subtle: #f0eae1;
    --color-border-strong: #d3ccc0;
    --color-border-input: #8a8a82;          /* form fields: meets 3:1 for UI components */

    /* Status Colors */
    --color-discount: #3fa65c;              /* decorative / large text / icons only */
    --color-discount-bg: #e7f5eb;
    --color-discount-text: #1f6b3a;         /* readable text on discount-bg and cream */
    --color-star: #f5b400;                  /* icon fill only, never text */
    --color-sale: #1c1c1c;
    --color-danger: #b3261e;                /* errors, out of stock, destructive actions */
    --color-danger-bg: #fdecea;
    --color-warning-text: #7a5200;          /* low stock, notices */
    --color-warning-bg: #fff4d6;
    --color-success: #1f6b3a;               /* confirmations */
    --color-overlay: rgb(28 28 28 / 0.5);   /* modal / drawer backdrop */
    --color-focus-ring: #993c1d;            /* keyboard focus outline */
  }
  ```
- **Never** hardcode a hex/rgb color directly in a component, inline style, or arbitrary Tailwind class (e.g., avoid `text-[#d9714a]`, `bg-[#1c1c1c]`, `border-[#ede7dc]`).
- **Always** use the generated Tailwind theme utility classes or CSS variables:
  - Backgrounds: `bg-brand`, `bg-brand-hover`, `bg-brand-dark`, `bg-brand-light`, `bg-ink`, `bg-cream`, `bg-cream-light`, `bg-cream-card`, `bg-banner-blue`, `bg-danger-bg`, `bg-warning-bg`
  - Text: `text-brand-dark`, `text-ink`, `text-ink-muted`, `text-discount-text`, `text-danger`, `text-warning-text`
  - Borders: `border-border`, `border-border-soft`, `border-border-subtle`, `border-border-input`, `border-brand`
  - Fill / Stroke: `fill-brand`, `stroke-brand`, `fill-star`
- **Adding a new color**: Add the variable in `theme.css` **first** inside `@theme`. Never introduce raw hex codes inside JSX or component files.
- **Do not rename or remove an existing token** without searching the whole project and updating every use in the same change.
- **No dark mode.** The brand is a single warm light theme. Do not add `dark:` variants.

### 1.1 Color contrast (WCAG AA, measured on the palette above)

Normal text needs **4.5:1**, large text (≥ 24px, or ≥ 18.7px bold) and UI components/icons need **3:1**.

| Pair | Ratio | Rule |
|---|---|---|
| `ink` on `cream` | 15.1 | Body text. |
| `ink-muted` on `cream` / `surface` | 4.8 / 5.4 | OK for body and captions. |
| `ink-soft` on `cream` / `surface` | 3.1 / 3.5 | **Fails for body text.** Use only for disabled states, decorative text, or large text. |
| `brand` on `cream` / `surface` | 2.9 / 3.3 | **Never use as small text.** Fine for large headings, icons, borders, and fills. |
| `white` on `bg-brand` | 3.3 | **Fails.** Do not put white small text on `bg-brand`. |
| `white` on `bg-brand-hover` | 4.1 | **Fails for small text.** |
| `white` on `bg-brand-dark` | 7.0 | OK: primary buttons with white text use `bg-brand-dark`, or use `text-ink` on `bg-brand` (5.2). |
| `brand-dark` on `cream` / `brand-light` | 6.2 / 5.4 | Use for brand-colored text and links. |
| `discount` on `discount-bg` | 2.7 | **Fails.** Use `text-discount-text` (5.8). |
| `star` on white | 1.8 | Icon fill only, always with a text rating next to it. |
| `border` / `border-strong` on `cream` | 1.2 / 1.4 | Fine for decorative dividers. **Not** for input borders; use `border-input`. |

Any new color pair must be checked and added to this table before use.

---

## 2. Typography

- Declare fonts once in `theme.css`:
  ```css
  @theme {
    --font-heading: "Della Respira", "Playfair Display", Georgia, "Times New Roman", serif;
    --font-body: "Jost", "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-della: "Della Respira", Georgia, serif;
    --font-jost: "Jost", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  ```
  *(Font names are the current choice; defined in `theme.css` and `fonts.css`.)*
- Load at most **2 families, 3–4 weights**. Self-host or use `font-display: swap`; preload the one used above the fold.
- Always provide a fallback stack so text never disappears while fonts load.
- Body text: minimum **16px** (`text-base`) on mobile. Never below 14px for anything readable. Line-height 1.5–1.7.
- Limit paragraph width to about 65 characters (`max-w-prose`).
- One `<h1>` per page. Do not skip heading levels. Style headings with classes, not by choosing a different tag.
- Use `tabular-nums` for prices and quantities so digits line up.
- Use `text-wrap: balance` on headings.

---

## 3. Tailwind Custom Classes

- Don't repeat the same long Tailwind utility chain more than **2–3 times** across the project —
  extract it into a custom class using `@layer components` in `tailwind.css`.
- Tailwind v4 note: classes in `@layer components` are plain CSS and **cannot be combined with variants** (`hover:`, `md:`). If a custom class must work with variants, define it with `@utility` instead.
- Always use the centralized layout & responsive utilities:
  - Containers: `.site-container`, `.site-container-narrow`
  - Headers: `.section-header`, `.section-subtitle`, `.section-title`, `.section-description`
  - Grids: `.grid-responsive-6`, `.grid-responsive-4`, `.grid-responsive-3`, `.grid-responsive-2`
  - Buttons: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-white`, `.btn-icon`, `.btn-hero-slider`
  - Utilities: `.product-card`, `.product-img-wrap`, `.img-zoom`, `.border-soft`, `.divider-soft`, `.input-luxury`
  - Full-height sections: `.section-screen` (`min-height: 100dvh`). **Never** use `h-screen` / `100vh`.
- Keep the Tailwind/global CSS file **under 1000 lines**.
- Avoid arbitrary values (`w-[137px]`, `mt-[13px]`) unless there's no equivalent spacing/size
  token. Prefer the Tailwind scale (`w-32`, `mt-3`, etc.) for consistency. If an unusual value is needed in more than one place, make it a token in `theme.css` or a named class.
- No inline `style={{}}` except for truly dynamic values (e.g. a computed width). Static styling goes in classes.
- Do not use `!important` or `@apply` chains to fight specificity. Fix the structure instead.

---

## 4. Responsive Design — Mobile First

- Always design and write styles **small → large**: base styles = mobile, then layer up with
  `sm:`, `md:`, `lg:`, `xl:`.
- Never write a desktop-first override (e.g. base styles targeting large screens, then
  shrinking down with `max-*` breakpoints). Base = smallest screen, always.
- Do **not** target `2xl:`. Design and test only up to `xl (≥1280px)`; treat `xl` as the largest
  screen size, and let it stretch naturally (or cap with a `max-w-*` container) beyond that.
- Every new page/component must be checked at all 4 breakpoints before being considered done:
  `sm (≥640px)`, `md (≥768px)`, `lg (≥1024px)`, `xl (≥1280px)` — **plus a 360px phone** (the base).
- Nothing may scroll horizontally at any width (except intentional carousels/tables inside their own `overflow-x-auto` wrapper).
- Touch targets: at least **44 × 44px** for buttons, icon buttons, links in menus, and form controls on touch screens.
- Use responsive utility variants instead of separate mobile/desktop components whenever possible.
- Use `min-h-[100dvh]` (via `.section-screen`) for full-height sections, never `100vh`.
- Respect device safe areas for fixed bars (sticky add-to-cart, bottom nav): `pb-[env(safe-area-inset-bottom)]`.
- Hero and first screen must be readable and fully visible on a small laptop (about 1366 × 768).

---

## 5. Components & Code Structure

### Code structure & consistency
- One component = one responsibility. If a component file exceeds ~150–200 lines, consider
  splitting it into smaller subcomponents.
- **Naming**
  - Components and their files: `PascalCase` (`ProductCard.jsx`).
  - Hooks: `camelCase` starting with `use` (`useCart.js`).
  - Functions and variables: `camelCase`. Constants: `UPPER_SNAKE_CASE`.
  - Other files (utils, services, data) and CSS classes: `kebab-case` or `camelCase` — pick one per folder and stay consistent.
  - Booleans start with `is` / `has` / `can` / `should`.
- Group related files by feature/domain, not by file type (`/components/home/`, `/components/product/`, `/components/layout/`, etc.). Shared primitives go in `/components/ui/`.
- Components never `fetch`. API calls live in `services/` and are used through hooks (see `docs/code-structure.md`).
- Do not nest components inside components (define each at module level).
- Props: destructure in the signature, give defaults, keep to ~6 props; if more, group into an object or split the component.
- Lists: use a stable unique `key` (an `id`), never the array index when items can reorder.
- Prefer named exports for components; default export only for pages loaded with `React.lazy`.
- No dead code, no commented-out code, no unused imports, no leftover `console.log`.
- Magic numbers and repeated strings go to a constants file.

### Icons
- Use `lucide-react` with named imports (`import { ShoppingBag } from "lucide-react"`). Keep one consistent `strokeWidth` (1.5) across the site.
- Icon-only buttons need an accessible name (`aria-label`). Decorative icons get `aria-hidden="true"`.

### Motion (`motion` package)
- Animate `transform` and `opacity` only. Do not animate `width`, `height`, `top`, `left`.
- Keep durations between 150ms and 600ms; use a shared easing (e.g. `cubic-bezier(0.32, 0.72, 0, 1)`) defined once.
- Respect `prefers-reduced-motion`: disable or simplify motion for those users.
- No infinite looping animations on content, and none in checkout or forms.
- Import only what is used (`import { motion } from "motion/react"`).

---

## 6. Forms & Inputs

- Every input has a visible `<label>` (or `aria-label` when a label is truly impossible). Placeholder is not a label.
- Use correct `type`, `name`, `autocomplete`, and `inputMode` (e.g. `type="email"`, `inputMode="numeric"` for PIN/phone).
- Font size in inputs is at least **16px** (prevents iOS zoom on focus).
- Errors: show next to the field, in text (not color alone), linked with `aria-describedby`, and use `--color-danger`.
- Validate on blur and on submit. Keep what the user typed after a failed submit.
- Disable the submit button only while submitting, and show a loading state. Prevent double submits.
- Input borders use `border-border-input` (meets 3:1). Focus state is always visible.

---

## 7. Data, State & Error Handling

- Every screen that loads data has **three explicit states**: loading (skeleton, same size as final content), error (message + retry), and empty (helpful message + next action).
- Never swallow errors with an empty `catch`. Show a user-friendly message; log technical details only in development.
- Keep server data in hooks/services. Keep UI-only state (open/closed, selected tab) local.
- Avoid prop drilling beyond 2 levels; use a hook or context.
- Derive values instead of copying them into state.
- Clean up effects (event listeners, timers, subscriptions) and cancel stale requests.
- Wrap the app (and each route) in an error boundary so one crash doesn't white-screen the shop.

---

## 8. Performance

- Lazy-load routes/heavy components (`React.lazy`, dynamic `import()`, or framework equivalent).
- Optimize images: use modern formats (WebP/AVIF), proper `width`/`height` (or a fixed aspect-ratio frame) to avoid layout
  shift, and lazy-load offscreen images (`loading="lazy"`, `decoding="async"`).
- The main above-the-fold image (LCP) is **not** lazy: use `fetchpriority="high"` and preload if needed.
- Provide `srcset`/`sizes` for product and hero images so phones don't download desktop sizes.
- Image size targets: product images ≤ 150 KB, hero ≤ 250 KB (WebP).
- Avoid unnecessary re-renders: memoize expensive computations and callbacks
  (`useMemo`, `useCallback`) only where profiling shows it matters.
- Avoid importing entire libraries for a single function; prefer tree-shakeable imports.
- Before adding a dependency: check it isn't already covered, check its size, and ask the owner if it is over ~30 KB gzipped.
- Don't render long lists all at once: paginate, "load more", or virtualize.
- Debounce search and filter inputs (about 300ms).
- Targets (mobile, Lighthouse): Performance ≥ 85, LCP < 2.5s, CLS < 0.1.

---

## 9. Accessibility (a11y)

- Use semantic HTML (`<button>`, `<nav>`, `<header>`, `<main>`, `<footer>`) instead of generic `<div>`s
  with click handlers. Links navigate (`<a>` / `<Link>`); buttons perform actions (`<button>`).
- Every image has meaningful `alt` text; decorative images use `alt=""` or `aria-hidden="true"`.
  Product alt text describes the item (e.g. "Rose gold solitaire ring with round diamond"), never "image1".
- Interactive elements must be keyboard-navigable and have visible focus states (use `--color-focus-ring`, at least a 2px outline; never `outline: none` without a replacement).
- Provide a "Skip to main content" link as the first focusable element.
- Modals and cart drawers: trap focus while open, close on `Esc`, return focus to the trigger, lock background scroll.
- Menus, tabs, accordions and galleries use the correct ARIA roles/states (`aria-expanded`, `aria-controls`, `aria-current`).
- Announce dynamic changes (added to cart, form errors) with `aria-live="polite"`.
- Text and UI contrast follow section 1.1. Never convey meaning by color alone (add text or an icon).
- Set `<html lang="en">` (or the site's language) and a descriptive `<title>` on every route.

---

## 10. Security (frontend)

- No secrets in code or in the bundle. Only public keys, with the `VITE_` prefix.
- Never use `dangerouslySetInnerHTML` with user or API-provided text unless it is sanitized.
- External links that open a new tab use `rel="noopener noreferrer"`.
- Don't put personal data in URLs, `localStorage` keys, logs, or analytics events.
- More rules for payments, auth and cart are in `ecommerce-rules.md`.

---

## 11. Quality: Zero Warnings / Zero Errors Guarantee (STRICT)

- **Zero Terminal / Linter / IDE Warnings**: Whenever code is created, modified, or refactored, ensure that **no warning or error messages** are emitted by linters (ESLint), compilers (Vite), CSS analyzers, or IDE diagnostics.
- If any warning or problem message appears during development, build, or lint checks, **it must be resolved immediately** before completing the task.
- **Never** silence a problem with `eslint-disable`, `// @ts-ignore`, or by removing a lint rule. Fix the cause.
- Ensure all dependencies (such as `motion`, `lucide-react`, etc.) are installed and imports are valid.
- Ensure all JSX attributes, CSS utilities, and SVG elements follow valid, standard React & Tailwind conventions without deprecated or unrecognized properties (e.g. `className`, `htmlFor`, camelCase SVG attributes).
- Check the browser console during manual testing: no React warnings (missing `key`, invalid DOM nesting, controlled/uncontrolled input).

---

## 12. Content & Copy

- No emojis in UI text, code, or alt text. Use icons.
- No lorem ipsum or placeholder names ("John Doe"). Use realistic jewellery content.
- Write plain, specific copy. Avoid filler like "elevate", "seamless", "unleash", "next-gen".
- Currency and number formatting always go through the shared `formatPrice` helper (`Intl.NumberFormat`).

---

## 13. Git & Task Hygiene

- One branch per task: `feature/<short-name>` or `fix/<short-name>`. Never commit directly to `main`.
- Commit messages: present tense, specific (`Add size picker to product page`).
- Do not commit `.env`, build output, or `node_modules`.
- Update the task file in `docs/tasks/` when work is finished.

---

## Quick Checklist Before Marking a Task Done

**Styling**
- [ ] No hardcoded hex colors — all via CSS variables/classes from `theme.css` (`text-brand-dark`, `bg-ink`, `border-border-soft`, etc.)
- [ ] Text/background pairs follow the contrast table (no small text in `brand`, no `ink-soft` body text, no white on `bg-brand`)
- [ ] No repeated long Tailwind chains — extracted to custom classes in `tailwind.css`
- [ ] No arbitrary values or inline styles unless unavoidable

**Responsive**
- [ ] Styles written mobile-first, checked at 360px and `sm/md/lg/xl` (no `2xl`)
- [ ] No horizontal scroll; touch targets ≥ 44px; `100dvh` not `100vh`

**Quality**
- [ ] Zero Warnings Guarantee: `npm run lint` & `npm run build` pass with 0 warnings/errors; IDE Problems panel and browser console are clean
- [ ] No dead code, no `console.log`, no unused imports, semantic HTML used
- [ ] Loading, error, and empty states handled

**Accessibility & performance**
- [ ] Labels on inputs, `aria-label` on icon buttons, visible focus, keyboard works
- [ ] Images optimized (WebP) with `alt`, dimensions, `loading="lazy"` (not on the LCP image)
- [ ] Motion only on `transform`/`opacity` and respects reduced-motion
- [ ] `npm run build` tested with zero errors before completion
