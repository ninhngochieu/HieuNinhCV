# Integrations

## .NET Aspire
The backbone of the application's local development lifecycle.
- **Service Discovery**: Allows `webfrontend` to find `server` without hardcoded URLs.
- **Orchestration**: Manages the startup and lifecycle of the frontend and backend services.
- **Environment Management**: Passes `SERVER_HTTP` and `PORT` variables between services.

## Next.js Proxy (Rewrites)
Configured in `next.config.ts` to route all `/api/:path*` requests to the .NET Server.
- Enables the use of relative paths in frontend `fetch` calls.
- Simplifies CORS management.

## PocketBase Service
- **Status**: Integrated as a data source for the .NET Server.
- **Data Synchronization**: A seeder mechanism (managed by the Server) syncs content from the local `CV.md` into PocketBase collections.
- **API**: The Server communicates with PocketBase via its REST API (using `PocketBaseClient` or direct `HttpClient`).

## Scalar OpenAPI
- Integrated into the .NET Server.
- Accessible at `/scalar/v1` (typical default) to test and document backend endpoints.

## Infisical (Secrets Management)
- **Status**: Integrated into the .NET Server.
- **Role**: Secure storage and retrieval of environment-specific secrets (e.g., PocketBase credentials, API keys).
- **Environment Awareness**: Automatically switches between `dev`, `staging`, and `prod` secrets based on the ASP.NET Core environment.
