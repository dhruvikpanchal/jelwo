# skill.md — Project Skills & How to Use Them

The `.agents/skills/` folder holds five design skills. This file says **which one to use where**
in the jewellery shop, and how to resolve conflicts with the project rules.

---

## 1. Installed Skills

| Skill | What it does | Best for |
|---|---|---|
| `design-taste-frontend` | Anti-"AI-slop" design. Reads the brief, sets design dials (variance / motion / density), pre-flight check | Home page, collection landing pages, brand/about pages |
| `high-end-visual-design` | Agency-level look: type, spacing, soft shadows, nested cards, smooth motion | Hero, featured collections, campaign sections |
| `minimalist-ui` | Clean editorial look, warm monochrome, flat bento grids, muted pastels | Product listing, product detail, cart, content pages |
| `image-to-code` | Generate design images first, analyze them, then code to match | New hero or section where visuals matter most |
| `redesign-existing-projects` | Audit and upgrade existing UI without rewriting | Polishing pages that already exist |

## 2. Page → Skill Map

| Page / feature | Use | Notes |
|---|---|---|
| Home | `design-taste-frontend` + `high-end-visual-design` | Editorial Luxury style fits cream/terracotta brand |
| Collection landing (e.g. Bridal, Gold, Silver) | `design-taste-frontend` | |
| Product listing (filters, sort, grid) | `minimalist-ui` | Dense UI: keep calm and scannable |
| Product detail | `minimalist-ui` | Gallery, specs, size picker, add to cart |
| Cart | `minimalist-ui` | |
| **Checkout** | **No design skill.** Follow `rules.md` + `ecommerce-rules.md` | Multi-step form is out of scope for `design-taste-frontend` |
| **Account / orders / admin** | **No design skill.** Plain, clear, accessible | Dashboards are out of scope for `design-taste-frontend` |
| About, Contact, policy pages | `minimalist-ui` | |
| Polishing existing screen | `redesign-existing-projects` | Scan → Diagnose → Fix; never rewrite from scratch |
| Hero built from a visual reference | `image-to-code` | Only when image generation is available |

## 3. Starting Dial Values (suggestion)

`design-taste-frontend` uses three dials, baseline `8 / 6 / 4`. For a jewellery shop, a calmer start is suggested:

| Surface | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| Home / campaign | 6–7 | 5 | 3 |
| Listing / product | 4–5 | 3 | 4 |
| Cart / content | 3–4 | 2 | 3 |

Jewellery sells on the photos. Let the products be the loudest thing on the page.

## 4. Conflicts Between Skills and Project Rules

Project rules win. Decisions already made:

| Conflict | Decision |
|---|---|
| Skills use raw hex colors (e.g. `#FDFBF7`, `#111111`) | Map to `theme.css` tokens. Add a token first if none fits. |
| Skills use arbitrary values (`rounded-[2rem]`, `text-[10px]`) | Put them in a named class in `tailwind.css` (`@layer components`). |
| `high-end-visual-design` and `minimalist-ui` ban Lucide icons; `rules.md` lists `lucide-react` | **Open decision [CONFIRM].** Default: keep `lucide-react` with a thin `strokeWidth` (1.25–1.5). Switch to Phosphor Light only if the owner approves a migration. |
| Skills ban Inter and Roboto | Follow the skills: use `Della Respira` (serif headlines) and `Jost` / `Poppins` (body). Declared in `src/styles/theme.css` and `src/styles/fonts.css`. |
| `high-end-visual-design` suggests dark sections / OLED black | Not for this brand. Stay in the cream family. No sudden dark section on a light page. |
| Skills push heavy motion | Cap by the dial table above. Respect `prefers-reduced-motion`. |
| Skills suggest `h-screen`-style sections | Use `min-h-[100dvh]` as a shared class. |
| `rules.md` says no `2xl:` | Applies to everything, even if a skill suggests wide layouts. |

## 5. Workflow When Using a Skill

1. Read the task file (`docs/tasks/`).
2. State one line: *"Reading this as: \<page kind> for \<audience>, with a \<vibe> language, leaning toward \<aesthetic>."*
3. Build, applying the skill **inside** the project rules.
4. Run the pre-flight check from the skill, then the checklist in `rules.md`.

## 6. Project-Specific Capabilities (what this project needs from agents)

- Build responsive product grids, galleries with zoom, and size/variant pickers
- Cart drawer and cart page with quantity controls
- Multi-step checkout form with validation
- Filters, sort, and search for products
- Order tracking pages
- SEO metadata and structured data for products
- Performance work on image-heavy pages
