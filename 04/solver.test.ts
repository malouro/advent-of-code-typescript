import solver from './solver';

describe('Day 3', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      const answer = await solver('04/sample1.txt');

      expect(answer).toEqual(13);
    });
    test('solves correctly with sample input', async () => {
      const answer = await solver('04/star.txt');

      expect(answer).toEqual(20407);
    });
  });
});
