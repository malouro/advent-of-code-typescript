import solver from './solver';

describe('Day 7', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/07/fixtures/sample.txt')).partOne).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/07/star.txt')).partOne).toBe(0);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/07/fixtures/sample.txt')).partTwo).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/07/star.txt')).partTwo).toBe(0);
    });
  });
});
