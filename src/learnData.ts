import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'intro-python',
    title: 'Python Basics',
    slug: 'python-basics',
    description: 'Learn the fundamentals of Python programming from scratch.',
    icon: 'Terminal',
    level: 'Beginner',
    lessons: [
      {
        id: 'py-var-1',
        title: 'Introduction to Variables',
        slug: 'intro-to-variables',
        xpReward: 100,
        content: `
# Introduction to Variables

In programming, a **variable** is like a container that stores a value. Imagine you have a box, and you label it "age". Inside the box, you put the number 25. Now, whenever you refer to "age", Python knows you're talking about the number 25.

### Declaring a Variable

In Python, creating a variable is simple. You just give it a name and use the equal sign (\`=\`) to assign a value to it.

\`\`\`python
name = "Alice"
age = 25
is_student = True
\`\`\`

### Why use variables?

Variables allow us to:
1. **Reuse values** without retyping them.
2. **Make code readable** (e.g., \`price\` is clearer than just \`9.99\`).
3. **Change values** easily throughout a program.
        `,
        codeExample: {
          language: 'python',
          code: `name = "CodePath"\nstars = 5\n\nprint("Welcome to " + name)\nprint("Rating: " + str(stars) + " stars")`
        },
        exercises: [
          {
            id: 'ex-py-1',
            type: 'multiple-choice',
            question: 'What is the purpose of a variable in programming?',
            options: [
              'To run a loop',
              'To store data values',
              'To define a function',
              'To import a library'
            ],
            correctAnswer: 'To store data values'
          },
          {
            id: 'ex-py-2',
            type: 'fill-in-the-blank',
            question: 'In Python, we use the ____ sign to assign a value to a variable.',
            correctAnswer: '='
          },
          {
            id: 'ex-py-3',
            type: 'code-challenge',
            question: 'Create a variable named "score" and assign it the value 100.',
            inputTemplate: '# Write your code below\n',
            correctAnswer: 'score = 100',
            testCases: [
              { input: '', output: 'score = 100' }
            ]
          }
        ]
      },
      {
        id: 'py-types-1',
        title: 'Data Types',
        slug: 'data-types',
        xpReward: 100,
        content: `
# Data Types

Every value in Python has a **data type**. Common ones include:

1. **Strings (str)**: Text, like \`"Hello"\`.
2. **Integers (int)**: Whole numbers, like \`10\`.
3. **Floats (float)**: Decimal numbers, like \`3.14\`.
4. **Booleans (bool)**: True or False.

Python is "dynamically typed", which means you don't have to specify the type when creating a variable!
        `,
        exercises: [
          {
            id: 'ex-py-4',
            type: 'multiple-choice',
            question: 'Which of these is a boolean value?',
            options: ['"True"', 'True', '1.0', '0'],
            correctAnswer: 'True'
          }
        ]
      },
      {
        id: 'py-cond-1',
        title: 'Control Flow: If Statements',
        slug: 'if-statements',
        xpReward: 150,
        content: `
# Control Flow: If Statements

Programs need to make decisions. In Python, we use \`if\`, \`elif\`, and \`else\` to control the flow of our code based on conditions.

### Syntax
\`\`\`python
if condition:
    # do something
elif other_condition:
    # do something else
else:
    # do if nothing else matches
\`\`\`

**Note:** Indentation is crucial in Python! It tells Python which code belongs inside the \`if\` block.
        `,
        codeExample: {
          language: 'python',
          code: `temperature = 25\n\nif temperature > 30:\n    print("It's hot!")\nelif temperature > 20:\n    print("It's nice.")\nelse:\n    print("It's cold!")`
        },
        exercises: [
          {
            id: 'ex-py-if-1',
            type: 'multiple-choice',
            question: 'What keyword do you use for additional conditions after an "if"?',
            options: ['elseif', 'else if', 'elif', 'otherwise'],
            correctAnswer: 'elif'
          },
          {
            id: 'ex-py-if-2',
            type: 'code-challenge',
            question: 'Write an if statement that prints "Big" if "num" is greater than 10.',
            inputTemplate: 'num = 15\n# Write your if statement below\n',
            correctAnswer: 'if num > 10:\n    print("Big")',
            hint: 'Don\'t forget the colon (:) at the end of the if line!'
          }
        ]
      },
      {
        id: 'py-loop-1',
        title: 'Loops: While and For',
        slug: 'loops',
        xpReward: 150,
        content: `
# Loops: While and For

Loops allow you to repeat a block of code multiple times.

### For Loops
Use a \`for\` loop to iterate over a sequence (like a list or a range).
\`\`\`python
for i in range(5):
    print(i) # Prints 0 to 4
\`\`\`

### While Loops
Use a \`while\` loop to repeat code as long as a condition is true.
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`
        `,
        codeExample: {
          language: 'python',
          code: `fruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print(f"I love {fruit}!")`
        },
        exercises: [
          {
            id: 'ex-py-loop-1',
            type: 'fill-in-the-blank',
            question: 'In Python, the \`range(5)\` function generates numbers from 0 up to (but not including) ____.',
            correctAnswer: '5'
          }
        ]
      },
      {
        id: 'py-func-1',
        title: 'Functions',
        slug: 'functions',
        xpReward: 200,
        content: `
# Functions

Functions are blocks of reusable code. You define them once and "call" them whenever you need them.

### Defining a Function
Use the \`def\` keyword:
\`\`\`python
def greet(name):
    return "Hello, " + name
\`\`\`

### Calling a Function
\`\`\`python
message = greet("Alice")
print(message)
\`\`\`
        `,
        exercises: [
          {
            id: 'ex-py-func-1',
            type: 'code-challenge',
            question: 'Define a function called "add_five" that takes one parameter "n" and returns n + 5.',
            inputTemplate: '# Define your function here\n',
            correctAnswer: 'def add_five(n):\n    return n + 5'
          }
        ]
      }
    ]
  },
  {
    id: 'web-dev-1',
    title: 'HTML & CSS',
    slug: 'html-css',
    description: 'Learn the building blocks of the web.',
    icon: 'Globe',
    level: 'Beginner',
    lessons: [
      {
        id: 'html-1',
        title: 'HTML Structure',
        slug: 'html-structure',
        xpReward: 100,
        content: `
# HTML Structure

HTML (HyperText Markup Language) is the skeleton of every website. It uses **tags** to define elements like headings, paragraphs, and links.

### Basic Tags
- \`<h1>\` to \`<h6>\`: Headings
- \`<p>\`: Paragraph
- \`<a>\`: Anchor (Link)
- \`<div>\`: Container element

### Tag Syntax
Most tags have an opening tag and a closing tag:
\`\`\`html
<p>This is a paragraph.</p>
\`\`\`
        `,
        exercises: [
          {
            id: 'ex-html-1',
            type: 'multiple-choice',
            question: 'Which tag is used for the main heading of a page?',
            options: ['<head>', '<h1>', '<main>', '<header>'],
            correctAnswer: '<h1>'
          }
        ]
      },
      {
        id: 'css-1',
        title: 'CSS Basics',
        slug: 'css-basics',
        xpReward: 100,
        content: `
# CSS Basics

CSS (Cascading Style Sheets) is used to style and lay out web pages. You can change colors, fonts, spacing, and more.

### Selectors
A CSS selector points to the HTML element you want to style.
\`\`\`css
p {
  color: blue;
  font-size: 16px;
}
\`\`\`

Here, \`p\` is the selector, and \`color: blue;\` is a declaration.
        `,
        exercises: [
          {
            id: 'ex-css-1',
            type: 'multiple-choice',
            question: 'What property is used to change the text color of an element?',
            options: ['font-color', 'text-style', 'color', 'background'],
            correctAnswer: 'color'
          }
        ]
      }
    ]
  },
  {
    id: 'cpp-1',
    title: 'C++ Masterclass',
    slug: 'cpp-masterclass',
    description: 'Master C++ for competitive programming and systems development.',
    icon: 'Code2',
    level: 'Intermediate',
    lessons: [
      {
        id: 'cpp-io',
        title: 'C++ Input/Output',
        slug: 'cpp-io',
        xpReward: 100,
        content: `
# C++ Input/Output

C++ is known for its speed. In competitive programming, we often use \`cin\` and \`cout\` for efficiency.

### Basic Syntax
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    cout << "Value: " << x << endl;
    return 0;
}
\`\`\`

### Faster I/O
To make \`cin\` and \`cout\` faster:
\`\`\`cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
\`\`\`
        `,
        exercises: [
          {
            id: 'ex-cpp-1',
            type: 'multiple-choice',
            question: 'Which object is used for output in C++?',
            options: ['cin', 'printf', 'cout', 'output'],
            correctAnswer: 'cout'
          }
        ]
      }
    ]
  }
];
