# OdoShield Insights

OdoShield Insights is a Vite + React + TypeScript dashboard for vehicle fraud analysis, mileage verification, trust certificates, and graph-based ring detection. The current implementation is UI-first and uses mocked data in several places, with clear integration points marked for TigerGraph-backed APIs.

This README is intended to help contributors set up the project locally, understand the codebase structure, and make changes without guesswork.

## What This App Contains

The application is organized around a small set of focused screens:

- Dashboard: summary stats, fraud cluster visualization, flagged vehicles, and risk distribution.
- Vehicle Lookup: searchable table of vehicles with risk and status filtering.
- Vehicle Report: detailed fraud probability view for a single VIN.
- Fraud Rings: graph-style visualization of detected fraud clusters.
- Trust Certificate: trust score, verification progress, and resale impact summary.
- Settings: profile, alert preferences, detection thresholds, and database status.

Most screens currently use mock data. The code already includes TODO comments that describe where TigerGraph queries should replace those mocks.

## Tech Stack

- Vite for the build tool and dev server.
- React 18 with TypeScript.
- React Router for route-based navigation.
- TanStack Query for data fetching/state management.
- Tailwind CSS for styling.
- shadcn/ui-style component primitives in `src/components/ui`.
- Vitest and Testing Library for unit tests.
- Playwright configuration is present for browser tests, although no project script has been added yet.

## Repository Layout

The most important folders are:

- `src/App.tsx`: application shell, providers, and route definitions.
- `src/pages/`: page-level screens for each route.
- `src/components/`: shared layout components such as the header, sidebar, and app shell.
- `src/components/ui/`: reusable UI primitives generated in the shadcn style.
- `src/lib/`: shared helpers such as `utils.ts`.
- `src/hooks/`: reusable React hooks.
- `src/test/`: Vitest setup and example test.

Key files outside `src`:

- `vite.config.ts`: Vite config, alias setup, and dev server configuration.
- `tailwind.config.ts`: Tailwind theme tokens and custom colors.
- `components.json`: shadcn/ui configuration and path aliases.
- `vitest.config.ts`: test runner configuration.
- `playwright.config.ts`: browser test configuration.
- `eslint.config.js`: linting rules.

## Local Setup

### Prerequisites

- Node.js 20 or newer is recommended.
- npm is the safest default package manager for this repository because the project already includes a `package-lock.json`.
- You should use a single package manager consistently for a branch. If you switch between npm and Bun, do so intentionally so the lockfiles do not drift.

### Install Dependencies

From the repository root:

```bash
npm install
```

If you prefer Bun, install with Bun instead and keep that workflow consistent within your branch:

```bash
bun install
```

### Start the Development Server

Run the app locally with:

```bash
npm run dev
```

The Vite dev server is configured to run on port `8080`. Open the URL printed in the terminal after startup.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Lint the Codebase

```bash
npm run lint
```

### Run Unit Tests

```bash
npm run test
```

For watch mode during development:

```bash
npm run test:watch
```

## Scripts

The following scripts are defined in `package.json`:

- `dev`: starts the Vite dev server.
- `build`: creates an optimized production build.
- `build:dev`: builds using the development mode flag.
- `preview`: serves the production build locally.
- `lint`: runs ESLint across the project.
- `test`: runs Vitest once.
- `test:watch`: runs Vitest in watch mode.

## How The App Is Wired

The app shell is intentionally simple and centralized:

- `src/main.tsx` mounts the React application.
- `src/App.tsx` wraps the app with `QueryClientProvider`, `TooltipProvider`, toast providers, and `BrowserRouter`.
- `src/components/AppLayout.tsx` provides the persistent sidebar, header, and page outlet.
- `src/components/AppSidebar.tsx` defines the main navigation entries.
- `src/components/AppHeader.tsx` contains the top search bar and action buttons.

The route map is currently:

- `/` → Dashboard.
- `/lookup` → Vehicle Lookup.
- `/report/:vin` → Vehicle Report.
- `/fraud-rings` → Fraud Rings.
- `/certificate` → Trust Certificate.
- `/settings` → Settings.

## Styling And UI Conventions

The UI is built with Tailwind CSS and a custom dark theme defined in `src/index.css` and `tailwind.config.ts`.

Important conventions:

- Use the existing semantic CSS variables such as `--primary`, `--odo-verified`, `--odo-warning`, and `--odo-fraud`.
- Prefer the shared layout and glass-card patterns already used in the app.
- Keep new components consistent with the existing motion style, but avoid adding animation unless it improves clarity.
- Use the `@/` path alias for imports from `src`.

If you are adding a new shadcn-style component, check `components.json` first so the path aliases and Tailwind setup stay consistent.

## Testing Guidance

The current test setup is intentionally lightweight, but contributors should still validate changes before opening a pull request.

Recommended checks:

1. Run `npm run lint` to catch TypeScript and React hook issues early.
2. Run `npm run test` to make sure existing unit tests still pass.
3. Run `npm run build` before merging significant UI or routing changes.

`playwright.config.ts` and `playwright-fixture.ts` are already present, so browser-level tests can be added without reworking the project setup. There is no dedicated Playwright script in `package.json` yet, so add one before relying on end-to-end runs.

## Working On The Codebase

The repository is currently structured around mock data, but the code clearly marks future backend integration points. When contributing, keep these areas in mind:

- `src/pages/Dashboard.tsx`: summary cards, fraud cluster map, suspicious centers, flagged vehicles, and risk distribution.
- `src/pages/VehicleLookup.tsx`: client-side search and filtering over vehicle records.
- `src/pages/VehicleReport.tsx`: per-VIN reporting with a fraud probability gauge and verification timeline.
- `src/pages/FraudRings.tsx`: selectable fraud cluster graphs and summary statistics.
- `src/pages/Certificate.tsx`: trust certificate and verification details.
- `src/pages/Settings.tsx`: user preferences and mock database status.

Several of these files contain explicit `TigerGraph Integration` TODO comments. If you start replacing mock data with API calls, update the README and add any required environment variables or setup notes at the same time.

## Contribution Guide

Use this workflow when making a change:

1. Start from a clean branch.
2. Read the relevant page or component files before editing so you understand the existing patterns.
3. Make the smallest change that solves the problem.
4. Keep the styling aligned with the current design system.
5. Run lint, tests, and a production build before submitting.
6. Include screenshots or short notes in your pull request if the change affects the UI.

### Suggested Branching Flow

- `feature/<short-description>` for new UI or functionality.
- `fix/<short-description>` for bug fixes.
- `docs/<short-description>` for documentation-only work.

### Pull Request Checklist

- The app still runs with `npm run dev`.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- New routes or components are documented when relevant.
- Any mock data replacement is described clearly.

### Commit Message Advice

Keep commit messages short and specific, for example:

- `docs: expand setup instructions`
- `feat: add vehicle status filter`
- `fix: align report gauge layout`

## Troubleshooting

- If the app does not start, confirm that dependencies are installed and that you are running the command from the repository root.
- If the dev server opens on a different port, check the Vite config in `vite.config.ts`; the project is configured for port `8080`.
- If imports using `@/` fail, verify that your editor and tooling are reading the TypeScript and Vite alias configuration.
- If Tailwind classes do not apply as expected, check that the file is inside the configured `content` paths in `tailwind.config.ts`.
- If you add a new test environment dependency, make sure `src/test/setup.ts` still initializes the required globals.

## Current Status

The app is functional as a front-end prototype, but several screens are still data-driven mocks. The codebase is ready for contributors to:

- swap in TigerGraph queries,
- extend the dashboard and report views,
- add better tests,
- and refine the navigation and settings flows.

If you add backend integration, document the API shape, required credentials, and local environment setup in this README before merging.
