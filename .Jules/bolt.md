# Bolt's Performance Journal

## 2025-05-15 - O(1) Lookups and Context Memoization
**Learning:** React state often stores collections as arrays, but components frequently check for membership during render (e.g., `isSolved`, `isLessonCompleted`). Using `Array.includes()` inside render logic creates O(N) complexity. For large collections or high-frequency checks, this becomes a significant bottleneck. Additionally, providing unmemoized object literals to Context Providers causes unnecessary app-wide re-renders even when state hasn't changed.
**Action:** Always convert lookup arrays to memoized `Set` objects for O(1) performance. Stabilize Context values with `useMemo` and wrap state update functions in `useCallback` to ensure stable object references.
