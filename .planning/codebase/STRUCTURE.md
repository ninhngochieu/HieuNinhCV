# Project Structure

## Root
- `CV.md`: Profile content (Source of Truth).
- `STATE.md`: Log of completed tasks and current project status.
- `AGENTS.md / CLAUDE.md`: Agent configuration and rules.
- `HieuNinhCV.slnx`: Visual Studio solution file listing all projects.

## .planning / .agent
- `.planning/codebase/`: Current project documentation (this folder).
- `.planning/quick/`: Records of one-off tasks.
- `.agent/skills/`: Custom toolsets for the GSD workflow.

## HieuNinhCV.AppHost
The entry point for the .NET Aspire application.
- `AppHost.cs`: Defines project references and environment variables.

## HieuNinhCV.Server
The .NET 10 backend server.
- `Program.cs`: API route definitions and service configuration.
- `PortfolioService.cs`: Business logic for portfolio data management.
- `Extensions.cs`: Dependency injection and helper methods.

## frontend
The Next.js 16 application.
- `src/app/`: Next.js App Router root.
- `src/app/components/`: Reusable React components (`PortfolioSection`, `WeatherSection`).
- `public/`: Static assets like images and global CSS.

## pocketbase_data
Contains the `pb_data` folder for PocketBase persistence.

## scratch
Temporary folder for experimentation scripts, schema exports, and JSON drafts.
