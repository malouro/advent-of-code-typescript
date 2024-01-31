import solver from './partOne';

describe('Day 1', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('01/sample1.txt')).toEqual(142);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('01/star.txt')).toEqual(55621);
    });
  });

  describe.skip('Testing sandbox', () => {
    test('solves correctly', async () => {
      expect(await solver('01/test.txt')).toEqual(44);
    });
  });
});
