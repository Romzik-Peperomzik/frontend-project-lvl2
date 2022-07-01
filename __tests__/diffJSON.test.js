import { expect, test } from '@jest/globals';
import readfileSync from 'fs';

import readJSON from '../src/utils/readJSON.js';
import getDiffJSON from '../src/diffJSON.js';

test('getDiffJSON', () => {
  const filePaths = ['../__fixtures__/file1.json', '../__fixtures__/file2.json'];
  const answerFile = '../__fixtures__/getDiffJSON.expected.txt';

  const [jsonFile1, jsonFile2] = filePaths.map((path) => readJSON(path));
  const getDiffJSONExpectedAnsw = readfileSync(answerFile);
  expect(getDiffJSON(jsonFile1, jsonFile2)).toEqual(getDiffJSONExpectedAnsw);
});
