import solver from './solver';

describe('Day 1', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/2024/01/sample1.txt')).partOne).toBe(11);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/2024/01/star.txt')).partOne).toBe(2344935);
    });
  });

  describe.skip('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('src/2024/1/sample1.txt')).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('src/2024/1/star.txt')).toBe(0);
    });
  });
});
