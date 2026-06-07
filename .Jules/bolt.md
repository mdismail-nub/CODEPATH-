# Bolt Performance Journal

## 2025-05-14 - Context Re-render and Lookup Bottleneck
**Learning:** Providing unmemoized object literals to React Context Providers causes unnecessary app-wide re-renders. Additionally, using `Array.includes()` for frequent status checks (like `isSolved`) in a growing collection is an O(N) operation that degrades performance as user progress increases.
**Action:** Always wrap context values in `useMemo` and use `Set` for O(1) lookups of unique IDs. Memoize all helper functions with `useCallback` to maintain stable references for consumers.
