# frontend-workbench

**Description:** 
A compact, production-style **web engineering lab** showcasing
**React + TypeScript** components, runtime utilities, **Testing Library** and UI
patterns/concepts. The goal is to practice accessible UI behaviors, performance
techniques, and robust client logic—organized like real code you’d ship.

---

## What’s inside

- **`app/`**  
  Next.js **App Router** routes and tiny demo pages that showcase components
  and utilities in realistic contexts. Keep pages minimal.

- **`components/`**  
  Reusable UI units with **accessibility-first** behavior (roles, labels,
  roving tabindex, keyboard, focus management). Prefer controlled APIs and
  keep any data fetching outside.

- **`hooks/`**  
  Small, focused UI hooks (e.g., debounced value, keyboard navigation,
  roving-focus helpers). Hooks should be side-effect aware and well-scoped.

- **`utils/`**  
  **Pure runtime helpers** (e.g. fetch with Abort + retry, window/virtualization
  math, data transforms). No React imports; everything unit-testable.

- **`*.test.ts files`**  
  **Behavior-first** tests (Jest + Testing Library). Query by
  role/name/label; assert visible behavior, not DOM structure.

- **`notes/`**  
  General, write-ups: *what / why / trade-offs* for patterns.
  One markdown per topic exists too.

---

## Tech stack

- **Framework:** Next.js
- **UI runtime:** React, TypeScript
- **Testing:** Jest, React Testing Library
- **Styling:** Tailwind CSS, shadcn

---

## Quick start

```bash
pnpm i
pnpm dev
pnpm test
```

---

## License

MIT — use any pieces in your own projects.