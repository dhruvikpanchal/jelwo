# code-structure.md — Code Map

Where things live and what each part is responsible for.

> This is the **target structure**. If the real project differs, update this file to match reality
> (or move files to match this).

---

## 1. Folder Tree

```
project/
├── .agents/
│   ├── rules/            # rules.md, ecommerce-rules.md  (read-only for agents)
│   └── skills/           # design skills                 (read-only for agents)
├── docs/                 # all project docs + tasks
├── public/               # static videos (/videos/*.mp4), icons, robots.txt
├── src/
│   ├── assets/           # images (products/, home-*, news/, modals/)
│   ├── components/
│   │   ├── layout/       # Header (mega menu, search, mobile drawer), Footer
│   │   ├── home/         # HeroSlider, Categories, NewArrivals, BestProducts, etc.
│   │   ├── product/      # ProductDetailPage sections, QuickViewModal, StickyFooter
│   │   ├── collection/   # CollectionSidebar, CollectionProductCard
│   │   ├── cart/         # CartDrawer (right slide-out cart modal with animations)
│   │   ├── news/         # NewsArticle, NewsCommentsSection
│   │   └── common/       # PageBanner, ScrollToTop, PopupModal
│   ├── pages/            # 17 pages: HomePage, ProductsPage, CollectionsPage, CartPage, ProductDetailPage,
│   │                     # WishlistPage, NotFoundPage, About1/2, Contact1/2, Blog, News, Policy pages
│   │                     # All pages lazy-loaded with suspense boundaries
│   ├── routes/           # AppRoutes.jsx, routesConfig.js, index.js (central routing manifest)
│   ├── context/          # RouterContext.jsx, WishlistContext.jsx, CartContext.jsx (SPA routing, wishlist, cart)
│   ├── hooks/            # useRouter.js, useWishlist.js, useCart.js
│   ├── data/             # productsData.js, collectionsData.js, collectionSidebar.js, navigation.js, home/
│   ├── utils/            # imagePath.js, seo.js
│   ├── styles/           # theme.css (@theme tokens), tailwind.css, fonts.css, global.css
│   ├── App.jsx           # Root provider wrapper & layout shell
│   └── main.jsx          # React 19 DOM root
├── package.json
└── README.md
```

## 2. MVC Mapping for React

The project follows an MVC-style separation. In React it maps like this:

| MVC | In this project | Rule |
|---|---|---|
| **Model** (data + business rules) | `src/data/`, `src/context/`, `src/utils/` | No JSX. No styling. Manages business logic and product attributes. |
| **View** (what the user sees) | `src/components/`, `src/pages/`, `src/styles/` | Presentational components, receiving data via props or context. |
| **Controller** (connects the two) | `src/hooks/`, `src/routes/`, and page containers | Orchestrates data fetching, routing state, filter queries, and event handlers. |

## 3. Where Does This Go?

| I need to… | Put it in |
|---|---|
| Add a theme token / color | `src/styles/theme.css` (`@theme`) |
| Reuse a long Tailwind chain | `src/styles/tailwind.css` (`@layer components`) |
| Declare custom typography | `src/styles/fonts.css` and `src/styles/theme.css` |
| Add a new screen / route | `src/pages/` + route mapping in `src/routes/routesConfig.js` |
| Add shared layout or utility UI | `src/components/common/` or `src/components/layout/` |
| Add a feature-specific piece | `src/components/<feature>/` |
| Manage global client state | `src/context/` + corresponding custom hook in `src/hooks/` |
| Add catalog or mock inventory | `src/data/productsData.js` or `src/data/collectionsData.js` |
| Add an asset / product photo | `src/assets/images/products/<category>/` (WebP) |

## 4. Rules of Thumb

- One component per file; split if it passes ~150–200 lines.
- Pages compose components; they hold little markup of their own.
- Components never import from another feature's folder; move shared pieces to `ui/`.
- Components don't call `fetch`. Services do.
- Naming: `PascalCase` components, `camelCase` functions, `kebab-case` CSS classes and non-component files.
