## 2025-05-22 - [Algorithmic Efficiency: O(1) Lookups]
**Learning:** This codebase frequently performs linear searches ((N)$) on static data (TOPICS) and user state (solvedIds) inside render loops. By introducing hash maps for static data and a `Set` for dynamic state, we can significantly reduce rendering overhead in data-heavy components like Dashboard and Roadmap.
**Action:** Always check if frequently accessed array-based lookups can be converted to O(1) hash map or Set-based lookups.
