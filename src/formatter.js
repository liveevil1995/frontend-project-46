import _ from 'lodash';

const formatter = (data) => {
  const lines = data.flatMap(
    ({
      type, key, value, value2,
    }) => {
      switch (type) {
        case 'added':
          return `  + ${key}: ${value}`;
        case 'deleted':
          return `  - ${key}: ${value}`;
        case 'unchanged':
          return `    ${key}: ${value}`;
        case 'changed':
          return [
            `  - ${key}: ${value}`,
            `  + ${key}: ${value2}`,
          ];
      }
    },
  );
  return `{\n${lines.join('\n')}\n}`;
};

export default formatter;
