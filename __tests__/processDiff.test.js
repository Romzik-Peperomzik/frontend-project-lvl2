import { expect, test, beforeAll } from '@jest/globals';
import { readFileSync } from 'node:fs';
import processDiffFiles from '../src/processDiff.js';

let expectedAnswer;
beforeAll(() => { expectedAnswer = readFileSync('./__fixtures__/processDiffFiles.expected.txt', 'utf8'); });

test('processDiffFiles', () => {
  const [jsonFilePath1, jsonFilePath2] = ['./__fixtures__/file1.json', './__fixtures__/file2.json'];
  const [yamlFilePath1, yamlFilePath2] = ['./__fixtures__/file4.yaml', './__fixtures__/file5.yaml'];
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2)).toEqual(expectedAnswer);
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2)).toEqual(expectedAnswer);
});
