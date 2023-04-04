#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'process';
import gendiff from '../src/gendiffFunc.js';
import formatter from '../src/formatter.js';


const program = new Command();

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath1), 'utf8'));
    const file2 = JSON.parse(fs.readFileSync(path.resolve(cwd(), filepath2), 'utf8'));
    const diff = gendiff(file1, file2);
    
    console.log(formatter(diff));
  });

program.parse();


