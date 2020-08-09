import { readGradesFile, updateGradesFile } from '../utils/file.js';
import calc from '../utils/calc.js';

const insertGrade = async (grade) => {
  const data = await readGradesFile();

  const newGrade = {
    id: data.nextId++,
    subject: grade.subject,
    student: grade.student,
    type: grade.type,
    value: grade.value,
    timestamp: new Date(),
  };

  data.grades.push(newGrade);

  await updateGradesFile(data);
  return newGrade;
};

const updateGrade = async (grade) => {
  const data = await readGradesFile();

  const index = data.grades.findIndex((x) => x.id == grade.id);
  if (index === -1) {
    throw new Error('Grade does not exist!');
  }
  data.grades[index].subject = grade.subject;
  data.grades[index].student = grade.student;
  data.grades[index].type = grade.type;
  data.grades[index].value = grade.value;
  data.grades[index].timestamp = new Date();

  await updateGradesFile(data);

  return data.grades[index];
};

const deleteGrade = async (id) => {
  const data = await readGradesFile();
  const index = data.grades.findIndex((x) => x.id === id);
  if (index === -1) {
    throw new Error('Grade does not exist!');
  }
  data.grades = data.grades.filter((grade) => grade.id !== id);
  await updateGradesFile(data);
};

const getGrade = async (id) => {
  const data = await readGradesFile();
  const index = data.grades.findIndex((grade) => grade.id === id);
  if (index === -1) {
    throw new Error('Grade does not exist!');
  }
  const grade = data.grades.find((grade) => grade.id === id);
  return grade;
};

const getTotalGrades = async (student, subject) => {
  const data = await readGradesFile();
  const grades = data.grades
    .filter((grade) => grade.student === student && grade.subject === subject)
    .map((grade) => grade.value);
  const total = calc.sum(grades);
  return { total: total };
};

const getMeanGrades = async (subject, type) => {
  const data = await readGradesFile();
  const grades = data.grades
    .filter((grade) => grade.subject === subject && grade.type === type)
    .map((grade) => grade.value);
  const total = calc.mean(grades);
  return { mean: total };
};

const getBestGrades = async (subject, type, amount) => {
  const data = await readGradesFile();
  const grades = data.grades
    .filter((grade) => grade.subject === subject && grade.type === type)
    .sort((a, b) => b.value - a.value)
    .slice(0, amount);
  return grades;
};

export {
  insertGrade,
  updateGrade,
  deleteGrade,
  getGrade,
  getTotalGrades,
  getMeanGrades,
  getBestGrades,
};
