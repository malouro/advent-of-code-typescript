import solver from './partOne';

describe('Day 2', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('02/sample.txt')).toEqual(8);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('02/star.txt')).toEqual(2551);
    });
  });
});
