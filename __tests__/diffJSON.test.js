import { expect, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import getDiffJSON from '../src/diffJSON.js';

test('getDiffJSON', () => {
  const [jsonFilePath1, jsonFilePath2, answerFilePath] = [
    './__fixtures__/file1.json',
    './__fixtures__/file2.json',
    './__fixtures__/getDiffJSON.expected.txt',
  ];

  const expectedAnswer = readFileSync(answerFilePath, 'utf8');
  expect(getDiffJSON(jsonFilePath1, jsonFilePath2)).toEqual(expectedAnswer);
});
