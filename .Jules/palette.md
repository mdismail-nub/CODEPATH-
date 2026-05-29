## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2025-05-15 - [UX: Functional Micro-interactions]
**Learning:** Decorative icons (like 'Play' on static code blocks) create false affordances and can confuse users. Converting these into functional micro-interactions, such as a 'Copy Code' button with stateful feedback, improves utility and accessibility.
**Action:** Identify and replace decorative placeholders with functional elements that provide immediate value and feedback.
