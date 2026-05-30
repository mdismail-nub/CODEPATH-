## 2025-05-14 - Context Provider Stability and Set-based Lookups
**Learning:** Providing an unmemoized object literal as a React Context value causes all consumers to re-render whenever the provider's parent re-renders, even if the state hasn't changed. Additionally, frequent membership checks using `.includes()` on arrays can become a bottleneck (O(N)) as user data grows.
**Action:** Always memoize the Context `value` object with `useMemo` and its methods with `useCallback`. Convert arrays to memoized `Set` objects for O(1) membership lookups (e.g., `isSolved`, `isCompleted`).
