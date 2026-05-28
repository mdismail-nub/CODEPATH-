## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-28 - [UX: Switch & Revert Clipboard Pattern]
**Learning:** Decorative icons (like 'Play' on static code blocks) create false affordances. Converting them into functional micro-interactions like "Copy Code" with a "Switch & Revert" feedback pattern (Copy -> Copied) significantly improves utility and provides clear, immediate success feedback.
**Action:** Use the Switch & Revert pattern for all clipboard operations, ensuring ARIA labels are updated dynamically and using AnimatePresence for smooth state transitions.
