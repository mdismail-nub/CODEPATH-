## 2025-05-22 - [Optimizing solvedIds Lookups]
**Learning:** Lookups in `stats.solvedIds` (an array) are O(N), where N is the number of solved problems. Since these lookups happen frequently in rendering (e.g., in loops over topics and problems), converting `solvedIds` to a `Set` in the application state or using a memoized Set provides O(1) lookups and significantly improves rendering performance.
**Action:** Use `Set` for membership checks of solved problem IDs.
