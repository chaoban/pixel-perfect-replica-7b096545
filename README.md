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

## Backend

Auth runs on our own Supabase project `baqyetqnolxuqzmxskpr` (Hair_booking_platform_001).
The client (`src/integrations/supabase/client.ts`) is created once and reads only:

| Variable | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://baqyetqnolxuqzmxskpr.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_…` (browser-safe, RLS-gated; replaces the old anon key) |

Set the same two variables in Vercel → Project → Settings → Environment Variables.

## Deploying to Vercel

Framework preset: **Vite** · Build command: `npm run build` · Output directory: `dist`.

`vercel.json` rewrites every path to `/index.html`, so deep links such as `/login`
and `/barbers` are handled by the client-side router instead of returning 404.
