# Bolt's Journal - Critical Learnings

## 2026-06-27 - Optimization of AppStateContext and TopicCard
**Learning:** Found that `AppStateContext` was causing unnecessary re-renders in all consumer components because the provider value was not memoized. Additionally, lookups for solved problems and completed lessons were O(N) using `includes()` on arrays, which scaled poorly in `TopicCard` (O(P*N) where P is problems in a topic).
**Action:** Use `useMemo` for Set-based lookups and memoize the context provider value and functions to improve performance and prevent redundant renders.
