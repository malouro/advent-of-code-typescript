import solver from './solver';

describe('Day 8', () => {
  describe('Part One', () => {
    test('solves correctly with sample input 1', async () => {
      const { partOne } = await solver('src/2023/08/sample1.txt');

      expect(partOne).toBe(2);
    });
    test('solves correctly with sample input 2', async () => {
      const { partOne } = await solver('src/2023/08/sample2.txt');

      expect(partOne).toBe(6);
    });
    test('solves correctly with puzzle input', async () => {
      const { partOne } = await solver('src/2023/08/star.txt');

      expect(partOne).toBe(21409);
    });
  });
});
