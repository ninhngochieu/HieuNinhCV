# Architectural Concerns

## Technical Debt
- **PocketBase Coupling**: The backend is tightly coupled to PocketBase's API structure (`/api/collections/...`). If PocketBase changes, the backend breaks.
- **Mock Data**: Mock data is hardcoded in `PortfolioService.cs`. This should ideally be moved to external JSON files.
- **Hardcoded URLs**: PocketBase URL has a hardcoded production fallback in the code.

## Critical Risks
- **Deployment Complexity**: Aspire publishing with JavaScript apps can be sensitive to environments.
- **Observability**: While OpenTelemetry is present, logs are primarily console-based.

## Observations
- PocketBase instantiation in `AppHost.cs` is currently commented out. This indicates a shift towards using an external hosted instance or a pending migration to local containers.
