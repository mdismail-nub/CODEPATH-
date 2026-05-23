## 2025-05-23 - Context Memoization and O(1) Lookups
**Learning:** React context providers that pass down an object literal as `value` cause all consumers to re-render whenever the provider itself re-renders, even if the state hasn't changed. Additionally, frequent status checks (e.g., `isSolved`) against large arrays in render loops can lead to performance degradation from O(N) operations.
**Action:** Always memoize the context provider's value object using `useMemo` and its functions using `useCallback`. Convert state arrays to memoized `Set`s for O(1) status checks in the UI.
