import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;
const fileName = './data/grades.json';

export const readGradesFile = async () => {
  return JSON.parse(await readFile(fileName));
};

export const updateGradesFile = async (data) => {
  await writeFile(fileName, JSON.stringify(data));
};
