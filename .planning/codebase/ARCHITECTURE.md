# Architecture

## System Overview
The project is a **Full-Stack Portfolio** application managed as a **Distributed Application** using .NET Aspire.

### Components
1. **AppHost (`HieuNinhCV.AppHost`)**: The orchestrator. It manages the lifecycle of the frontend, backend, and (optionally) infrastructure like PocketBase.
2. **Backend (`HieuNinhCV.Server`)**: A .NET 10 Minimal API project. It acts as a Domain-Specific Gateway. It provides a clean API for the frontend and handles communication with PocketBase. It includes fallback mock data for resilience.
3. **Frontend (`frontend`)**: A Next.js 15 application. It consumes the backend API to render the static/dynamic portfolio content. Highly visual and "Premium" design focus.
4. **Data Store (`PocketBase`)**: An external or containerized BaaS providing Auth, DB, and File storage.

## Execution Flow
1. User requests frontend.
2. Frontend fetches data from the .NET Backend (`/api/portfolio/*`).
3. .NET Backend fetches data from PocketBase or returns Mock data if PocketBase is unreachable.
4. Data is rendered on the UI.

## Deployment Strategy
- Likely containerized via Docker.
- Orchestrated locally via .NET Aspire.
- Published with container files (`server.PublishWithContainerFiles(webfrontend, "wwwroot")`).
