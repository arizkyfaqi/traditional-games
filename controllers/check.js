const data = [
  {
    '2b6ebbdc-2495-49c2-8fcf-4a8488abaf31': 1,
    '3b614232-6631-4a1e-b55d-92c41dd8b420': 0,
  },
  {
    '2b6ebbdc-2495-49c2-8fcf-4a8488abaf31': 1,
    '3b614232-6631-4a1e-b55d-92c41dd8b420': 0,
  },
  {
    '2b6ebbdc-2495-49c2-8fcf-4a8488abaf31': 0,
    '3b614232-6631-4a1e-b55d-92c41dd8b420': 1,
  },
];

const parse = (data) => {
  const res = {};
  data.forEach((item) => {
    Object.keys(item).map((key) => {
      if (!res[key]) {
        res[key] = item[key];
      } else {
        res[key] += item[key];
      }
    });
  });
  return res;
};

const expected = {
  1: 1,
  2: 2,
};
console.log(data);
console.log('------------');
console.log(parse(data));
