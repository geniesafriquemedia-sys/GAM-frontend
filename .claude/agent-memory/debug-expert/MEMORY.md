# Debug Expert Memory

Key patterns and findings from past debugging sessions. See topic files for details.

## Hydration Errors

- `new Date().getFullYear()` called directly in Client Component render bodies causes React hydration
  mismatch #418 when the component is rendered in a Radix UI portal (Sheet/Dialog). Fix: `useState(null)`
  + `useEffect(() => setYear(new Date().getFullYear()), [])`. Render `{year ?? ''}`.
- `format(date, "HH:mm")` from date-fns uses LOCAL timezone. Server (UTC) vs browser (user TZ) produces
  different strings — hydration mismatch. Fix: use `getUTCHours()`/`getUTCMinutes()` directly, or
  `toLocaleTimeString('en-GB', { timeZone: 'UTC' })`.
- `toLocaleDateString('fr-FR')` can differ between Node ICU and browser — prefer UTC-based formatting for
  any date/time displayed during SSR. See `patterns.md`.
- Affected files: `Footer.tsx`, `Header.tsx` (MobileNav), `ContinuousInfo.tsx`.

## Image Optimization (next/image)

- `contentDispositionType: 'attachment'` in `next.config.ts` forces image responses to download rather
  than display inline — change to `'inline'` for a media site.
- `/_next/image` returns 400 when the upstream image URL (e.g. Supabase) no longer exists. The
  `remotePatterns` config is NOT the cause — the upstream fetch failing is.
- `getMediaUrl()` in `src/lib/api/config.ts`: line 112 (`startsWith('http')`) correctly handles absolute
  Supabase/Cloudinary URLs without double-prefixing.
- Old Supabase `external_image_url` values in Article model cause 400s after migration to Cloudinary.
  Backend fix: run `migrate_to_cloudinary` or clear stale `external_image_url` fields.

## Component Architecture

- `Footer.tsx` had no `'use client'` but is imported directly (not as `children`) into `LayoutWrapper`
  (`'use client'`), making it a Client Component. Added `'use client'` explicitly for clarity.
- `PWASplashScreen.tsx` is safe: its content with `new Date()` is guarded by `if (!isStandalone || !isLoading) return null` — never reaches SSR render path.
- `PWAInstallPrompt.tsx` lines 133-134 (`typeof window !== 'undefined'` checks) are safe because they
  are only reached when `showPrompt === true`, which only happens after `useEffect`.

## Useful File Paths

- `D:/GAM-full/GAM-frontend/next.config.ts` — image remotePatterns, contentDispositionType
- `D:/GAM-full/GAM-frontend/src/lib/api/config.ts` — getMediaUrl(), API_BASE_URL, MEDIA_BASE_URL
- `D:/GAM-full/GAM-backend/apps/editorial/models/article.py` — Article.image_url property
- `D:/GAM-full/GAM-backend/apps/editorial/serializers.py` — image_url serialization

See `patterns.md` for detailed patterns.
