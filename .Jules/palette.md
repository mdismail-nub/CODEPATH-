## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-30 - [Micro-UX: Copy Code Interaction]
**Learning:** Decorative icons (like 'Play') on static code blocks can create false affordances or missed opportunities. Converting them into functional micro-interactions (e.g., 'Copy Code') provides immediate utility. Dynamic `aria-label` updates are crucial for communicating state changes (like "Copied!") to assistive technologies.
**Action:** Always look for static/decorative elements in code presentation areas that can be upgraded to functional utilities with clear feedback loops.
