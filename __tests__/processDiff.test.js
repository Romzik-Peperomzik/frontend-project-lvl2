import { expect, test } from '@jest/globals';
import processDiffFiles from '../src/processDiff.js';
import { getFixturePath, readFile } from '../src/readFiles.js';

const expectedAnswerDefaultStyle = readFile(getFixturePath('processDiff.stylish.expected.txt'));
const expectedAnswerPlainStyle = readFile(getFixturePath('processDiff.plain.expected.txt'));
const expectedAnswerJSONStyle = readFile(getFixturePath('processDiff.json.expected.txt'));
const fileNames = [
  'file1.json',
  'file2.json',
  'file1.yaml',
  'file2.yaml',
];
const [
  jsonFilePath1,
  jsonFilePath2,
  yamlFilePath1,
  yamlFilePath2,
] = fileNames.map((fileName) => getFixturePath(fileName));

test('processDiffFilesDefaultStyle', () => {
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2)).toEqual(expectedAnswerDefaultStyle);
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2)).toEqual(expectedAnswerDefaultStyle);
});

test('processDiffFilesPlainStyle', () => {
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2, 'plain')).toEqual(expectedAnswerPlainStyle);
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2, 'plain')).toEqual(expectedAnswerPlainStyle);
});

test('processDiffFilesJSONStyle', () => {
  expect(processDiffFiles(jsonFilePath1, jsonFilePath2, 'json')).toEqual(expectedAnswerJSONStyle);
  expect(processDiffFiles(yamlFilePath1, yamlFilePath2, 'json')).toEqual(expectedAnswerJSONStyle);
});
