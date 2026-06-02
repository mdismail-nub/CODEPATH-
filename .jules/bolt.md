## 2025-05-15 - Context Memoization Pitfalls
**Learning:** Even with `useMemo` on a context value, missing `useCallback` on a single helper function (like a simple theme toggler) will invalidate the memoization on every render of the provider, causing all consumer components to re-render.
**Action:** Always wrap ALL functions provided in a Context in `useCallback`, regardless of how simple they are, to ensure the `useMemo` dependency array for the context value remains stable.

## 2025-05-15 - Lookup Performance Scale
**Learning:** In a codebase with ~300+ items (like coding problems), O(N) array lookups (e.g., `stats.solvedIds.includes(id)`) in high-frequency paths like `isSolved` helpers cause measurable degradation when called during list rendering.
**Action:** Convert tracking arrays to `Set` objects within providers to provide O(1) lookup helpers to the rest of the application.
