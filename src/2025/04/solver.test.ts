import solver from './solver';

describe('Day 4', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/04/fixtures/sample.txt')).partOne).toBe(13);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/04/star.txt')).partOne).toBe(1540);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/04/fixtures/sample.txt')).partTwo).toBe(43);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/04/star.txt')).partTwo).toBe(8972);
    });
  });
});
