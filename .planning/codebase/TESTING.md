# Testing Strategy

## Current State
- **Unit Testing**: 
  - Frontend: Jest is configured in `.esproj`.
  - Backend: No dedicated XUnit/NUnit project found in root.
- **Integration Testing**: Handled manually via Aspire Dashboard and Scalar API docs.
- **UAT**: Verified via browser interaction.

## Recommendations
- Add an `HieuNinhCV.Tests` project for backend service logic (especially `PortfolioService` fallback logic).
- Implement Playwright or Cypress for E2E testing of the Premium UI.
