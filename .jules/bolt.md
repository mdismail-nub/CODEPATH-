## 2025-05-28 - [Optimized AppStateContext for O(1) lookups and stable references]
**Learning:** React Context is a powerful tool, but providing unmemoized object literals or non-stable function references triggers app-wide re-renders. Additionally, using array-based lookups (`.includes()`) for frequent membership checks in render loops becomes a bottleneck (O(N)) as data size increases.
**Action:** Always memoize the context provider value with `useMemo`, wrap helper functions in `useCallback`, and utilize memoized `Set` objects for O(1) membership lookups to maintain performance at scale.
