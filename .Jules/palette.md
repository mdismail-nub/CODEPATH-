## 2026-07-05 - Accessibility Pattern for Icon Buttons and Links
**Learning:** Icon-only buttons and external links require both 'title' for tooltips and 'aria-label' for screen readers. Dynamic ARIA labels that include entity names (e.g., problem name) provide much better context than generic labels.
**Action:** Always provide explicit, descriptive 'aria-label' attributes for icon-only interactive elements, incorporating dynamic data when available.

## 2026-07-05 - Verification of Conditionally Rendered Elements
**Learning:** In responsive layouts, certain interactive elements (like the hint button in LessonPage) may be hidden based on the active tab or viewport width. Automated verification must simulate the necessary user interactions (e.g., switching tabs) to ensure these elements are rendered and visible before assertion.
**Action:** In Playwright scripts, always perform the required UI interactions to reveal conditionally rendered components before verifying their accessibility attributes.
