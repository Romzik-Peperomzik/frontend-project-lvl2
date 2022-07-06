import _ from 'lodash';
import parseFile from './parsers.js';

const processDiffFiles = (...filePaths) => {
  const processParsedFiles = (file1, file2) => {
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

  const parsedFiles = filePaths.map((filePath) => parseFile(filePath));
  const parsedFilesDiffArray = processParsedFiles(...parsedFiles);
  console.log(`{\n  ${parsedFilesDiffArray.join('\n  ').replaceAll('\n\n', '\n')}\n}`);
  return `{\n  ${parsedFilesDiffArray.join('\n  ').replaceAll('\n\n', '\n')}\n}`;
};

export default processDiffFiles;
