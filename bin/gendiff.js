#!/usr/bin/env node
import { program } from 'commander';
import getDiffJSON from '../src/diffJSON.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filepath1, filepath2) => getDiffJSON(filepath1, filepath2));

program.parse();
