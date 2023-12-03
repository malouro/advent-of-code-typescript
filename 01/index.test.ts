import solver from './';

describe('Day 1', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect(await solver('01/sample-input.txt')).toEqual(142);
    });
  
    test('solves correctly with puzzle input', async () => {
      expect(await solver()).toEqual(55621);
    });
  });
}); 
