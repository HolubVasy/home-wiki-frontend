# home-wiki-frontend

React 19 SPA frontend for a personal home management knowledge base.

## Tech Stack

| | |
|---|---|
| Framework | React 19, TypeScript |
| UI | Material UI v6 |
| State | Redux Toolkit 2.6 |
| Routing | React Router v7 |
| Forms | react-hook-form |
| HTTP | Axios with interceptor |

## Project Structure

```
src/
├── api/            # axiosClient.ts + service classes
├── components/     # Reusable: Article/, Category/, Tag/, Layout/, Sidebar/, Auth/
├── hooks/          # useAuth (mocked), useCategories, useTags
├── pages/          # Route-level components
├── redux/          # store.ts + slices/ (auth, articles, categories, tags)
├── services/       # firebase.ts (fully mocked)
├── types/          # TypeScript interfaces
└── App.tsx         # Router + routes
```

## Running Locally

```bash
npm install
npm start
```

By default the app points to the Azure backend (`https://homewiki.azurewebsites.net`).
To use a local or VPS backend, create a `.env` file:

```
REACT_APP_API_URL=https://localhost:7xxx
```

> **Note:** `REACT_APP_API_URL` is baked into the bundle at build time, not at runtime. If you change it, you must rebuild.

## Routes

| Path | Component |
|---|---|
| `/` | MainPage |
| `/articles` | Articles (search + pagination) |
| `/articles/:id` | ArticleDetails |
| `/articles/:id/edit` | EditArticle |
| `/articles/create` | CreateArticle |
| `/categories` | Categories |
| `/categories/:id` | CategoryArticles |
| `/tags` | Tags |
| `/tags/:id` | TagArticles |
| `/search` | Search |

## Redux

Four slices: `auth`, `articles`, `categories`, `tags`.
Use typed hooks from `src/redux/hooks.ts`: `useAppSelector`, `useAppDispatch`.

## Authentication

Auth is currently **disabled / mocked**:
- `src/hooks/useAuth.ts` returns a hardcoded mock user
- `src/services/firebase.ts` is fully stubbed
- Redux authSlice and JWT logic exist but the backend has no auth endpoints

## Docker / VPS Deployment

The frontend is built and served via nginx inside a Docker container.
It is orchestrated by `docker-compose.yml` in the `home-wiki-backend` repository.

To rebuild with a custom API URL:

```bash
# Set the correct URL before building
echo "REACT_APP_API_URL=https://wiki.yourdomain.com" > .env
docker compose -f /opt/home-wiki/home-wiki-backend/docker-compose.yml build wiki-frontend
docker compose -f /opt/home-wiki/home-wiki-backend/docker-compose.yml up -d
```

## Known Tech Debt

1. `Articles.tsx:60` — hardcoded Azure URL instead of `axiosClient`
2. Duplicate page files: `src/pages/Articles.tsx` vs `src/pages/Article/Articles.tsx` — router uses top-level ones
3. `redux-persist` in `package.json` but not wired up in the store
4. Some pages use raw `axios` instead of service classes
