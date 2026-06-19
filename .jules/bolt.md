## 2025-05-14 - Optimized Progress Tracking and Context Performance
**Learning:** In applications where many components check global state (e.g., solved problems), O(N) array lookups in render loops cause significant jank as user data grows. Additionally, unmemoized Context values trigger cascading re-renders across the entire app on any state update (like theme toggles).
**Action:** Use `useMemo` to maintain `Set` objects for O(1) ID lookups and always memoize Context provider values and functions to isolate re-renders.
