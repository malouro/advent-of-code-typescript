import { solvePartOne, solvePartTwo } from './solver';

describe('Day 5', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solvePartOne('src/2025/05/fixtures/sample.txt')).toBe(3);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solvePartOne('src/2025/05/star.txt')).toBe(840);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solvePartTwo('src/2025/05/fixtures/sample.txt')).toBe(0);
    });

    test.skip('solves correctly with puzzle input', async () => {
      expect(await solvePartTwo('src/2025/05/star.txt')).toBe(0);
    });
  });
});
