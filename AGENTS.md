# AGENTS.md — Agent Roles, Permissions & Workflow

Rules for any AI agent (Claude Code, Codex, Cursor, etc.) working on the jewellery e-commerce site.
Read `CLAUDE.md` first; this file adds *who may do what*.

---

## 1. General Principles

- Do the task you were given. Do not refactor unrelated code.
- Ask before: adding dependencies, changing the folder structure, touching payment/auth code, deleting files.
- Prefer editing existing files over creating new ones.
- If a requirement is unclear, ask **one** specific question. Do not guess on prices, legal text, or product claims.
- Report honestly: say what you did, what you did not verify, and what is still open.

## 2. File Access Rules

| Path | Access | Notes |
|---|---|---|
| `src/components/**`, `src/pages/**`, `src/hooks/**` | Read / Write | Normal work area |
| `src/routes/**`, `src/context/**`, `src/data/**` | Read / Write | Central router, client state (Wishlist/Router), mock data |
| `src/styles/theme.css`, `tailwind.css` | Write with care | Add tokens/classes per `rules.md`; no raw hex elsewhere |
| `src/services/**`, `src/store/**` | Read / Write | Keep API calls here, not in components |
| `public/images/**`, `src/assets/**` | Write (add only) | Add optimized images; never overwrite originals |
| `docs/**` | Read / Write | Update docs when behaviour changes |
| `.agents/rules/**` | **Read only** | Change only when the owner asks |
| `.agents/skills/**` | **Read only** | Third-party skill files; do not edit |
| `.env*`, `*.pem`, `*.key` | **Do not read or write** | Secrets |
| `package.json`, lockfile | Ask first | Dependency changes need approval |
| Payment, auth, webhook code | **Ask first, always** | Money and security |
| `node_modules/`, `dist/`, `.git/` | Do not touch | |

## 3. Agent Roles

Use these roles when work is split. One agent may play several roles on a small task.

| Role | Responsibility | May edit | Must not |
|---|---|---|---|
| **Planner** | Break features into tasks, write `docs/tasks/*.md`, update `docs/sprint.md` | `docs/**` | Edit `src/` |
| **UI Builder** | Pages and components, styling, responsive behaviour, motion | `src/components`, `src/pages`, styles | Touch services, payment, auth |
| **Data / Logic** | Cart, pricing display, product services, API integration, state | `src/services`, `src/store`, `src/hooks` | Change visual design |
| **Reviewer / Auditor** | Run checks, fill `docs/audit-report.md`, list issues with file + line | `docs/audit-report.md` only | Fix code during audit (report only) |
| **Docs Writer** | Keep `docs/documentation.md`, `code-structure.md`, dev guide current | `docs/**` | Edit `src/` |

## 4. Delegation Rules

- The Planner hands each task a file in `docs/tasks/` with: goal, files to touch, acceptance criteria.
- A builder works **only** on the files listed in its task. If more files are needed, update the task file and say why.
- The Reviewer receives the finished task and returns findings. It does not silently fix them.
- Never let two agents edit the same file at the same time.

## 5. Multi-Agent Coordination

1. **Claim a task:** set `Owner:` and `Status: In progress` in the task file before starting.
2. **One feature = one branch** (`feature/<short-name>`). Agents on different tasks use different branches.
3. **Shared files** (`theme.css`, `tailwind.css`, `App` routes, `package.json`): one agent at a time. Merge order is decided by the Planner.
4. **Handoff note:** when finished, add to the task file: what changed, how to test, known gaps.
5. **Conflicts:** stop and report. Do not overwrite another agent's work.

## 6. Skill Routing (short version)

Full table in `docs/skill.md`.

- Homepage / collection hero / brand pages → `design-taste-frontend` + `high-end-visual-design`
- Product listing, product detail, cart → `minimalist-ui`
- New page from a design or reference image → `image-to-code`
- Improving an existing page → `redesign-existing-projects`
- **Checkout, account, admin** → out of scope for `design-taste-frontend`. Follow `rules.md` and `ecommerce-rules.md`, keep it plain and clear.

## 7. Restrictions (hard stops)

- No real customer data in code, tests, screenshots, or logs.
- No fake reviews, fake stock counters, fake "only 2 left" urgency, or invented certifications.
- No product claims (purity, hallmark, certification, origin) that are not in the product data.
- No disabling lint rules or TypeScript/ESLint checks to "make it pass".
