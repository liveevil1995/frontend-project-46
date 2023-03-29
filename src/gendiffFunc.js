import _ from 'lodash';

const gendiff = (obj1, obj2) => {
    const keys = _.sortBy([...Object.keys(obj1), ...Object.keys(obj2)]);
    const diff = {};
    keys.map(key => {
      if (!_.isEqual(obj1[key], obj2[key])) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
          diff[`- ${key}`] = obj1[key];
          diff[`+ ${key}`] = obj2[key];
        } else if (obj1.hasOwnProperty(key)) {
          diff[`- ${key}`] = obj1[key];
        } else {
          diff[`+ ${key}`] = obj2[key];
        }
      }
      if (_.isEqual(obj1[key], obj2[key])) {
        diff[`${key}`] = obj1[key];
      }
    });
    return diff;
  }

  export default gendiff;