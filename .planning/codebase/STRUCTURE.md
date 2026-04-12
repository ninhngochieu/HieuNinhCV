# Project Structure

```text
HieuNinhCV/
├── .planning/                  # GSD Planning and Codebase Map
├── .gitnexus/                  # GitNexus Index Data
├── HieuNinhCV.AppHost/         # .NET Aspire Orchestrator
│   ├── AppHost.cs              # Service orchestration logic
│   └── ...
├── HieuNinhCV.Server/          # .NET Backend (Minimal API)
│   ├── Program.cs              # API Endpoints and Middleware
│   ├── PortfolioService.cs     # Logic for interacting with PocketBase/Mocks
│   └── ...
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── components/     # UI Components (PortfolioSection, etc.)
│   │   │   ├── globals.css     # Global styles
│   │   │   └── page.tsx        # Main Entry Point
│   ├── package.json
│   └── ...
├── pocketbase_data/            # Local PocketBase data (bind mounted)
├── scratch/                    # Temporary scripts and notes
└── CV.md                       # Raw CV content for reference
```
