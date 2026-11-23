# 理髮預約平台 (Barberly)

A Vite + React single-page app with client-side routing (react-router-dom) and Supabase auth.

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page |
| `/login` | Sign in / sign up (Customer or Barber) |
| `/barbers` | Signed-in home (redirects to `/login` when signed out) |

## Development

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # outputs dist/
npm run preview
npm test
```

Environment variables (see `.env`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.

## Deploying to Vercel

Framework preset: **Vite** · Build command: `npm run build` · Output directory: `dist`.

`vercel.json` rewrites every path to `/index.html`, so deep links such as `/login`
and `/barbers` are handled by the client-side router instead of returning 404.
