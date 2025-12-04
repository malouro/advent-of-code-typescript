import solver from './solver';

describe('Day 1', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/01/sample1.txt')).partOne).toBe(3);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/01/star.txt')).partOne).toBe(1135);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/01/sample1.txt')).partTwo).toBe(6);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/01/star.txt')).partTwo).toBe(6558);
    });
  });
});
