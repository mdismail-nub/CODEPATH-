## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-18 - [Accessibility & Utility in Lessons]
**Learning:** Decorative icons (like a "Play" icon on static code blocks) create false affordance. Replacing them with high-utility actions (like "Copy Code") with explicit ARIA labels and feedback improves both usability and accessibility.
**Action:** Audit lessons for decorative elements that can be converted into functional micro-interactions.
