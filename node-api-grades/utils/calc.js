const sum = (array) => {
  return array.reduce((acc, curr) => (acc += curr), 0);
};

const mean = (array) => {
  const s = sum(array);
  return s / array.length;
};

export default { mean, sum };
