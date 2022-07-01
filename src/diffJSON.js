import _ from 'lodash';
import readJSON from './utils/readJSON.js';

const getDiffJSON = (...filePaths) => {
  const parseJSONFiles = (file1, file2) => {
    const keys = _.sortedUniq([...Object.keys(file1), ...Object.keys(file2)].sort());
    return keys.flatMap((key) => {
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        if (_.isEqual(file1[key], file2[key])) {
          return `  ${key}: ${file1[key]}`;
        }
        return [`- ${key}: ${file1[key]}`, `+ ${key}: ${file2[key]}`];
      }
      if (Object.hasOwn(file1, key)) {
        return `- ${key}: ${file1[key]}`;
      }
      return `+ ${key}: ${file2[key]}`;
    });
  };

  const jsonFiles = filePaths.map((filePath) => readJSON(filePath));
  const jsonDiffArray = parseJSONFiles(...jsonFiles);
  return `{\n  ${jsonDiffArray.join('\n  ').replaceAll('\n\n', '\n')}\n}`;
};

export default getDiffJSON;
