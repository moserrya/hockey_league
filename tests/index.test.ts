import { spawn } from 'child_process';
import path from 'path';

describe("Command Line Script (index.ts)", () => {
    it("should process the input file correctly", (done) => {
        const scriptPath = path.resolve(__dirname, '../dist/index.js');
        
        // Sample input as if provided via a text file
        const input = [
            "Lions 3, Snakes 3",
            "Tarantulas 1, FC Awesome 0",
            "Lions 1, FC Awesome 1",
            "Tarantulas 3, Snakes 1",
            "Lions 4, Grouches 0"
        ].join("\n");

        const expectedOutput = 
            "1. Tarantulas: 6 pts\n" +
            "2. Lions: 5 pts\n" +
            "3. Snakes: 1 pt\n" +
            "3. FC Awesome: 1 pt\n" +
            "5. Grouches: 0 pts";

        // Spawn a child process to run the compiled JavaScript script
        const child = spawn('node', [scriptPath]);

        let actualOutput = '';

        // Listen for output data from stdout
        child.stdout.on('data', (data) => {
            actualOutput += data.toString();
        });

        // Write input data to stdin
        child.stdin.write(input);
        child.stdin.end();

        // Wait for the process to complete
        child.on('close', () => {
            expect(actualOutput.trim()).toBe(expectedOutput);
            done();
        });
    });
});