## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-18 - [Pattern: Copy-to-Clipboard Feedback]
**Learning:** Replacing decorative icons with functional micro-interactions (like a "Copy Code" button) improves utility while reducing visual clutter. Combining icon-swapping animations (using Framer Motion) with dynamic ARIA labels ensures that both sighted and screen-reader users receive immediate confirmation of success.
**Action:** Use the "Switch & Revert" pattern (Check icon + "Copied!" text + dynamic aria-label) for all clipboard operations to provide clear, accessible feedback.
