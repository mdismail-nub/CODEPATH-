## 2025-05-15 - Enhancing Interactive Lessons

**Learning:** For icon-only buttons (like 'Copy Code' or 'Hint'), providing both a `title` (for desktop tooltips) and an explicit `aria-label` (for screen readers) is essential for full accessibility. Additionally, using `active:scale-95` on interactive elements provides instant tactile feedback that makes the application feel more responsive.

**Action:** Always include `aria-label` and `active:scale-95` for interactive elements, especially icon-only buttons. Use `AnimatePresence` with `mode='wait'` when swapping icons to ensure smooth state transitions.
