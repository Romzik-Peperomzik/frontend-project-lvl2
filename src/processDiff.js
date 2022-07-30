import fs from 'fs';
import { extname } from 'node:path';
import formatter from './formatters/index.js';
import parse from './parsers.js';
import makeAST from './processAST.js';

const readFileAndType = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  const type = extname(filepath).slice(1);
  return [data, type];
};

const genDiff = (filePath1, filePath2, formatType = 'stylish') => {
  const [parsedData1, parsedData2] = [filePath1, filePath2]
    .map((fp) => readFileAndType(fp))
    .map(([data, type]) => parse(data, type));
  const processedAST = makeAST(parsedData1, parsedData2);
  const format = formatter(formatType);
  return format(processedAST);
};

export default genDiff;
