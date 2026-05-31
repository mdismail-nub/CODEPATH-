## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-18 - [Functional Micro-interactions]
**Learning:** Decorative icons that mimic functional elements (like a "Play" icon on a static code block) create false affordances. Converting these into useful micro-interactions (like "Copy Code") with immediate visual feedback (icon swap via Framer Motion) significantly improves utility and accessibility.
**Action:** Audit UI for static elements that look interactive and prioritize converting them into functional improvements.
