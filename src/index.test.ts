import { sum } from "./index";

describe("Sum", () => {
  it("should correctly return the sum of the provided numbers", () => {
    expect(sum(1, 2, 3)).toBe(8);
  });
});
