# CareerCanvas AI

CareerCanvas AI is a production-ready, local-first web foundation for building premium career planning experiences.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS (v4)
- shadcn/ui-style component foundation
- Framer Motion
- Lucide React
- React Hook Form + Zod
- Chart.js
- html2pdf.js
- next-themes (dark/light)

## Project Structure

```text
src/
  app/                    # App Router entrypoints (layout, page, loading, error, 404)
  components/
    layout/               # Navbar, Sidebar, Footer, AppShell
    loading/              # Reusable loading skeletons
    providers/            # Global providers (theme)
    ui/                   # Reusable primitive UI components
  features/
    home/                 # Home feature module
  hooks/                  # Shared hooks
  lib/                    # Utilities
  types/                  # Shared types
```

## Features Included

- Glassmorphism-inspired premium UI shell
- Reusable Navbar, Sidebar, Footer
- Theme toggle with system/light/dark support
- Loading skeletons for App Router loading states
- Custom error boundary page
- Custom 404 page
- LocalStorage preference persistence (no backend/database)
- Chart.js readiness visualization + PDF export with html2pdf.js

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Commands

```bash
npm run lint
npm run build
```
