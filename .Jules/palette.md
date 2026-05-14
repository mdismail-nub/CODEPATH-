## 2025-05-22 - [Accessibility: ARIA Labels for Icon-Only Buttons]
**Learning:** Icon-only buttons (theme toggles, modal close buttons, external links) are completely opaque to screen reader users if they lack `aria-label` attributes. Even if they have a `title` attribute for mouse users, `aria-label` is required for proper accessibility.
**Action:** Always inspect the application for interactive elements that use only icons and ensure they have descriptive, context-aware `aria-label` attributes.

## 2025-05-23 - [Multi-State Modal Accessibility and Interaction Feedback]
**Learning:** For modals that transition between states (e.g., from form to success), ensure `role="dialog"` and `aria-labelledby` are stable. Using a synthetic delay (e.g., 800ms) for fast asynchronous actions prevents "flicker" and provides clear visual confirmation of work being done through a loading state.
**Action:** Always implement `aria-modal="true"`, `Escape` key handling, and use `CircleDashed` (or similar) with a synthetic delay for all credential or data submissions to ensure both accessibility and a polished user experience.
