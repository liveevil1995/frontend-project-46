import _ from 'lodash';

const diffFunc = (data1, data2) => {
    const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
    const diff = keys.map((key) => {
    
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return { key, value: diffFunc(data1[key], data2[key]), type: 'nested' };
      }
  
      if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
        return {
          type: 'deleted',
          key,
          value: data1[key],
        };
      }
  
      if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
        return {
          type: 'added',
          key,
          value: data2[key],
        };
      }
  
      if (data1[key] !== data2[key]) {
        return {
          type: 'changed',
          key,
          value1: data1[key],
          value2: data2[key],
        };
      }
  
      if (data1[key] === data2[key]) {
        return {
          type: 'unchanged',
          key,
          value: data1[key],
        };
      }
    });
    return diff;
  };
  
  export default diffFunc;