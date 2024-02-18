import solver from './solver';

describe('Day 9', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('src/2023/9/sample1.txt')).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('src/2023/9/star.txt')).toBe(0);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('src/2023/9/sample1.txt')).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('src/2023/9/star.txt')).toBe(0);
    });
  });
});
