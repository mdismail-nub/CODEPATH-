## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-18 - [Functional Micro-interaction: Copy Code]
**Learning:** Decorative icons (like 'Play' on static code blocks) can create false affordances. Converting them into functional micro-interactions (like 'Copy Code') provides immediate utility. Using AnimatePresence for icon swaps ensures the transition is smooth and provides clear visual confirmation of the action.
**Action:** Replace decorative or ambiguous icons with functional interactions that provide clear user value and feedback.
