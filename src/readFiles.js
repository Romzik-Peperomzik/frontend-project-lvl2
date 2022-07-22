import fs from 'fs';
import { extname } from 'node:path';

const readFileAndType = (filepath) => {
  const file = fs.readFileSync(filepath, 'utf-8');
  const type = extname(filepath);
  return [file, type];
};

export default readFileAndType;
