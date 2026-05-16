## 2025-05-15 - Enhancing Feedback for Asynchronous-like Actions
**Learning:** Simulated or fast asynchronous actions (like submitting a form that completes locally) benefit from a "synthetic delay" (Labor Illusion) paired with a loading state. This gives users a clear visual confirmation that work is being performed and makes the transition to a success state feel more substantial and earned.
**Action:** When implementing "Generate" or "Claim" features that might complete too quickly, add a ~800ms-1200ms delay with a loading spinner to improve perceived value and clarity.
