## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-18 - [Micro-UX: Clipboard Feedback]
**Learning:** Providing immediate visual and accessibility feedback for clipboard operations (switching icon and text to "Copied" and updating aria-label) significantly improves user confidence that the action succeeded.
**Action:** Use a "Switch & Revert" pattern for copy-to-clipboard buttons, maintaining the success state for 2000ms.
