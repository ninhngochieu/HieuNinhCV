# Technology Stack

## Frontend (webfrontend)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS with CSS Variables and Glassmorphism effects.
- **Icons**: Lucide React (referenced in previous conversations and common in this setup).

## Backend (server)
- **Runtime**: [.NET 10](https://dotnet.microsoft.com/)
- **Framework**: ASP.NET Core Minimal APIs
- **Documentation**: [Scalar](https://scalar.com/docs/dotnet/scalar) for OpenAPI interactive documentation.
- **Telemetry**: OpenTelemetry for Logging, Metrics, and Tracing.

## Database & CMS
- **Platform**: [PocketBase](https://pocketbase.io/)
- **Storage**: SQLite (internal to PocketBase) with persistent storage in `/pocketbase_data`.

## Orchestration
- **Platform**: [.NET Aspire](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview)
- **Functions**: Service discovery, environment variable management, and local development dashboard.
