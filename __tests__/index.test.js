import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8').trim();

test.each([
  ['file1.json', 'file2.json', 'stylish', 'result-stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'result-stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'result-plain.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'result-plain.txt'],
  ['file1.json', 'file2.json', 'json', 'result-json.txt'],
  ['file1.yml', 'file2.yml', 'json', 'result-json.txt'],
  ['file1.json', 'file2.json', undefined, 'result-stylish.txt'],
])('Examination genDiff', (file1, file2, format, resultFile) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const result = readFile(resultFile); expect(actual).toBe(result);
});
