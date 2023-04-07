#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';



const program = new Command();

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const diff = gendiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse();


