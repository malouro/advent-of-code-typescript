import solver from './solver';

describe('Day 7', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('07/sample1.txt')).partOne).toBe(6440);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('07/star.txt')).partOne).toBe(247815719);
    });
  });
});
