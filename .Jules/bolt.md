## 2025-05-15 - Optimizing State Lookups and Memoization
**Learning:** Converting array-based membership checks (`.includes()`) to `Set` lookups (`.has()`) inside a React context provides O(1) performance for every consuming component. Memoizing the context value itself is essential to prevent unnecessary app-wide re-renders when state updates occur.
**Action:** Always prefer `Set` for frequent lookup operations in state and wrap context provider values in `useMemo`.
