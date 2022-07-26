import fs from 'fs';
import { extname } from 'node:path';
import formatter from './formatters/index.js';
import parseFile from './parsers.js';
import makeAST from './processAST.js';

const readFileAndType = (filepath) => {
  const file = fs.readFileSync(filepath, 'utf-8');
  const type = extname(filepath).slice(1);
  return [file, type];
};

const genDiff = (filePath1, filePath2, formatType = 'stylish') => {
  const dataWithTypes = [filePath1, filePath2].map((fp) => readFileAndType(fp));
  const parsedDataset = dataWithTypes.map(([data, type]) => parseFile(data, type));
  const processedAST = makeAST(...parsedDataset);
  const format = formatter(formatType);
  return format(processedAST);
};

export default genDiff;
