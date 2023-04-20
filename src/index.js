import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'process';
import parser from './parser.js';
import getFormattedContent from './formattersFiles/index.js';
import buildDiffTree from './buildDiffTree.js';

const getFileData = (filepath) => fs.readFileSync(path.resolve(`${cwd()}`, filepath), 'utf8');
const getExtensionFile = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parser(getFileData(filepath1), getExtensionFile(filepath1));
  const obj2 = parser(getFileData(filepath2), getExtensionFile(filepath2));
  return getFormattedContent(buildDiffTree(obj1, obj2), format);
};

export default genDiff;
