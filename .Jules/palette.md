## 2025-05-22 - [Accessibility: ARIA Labels for Icon-Only Buttons]
**Learning:** Icon-only buttons (theme toggles, modal close buttons, external links) are completely opaque to screen reader users if they lack `aria-label` attributes. Even if they have a `title` attribute for mouse users, `aria-label` is required for proper accessibility.
**Action:** Always inspect the application for interactive elements that use only icons and ensure they have descriptive, context-aware `aria-label` attributes.
