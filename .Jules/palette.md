## 2026-05-17 - [Micro-UX: Async Button Feedback]
**Learning:** Users can be confused by slow, silent client-side operations (like PDF generation with html2canvas). Providing immediate visual feedback via loading states and disabling the button prevents duplicate actions and improves perceived performance.
**Action:** Always implement loading states for any action that might take more than 200ms, especially complex DOM-to-Canvas operations.

## 2026-05-18 - [UX Pattern: Copy to Clipboard Feedback]
**Learning:** For transient successful actions like 'copy to clipboard', a temporary (2s) state change in the button itself (icon + text toggle) is more effective and less intrusive than a global toast notification in this application's layout.
**Action:** Use a local state to toggle button content and icon for 2000ms after successful clipboard operations to provide immediate, contextual confirmation.
