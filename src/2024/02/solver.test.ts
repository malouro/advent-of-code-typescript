import solver from './solver';

describe('Day 2', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2024/2/sample1.txt')).partOne).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2024/2/star.txt')).partOne).toBe(0);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2024/2/sample1.txt')).partTwo).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2024/2/star.txt')).partTwo).toBe(0);
    });
  });
});
