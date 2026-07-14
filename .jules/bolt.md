## 2025-05-15 - Date Memoization in Dashboard
**Learning:** Memoizing date-based calculations (streaks, heatmaps) that depend on `new Date()` inside a `useMemo` block creates a dependency on the system clock that won't refresh until the state changes. While this is acceptable for long-running sessions in a coding app, it's a trade-off between absolute "real-time" accuracy and render performance.
**Action:** Prioritize render efficiency for UI-only updates (like theme toggles) by memoizing these blocks, accepting that the 'current date' remains stable until the next data update.
