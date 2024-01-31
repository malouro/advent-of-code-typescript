import solver from './solver';

describe('Day 5', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('05/sample1.txt')).partOne).toBe(35);
    });
    test('solves correctly with puzzle input', async () => {
      expect((await solver('05/star.txt')).partOne).toBe(84470622);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('05/sample1.txt')).partTwo).toBe(46);
    });
    // Unskip if you're running the part two solution.
    // The brute force approach sucked so bad that it takes literal hours to run.
    test.skip('solves correctly with puzzle input', async () => {
      expect((await solver('05/star.txt')).partTwo).toBe(26714516);
    });
  });
});
