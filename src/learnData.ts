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
          },
          {
            id: 'ex-py-5',
            type: 'code-challenge',
            question: 'Declare a string variable "city", an integer "population", and a boolean "is_capital". Print all three.',
            inputTemplate: '# Declare your variables\n\n\n# Print them\n',
            correctAnswer: 'city = "London"\npopulation = 9000000\nis_capital = True\nprint(city)\nprint(population)\nprint(is_capital)',
            hint: 'Make sure your string is in quotes, and remember that booleans like True must be capitalized in Python.'
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
    lessons: []
  }
];
