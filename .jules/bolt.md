## 2025-05-14 - App-wide context re-renders
**Learning:** The `AppStateContext` was being consumed by over 30 components without memoization of the provider value. This caused any state change (like XP updates or theme toggles) to re-render a significant portion of the component tree.
**Action:** Always memoize the context provider value and all exported functions in global state providers to prevent cascading re-renders. Use Set-based lookups for collection checks (e.g., `isSolved`) to maintain O(1) performance as the user data grows.
