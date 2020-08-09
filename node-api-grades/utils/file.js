import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

export const readGradesFile = async () => {
  return JSON.parse(await readFile('grades.json'));
};

export const updateGradesFile = async (data) => {
  await writeFile('grades.json', JSON.stringify(data));
};
