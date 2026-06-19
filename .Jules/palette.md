## 2026-06-19 - [Accessible Toggle States]
**Learning:** Toggleable UI elements (like hints or mobile menus) in this app were missing the `aria-expanded` attribute, which is crucial for screen readers to understand the visibility state of the associated content.
**Action:** Always implement `aria-expanded` alongside state-controlled visibility and provide descriptive `aria-label`s for icon-only toggle buttons.
