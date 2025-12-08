import { partOneSolver, partTwoSolver } from './solver';

describe('Day 3', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await partOneSolver('src/2025/03/fixtures/sample.txt')).toBe(357);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await partOneSolver('src/2025/03/star.txt')).toBe(17107);
    });
  });

  describe.only('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await partTwoSolver('src/2025/03/fixtures/sample.txt')).toBe(3121910778619);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await partTwoSolver('src/2025/03/star.txt')).toBe(169349762274117);
    });
  });
});
