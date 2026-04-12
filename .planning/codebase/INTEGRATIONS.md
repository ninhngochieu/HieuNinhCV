# Integrations

## Internal Service Communication
- **Aspire Service Discovery**: Used to resolve service addresses (e.g., `webfrontend` to `server`).
- **HttpClient**: Backend (`HieuNinhCV.Server`) communicates with PocketBase via `HttpClient`.
- **Environment Variables**: Aspire passes configurations (like `SERVER_HTTP`) to the frontend.

## External Services
- **PocketBase**: 
  - Acts as the primary data store and back-office UI.
  - Hosted at `https://pocketbase.ninhngochieu.online` (configurationFallback).
  - Used for Bio, Projects, Skills, Experience, and Education data.

## Tooling & Observability
- **OpenTelemetry**: Integrated in the backend for tracing and metrics.
- **Scalar**: Replaces Swagger/Redoc for interactive API documentation in the backend.
- **GitNexus**: Used for code intelligence and impact analysis.
