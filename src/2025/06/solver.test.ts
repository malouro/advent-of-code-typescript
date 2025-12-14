import solver from './solver';

describe('Day 6', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/06/fixtures/sample.txt')).partOne).toBe(4277556);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/06/star.txt')).partOne).toBe(5877594983578);
    });
  });

  describe.skip('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/06/fixtures/sample.txt')).partTwo).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/06/star.txt')).partTwo).toBe(0);
    });
  });
});
