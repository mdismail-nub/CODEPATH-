## 2025-05-15 - Progress Lookup Optimization
**Learning:** The application performs frequent progress checks (isSolved) across many components (Dashboard, TopicDetail, LessonPage). Using `stats.solvedIds.includes(id)` results in O(N) lookup time, which becomes expensive in nested loops like the Dashboard's topic mastery calculation (O(Topics * Problems * Solved)).

**Action:** Implement memoized `Set` objects (`solvedSet`, `completedLessonsSet`) in `AppStateContext` to provide O(1) lookups. Memoize derived calculations in `Dashboard.tsx` to prevent redundant O(T*P) operations on every render (e.g., during theme toggles).
