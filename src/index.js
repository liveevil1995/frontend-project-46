import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'process';
import parser from './parser.js';
import formattersFunc from './formattersFiles/index.js';
import buildDiffTree from './buildDiffTree.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parser(fs.readFileSync(path.resolve(`${cwd()}`, filepath1), 'utf8'), path.extname(filepath1).slice(1));
  const obj2 = parser(fs.readFileSync(path.resolve(`${cwd()}`, filepath2), 'utf8'), path.extname(filepath2).slice(1));
  return formattersFunc(buildDiffTree(obj1, obj2), format);
};

export default genDiff;
