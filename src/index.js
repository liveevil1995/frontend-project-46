import _ from 'lodash';
import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'process';
import formatter from './formatter.js';
import parser from './parser.js';

const gendiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(`${cwd()}`, filepath1), 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(`${cwd()}`, filepath2), 'utf8'));
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const diff = keys.map((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value: obj1[key],
      };
    }

    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {
        type: 'added',
        key,
        value: obj2[key],
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        type: 'changed',
        key,
        value: obj1[key],
        value2: obj2[key],
      };
    }

    if (obj1[key] === obj2[key]) {
      return {
        type: 'unchanged',
        key,
        value: obj1[key],
      };
    }
  });
  return formatter(diff);
};

export default gendiff;
