# Bolt's Performance Journal ⚡

## 2025-05-15 - [Anti-pattern] Unmemoized Global Context & O(N) Lookups
**Learning:** Providing a raw object literal to a Context Provider causes all consumer components to re-render on every state update, even if the specific slice of state they consume hasn't changed. Additionally, performing membership checks (e.g., `array.includes(id)`) in render loops or frequently called context helpers leads to O(N) complexity which degrades as user data grows.
**Action:** Always memoize Context Provider values using `useMemo` and helper functions with `useCallback`. Use `Set` for O(1) membership lookups of IDs when data sets can grow significantly.
