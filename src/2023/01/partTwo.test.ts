import solver from './partTwo';

describe('Day 1', () => {
  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('src/2023/01/sample2.txt')).toEqual(281);
    });

    test('solves correctly with puzzle input', async () => {
      expect(await solver('src/2023/01/star.txt')).toEqual(53592);
    });
  });

  describe.skip('Testing sandbox', () => {
    test('solves correctly', async () => {
      expect(await solver('src/2023/01/test.txt')).toEqual(44);
    });
  });
});
