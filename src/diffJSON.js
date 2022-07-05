import _ from 'lodash';
import { readFileSync } from 'node:fs';

const getDiffJSON = (...filePaths) => {
  const processJSONFiles = (file1, file2) => {
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

  const parsedJSONFiles = filePaths.map((filePath) => JSON.parse(readFileSync(filePath, 'utf8')));
  const jsonFilesDiffArray = processJSONFiles(...parsedJSONFiles);
  // console.log(`{\n  ${jsonFilesDiffArray.join('\n  ').replaceAll('\n\n', '\n')}\n}`);
  return `{\n  ${jsonFilesDiffArray.join('\n  ').replaceAll('\n\n', '\n')}\n}`;
};

export default getDiffJSON;
