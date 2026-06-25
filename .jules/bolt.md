## 2026-06-25 - AppStateContext Memoization and Set Lookups
**Learning:** In applications using a global context for state, every consumer re-renders when the context value changes. Providing a non-memoized object to the Provider causes all consumers to re-render on every Provider render, even if the state they use hasn't changed. Additionally, frequent lookups in large arrays (like solved problem IDs) should use Sets for O(1) complexity.
**Action:** Always memoize context provider values and use Sets for membership checks in global state.
