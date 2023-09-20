export const sum = (...numbers: number[]): number =>
  numbers.reduce((prev, curr) => curr + prev);
