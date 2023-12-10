import solver, { Day4ReturnValue } from './solver';

describe('Day 4', () => {
  let sampleInputResult: Day4ReturnValue = null;
  let puzzleInputResult: Day4ReturnValue = null;

  describe('Part One', () => {
    beforeAll(async () => {
      sampleInputResult = await solver('04/sample1.txt');
      puzzleInputResult = await solver('04/star.txt');
    });

    test('solves correctly with sample input', () => {
      expect(sampleInputResult?.pointsEarned).toEqual(13);
    });

    test('solves correctly with puzzle input', () => {
      expect(puzzleInputResult?.pointsEarned).toEqual(20407);
    });
  });

  describe('Part Two', () => {
    beforeAll(async () => {
      sampleInputResult = await solver('04/sample2.txt');
      puzzleInputResult = await solver('04/star.txt');
    });

    test('solves correctly with sample input', () => {
      expect(sampleInputResult?.scratchCardsEarned).toEqual(30);
    });

    test('solves correctly with puzzle input', () => {
      expect(puzzleInputResult?.scratchCardsEarned).toEqual(23806951);
    });
  });
});
