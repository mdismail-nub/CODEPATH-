## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-20 - [Micro-UX: Functional vs Decorative Icons]
**Learning:** Decorative icons (like 'Play' on static code blocks) create false affordances and can confuse users. Converting them into functional micro-interactions (like 'Copy Code') provides real utility and aligns with user expectations for code snippets.
**Action:** Audit the UI for icons that look interactive but aren't, and prioritize converting them into helpful actions like copying, sharing, or expanding.
