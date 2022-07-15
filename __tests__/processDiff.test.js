import { expect, test, beforeAll } from '@jest/globals';
import processDiffFiles from '../src/processDiff.js';
import { getFixturePath, readFile } from '../src/readFiles.js';

let expectedAnswerDefaultStyle;
let expectedAnswerPlainStyle;
let jsonFilePath1;
let jsonFilePath2;
let yamlFilePath1;
let yamlFilePath2;

beforeAll(() => {
  expectedAnswerDefaultStyle = readFile(getFixturePath('processDiff.stylish.expected.txt'));
  expectedAnswerPlainStyle = readFile(getFixturePath('processDiff.plain.expected.txt'));
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

test('processDiffFilesDefaultStyle', () => {
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2)).toEqual(expectedAnswerDefaultStyle);
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2)).toEqual(expectedAnswerDefaultStyle);
});

test('processDiffFilesPlainStyle', () => {
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2, 'plain')).toEqual(expectedAnswerPlainStyle);
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2, 'plain')).toEqual(expectedAnswerPlainStyle);
});
