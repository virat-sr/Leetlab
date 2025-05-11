{
  "title": "Multiply Two Numbers",
  "description": "Given 2 numbers, multiply them.",
  "difficulty": "EASY",
  "tags": ["maths", "operators", "numbers"],
  "examples": {
    "PYTHON": {
      "input": "3 7",
      "output": "21",
      "explanation": "Multiplying 3 and 7 gives 21."
    },
    "JAVASCRIPT": {
      "input": "-5 12",
      "output": "-60",
      "explanation": "Multiplying -5 and 12 gives -60."
    }
  },
  "constraints": "-10^9 ≤ a, b ≤ 10^9",
  "testCases": [
    {
      "input": "100 200",
      "output": "20000"
    },
    {
      "input": "-500 -600",
      "output": "300000"
    },
    {
      "input": "0 1234",
      "output": "0"
    }
  ],
  "codeSnippet": {
    "JAVASCRIPT": "const fs = require('fs');\n\nfunction multiplyTwoNumbers(a, b) {\n    // Write your code here\n    // Return the product of a and b\n    return a * b;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(multiplyTwoNumbers(a, b));",
    "PYTHON": "def multiply_two_numbers(a, b):\n    # Write your code here\n    # Return the product of a and b\n    return a * b\n\nimport sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(multiply_two_numbers(a, b))",
    "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static int multiplyTwoNumbers(int a, int b) {\n        // Write your code here\n        // Return the product of a and b\n        return a * b;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(multiplyTwoNumbers(a, b));\n    }\n}"
  },
  "referenceSolution": {
    "JAVASCRIPT": "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\nconsole.log(a * b);",
    "PYTHON": "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(a * b)",
    "JAVA": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a * b);\n    }\n}"
  }
}
