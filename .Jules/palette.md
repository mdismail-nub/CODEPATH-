## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-18 - [Micro-UX: Clipboard Feedback Pattern]
**Learning:** Utility actions like "Copy Code" require immediate, unambiguous visual confirmation. Switching the icon from 'Copy' to 'Check' and updating text to 'Copied' for a short duration (e.g., 2000ms) provides a clear success state that satisfies user expectations for small utility tasks.
**Action:** Use a "Switch & Revert" pattern for clipboard operations: change icon/text to a success state immediately on click, then revert after a 2-second timeout to maintain a clean interface.
