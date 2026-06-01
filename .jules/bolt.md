## 2025-06-01 - Set-based O(1) Lookups for Global State
**Learning:** In a global state context providing membership information (e.g., solved problems, completed lessons), using Array.includes() inside render loops or component calculations leads to O(N*M) complexity where N is the number of items being rendered and M is the size of the state array.
**Action:** Always derive memoized Sets from state arrays in the Context Provider and expose O(1) lookup helpers to consuming components to ensure linear rendering performance regardless of state size.
