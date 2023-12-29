import solver from './solver';

describe('Day 5', () => {
  test('solves correctly with sample input', async () => {
    expect((await solver('05/sample1.txt')).partOne).toBe(35);
  });
  test('solves correctly with puzzle input', async () => {
    expect((await solver('05/star.txt')).partOne).toBe(84470622);
  });
});
