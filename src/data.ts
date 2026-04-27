import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'b1',
    name: 'Programming Basics',
    slug: 'basics',
    description: 'Start your journey with Hello World, variables, and basic I/O.',
    icon: 'Terminal',
    problems: [
      { id: 'pb1', name: 'A. Say Hello With C++', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/A' },
      { id: 'pb2', name: 'B. Basic Data Types', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/B' },
      { id: 'pb3', name: 'C. Simple Calculator', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/C' },
      { id: 'pb4', name: 'D. Difference', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/D' },
      { id: 'pb5', name: 'E. Area of a Circle', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/E' },
      { id: 'pb6', name: 'F. Digits Summation', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/F' },
      { id: 'pb7', name: 'G. Summation from 1 to N', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/G' },
      { id: 'pb8', name: 'H. Two numbers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/H' }
    ]
  },
  {
    id: 'b2',
    name: 'Conditional Statements',
    slug: 'conditions',
    description: 'Master if-else, switch-case, and ternary operators.',
    icon: 'Split',
    problems: [
      { id: 'c1', name: 'I. Welcome for you with Conditions', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/I' },
      { id: 'c2', name: 'J. Multiples', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/J' },
      { id: 'c3', name: 'K. Max and Min', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/K' },
      { id: 'c4', name: 'L. The Brothers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/L' },
      { id: 'c5', name: 'M. Capital or Small or Digit', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/M' },
      { id: 'c6', name: 'N. Char', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/N' },
      { id: 'c7', name: 'O. Calculator', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/O' },
      { id: 'c8', name: 'P. First digit !', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/P' },
      { id: 'c9', name: 'Q. Coordinates of a Point', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/Q' },
      { id: 'c10', name: 'R. Age in Days', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/R' },
      { id: 'c11', name: 'S. Interval', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/S' },
      { id: 'c12', name: 'T. Sort Numbers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/T' },
      { id: 'c13', name: 'U. Float or int', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/U' },
      { id: 'c14', name: 'V. Comparison', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/V' },
      { id: 'c15', name: 'W. Mathematical Expression', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/W' },
      { id: 'c16', name: 'X. Two intervals', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/X' },
      { id: 'c17', name: 'Y. The last 2 digits', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/Y' },
      { id: 'c18', name: 'Z. Hard Compare', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/Z' }
    ]
  },
  {
    id: 'b3',
    name: 'Loops',
    slug: 'loops',
    description: 'Learn iteration using for, while, and do-while loops.',
    icon: 'RefreshCw',
    problems: [
      { id: 'lp1', name: 'A. 1 to N', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/A' },
      { id: 'lp2', name: 'B. Even Numbers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/B' },
      { id: 'lp3', name: 'C. Even, Odd, Positive and Negative', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/C' },
      { id: 'lp4', name: 'D. Fixed Password', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/D' },
      { id: 'lp5', name: 'E. Max', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/E' },
      { id: 'lp6', name: 'F. Multiplication table', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/F' },
      { id: 'lp7', name: 'G. Factorial', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/G' },
      { id: 'lp8', name: 'H. One Prime', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/H' },
      { id: 'lp9', name: 'I. Palindrome', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/I' },
      { id: 'lp10', name: 'J. Primes from 1 to n', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/J' },
      { id: 'lp11', name: 'K. Divisors', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/K' },
      { id: 'lp12', name: 'L. GCD', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/L' },
      { id: 'lp13', name: 'M. Lucky Numbers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/M' },
      { id: 'lp14', name: 'N. Numbers Histogram', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/N' },
      { id: 'lp15', name: 'O. Pyramid', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/O' },
      { id: 'lp16', name: 'P. Shape1', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/P' },
      { id: 'lp17', name: 'Q. Digits', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/Q' },
      { id: 'lp18', name: 'R. Sequence of Numbers and Sum', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/R' },
      { id: 'lp19', name: 'S. Sum of Consecutive Odd Numbers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/S' },
      { id: 'lp20', name: 'T. Shape2', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/T' },
      { id: 'lp21', name: 'U. Some Sums', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/U' },
      { id: 'lp22', name: 'V. PUM', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/V' },
      { id: 'lp23', name: 'W. Shape3', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/W' },
      { id: 'lp24', name: 'X. Convert To Binary', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/X' },
      { id: 'lp25', name: 'Y. Easy Fibonacci', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/Y' },
      { id: 'lp26', name: 'Z. Three Numbers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219432/problem/Z' }
    ]
  },
  {
    id: 'p3',
    name: 'Foundation: Functions',
    slug: 'foundation-functions',
    description: 'Master modular programming and parameter passing.',
    icon: 'Box',
    problems: [
      { id: 's5a', name: 'A. Add', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/A' },
      { id: 's5b', name: 'B. Print', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/B' },
      { id: 's5c', name: 'C. Wonderful Number', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/C' },
      { id: 's5d', name: 'D. Prime Function', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/D' },
      { id: 's5e', name: 'E. Swap', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/E' },
      { id: 's5f', name: 'F. Equation', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/F' },
      { id: 's5g', name: 'G. Max and MIN', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/G' },
      { id: 's5h', name: 'H. N Times', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/H' },
      { id: 's5i', name: 'I. Swapping With Matrix', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/I' },
      { id: 's5j', name: 'J. Average', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/J' },
      { id: 's5k', name: 'K. Shift Right', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/K' },
      { id: 's5l', name: 'L. New Array', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/L' },
      { id: 's5m', name: 'M. Distinct Numbers', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/M' },
      { id: 's5n', name: 'N. Shift Zeros', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/N' },
      { id: 's5o', name: 'O. Five in One', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223205/problem/O' }
    ]
  },
  {
    id: 'p1',
    name: 'Foundation: Arrays',
    slug: 'foundation-arrays',
    description: 'Fundamental array concepts and practice.',
    icon: 'LayoutGrid',
    problems: [
      { id: 's3a', name: 'A. Summation', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/A' },
      { id: 's3b', name: 'B. Searching', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/B' },
      { id: 's3c', name: 'C. Replacement', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/C' },
      { id: 's3d', name: 'D. Positions in array', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/D' },
      { id: 's3e', name: 'E. Lowest Number', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/E' },
      { id: 's3f', name: 'F. Reversing', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/F' },
      { id: 's3g', name: 'G. Palindrome Array', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/G' },
      { id: 's3h', name: 'H. Sorting', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/H' },
      { id: 's3i', name: 'I. Smallest Pair', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/I' },
      { id: 's3j', name: 'J. Lucky Array', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/J' },
      { id: 's3k', name: 'K. Sum Digits', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/K' },
      { id: 's3l', name: 'L. Max Subarray', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/L' },
      { id: 's3m', name: 'M. Replace MinMax', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/M' },
      { id: 's3n', name: 'N. Check Code', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/N' },
      { id: 's3o', name: 'O. Fibonacci', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/O' },
      { id: 's3p', name: 'P. Minimize Number', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/P' },
      { id: 's3q', name: 'Q. Count Subarrays', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/Q' },
      { id: 's3r', name: 'R. Permutation with arrays', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/R' },
      { id: 's3s', name: 'S. Search In Matrix', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/S' },
      { id: 's3t', name: 'T. Matrix', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/T' },
      { id: 's3u', name: 'U. Is B a subsequence of A ?', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/U' },
      { id: 's3v', name: 'V. Frequency Array', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/V' },
      { id: 's3w', name: 'W. Mirror Array', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/W' },
      { id: 's3x', name: 'X. 8 Neighbors', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/X' },
      { id: 's3y', name: 'Y. Range sum query', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/Y' },
      { id: 's3z', name: 'Z. Binary Search', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219774/problem/Z' }
    ]
  },
  {
    id: 'p2',
    name: 'Foundation: Strings',
    slug: 'foundation-strings',
    description: 'Essential string manipulation problems.',
    icon: 'Type',
    problems: [
      { id: 's4a', name: 'A. Create A New String', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/A' },
      { id: 's4b', name: 'B. Let\'s use Getline', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/B' },
      { id: 's4c', name: 'C. Compare', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/C' },
      { id: 's4d', name: 'D. Strings', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/D' },
      { id: 's4e', name: 'E. Count', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/E' },
      { id: 's4f', name: 'F. Way Too Long Words', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/F' },
      { id: 's4g', name: 'G. Conversion', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/G' },
      { id: 's4h', name: 'H. Good or Bad', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/H' },
      { id: 's4i', name: 'I. Palindrome', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/I' },
      { id: 's4j', name: 'J. Count Letters', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/J' },
      { id: 's4k', name: 'K. I Love strings', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/K' },
      { id: 's4l', name: 'L. String Functions', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/L' },
      { id: 's4m', name: 'M. Subsequence String', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/M' },
      { id: 's4n', name: 'N. Max Subsequence', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/N' },
      { id: 's4o', name: 'O. Sort String', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/O' },
      { id: 's4p', name: 'P. Count Words', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/P' },
      { id: 's4q', name: 'Q. Reverse Words', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/Q' },
      { id: 's4r', name: 'R. String Score', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/R' },
      { id: 's4s', name: 'S. Max Split', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/S' },
      { id: 's4t', name: 'T. URL', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/T' },
      { id: 's4u', name: 'U. New Words', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/U' },
      { id: 's4v', name: 'V. Replace Word', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/V' },
      { id: 's4w', name: 'W. Encrypt & Decrypt Message', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/W' },
      { id: 's4x', name: 'X. Comparison', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/X' },
      { id: 's4y', name: 'Y. Min Cost String', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/Y' },
      { id: 's4z', name: 'Z. Clean Code', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/219856/problem/Z' }
    ]
  },
  {
    id: 'sz1',
    name: 'Step 1.1: Things to Know in C++/Java',
    slug: 'a2z-basics',
    description: 'Foundation: User Input/Output, Data Types, If Else, Loops, and Functions.',
    icon: 'Terminal',
    problems: [
      { id: 'a2z-1-1-1', name: 'User Input/Output', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/search-query-for-strings/0' },
      { id: 'a2z-1-1-2', name: 'Data Types', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/data-type-1666706191/1' },
      { id: 'a2z-1-1-3', name: 'If Else statements', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/java-if-else-decision-making1057/1' },
      { id: 'a2z-1-1-4', name: 'Switch Case', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/java-switch-case-statement3529/1' },
      { id: 'a2z-1-1-5', name: 'For Logic', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/nth-fibonacci-number1335/1' },
      { id: 'a2z-1-1-6', name: 'While Loop', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/while-loop-print-table-java/1' }
    ]
  },
  {
    id: 'sz2',
    name: 'Step 1.4: Know Basic Maths',
    slug: 'a2z-math',
    description: 'Solve problems involving digits, sequences, and modular arithmetic.',
    icon: 'Calculator',
    problems: [
      { id: 'a2z-1-4-1', name: 'Count Digits', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/count-digits5717/1' },
      { id: 'a2z-1-4-2', name: 'Reverse Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-integer/' },
      { id: 'a2z-1-4-3', name: 'Check Palindrome', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/palindrome-number/' },
      { id: 'a2z-1-4-4', name: 'GCD and LCM', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/lcm-and-gcd4516/1' },
      { id: 'a2z-1-4-5', name: 'Armstrong Number', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1' },
      { id: 'a2z-1-4-6', name: 'Sum of all Divisors', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/sum-of-all-divisors-from-1-to-n4738/1' },
      { id: 'a2z-1-4-7', name: 'Check for Prime', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/prime-number2314/1' }
    ]
  },
  {
    id: 'sz3',
    name: 'Step 1.5: Learn Basic Recursion',
    slug: 'a2z-recursion-basics',
    description: 'Understand the power of self-referential functions.',
    icon: 'RotateCcw',
    problems: [
      { id: 'a2z-1-5-1', name: 'Print 1 to N', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1' },
      { id: 'a2z-1-5-2', name: 'Print N to 1', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/print-n-to-1-without-loop/1' },
      { id: 'a2z-1-5-3', name: 'Sum of first N terms', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/sum-of-first-n-terms5843/1' },
      { id: 'a2z-1-5-4', name: 'Factorial of N', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/find-all-factorial-numbers-less-than-or-equal-to-n3548/1' },
      { id: 'a2z-1-5-5', name: 'Reverse an Array', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/reverse-an-array/0' },
      { id: 'a2z-1-5-6', name: 'Check Palindrome String', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-palindrome/' },
      { id: 'a2z-1-5-7', name: 'Fibonacci Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/fibonacci-number/' }
    ]
  },
  {
    id: 'adv-recursion',
    name: 'Advanced Recursion',
    slug: 'advanced-recursion',
    description: 'Deep dive into backtracking, recursion trees, and state exploration.',
    icon: 'RotateCcw',
    problems: [
      { id: 'ar-1', name: 'Print from 1 to N', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/B' },
      { id: 'ar-2', name: 'Print from N to 1', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/C' },
      { id: 'ar-3', name: 'Factorial', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/J' },
      { id: 'ar-4', name: 'Max Number', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/K' },
      { id: 'ar-5', name: 'Fibonacci', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/O' },
      { id: 'ar-6', name: 'Array Average', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/S' },
      { id: 'ar-7', name: 'Number of Ways', difficulty: 'Medium', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/R' },
      { id: 'ar-8', name: 'Knapsack', difficulty: 'Medium', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/U' },
      { id: 'ar-9', name: 'The maximum path-sum', difficulty: 'Medium', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/X' },
      { id: 'ar-10', name: 'Print Digits using Recursion', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/group/MWSDmqGsZm/contest/223339/problem/D' },
      { id: 'ar-11', name: 'Sum It Up', difficulty: 'Medium', platform: 'Online Judge', link: 'https://onlinejudge.org/external/107/p10776.pdf' },
      { id: 'ar-12', name: 'Following Orders', difficulty: 'Medium', platform: 'Online Judge', link: 'https://onlinejudge.org/external/1/p124.pdf' },
      { id: 'ar-13', name: 'Savings', difficulty: 'Easy', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc206/tasks/abc206_b' },
      { id: 'ar-14', name: '1-81', difficulty: 'Easy', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc196/tasks/abc196_b' },
      { id: 'ar-15', name: 'Vanishing Card', difficulty: 'Easy', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc191/tasks/abc191_b' },
      { id: 'ar-16', name: 'uNrEaDaBlE sTrInG', difficulty: 'Easy', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc192/tasks/abc192_b' },
      { id: 'ar-17', name: 'Apple Division', difficulty: 'Medium', platform: 'CSES', link: 'https://cses.fi/problemset/task/1623' }
    ]
  },
  {
    id: 'sz4',
    name: 'Step 2: Sorting Techniques',
    slug: 'a2z-sorting',
    description: 'Learn Selection, Bubble, Insertion, Merge, and Quick Sort.',
    icon: 'ArrowDownAZ',
    problems: [
      { id: 'a2z-2-1-1', name: 'Selection Sort', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/selection-sort/1' },
      { id: 'a2z-2-1-2', name: 'Bubble Sort', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/bubble-sort/1' },
      { id: 'a2z-2-1-3', name: 'Insertion Sort', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/insertion-sort/1' },
      { id: 'a2z-2-2-1', name: 'Merge Sort', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/merge-sort/1' },
      { id: 'a2z-2-2-2', name: 'Recursive Bubble Sort', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/bubble-sort/1' },
      { id: 'a2z-2-2-3', name: 'Recursive Insertion Sort', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/insertion-sort/1' },
      { id: 'a2z-2-2-4', name: 'Quick Sort', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/quick-sort/1' }
    ]
  },
  {
    id: 'sz5',
    name: 'Step 3.1: Arrays (Easy)',
    slug: 'a2z-arrays-easy',
    description: 'Basic array problems: rotation, missing numbers, and consecutive ones.',
    icon: 'LayoutGrid',
    problems: [
      { id: 'a2z-3-1-1', name: 'Largest Element in Array', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/largest-element-in-array-1587115620/1' },
      { id: 'a2z-3-1-2', name: 'Second Largest Element', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/second-largest3735/1' },
      { id: 'a2z-3-1-3', name: 'Check if Array is Sorted', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/' },
      { id: 'a2z-3-1-4', name: 'Remove Duplicates', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
      { id: 'a2z-3-1-5', name: 'Left Rotate by D Steps', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/rotate-array/' },
      { id: 'a2z-3-1-6', name: 'Move Zeros to End', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/move-zeroes/' },
      { id: 'a2z-3-1-7', name: 'Linear Search', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/who-will-win-1587115620/1' },
      { id: 'a2z-3-1-8', name: 'Union of Two Sorted Arrays', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/union-of-two-sorted-arrays-1587115620/1' },
      { id: 'a2z-3-1-9', name: 'Missing Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/missing-number/' },
      { id: 'a2z-3-1-10', name: 'Max Consecutive Ones', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/max-consecutive-ones/' },
      { id: 'a2z-3-1-11', name: 'Single Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/single-number/' },
      { id: 'a2z-3-1-12', name: 'Longest Subarray with Sum K', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1' }
    ]
  },
  {
    id: 'sz6',
    name: 'Step 3.2: Arrays (Medium)',
    slug: 'a2z-arrays-medium',
    description: 'Master subarrays, permutations, and matrix operations.',
    icon: 'LayoutGrid',
    problems: [
      { id: 'a2z-3-2-1', name: '2Sum Problem', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/' },
      { id: 'a2z-3-2-2', name: 'Sort Colors (0s, 1s, 2s)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/sort-colors/' },
      { id: 'a2z-3-2-3', name: 'Majority Element (>N/2)', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/majority-element/' },
      { id: 'a2z-3-2-4', name: 'Maximum Subarray (Kadane\'s)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-subarray/' },
      { id: 'a2z-3-2-5', name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { id: 'a2z-3-2-6', name: 'Rearrange Array Elements by Sign', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/rearrange-array-elements-by-sign/' },
      { id: 'a2z-3-2-7', name: 'Next Permutation', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/next-permutation/' },
      { id: 'a2z-3-2-8', name: 'Leaders in an Array', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1' },
      { id: 'a2z-3-2-9', name: 'Longest Consecutive Sequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
      { id: 'a2z-3-2-10', name: 'Set Matrix Zeroes', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/set-matrix-zeroes/' },
      { id: 'a2z-3-2-11', name: 'Rotate Image (90 degrees)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/rotate-image/' },
      { id: 'a2z-3-2-12', name: 'Spiral Matrix', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/spiral-matrix/' },
      { id: 'a2z-3-2-13', name: 'Subarray Sum Equals K', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarray-sum-equals-k/' }
    ]
  },
  {
    id: 'prefix-sum',
    name: 'Prefix Sum',
    slug: 'prefix-sum',
    description: 'Learn efficient range query techniques.',
    icon: 'ListMusic',
    problems: [
      { id: 'ps-1', name: 'Static Range Sum Queries', difficulty: 'Easy', platform: 'CSES', link: 'https://cses.fi/problemset/task/1646' },
      { id: 'ps-2', name: 'Odd Queries', difficulty: 'Medium', platform: 'Codeforces', link: 'https://codeforces.com/contest/1807/problem/D' },
      { id: 'ps-3', name: 'Subsequences Summing to Sevens', difficulty: 'Medium', platform: 'VJudge', link: 'https://vjudge.net/problem/USACO-572' },
      { id: 'ps-4', name: 'Kuriyama Mirai\'s Stones', difficulty: 'Easy', platform: 'Codeforces', link: 'https://codeforces.com/contest/433/problem/B' },
      { id: 'ps-5', name: 'Haybale Stacking', difficulty: 'Medium', platform: 'USACO', link: 'https://usaco.org/index.php?page=viewproblem2&cpid=595' },
      { id: 'ps-6', name: 'Preparing for the Exam', difficulty: 'Medium', platform: 'Codeforces', link: 'https://codeforces.com/contest/2152/problem/C' },
      { id: 'ps-7', name: 'D - Prefix Sum Queries', difficulty: 'Medium', platform: 'AtCoder', link: 'https://atcoder.jp/contests/abc426/tasks/abc426_d' },
      { id: 'ps-8', name: 'D. Counting Subarrays', difficulty: 'Medium', platform: 'Codeforces', link: 'https://codeforces.com/gym/105981/problem/D' },
      { id: 'ps-9', name: 'Subarray Sums I', difficulty: 'Medium', platform: 'CSES', link: 'https://cses.fi/problemset/task/1661' },
      { id: 'ps-10', name: 'Subarray Sums II', difficulty: 'Medium', platform: 'CSES', link: 'https://cses.fi/problemset/task/1662' }
    ]
  },
  {
    id: 'sz7',
    name: 'Step 4.1: Binary Search (Learnings)',
    slug: 'a2z-binary-search-logic',
    description: 'Master the search space and basic binary search logic.',
    icon: 'Search',
    problems: [
      { id: 'a2z-4-1-1', name: 'Binary Search', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-search/' },
      { id: 'a2z-4-1-2', name: 'Lower Bound', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1' },
      { id: 'a2z-4-1-3', name: 'Upper Bound', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/ceil-the-floor2802/1' },
      { id: 'a2z-4-1-4', name: 'Search Insert Position', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-insert-position/' },
      { id: 'a2z-4-1-5', name: 'Floor and Ceil', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/ceil-the-floor2802/1' },
      { id: 'a2z-4-1-6', name: 'First and Last Occurrences', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
      { id: 'a2z-4-1-7', name: 'Count Occurrences', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1' },
      { id: 'a2z-4-1-8', name: 'Search in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { id: 'a2z-4-1-9', name: 'Minimum in Rotated Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
      { id: 'a2z-4-1-10', name: 'Single Element in Sorted Array', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/single-element-in-a-sorted-array/' },
      { id: 'a2z-4-1-11', name: 'Peak Element', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/find-peak-element/' }
    ]
  },
  {
    id: 'sz8',
    name: 'Step 6.1: Linked List Learning',
    slug: 'a2z-linked-list-basics',
    description: 'Introduction to Singly and Doubly Linked Lists.',
    icon: 'Link',
    problems: [
      { id: 'a2z-6-1-1', name: 'Intro to Linked List', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/introduction-to-linked-list/1' },
      { id: 'a2z-6-1-2', name: 'Linked List Insertion', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/linked-list-insertion-1587115620/1' },
      { id: 'a2z-6-1-3', name: 'Delete Node in Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-node-in-a-linked-list/' },
      { id: 'a2z-6-1-4', name: 'Count Nodes in LL', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/count-nodes-of-linked-list/1' },
      { id: 'a2z-6-1-5', name: 'Search in LL', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/search-in-linked-list-1664434326/1' },
      { id: 'a2z-6-2-1', name: 'Intro to DLL', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/introduction-to-doubly-linked-list/1' },
      { id: 'a2z-6-2-2', name: 'Reverse DLL', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1' }
    ]
  },
  {
    id: 'sz9',
    name: 'Step 8: Bit Manipulation',
    slug: 'a2z-bit-manipulation',
    description: 'Master binary operations and bitwise tricks.',
    icon: 'Binary',
    problems: [
      { id: 'a2z-8-1-1', name: 'Intro to Bit Manipulation', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/bit-manipulation-1666686022/1' },
      { id: 'a2z-8-1-2', name: 'Check if Kth Bit is Set', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/check-whether-k-th-bit-is-set-or-not-1587115620/1' },
      { id: 'a2z-8-1-3', name: 'Number is Power of 2', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/power-of-two/' },
      { id: 'a2z-8-1-4', name: 'Count Set Bits', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/set-bits0143/1' },
      { id: 'a2z-8-1-5', name: 'Divide Two Integers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/divide-two-integers/' }
    ]
  },
  {
    id: 'sz11',
    name: 'Step 7: Recursion (Subsets)',
    slug: 'a2z-recursion-subsets',
    description: 'Learn generating subsets, combinations and permutations.',
    icon: 'RotateCcw',
    problems: [
      { id: 'a2z-7-1-1', name: 'Generate Parentheses', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/generate-parentheses/' },
      { id: 'a2z-7-1-2', name: 'Power Set', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/power-set4302/1' },
      { id: 'a2z-7-2-1', name: 'Subsets', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subsets/' },
      { id: 'a2z-7-2-2', name: 'Combination Sum', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/combination-sum/' },
      { id: 'a2z-7-2-3', name: 'Combination Sum II', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/combination-sum-ii/' }
    ]
  },
  {
    id: 'sz12',
    name: 'Step 9: Stack & Queues',
    slug: 'a2z-stack-queues',
    description: 'Master LIFO and FIFO structures and monotonic stack problems.',
    icon: 'Layers',
    problems: [
      { id: 'a2z-9-1-1', name: 'Implement Stack using Array', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/implement-stack-using-array/1' },
      { id: 'a2z-9-1-2', name: 'Implement Queue using Array', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/implement-queue-using-array/1' },
      { id: 'a2z-9-1-3', name: 'Stack using Queue', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-stack-using-queues/' },
      { id: 'a2z-9-1-4', name: 'Queue using Stack', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
      { id: 'a2z-9-1-5', name: 'Valid Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/' },
      { id: 'a2z-9-1-6', name: 'Min Stack', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-stack/' },
      { id: 'cc-sq-1', name: 'Next Greater Element', difficulty: 'Medium', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/DRKTZ01' },
      { id: 'cc-sq-2', name: 'Transform the Expression', difficulty: 'Medium', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/ONP' },
      { id: 'cc-sq-3', name: 'Standard Stack Operations', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/DSCPPAS269' },
      { id: 'cc-sq-4', name: 'Stone Pile', difficulty: 'Medium', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/STONE_PILE' },
      { id: 'cc-sq-5', name: 'Necklace', difficulty: 'Medium', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/NEC' },
      { id: 'cc-sq-6', name: 'Balanced Parentheses', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/PREP59' },
      { id: 'cc-sq-7', name: 'Next Smaller Element', difficulty: 'Medium', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/PPMUH01' },
      { id: 'cc-sq-8', name: 'Stack Implementation', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/practice/course/stacks-and-queues/STAQUEF/problems/BBXJG01' }
    ]
  },
  {
    id: 'sz13',
    name: 'Step 10: Sliding Window & Two Pointer',
    slug: 'a2z-sliding-window',
    description: 'Optimize O(N^2) problems to O(N) using sliding window.',
    icon: 'GalleryHorizontal',
    problems: [
      { id: 'a2z-10-1-1', name: 'Longest Substring without Repeating', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { id: 'a2z-10-1-2', name: 'Max Consecutive Ones III', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/max-consecutive-ones-iii/' },
      { id: 'a2z-10-1-3', name: 'Fruits into Baskets', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/fruit-into-baskets-1663137462/1' },
      { id: 'a2z-10-1-4', name: 'Longest K unique characters', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0833/1' }
    ]
  },
  {
    id: 'sz14',
    name: 'Step 11: Heaps',
    slug: 'a2z-heaps',
    description: 'Learn priority queues and heap sorting.',
    icon: 'Cpu',
    problems: [
      { id: 'a2z-11-1-1', name: 'Kth Largest Element', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { id: 'a2z-11-1-2', name: 'Kth Smallest Element', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1' },
      { id: 'a2z-11-2-1', name: 'K-th Largest Sum Subarray', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/k-th-largest-sum-contiguous-subarray/1' },
      { id: 'a2z-11-2-2', name: 'Merge K Sorted Lists', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' }
    ]
  },
  {
    id: 'sz15',
    name: 'Step 12: Greedy Algorithms',
    slug: 'a2z-greedy',
    description: 'Make locally optimal choices for global optimization.',
    icon: 'Target',
    problems: [
      { id: 'a2z-12-1-1', name: 'Assign Cookies', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/assign-cookies/' },
      { id: 'a2z-12-1-2', name: 'Fractional Knapsack', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1' },
      { id: 'a2z-12-1-3', name: 'N meetings in one room', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1' }
    ]
  },
  {
    id: 'sz10',
    name: 'Step 13: Binary Trees',
    slug: 'a2z-binary-trees',
    description: 'Traversals, views, and structural problems in Binary Trees.',
    icon: 'TreePine',
    problems: [
      { id: 'a2z-13-1-1', name: 'Tree Traversals', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/tree-traversals/1' },
      { id: 'a2z-13-1-2', name: 'Inorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
      { id: 'a2z-13-1-3', name: 'Preorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/' },
      { id: 'a2z-13-1-4', name: 'Postorder Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/' },
      { id: 'a2z-13-1-5', name: 'Level Order Traversal', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { id: 'a2z-13-2-1', name: 'Maximum Depth', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { id: 'a2z-13-2-2', name: 'Balanced Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/balanced-binary-tree/' },
      { id: 'a2z-13-2-3', name: 'Diameter of Binary Tree', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/diameter-of-binary-tree/' }
    ]
  },
  {
    id: 'sz16',
    name: 'Step 14: Binary Search Trees',
    slug: 'a2z-bst',
    description: 'Learn property of BST, search, insert, and delete operations.',
    icon: 'Trees',
    problems: [
      { id: 'a2z-14-1-1', name: 'Search in BST', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/search-in-a-binary-search-tree/' },
      { id: 'a2z-14-1-2', name: 'Ceil in BST', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/implement-ceil-in-bst/1' },
      { id: 'a2z-14-1-3', name: 'Floor in BST', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/floor-in-bst/1' },
      { id: 'a2z-14-1-4', name: 'Insert into a BST', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/' },
      { id: 'a2z-14-1-5', name: 'Delete Node in a BST', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/delete-node-in-a-bst/' }
    ]
  },
  {
    id: 'sz17',
    name: 'Step 15: Graphs',
    slug: 'a2z-graphs',
    description: 'Learn graph traversals and advanced algorithms like Dijkstra and Bellman Ford.',
    icon: 'Network',
    problems: [
      { id: 'a2z-15-1-1', name: 'BFS of Graph', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1' },
      { id: 'a2z-15-1-2', name: 'DFS of Graph', difficulty: 'Easy', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1' },
      { id: 'a2z-15-2-1', name: 'Number of Islands', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-islands/' },
      { id: 'a2z-15-2-2', name: 'Flood Fill', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/flood-fill/' },
      { id: 'a2z-15-3-1', name: 'Topological Sort', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/topological-sort/1' },
      { id: 'a2z-15-4-1', name: 'Dijkstra Algorithm', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1' }
    ]
  },
  {
    id: 'sz18',
    name: 'Step 16: Dynamic Programming',
    slug: 'a2z-dp',
    description: 'Solve complex problems by breaking them into smaller subproblems with memoization.',
    icon: 'BrainCircuit',
    problems: [
      { id: 'a2z-16-1-1', name: 'Climbing Stairs', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 'a2z-16-1-2', name: 'Frog Jump', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/minimal-cost/1' },
      { id: 'a2z-16-2-1', name: 'House Robber', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/house-robber/' },
      { id: 'a2z-16-3-1', name: 'Subset Sum Problem', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1' },
      { id: 'a2z-16-4-1', name: '0/1 Knapsack Problem', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1' },
      { id: 'a2z-16-5-1', name: 'LCS (Longest Common Subsequence)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-common-subsequence/' }
    ]
  },
  {
    id: 'sz19',
    name: 'Step 17: Tries',
    slug: 'a2z-tries',
    description: 'Learn prefix tree and bitwise operations using tries.',
    icon: 'GitCommit',
    problems: [
      { id: 'a2z-17-1-1', name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { id: 'a2z-17-1-2', name: 'Implement Trie II', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1' },
      { id: 'a2z-17-2-1', name: 'Maximum XOR of Two Numbers', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' }
    ]
  }
];

export const ROADMAP_STEPS = [
  { id: 'foundation', title: 'Phase 0: Fundamentals', description: 'Core building blocks: I/O, Conditions, and Loops.', topics: ['b1', 'b2', 'b3'] },
  { id: 'foundation-adv', title: 'Phase 1: Foundations', description: 'Functions, Arrays, and Strings mastery.', topics: ['p3', 'p1', 'p2'] },
  { id: 'step1', title: 'Phase 2: Logic & Recursion', description: 'C++ Basics, Math, and Recursive thinking.', topics: ['sz1', 'sz2', 'sz3'] },
  { id: 'recursion-mastery', title: 'Phase 3: Advanced Logic', description: 'Mastering recursion and state exploration.', topics: ['adv-recursion'] },
  { id: 'step2', title: 'Phase 4: Intermediate Systems', description: 'Sorting algorithms and Array mastery.', topics: ['sz4', 'sz5', 'sz6'] },
  { id: 'prefix-mastery', title: 'Phase 5: Range Queries', description: 'Efficient range operations with Prefix Sum.', topics: ['prefix-sum'] },
  { id: 'step4', title: 'Phase 6: Search Algorithms', description: 'Mastering binary search and its applications.', topics: ['sz7'] },
  { id: 'step5', title: 'Phase 7: Structural Data', description: 'Linked Lists, Bitwise, and Linear Structures.', topics: ['sz8', 'sz9', 'sz12'] },
  { id: 'step6', title: 'Phase 8: Hierarchical Data', description: 'Binary Trees, BST, and Tries.', topics: ['sz10', 'sz16', 'sz19'] },
  { id: 'step7', title: 'Phase 9: System Optimization', description: 'Sliding Window, Heaps, and Greedy Strategies.', topics: ['sz13', 'sz14', 'sz15'] },
  { id: 'step8', title: 'Phase 10: High-Level Concepts', description: 'Advanced Recursion, Graphs, and Dynamic Programming.', topics: ['sz11', 'sz17', 'sz18'] }
];
