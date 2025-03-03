const sum = require("./sum");

test("Suma 1 + 2 para dar 3", () => {
  expect(sum(1, 2)).toBe(3);
});
