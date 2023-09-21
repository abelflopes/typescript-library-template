/**
 * Perform the sum of the provided numbers
 * @param numbers - infinite list of numbers to sum
 * @returns
 */

export const sum = (...numbers: number[]): number =>
  numbers.reduce((previousValue, currentValue) => currentValue + previousValue);
