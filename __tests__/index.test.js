import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');

const stylish = readFileSync(path.resolve(process.cwd(), '__fixtures__/result.txt'), 'utf-8');

test('Examination JSON', () => {
  expect(gendiff(filepath1, filepath2)).toEqual(stylish);
});
