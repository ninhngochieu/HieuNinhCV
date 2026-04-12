# Concerns

## Technical Debt
- **Duplicated Models**: Frontend interfaces (`interface Bio`, `interface Skill`) are manually defined and not synchronized with backend DTOs. This risks runtime errors if the API schema changes.
- **PocketBase Orchestration**: The PocketBase container is currently commented out in `AppHost.cs`, suggesting it must be managed manually. This complicates the developer onboarding experience.

## Performance
- **Chatty Frontend**: `PortfolioSection` makes multiple concurrent `fetch` requests on mount. These could be aggregated into a single `/api/portfolio/all` call to reduce network overhead.
- **Hardcoded Styles**: Many styles are hardcoded in `style` props within `PortfolioSection.tsx` instead of being managed through CSS classes in `globals.css`.

## Data Management
- **Markdown Parsing**: Relying on custom parsing of `CV.md` as the source of truth is flexible but fragile. Changes in Markdown formatting could break the seeder.
- **Manual Backups**: Currently no automated backup strategy for the `pocketbase_data` directory.
