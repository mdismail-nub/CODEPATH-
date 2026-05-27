## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2025-05-22 - [UX: Affordance Optimization]
**Learning:** Decorative icons (like 'Play' on static code blocks) create false affordances that confuse users. Converting these into functional micro-interactions (e.g., 'Copy Code') improves utility. Using the 'Switch & Revert' pattern with dynamic `aria-label` ensures both delight and accessibility.
**Action:** Audit for decorative icons on interactive-looking elements and replace with useful micro-interactions.
