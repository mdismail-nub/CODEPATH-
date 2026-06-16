## 2026-06-16 - Context Lookup Optimization
**Learning:** O(N) lookups in global context providers (like Array.includes) compound as the app grows, especially when used in list components like TopicCard. Memoizing the context value and all callbacks is essential to prevent cascading re-renders across the entire app.
**Action:** Always use Sets for ID-based lookups in state contexts and wrap all context-exposed functions in useCallback to maintain stable references.
