## 2026-07-03 - Dynamic Accessibility for Toggles
**Learning:** For interactive elements that toggle between two states (e.g., solved/unsolved), static ARIA labels are insufficient. Using dynamic attributes that reflect both the current state and the action to be taken significantly improves the screen reader experience.
**Action:** Always implement dynamic `aria-label` attributes for toggle buttons to provide clear feedback on the resulting state change.
