import solver from './solver';

describe('Day 2', () => {
  describe('Part One', () => {
    describe('Unit test', () => {
      test.skip('sandbox testing', async () => {
        const output = await solver('src/2025/02/fixtures/sample.txt');
        console.log(output);
      });
    });
    describe('Submission', () => {
      test('solves correctly with sample input', async () => {
        expect((await solver('src/2025/02/fixtures/sample.txt')).partOne).toBe(1227775554);
      });

      test('solves correctly with puzzle input', async () => {
        expect((await solver('src/2025/02/star.txt')).partOne).toBe(34826702005);
      });
    });
  });

  describe('Part Two', () => {
    describe('Unit test', () => {
      test.skip('sandbox testing', async () => {
        const { partTwo } = await solver('src/2025/02/fixtures/sample.txt');
        console.log(partTwo);
      });
    });

    describe('Submission', () => {
      test('solves correctly with sample input', async () => {
        expect((await solver('src/2025/02/fixtures/sample.txt')).partTwo).toBe(4174379265);
      });

      test('solves correctly with puzzle input', async () => {
        expect((await solver('src/2025/02/star.txt')).partTwo).toBe(43287141963);
      });
    });
  });
});
