## 2025-05-19 - [Performance Optimization with Sets and Memoization]
**Learning:** Using `Set` for lookups in React state (like `solvedIds`) significantly improves performance when those lookups happen frequently across the UI (e.g., in lists or dashboard stats). Memoizing the context value prevents unnecessary re-renders of the entire application when only a specific piece of state changes.
**Action:** Always prefer `Set` for membership checks and memoize context providers that wrap many components.
