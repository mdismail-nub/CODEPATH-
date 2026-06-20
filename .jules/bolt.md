## 2026-06-20 - Memoization and O(1) Lookups in App State
**Learning:** The application currently performs O(N) array scans for problem and lesson completion checks across multiple components. Additionally, the core AppStateContext provider value is not memoized, causing global re-renders on any state change (e.g., theme toggle).
**Action:** Implement memoized Sets for O(1) lookups and use useMemo/useCallback to stabilize the context value and expensive filtering logic.
