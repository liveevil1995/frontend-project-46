import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath1yml = getFixturePath('file1.yml');
const filepath2yml = getFixturePath('file2.yml');

const result = readFileSync(path.resolve(process.cwd(), '__fixtures__/result.txt'), 'utf-8');

test('Examination JSON', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(result);
  expect(genDiff(filepath1yml, filepath2yml)).toEqual(result);
});

test('Examination YML', () => {
  expect(genDiff(filepath1yml, filepath2yml)).toEqual(result);
});
