import solver from './partTwo';

describe('Day 2', () => {
  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('02/inputSample.txt')).toEqual(2286);
    });
  
    test('solves correctly with puzzle input', async () => {
      expect(await solver('02/inputForTheStar.txt')).toEqual(62811);
    });
  });
});
