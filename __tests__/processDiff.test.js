import { expect, test, beforeAll } from '@jest/globals';
import processDiffFiles from '../src/processDiff.js';
import { getFixturePath, readFile } from '../src/readFiles.js';

let expectedAnswer;
let jsonFilePath1;
let jsonFilePath2;
let yamlFilePath1;
let yamlFilePath2;

beforeAll(() => {
  expectedAnswer = readFile(getFixturePath('processDiff.nested.expected.txt'));
  const fileNames = [
    'file1_nested.json',
    'file2_nested.json',
    'file1_nested.yaml',
    'file2_nested.yaml',
  ];
  [
    jsonFilePath1,
    jsonFilePath2,
    yamlFilePath1,
    yamlFilePath2,
  ] = fileNames.map((fileName) => getFixturePath(fileName));
});

test('processDiffFiles', () => {
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2)).toEqual(expectedAnswer);
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2)).toEqual(expectedAnswer);
});
