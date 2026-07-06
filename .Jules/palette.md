## 2025-07-06 - TopicDetail Accessibility and Tactile Feedback
**Learning:** Icon-only buttons (like the solved toggle) and external links need clear, dynamic ARIA labels and titles to provide context. Tactile feedback like `active:scale-95` significantly improves the perceived responsiveness of toggle actions.
**Action:** Always include dynamic `aria-label` for toggle states and `title` for external links. Apply `active:scale-95` to interactive elements.

## 2025-07-06 - BackButton Accessibility
**Learning:** Even if a button has text like "Go Back", an explicit `aria-label` like "Go back to previous page" is better for screen readers to explain the function accurately.
**Action:** Provide descriptive ARIA labels even for buttons with simple text.
