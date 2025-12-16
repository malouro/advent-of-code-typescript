import { solvePartOne, solvePartTwo } from './solver';

describe('Day 6', () => {
  describe.skip('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solvePartOne('src/2025/06/fixtures/sample.txt')).toBe(4277556);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solvePartOne('src/2025/06/star.txt')).toBe(5877594983578);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solvePartTwo('src/2025/06/fixtures/sample.txt')).toBe(3263827);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solvePartTwo('src/2025/06/star.txt')).toBe(0);
    });
  });
});
