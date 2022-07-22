import formatter from './formatters/index.js';
import parseFile from './parsers.js';
import makeAST from './processAST.js';
import readFileAndType from './readFiles.js';

const processDiffFiles = (filePath1, filePath2, formatType = 'stylish') => {
  const dataWithTypes = [filePath1, filePath2].map((fp) => readFileAndType(fp));
  const parsedDataset = dataWithTypes.map(([data, type]) => parseFile(data, type));
  const processedAST = makeAST(...parsedDataset);
  const format = formatter(formatType);
  return format(processedAST);
};

export default processDiffFiles;
