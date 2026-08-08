# Project State

## Architecture
Frontend-only Next.js portfolio. Content lives in `frontend/src/data/portfolio.json`
(typed via `frontend/src/data/portfolio.ts`), seeded from the original PocketBase
records and read at build/SSR time. **No backend, no database, no runtime API calls.**

## Recent Changes
| Date | Task | Outcome |
|------|------|---------|
| 2026-08-08 | Pivot to frontend-only | ✅ Removed .NET Server + PocketBase; data served from local JSON |
| 2026-08-08 | Sync data from live PocketBase | ✅ portfolio.json matches PB (6 skill groups, 3 experience, 2 projects) |
| 2026-08-08 | Autoplan review + fixes | ✅ layout metadata, compose image, stale docs cleaned |

## Active Projects
- **HieuNinhCV**: Frontend-only portfolio (Next.js standalone, deployed as `hieuninhcv` image on zot registry).

## Known / Deferred
- `HieuNinhCV.AppHost` + `HieuNinhCV.slnx` retained but the Server reference is
  commented out (Server project removed). Aspire solution is not buildable as-is.
- PocketBase admin password should be rotated on the live instance (out of repo scope).
