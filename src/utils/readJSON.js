import { readFileSync } from 'fs';

export default (filepath) => JSON.parse(readFileSync(filepath));
