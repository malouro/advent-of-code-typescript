import solver from './solver';

describe('Day 7', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('07/sample1.txt')).toBe(6440);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('07/star.txt')).toBe(247815719);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('07/sample1.txt', true)).toBe(5905);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('07/star.txt', true)).toBe(248747492);
    });
  });
});
