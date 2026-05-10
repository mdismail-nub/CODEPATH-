## 2025-05-22 - [Accessibility: ARIA Labels for Icon-Only Buttons]
**Learning:** Icon-only buttons (theme toggles, modal close buttons, external links) are completely opaque to screen reader users if they lack `aria-label` attributes. Even if they have a `title` attribute for mouse users, `aria-label` is required for proper accessibility.
**Action:** Always inspect the application for interactive elements that use only icons and ensure they have descriptive, context-aware `aria-label` attributes.

## 2025-05-23 - [Accessibility: Modal Implementation Standards]
**Learning:** Modals must be explicitly announced by screen readers using `role="dialog"` and `aria-modal="true"`. They must also be dismissible via the `Escape` key and have a clear label-to-input association to ensure they are fully usable and accessible.
**Action:** When implementing or improving modals, always include ARIA roles, handle keyboard events for closure, and use `useId` for robust form associations.
