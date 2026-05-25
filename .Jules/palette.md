## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-25 - [UX: SPA State Persistence & Micro-Feedback]
**Learning:** In SPAs, component state (progress, inputs, hints) persists when navigating between routes that use the same component (e.g., lesson-to-lesson). This "state leakage" confuses users. Additionally, micro-interactions like "Copy" benefit greatly from a "Switch & Revert" feedback pattern.
**Action:** Always reset component state in a `useEffect` keyed to route parameters. Use 2000ms "Switch & Revert" patterns for clipboard micro-feedback with dynamic `aria-label` updates.
