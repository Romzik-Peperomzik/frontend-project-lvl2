import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);

const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

export { readFile, getFixturePath };
