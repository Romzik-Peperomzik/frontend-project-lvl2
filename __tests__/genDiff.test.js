import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);

const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const expectedAnswerDefaultStyle = readFile(getFixturePath('genDiff.stylish.expected.txt'));
const expectedAnswerPlainStyle = readFile(getFixturePath('genDiff.plain.expected.txt'));
const expectedAnswerJSONStyle = readFile(getFixturePath('genDiff.json.expected.txt'));
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

test('genDiffDefaultStyle', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2)).toEqual(expectedAnswerDefaultStyle);
  expect(genDiff(yamlFilePath1, yamlFilePath2)).toEqual(expectedAnswerDefaultStyle);
});

test('genDiffPlainStyle', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, 'plain')).toEqual(expectedAnswerPlainStyle);
  expect(genDiff(yamlFilePath1, yamlFilePath2, 'plain')).toEqual(expectedAnswerPlainStyle);
});

test('genDiffJSONStyle', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, 'json')).toEqual(expectedAnswerJSONStyle);
  expect(genDiff(yamlFilePath1, yamlFilePath2, 'json')).toEqual(expectedAnswerJSONStyle);
});
