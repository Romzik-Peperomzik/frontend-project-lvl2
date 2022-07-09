import { expect, test, beforeAll } from '@jest/globals';
import processDiffFiles from '../src/processDiff.js';
import { getFixturePath, readFile } from '../src/readFiles.js';

let expectedAnswer;
let jsonFilePath1;
let jsonFilePath2;
let yamlFilePath1;
let yamlFilePath2;

beforeAll(() => {
  expectedAnswer = readFile(getFixturePath('processDiff.flat.expected.txt'));
  const fileNames = [
    'file1.json',
    'file2.json',
    'file1.yaml',
    'file2.yaml',
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
