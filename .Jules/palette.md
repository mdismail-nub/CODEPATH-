## 2025-05-15 - Dynamic Feedback for Clipboard Operations
**Learning:** For micro-interactions like clipboard copying, updating the `aria-label` dynamically (e.g., from "Copy code" to "Copied to clipboard") is crucial. Sighted users see the icon/text change, but without the ARIA update, screen reader users miss the confirmation of the action's success.
**Action:** Always implement state-driven ARIA labels for "Switch & Revert" UI patterns to maintain accessibility parity.

## 2025-05-15 - Testability of New UI Components
**Learning:** When adding new interactive elements, including a stable and descriptive CSS class (like `.copy-code-button`) is a best practice for automated verification. Relying on generic selectors or text content makes tests fragile to copy changes or layout shifts.
**Action:** Add dedicated `test-id` or descriptive classes to new micro-interactions.
