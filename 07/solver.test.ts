import solver from './solver';

describe('Day 7', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('07/sample1.txt')).partOne).toBe(288);
    });

    test.skip('solves correctly with puzzle input', async () => {
      expect((await solver('06/star.txt')).partOne).toBe(1195150);
    });
  });

  // describe('Part Two', () => {
  //   test('solves correctly with sample input', async () => {
  //     expect((await solver('06/sample1.txt')).partTwo).toBe(71503);
  //   });

  //   test('solves correctly with puzzle input', async () => {
  //     expect((await solver('06/star.txt')).partTwo).toBe(42550411);
  //   });
  // });
});
