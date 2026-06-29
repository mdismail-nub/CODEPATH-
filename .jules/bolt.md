## 2026-06-29 - Context Provider Memoization
**Learning:** In a large application where the AppStateContext is consumed by 30+ components, failing to memoize the context value causes every consumer to re-render on any state change (e.g., theme toggle).
**Action:** Always wrap the context provider's value in `useMemo` and its methods in `useCallback`. Use Set-based lookups (O(1)) for frequently accessed data like solved problem IDs.
