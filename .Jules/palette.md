## 2025-05-22 - [Accessibility: ARIA Labels for Icon-Only Buttons]
**Learning:** Icon-only buttons (theme toggles, modal close buttons, external links) are completely opaque to screen reader users if they lack `aria-label` attributes. Even if they have a `title` attribute for mouse users, `aria-label` is required for proper accessibility.
**Action:** Always inspect the application for interactive elements that use only icons and ensure they have descriptive, context-aware `aria-label` attributes.

## 2025-05-23 - [Accessibility: Modal State Transitions]
**Learning:** In multi-state modals (e.g., switching from a form to a success message), the element referenced by `aria-labelledby` must exist in all rendered states to maintain screen reader context. If the heading text changes, ensuring both headings share the same ID (or the ID remains present) keeps the dialog's identity stable.
**Action:** When implementing accessible modals with multiple views, ensure the `aria-labelledby` target is consistently present or appropriately updated across all states.
