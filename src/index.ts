import { processInput } from './cli';
import * as readline from 'readline';

let input: string[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', (line: string) => {
  input.push(line);
});

rl.on('close', () => {
  const output = processInput(input);
  console.log(output);
});