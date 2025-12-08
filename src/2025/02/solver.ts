import { readInputFile, FsPathLike } from '@helpers/fs';

type Day2Solution = {
  partOne: number;
  partTwo: number;
};

// AUTHOR NOTE:
// Regex is slow for this, in retrospect.
// Didn't realize when I first wrote the implementation that an invalid ID
// requires a repetition of digits EXACTLY twice. (reading comprehension baby)
// Splitting the string down the middle is WAY better for this.
// ...But who knows what part two will ask :)
export function isInvalid(input: number) {
  const val = input.toString();
  const invalidSubstringSize = 2;

  for (let i = 0; i < val.length; i++) {
    const sub = val.substring(0, i);
    const regex = new RegExp(`^(${sub}){${invalidSubstringSize}}$`);
    const matches = regex.exec(val);

    if (Array.isArray(matches) && matches.length > 0) {
      if (matches[0].length !== matches[1].length) {
        return true;
      }
    }
  }
  return false;
}

// Good news, the regex method applies itself for part two :)
// It is, however, super slow - as expected. :(
export function isInvalidPartTwo(input: number) {
  const val = input.toString();

  for (let i = 0; i < val.length; i++) {
    const sub = val.substring(0, i);
    const regex = new RegExp(`^(${sub})+$`);
    const matches = regex.exec(val);

    if (Array.isArray(matches) && matches.length > 0) {
      if (matches[0].length !== matches[1].length) {
        return true;
      }
    }
  }
  return false;
}

export default async function solver(inputFile: string | FsPathLike): Promise<Day2Solution> {
  const input = (await readInputFile(inputFile)).split(',');
  const ranges = input.map((str) => str.split('-'));

  const valid_1: number[] = [];
  const invalid_1: number[] = [];
  const valid_2: number[] = [];
  const invalid_2: number[] = [];

  ranges.forEach((range) => {
    const start = parseInt(range[0], 10);
    const end = parseInt(range[1], 10);

    for (let i = start; i <= end; i++) {
      if (isInvalid(i)) {
        invalid_1.push(i);
      } else {
        valid_1.push(i);
      }

      if (isInvalidPartTwo(i)) {
        invalid_2.push(i);
      } else {
        valid_2.push(i);
      }
    }
  });

  // console.log('VALID: ', valid_1, '\n\n', 'INVALID: ', invalid_1)
  // console.log('VALID: ', valid_2, '\n\n', 'INVALID: ', invalid_2)

  return {
    partOne: invalid_1.reduce((prev, cur) => prev + cur, 0),
    partTwo: invalid_2.reduce((prev, cur) => prev + cur, 0),
  };
}
