# Implementation Plan: Portfolio with PocketBase & Scalar

## Phase 1: Infrastructure (PocketBase & Aspire)
- [ ] Add PocketBase container to `AppHost.cs`.
- [ ] Configure volume persistence for PocketBase (optional but recommended).
- [ ] Expose PocketBase URL to `HieuNinhCV.Server`.

## Phase 2: API Enhancement (ASP.NET Core)
- [ ] Add `Scalar.AspNetCore` NuGet package.
- [ ] Add PocketBase .NET Client (or use `HttpClient` with a simple wrapper).
- [ ] Implement `IPortfolioService` and Controller.
- [ ] Configure Scalar UI in `Program.cs`.

## Phase 3: Frontend (Next.js)
- [ ] Update `WeatherSection` logic/UI to a `Portfolio` showcase.
- [ ] Add "Contact Me" form component.
- [ ] Style with premium Glassmorphism theme (expanding on current `globals.css`).

## Phase 4: Verification
- [ ] Verify API documentation at `/scalar/v1`.
- [ ] Verify data flow from PocketBase -> API -> Frontend.
