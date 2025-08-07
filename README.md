# Martian Robots

Mars Robot Challenge

## Description

### Approach

Attempting this task, I adopted an iterative, modular, test-driven approach, with focus on simplicity using a functional paradigm. Following the `red, green, refactor` TDD framework, I began implementing the smallest units of functioanlity then gradually expanded them to build a more complex structure. The steps for this framework are outlined below:

1. Write a test for a unit of functionality to develop
2. Implement the functionality/logic until the test passes
3. Refactor to build upon previous code, to produce more complex functionality

An example as part of this task is initailly writing a test for the basic function of changing the robot orientation to the left. Then implementing the logic and functionality for the test to pass. Finally, refactoring the test to expand the function so it can handle right turns. This is carried out in cyclical fashion unitl we have a larger stucture. 

---

### Tech Choices

I chose TypeScript for its typing system, great tooling, and vast ecosystem offered with NodeJS. The use of TypeScript helped with catching errors early during development and made the code easier to read and maintain. As part of this task, I implemented a CLI interface, by integrating inquirer.js, an NPM package which helped with parsing and accepting user input.

During development I opted to use Vitest for its seamless 'out-of-the-box' ESM and TypeScript support, allowing me to setup and run tests without excessive boilerplate or configuration. Arranging the project into separate files/folders (src, utils, tests) helped with structure and aided the clean, modular approach.
TypeScript Execute (tsx) has been selected to run `.ts` files, again featuring seamless execution of TypeScript with support for ESM without the need for any configuration.


Overall, this modular and test driven approach allowed me to build quickly and made modifications and new functionality easier to implement.
  

## Getting Started
You will need to have the NodeJS runtime installed on your machine to run this solution.
The following commands must be entered in your terminal.

1. Clone the repo
   ```bash
   git clone https://github.com/xavgmjier/mars-robots.git
   cd martian-robots    # change the working directory to that of the project
   ```
2. Install dependencies
   ```bash
   npm install  # install the necessary npm packages to run the project
   ```
3. Run Program Or Test suite
   ```bash
   npm start              # run CLI program
   npm run test           # run test suite
   npm run test-watch     # run test suite in watch mode
   ```

---
### Running the program

<img width="506" height="187" alt="Image" src="https://github.com/user-attachments/assets/e0cb470a-024b-4b91-83c5-df9160701af9" />

This solution allows for entering an input through a CLI, upon which the program will return a corresponding output.

When running the program, the default text editor will be opened (vim on Linux/MacOS, notepad on Windows).

On windows, simply save the file that nodepad opens after the input has been entered, then close the notepad window.

On Linux or MacOS, Vim will open, to begin input, hit the `i` key to enter 'insert mode', then enter your input string. After entering an input, save changes and exit the editor, to do this press the `esc` key to exit insert mode then type `:wq` OR `:x` and hit `enter`.

Your output will be displayed.

When running the tests, they can be run as a single instance or in watch mode. Watch mode will keep track of changes to test files and re-run them automatically.

