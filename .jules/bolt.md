## 2025-01-24 - $O(1)$ State Lookups in Context
**Learning:** Using `Array.includes` in a global context for frequently accessed state (like "is this problem solved?") leads to $O(N \times M)$ complexity when rendering lists (e.g., Topics or Problem lists).
**Action:** Convert state arrays to memoized `Set` objects in the Context Provider to ensure $O(1)$ lookups for helper functions like `isSolved`.
