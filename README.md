# Hockey League CLI

This command-line tool is built using TypeScript to calculate and rank hockey match results. It processes match data from `stdin` and outputs team rankings based on the following point system:

- 3 points for a win
- 1 point for a tie
- 0 points for a loss

The tool reads input data and calculates rankings accordingly.

## Prerequisites

To run this project, you need to have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:moserrya/hockey_league.git
   cd hockey_league
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Running the Application

This CLI reads input from `stdin`. You can provide input by redirecting a file or piping data into the script.

### Compile the Code

First, compile the TypeScript code into JavaScript:
```sh
npm run build
```

This will generate the compiled files in the `dist` directory.

### Run the Application

To run the application, pipe the input:
```sh
cat input.txt | npm run standings
```

Alternatively, you can use input redirection:
```sh
npm run standings < input.txt
```

The input should be in the format:
```
Lions 3, Snakes 3
Tarantulas 1, FC Awesome 0
Lions 1, FC Awesome 1
Tarantulas 3, Snakes 1
Lions 4, Grouches 0
```

## Running Tests

Automated tests have been written for the core logic of the application. The tests are implemented using Jest.

To run the tests:
```sh
npm test
```

This will run all the tests and provide output indicating whether they passed or failed.

## Available Scripts

- **`npm run build`**: Compiles the TypeScript code into JavaScript and outputs it to the `dist` directory.
- **`npm start`**: This is the main script that compiles the code and runs the application, allowing you to provide input via `stdin`.
- **`npm run standings`**: This is a shortcut for running the application after compiling the code through `npm run build`.
- **`npm test`**: Runs the automated tests using Jest.
- **`bash scripts/run.sh`**: This script compiles the code and runs the application and suppresses the build output.

## Project Structure

```
hockey_league/
  ├── src/
  │    └── cli.ts           # Main TypeScript file for the CLI
  ├── tests/
  │    └── cli.test.ts      # Jest tests for the CLI
  ├── dist/                 # Compiled JavaScript files
  ├── package.json          # Project configuration and scripts
  ├── tsconfig.json         # TypeScript configuration
  └── README.md             # Instructions for running the project
```

## Notes

- The application can be run directly using `npm start` as it automatically runs the build command first.
- If you need to make any modifications, remember to recompile using `npm run build`.
- The input format is important, as the application expects each line to represent a match result with two teams and their respective scores.

## Example Usage

Here is an example of how you can run the application with a sample input file:

1. Create a sample input file:
   ```sh
   echo -e "Lions 3, Snakes 3\nTarantulas 1, FC Awesome 0\nLions 1, FC Awesome 1" > input.txt
   ```

2. Run the application:
   ```sh
   cat input.txt | npm start
   ```

The output will display the rankings based on the match results provided.

