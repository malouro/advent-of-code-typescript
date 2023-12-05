import solver from './partOne';

describe('Day 2', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('02/inputSample.txt')).toEqual(8);
    });
  
    test.todo('solves correctly with puzzle input');
  });

  describe.skip('Testing sandbox', () => {
    test.todo('test sandbox')
  });
});
