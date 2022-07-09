import * as yaml from 'js-yaml';
import { extname } from 'node:path';
import { readFile } from './readFiles.js';

const parseFile = (filePath) => {
  const extension = extname(filePath);
  switch (extension) {
    case '.yml':
    case '.yaml':
      return yaml.load(readFile(filePath));
    default: // .js
      return JSON.parse(readFile(filePath));
  }
};

export default parseFile;
