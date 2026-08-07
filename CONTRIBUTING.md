# Contributing to FasterGPT

Thank you for contributing to FasterGPT. Keep changes focused, preserve native
ChatGPT behavior, and make performance features opt-in and non-destructive.

## Project Structure

```text
apps/
  extension/  WXT + React browser extension
  landing/    Astro static marketing site
packages/     Shared Turborepo configuration packages
```

The extension uses vertical feature modules under `apps/extension/modules/`.
The landing page follows the same approach under `apps/landing/src/modules/`.
Shared infrastructure belongs in each app's `core/`, `shared/`, or `styles/`
directories as appropriate.

## Getting Started

Requirements:

- Node.js 22.12 or newer
- npm 11.17 or newer

```bash
npm install

# Run all workspace development tasks
npm run dev

# Build every workspace
npm run build
```

For app-specific work:

```bash
cd apps/extension
npm run compile
npm run build

cd ../landing
npm run build
```

## Coding Standards

- Use TypeScript strict mode. Avoid `any`.
- Keep feature code within its module and expose public APIs through `index.ts`.
- Use React components only where client-side interactivity is required; keep the
  Astro landing page static by default.
- Preserve the four extension themes: Dark, Atom, Sky, and Ocean.
- Do not modify ChatGPT streaming behavior or destructively remove page content.
- Add or update documentation when architecture, behavior, or public APIs change.

## Pull Requests

1. Create a focused branch using `feat/`, `fix/`, `docs/`, `refactor/`, or `chore/`.
2. Make the smallest complete change.
3. Run the relevant compile and build commands.
4. Describe the behavior change and verification in the pull request.

Use Conventional Commit messages, for example:

```text
feat(performance): add mounted message metric
fix(landing): preserve selected theme on first paint
docs(extension): clarify optimization behavior
```
