## 2025-05-15 - Context Value Memoization & Set Lookups
**Learning:** Providing unmemoized object literals to React Context Providers causes unnecessary app-wide re-renders. Converting array membership checks (`.includes()`) to Set lookups (`.has()`) improves complexity from O(N) to O(1), which is critical for lists.
**Action:** Always wrap context provider values in `useMemo` and use stable `useCallback` references for functions. Derive Sets for O(1) membership checks of frequently queried state.
