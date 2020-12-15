// app.test.js
// see https://jestjs.io/docs/en/api
// jest expects https://jestjs.io/docs/en/expect
const add = (a, b) => a + b;
test('should add two numbers', () => {
  const sum = add(3, 4);
  expect(sum).toBe(7);
});
 