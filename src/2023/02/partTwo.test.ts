import solver from './partTwo';

describe('Day 2', () => {
  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('src/2023/02/sample.txt')).toEqual(2286);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('src/2023/02/star.txt')).toEqual(62811);
    });
  });
});
