# Bolt's Performance Journal

## 2025-05-14 - Optimized Dashboard rendering and lookups
**Learning:** Found that `src/pages/Dashboard.tsx` was recalculating complex statistics (streak, heatmap, topics completed) on every render cycle. Additionally, nested loops were using `Array.includes()` for problem-solved checks, leading to $O(N^2)$ complexity in the worst case.
**Action:** Applied `useMemo` to cache derived data and introduced a `Set` for $O(1)$ lookups. Moved static calculations outside the component.
