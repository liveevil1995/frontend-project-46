import _ from 'lodash';

const gendiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const diff = keys.map((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        type: 'deleted',
        key: key,
        value: obj1[key]
      }
    }

    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      return {
        type: 'added',
        key: key,
        value: obj2[key]
      }
    }

    if (obj1[key] !== obj2[key]) {
      return {
        type: 'changed',
        key: key,
        value: obj1[key],
        value2: obj2[key]
      }
    }

    if (obj1[key] === obj2[key]) {
      return {
        type: 'unchanged',
        key: key,
        value: obj1[key]
      }
    }
  });
  return diff;
};

export default gendiff;
