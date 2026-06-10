## 2026-06-10 - AppState and Dashboard Optimization
**Learning:** High-frequency lookup operations (like `isSolved` in problem lists) using `Array.includes` create significant O(N) overhead as user data grows. Additionally, providing unmemoized object literals to Context Providers causes app-wide re-renders even for small state changes.
**Action:** Always maintain `Set` versions of ID collections for O(1) lookups in high-frequency path and wrap Context values in `useMemo` to ensure stable references for consumers.
