# Testing

## Status
The project currently relies on manual verification and developer-driven testing. No automated test projects (`xUnit`, `Jest`, `Playwright`) are currently initialized in the solution.

## Manual Testing Workflow

### Backend API
- **Scalar**: Developers use the integrated Scalar UI at `/scalar/v1` to verify endpoint responses and schema correctness.
- **HTTP Files**: `HieuNinhCV.Server.http` contains sample requests for quick testing inside the IDE.

### Frontend
- **Browser DevTools**: Used for auditing layout, console errors, and network request rewrites.
- **Next.js Dev Server**: Provides hot-reloading for rapid UI iteration.

## Recommended Next Steps
1. **Integration Tests**: Add a .NET Test project to verify the Seeder logic and API responses.
2. **E2E Tests**: Implement Playwright or Cypress to verify the full user flow from the frontend to the database.
3. **Unit Tests**: Test data parsing logic for `CV.md`.
