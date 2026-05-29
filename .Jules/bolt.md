# Bolt's Performance Journal

## 2025-05-15 - Optimize lookup performance and context memoization
**Learning:** Using `Array.includes()` for membership checks inside render loops or filters (e.g., checking if multiple problems are solved) creates O(N^2) complexity bottlenecks. Additionally, providing unmemoized object literals to Context Providers causes unnecessary app-wide re-renders on every state update.
**Action:** Always convert arrays to memoized `Set` objects for O(1) membership lookups in performance-critical paths. Memoize context provider values with `useMemo` and helper functions with `useCallback` to stabilize the component tree.
