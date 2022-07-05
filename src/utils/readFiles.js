// import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
// import { fileURLToPath } from 'url';

// const filePath = fileURLToPath(import.meta.url);
// const dirPath = dirname(filePath);

const getFormat = (filename) => filename.split('.')[1];

// const getFixturePath = (filename) => resolve(dirPath, '..', '..', filename);
// const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const readFile = (filename) => readFileSync(filename, 'utf8');
const readJSON = (filename) => JSON.parse(readFileSync(filename, 'utf8'));
// const readJSON = (filename) => JSON.parse(readFileSync(getFixturePath(filename), 'utf-8'));

export { getFormat, readFile, readJSON };
