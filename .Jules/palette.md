## 2025-05-15 - Accessibility for Icon-Only and Dynamic Interactive Elements
**Learning:** Icon-only buttons (like theme toggles) and external links represented by icons require explicit `aria-label` attributes even if they have `title` attributes, as `title` is not reliably announced by all screen readers. Dynamic labels (e.g., "Mark [Problem] as solved") provide superior context over static ones.
**Action:** Always pair `title` with a matching `aria-label` for icon-only buttons, and use dynamic strings for labels in lists of items to provide unique context for each interactive element.
