# Bolt's Performance Journal ⚡

## 2025-05-15 - Redundant O(N*M) Rendering Patterns
**Learning:** Found several components (`Dashboard.tsx`, `Topics.tsx`) performing nested O(N*M) calculations (e.g., filtering problems within topics) directly in the render loop. While small data sets hide the impact, this scales poorly and causes UI lag during state updates like theme toggles or search input.
**Action:** Always wrap derived statistics and nested filtering logic in `useMemo` to decouple calculation frequency from render frequency.
