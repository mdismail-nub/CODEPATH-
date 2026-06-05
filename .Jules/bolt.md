## 2026-06-05 - State Lookup and Context Memoization
**Learning:** In applications with global state containing large arrays (e.g., solved problems, completed lessons), using `Array.includes()` during render cycles leads to O(N) complexity per item. Converting these to memoized `Set` objects ensures O(1) lookups. Additionally, providing unmemoized objects to React Context causes app-wide re-renders on any state change.
**Action:** Always memoize context values and use `Set` for membership checks in high-frequency paths.
