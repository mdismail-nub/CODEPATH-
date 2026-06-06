## 2026-06-06 - Optimized Context Lookups and Re-renders
**Learning:** Using `Array.includes` for frequent status lookups in high-frequency rendering components (like lists) creates O(N) bottlenecks. Additionally, unmemoized Context values cause full-app re-renders on any state change.
**Action:** Convert status arrays to memoized `Set` objects for O(1) lookups. Always memoize Context provider values and use `useCallback` for helper functions to maintain stable references.
