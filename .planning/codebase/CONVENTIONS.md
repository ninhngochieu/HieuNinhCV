# Conventions

## Coding Standards

### .NET (C#)
- **Style**: Minimal APIs for routing.
- **Features**: Use file-scoped namespaces, primary constructors (where applicable), and modern C# 13+ features.
- **DI**: Use `IServiceCollection` extensions to keep `Program.cs` clean.

### Frontend (TypeScript/React)
- **Components**: Functional components with hooks (`useState`, `useEffect`).
- **Styling**: Vanilla CSS with CSS Variables for theme tokens. Prefer glassmorphism (`backdrop-filter: blur`).
- **Data Fetching**: Prefer async/await and standard `fetch`.

## Naming Conventions
- **C#**: PascalCase for classes, methods, and public properties. camelCase for private fields (with `_` prefix).
- **TypeScript**: PascalCase for Components and Types. camelCase for variables and hooks.
- **Files**: kebab-case for CSS and assets; PascalCase for React components.

## Content Management
- **Source of Truth**: All personal data should be kept in `CV.md`.
- **Synchronization**: Use the automated seeder to push `CV.md` updates to the database.
- **Language**: All public-facing content must be in English.
