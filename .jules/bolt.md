## 2025-05-15 - [AppStateContext Optimization]
**Learning:** In large React contexts, wrapping functions in `useCallback` is ineffective if they depend on the large state object itself, as they will still change on every state update. Using the functional update pattern (e.g., `setStats(prev => ...)`) allows removing the state dependency from the hook, ensuring a truly stable function reference.
**Action:** Always prefer functional updates for state within `useCallback` when the state is also part of the same context to prevent unnecessary re-renders of all consuming components.
