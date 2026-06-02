## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2025-05-14 - Fixing Roadmap Topic Visibility
 **Learning:** Data consistency is key for UX. Using inconsistent identifiers (IDs vs Slugs) across different data structures can lead to silent rendering failures where the user sees an incomplete interface. Always implement a dual-lookup strategy or normalize data identifiers.
 **Action:** When working with dynamic routes or data-driven layouts, verify that the lookup keys used in the UI match all possible identifier formats in the data source.
