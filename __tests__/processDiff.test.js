import { expect, test } from '@jest/globals';
import { readFileSync } from 'node:fs';
import processDiffFiles from '../src/processDiff.js';

test('getDiffJSON', () => {
  const [jsonFilePath1, jsonFilePath2, answerFilePath] = [
    './__fixtures__/file1.json',
    './__fixtures__/file2.json',
    './__fixtures__/processDiffFiles.expected.txt',
  ];

  const expectedAnswer = readFileSync(answerFilePath, 'utf8');
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2)).toEqual(expectedAnswer);
});

test('getDiffYAML', () => {
  const [yamlFilePath1, yamlFilePath2, answerFilePath] = [
    './__fixtures__/file4.yaml',
    './__fixtures__/file5.yaml',
    './__fixtures__/processDiffFiles.expected.txt',
  ];

  const expectedAnswer = readFileSync(answerFilePath, 'utf8');
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2)).toEqual(expectedAnswer);
});
