# development-guide.md — Developer Guide

Environment setup, workflow, standards, and deployment.

> **[CONFIRM]** items depend on your final choices. Update them as the project settles.

---

## 1. Environment Setup

**Requirements:** Node.js LTS **[CONFIRM version]**, npm, Git, VS Code (or Cursor).

```bash
git clone <repo-url>
cd <project>
npm install
cp .env.example .env     # then fill values
npm run dev
```

**Recommended editor extensions:** ESLint, Tailwind CSS IntelliSense, Prettier **[CONFIRM]**.

## 2. Environment Variables

| Variable | Purpose | Public? |
|---|---|---|
| `VITE_API_URL` | Backend base URL | Yes |
| `VITE_PAYMENT_PUBLIC_KEY` | Payment gateway public key | Yes |
| `VITE_SITE_URL` | Canonical site URL (SEO) | Yes |
| (secret keys) | Live only on the server | **Never in frontend** |

Rules: commit `.env.example` (no real values). Never commit `.env`.

## 3. Daily Workflow

1. Pull latest `main`.
2. Pick a task from `docs/sprint.md`; open its file in `docs/tasks/`.
3. Create a branch: `feature/<short-name>` (or `fix/<short-name>`).
4. Build. Check `sm / md / lg / xl`.
5. Run `npm run lint` and `npm run build` — both must show **0 warnings/errors**.
6. Update the task file (Result section).
7. Commit and open a pull request.

## 4. Git Rules

- Branches: `main` (always deployable), `feature/*`, `fix/*`.
- Commit messages: short, present tense, specific. e.g. `Add size picker to product page`.
- One logical change per commit.
- Pull requests need: description, screenshots (mobile + desktop), and the checklist from `CLAUDE.md`.
- Never force-push to `main`.

## 5. Coding Standards

See `.agents/rules/rules.md` (frontend) and `.agents/rules/ecommerce-rules.md` (shop behaviour). Summary:

- Colors from `theme.css` only; repeated styles become classes in `tailwind.css`.
- Mobile-first; no `2xl:`.
- Lazy-load routes and heavy components; optimize images.
- Semantic HTML and keyboard access.
- Zero lint/build warnings.

## 6. Architecture Standards

- Follow `docs/code-structure.md` (View / Controller / Model separation).
- API access only through `services/`.
- The server is the source of truth for price, stock, and totals.
- Prefer composition over big components. Avoid prop drilling beyond 2 levels (use a hook or context).

## 7. Testing & Quality Checks

| Check | How | When |
|---|---|---|
| Lint | `npm run lint` | Every change |
| Build | `npm run build` | Every change |
| Responsive | Browser dev tools at 360, 768, 1024, 1280 px | Every UI change |
| Accessibility | Keyboard-only pass + Lighthouse a11y | Every page |
| Performance | Lighthouse (mobile) | End of sprint |
| Manual flows | Browse → product → cart → checkout → confirmation | End of sprint |

## 8. Deployment

**Host:** **[CONFIRM]** (Vercel / Netlify / other)

**Pre-deploy checklist**
- [ ] `npm run build` passes with 0 warnings
- [ ] Environment variables set on the host (production values)
- [ ] Payment gateway in **live** mode with webhook URL set
- [ ] `sitemap.xml`, `robots.txt`, favicon, Open Graph image present
- [ ] Policy pages published (Shipping, Returns, Privacy, Terms)
- [ ] Test order completed end-to-end
- [ ] Analytics and error monitoring connected **[CONFIRM]**

**Process:** merge to `main` → host builds automatically → smoke-test production → tag the release.
**Rollback:** redeploy the previous successful build from the host's dashboard.

## 9. Troubleshooting

| Problem | Try |
|---|---|
| Styles not applying | Check the token exists in `@theme` in `theme.css`; restart dev server |
| Lint warning about unused import | Remove it; don't disable the rule |
| Images shift layout | Add `width`/`height` or an aspect-ratio frame |
| Env variable undefined | Must start with `VITE_`; restart dev server |
