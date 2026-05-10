# Bolt's Journal - Critical Learnings

## 2025-05-14 - Initial Assessment
**Learning:** Found O(N*M) lookup patterns in component rendering where N is the number of topics and M is the number of solved problems. React Context is currently causing application-wide re-renders on any state change due to non-memoized provider value.
**Action:** Transition to Set-based lookups and comprehensive memoization of context and expensive components.
