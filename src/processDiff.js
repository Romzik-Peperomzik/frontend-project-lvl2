import formatter from './formatter/index.js';
import parseFile from './parsers.js';
import diff from './diff.js';

const processDiffFiles = (filePath1, filepath2, formatType = 'stylish') => {
  const parsedFiles = [filePath1, filepath2].map((filePath) => parseFile(filePath));
  const arrayWithObjectsForFormatting = diff(...parsedFiles);
  const format = formatter(formatType);
  return format(arrayWithObjectsForFormatting);
};

export default processDiffFiles;
