import formatter from './formatters/index.js';
import parseFile from './parsers.js';
import makeAST from './processAST.js';

const processDiffFiles = (filePath1, filepath2, formatType = 'stylish') => {
  const parsedFiles = [filePath1, filepath2].map((filePath) => parseFile(filePath));
  const processedAST = makeAST(...parsedFiles);
  const format = formatter(formatType);
  return format(processedAST);
};

export default processDiffFiles;
