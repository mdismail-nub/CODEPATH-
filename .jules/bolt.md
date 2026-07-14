## 2025-05-14 - Optimized Context and Dashboard lookups

**Learning:** Providing unmemoized object literals to React Context Providers causes unnecessary app-wide re-renders on every state change. Additionally, repeated O(N) array lookups in high-frequency paths (like the Dashboard heatmap or problem lists) cause measurable UI lag as the dataset grows.

**Action:** Always wrap Context Provider values in `useMemo` and helper functions in `useCallback`. Convert frequently searched arrays into `Set` objects for O(1) lookups.
