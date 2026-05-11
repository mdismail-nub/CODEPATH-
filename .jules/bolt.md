# Bolt's Journal - Critical Learnings

## 2025-05-14 - Initial Assessment
**Learning:** Found O(N*M) lookup patterns in component rendering where N is the number of topics and M is the number of solved problems. React Context is currently causing application-wide re-renders on any state change due to non-memoized provider value.
**Action:** Transition to Set-based lookups and comprehensive memoization of context and expensive components.

## 2025-05-15 - O(1) Lookups and Memoization
**Learning:** Large static data arrays (TOPICS) were causing O(N) overhead in almost every page component due to repeated `.find()` calls. Dashboard was particularly heavy due to O(154) heatmap calculations on every render.
**Action:** Exported hash maps from data layer for instant lookups and implemented comprehensive memoization for all O(N) derived state.
