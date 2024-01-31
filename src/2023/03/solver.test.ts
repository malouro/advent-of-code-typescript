import solver from './solver';

describe('Day 3', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      const { partNumbers } = await solver('src/2023/03/sample1.txt');
      expect(partNumbers).toEqual(4361);
    });

    test('solves correctly with puzzle input', async () => {
      const { partNumbers } = await solver('src/2023/03/star.txt');
      expect(partNumbers).toEqual(530849);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      const { gearRatios } = await solver('src/2023/03/sample2.txt');
      expect(gearRatios).toEqual(467835);
    });

    test('solves correctly with puzzle input', async () => {
      const { gearRatios } = await solver('src/2023/03/star.txt');
      expect(gearRatios).toEqual(84900879);
    });
  });
});
