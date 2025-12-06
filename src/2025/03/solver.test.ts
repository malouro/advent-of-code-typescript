import solver from './solver';

describe('Day 3', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/03/fixtures/sample.txt')).partOne).toBe(357);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/03/star.txt')).partOne).toBe(17107);
    });
  });

  describe.skip('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2025/03/sample1.txt')).partTwo).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2025/03/star.txt')).partTwo).toBe(0);
    });
  });
});
