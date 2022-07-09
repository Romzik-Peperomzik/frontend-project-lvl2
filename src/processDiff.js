import _ from 'lodash';
import parseFile from './parsers.js';

const processDiffFiles = (filePath1, filepath2, replacer = ' ', spacesCount = 4) => {
  const iter = (obj1, obj2, depth = 1) => {
    const keys = _.sortedUniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const plusIndent = `${replacer.repeat(indentSize - 2)}+ `;
    const minusIndent = `${replacer.repeat(indentSize - 2)}- `;
    // const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const foo = keys.map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isEqual(obj1[key], obj2[key])) {
          return `${currentIndent}${key}: ${obj1[key]}`;
        }
        return `${minusIndent}${key}: ${obj1[key]}\n${plusIndent}${key}: ${obj2[key]}`;
      }
      if (_.has(obj1, key)) {
        return `${minusIndent}${key}: ${obj1[key]}`;
      }
      return `${plusIndent}${key}: ${obj2[key]}`;
    });
    // console.log(foo);
    return foo;
  };

  const parsedFiles = [filePath1, filepath2].map((filePath) => parseFile(filePath));
  const arrayToFormatting = iter(...parsedFiles);
  console.log(`{\n${arrayToFormatting.join('\n').replaceAll('\n\n', '\n')}\n}`);
  return `{\n${arrayToFormatting.join('\n').replaceAll('\n\n', '\n')}\n}`;
};

export default processDiffFiles;
