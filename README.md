# home-wiki-frontend

A React 19 single-page application for browsing and managing a personal home knowledge base — articles organized by categories and tags, with full-text search and pagination.

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 4.9 | Type safety |
| Material UI | v6 | Component library |
| Redux Toolkit | 2.6 | Global state management |
| React Router | v7 | Client-side routing |
| Axios | 1.8 | HTTP client |
| react-hook-form | 7.54 | Form handling |
| framer-motion | 12 | Animations |
| react-toastify | 11 | Toast notifications |
| CRACO | 7 | CRA config overrides (path aliases) |

---

## Architecture

### Directory Structure

```
src/
├── api/
│   ├── axiosClient.ts        # Axios instance — base URL + JWT auth interceptor
│   ├── ArticleService.ts     # Article CRUD
│   ├── CategoryService.ts    # Category CRUD
│   ├── TagService.ts         # Tag CRUD
│   ├── AuthService.ts        # Login/register (backend auth not yet implemented)
│   └── index.ts              # Re-exports all services
├── components/
│   ├── Article/              # ArticleSearch, CreateArticleForm, DeleteArticleDialog
│   ├── Category/             # CategoryList, CategoryArticles, CategoryEditDialog
│   ├── Tag/                  # TagList, TagArticles, TagEditDialog
│   ├── Layout/               # Layout wrapper, Header, Footer
│   ├── Sidebar/              # Navigation sidebar
│   └── Auth/                 # Login, Register, Profile forms
├── hooks/
│   ├── useAuth.ts            # Returns mock user (auth disabled — see below)
│   ├── useCategories.ts      # Fetches + caches categories from API
│   └── useTags.ts            # Fetches + caches tags from API
├── pages/                    # Route-level page components
├── redux/
│   ├── store.ts              # RTK store configuration
│   ├── hooks.ts              # Typed useAppDispatch / useAppSelector
│   └── slices/               # authSlice, articleSlice, categorySlice, tagSlice
├── types/interfaces/
│   ├── models.ts             # Article, Category, Tag, User interfaces
│   ├── states.ts             # Redux slice state shapes
│   └── common.ts             # Shared utility types
└── App.tsx                   # Router and route definitions
```

### API Layer

`axiosClient.ts` creates a single Axios instance shared by all services:
- **Base URL:** `process.env.REACT_APP_API_URL` (falls back to `https://homewiki.azurewebsites.net`)
- **Auth interceptor:** reads JWT from `localStorage('token')` and injects `Authorization: Bearer ...` on every request

Service classes (`ArticleService`, `CategoryService`, `TagService`) wrap `axiosClient` and return typed responses — no raw `axios` calls in page components.

### State Management

Four Redux Toolkit slices:

| Slice | State |
|---|---|
| `authSlice` | `{ user, loading, error, isAuthenticated }` — async thunks: `login`, `register` |
| `articleSlice` | Article list |
| `categorySlice` | Category list |
| `tagSlice` | Tag list |

Use the typed hooks from `src/redux/hooks.ts` — never bare `useSelector`/`useDispatch`.

### Custom Hooks

- **`useCategories`** — fetches all categories, manages loading/error state, exposes `refetch`
- **`useTags`** — same pattern for tags
- **`useAuth`** — currently returns a hardcoded mock user (auth is disabled, see below)

---

## Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `MainPage` | Landing / home |
| `/articles` | `Articles` | List with search and pagination |
| `/articles/:id` | `ArticleDetails` | Single article view |
| `/articles/:id/edit` | `EditArticle` | Edit form |
| `/articles/create` | `CreateArticle` | Create form |
| `/categories` | `Categories` | Category list |
| `/categories/:id` | `CategoryArticles` | Articles filtered by category |
| `/tags` | `Tags` | Tag list |
| `/tags/:id` | `TagArticles` | Articles filtered by tag |
| `/search` | `Search` | Global search |
| `*` | Redirect | → `/404` |

---

## Running Locally

```bash
npm install
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000).

By default it points to the Azure backend. To use a local or VPS backend, create a `.env` file in the project root:

```env
REACT_APP_API_URL=https://localhost:7001
```

> **Important:** `REACT_APP_API_URL` is baked into the JavaScript bundle at **build time**, not runtime. If you change it, you must run `npm run build` again — or rebuild the Docker image.

---

## Docker / VPS Deployment

The frontend is built with `npm run build` and served by nginx inside a Docker container. It is orchestrated from `docker-compose.yml` in the [`home-wiki-backend`](../home-wiki-backend) repository.

To rebuild with a specific API URL:

```bash
echo "REACT_APP_API_URL=https://wiki.yourdomain.com" > .env

docker compose -f /opt/home-wiki/home-wiki-backend/docker-compose.yml build wiki-frontend
docker compose -f /opt/home-wiki/home-wiki-backend/docker-compose.yml up -d
```

---

## Authentication Status

> Auth is currently **disabled and mocked**

- `src/hooks/useAuth.ts` — returns a hardcoded mock user; login/logout are no-ops
- `src/services/firebase.ts` — Firebase SDK is imported but fully stubbed (no real auth, Firestore, or storage)
- `authSlice` and JWT logic exist and are wired up, but the backend exposes no auth endpoints yet
- `PrivateRoute` component exists but is not used in routing

---

## Known Tech Debt

| # | Location | Issue |
|---|---|---|
| 1 | `Articles.tsx:60` | Azure URL hardcoded instead of using `axiosClient` |
| 2 | `src/pages/` | Duplicate files — `Articles.tsx` and `Article/Articles.tsx`; router uses the top-level ones |
| 3 | `package.json` | `redux-persist` listed as a dependency but not configured in the store |
| 4 | Various pages | Some components call `axios` directly instead of going through service classes |
| 5 | Auth | Infrastructure is wired up end-to-end but none of it performs real authentication |
