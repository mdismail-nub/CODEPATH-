## 2025-05-14 - Optimized Context Lookups with Sets

**Learning:** Membership checks (`isSolved`, `isLessonCompleted`) using `.includes()` on arrays in a global React Context can lead to O(N^2) complexity during render loops as the number of problems/lessons grows.

**Action:** Use memoized Sets (`useMemo`) for O(1) lookups and combine them with `useCallback` and memoized context value objects to minimize unnecessary app-wide re-renders and stabilize function references.
