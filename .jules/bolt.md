# Bolt's Journal - Critical Learnings

## 2025-05-14 - Initial Assessment
**Learning:** Found O(N*M) lookup patterns in component rendering where N is the number of topics and M is the number of solved problems. React Context is currently causing application-wide re-renders on any state change due to non-memoized provider value.
**Action:** Transition to Set-based lookups and comprehensive memoization of context and expensive components.

## 2025-05-15 - Redundant Calculations in Dashboard
**Learning:** `Dashboard.tsx` and `RoadmapPage.tsx` were re-calculating complex stats (streaks, heatmap, topic progress) on every render using O(N) `includes()` checks, despite having access to an O(1) `isSolved` helper and stable `stats` object.
**Action:** Memoize derived statistics with `useMemo` and standardize on `isSolved` for O(1) lookups to prevent UI lag on large datasets.
