# Bolt's Performance Journal ⚡

## 2025-05-15 - Dashboard Memoization and Data Structure Optimization
**Learning:** The `Dashboard` component was performing multiple O(N) and O(T*P*S) operations on every render, including history processing, streak calculation, and heatmap generation. Furthermore, `topicsCompleted` was using `stats.solvedIds.includes()` inside an `.every()` call, leading to cubic complexity relative to the number of topics, problems, and solved IDs.
**Action:** Use `useMemo` for all derived statistics and status lookups. Convert arrays to `Set` for O(1) lookups in components with large datasets to ensure O(N) complexity instead of O(N^2) or higher. Move static computations and helper functions outside the component to avoid recreation.
