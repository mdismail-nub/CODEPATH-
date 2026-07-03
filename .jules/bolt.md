## 2026-07-03 - [O(n) to O(1) Lookup Optimization]
**Learning:** In applications where global state arrays (like solved problem IDs) are frequently checked across many components (e.g., in lists or dashboards), linear search using `.includes()` leads to O(n) complexity in each check, which aggregates to O(n*m) during render loops.
**Action:** Always provide memoized `Set`-based lookup helpers in the context provider to ensure O(1) lookups for all consuming components.
