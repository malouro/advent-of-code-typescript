import solver from './partOne';

describe('Day 3', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('03/sample.txt')).toEqual(4361);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('03/star.txt')).toEqual(530849);
    });
  });
});
