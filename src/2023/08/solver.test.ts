import solver from './solver';

describe('Day 8', () => {
  describe('Part One', () => {
    test('solves correctly with sample input 1', async () => {
      const { length } = await solver('src/2023/08/sample1.txt');

      expect(length).toBe(2);
    });
    test('solves correctly with sample input 2', async () => {
      const { length } = await solver('src/2023/08/sample2.txt');

      expect(length).toBe(6);
    });
    test('solves correctly with puzzle input', async () => {
      const { length } = await solver('src/2023/08/star.txt');

      expect(length).toBe(21409);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input 1', async () => {
      // sample3.txt was made specifically for part 2 solving in mind:
      const { length } = await solver('src/2023/08/sample3.txt', 2);

      expect(length).toBe(6);
    });

    test('solves correctly with puzzle input', async () => {
      const { length } = await solver('src/2023/08/star.txt', 2);

      expect(length).toBe(21165830176709);
    });
  });
});
