## 2025-05-15 - [React Context & O(1) Lookups]
**Learning:** React Context providers without memoized values cause all consumers to re-render on any state change. Additionally, using `Array.includes()` for membership checks in render loops or large calculations creates O(N) bottlenecks.
**Action:** Always wrap context values in `useMemo` and provide O(1) lookup helpers (using memoized `Set` instances) instead of raw arrays for membership checks.
