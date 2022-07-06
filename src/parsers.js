import { extname } from 'node:path';
import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';

const parseFile = (filePath) => {
  const extension = extname(filePath);
  switch (extension) {
    case '.yml':
    case '.yaml':
      return yaml.load(readFileSync(filePath, 'utf8'));
    default: // .js
      return JSON.parse(readFileSync(filePath, 'utf8'));
  }
};

export default parseFile;
