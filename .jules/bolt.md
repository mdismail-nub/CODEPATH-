# Bolt's Performance Journal

This journal tracks critical performance-related learnings in the CodePath codebase.

## 2025-05-15 - Initial Audit
**Learning:** Found O(n) lookups in the core `AppStateContext` for `isSolved` and `isLessonCompleted` checks, which are used extensively across the app (TopicDetail, CoursePage, LessonPage). Additionally, the context provider value is not memoized, causing all consuming components to re-render whenever any state (even unrelated) changes.
**Action:** Implement Set-based lookups and memoize the context value/functions.
