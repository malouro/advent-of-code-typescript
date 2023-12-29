import { readInputFile } from '@helpers/fs';

type Day6ReturnValue = {
  partOne: number;
  partTwo: number;
};

function getRoots(b: number, c: number): { lo: number; hi: number } {
  const root1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * c)) / 2;
  const root2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * c)) / 2;

  // lo is the lowest possible integer greater than the lower root
  // hi is the highest possible integer less than the upper root
  return {
    lo: Math.trunc(Math.min(root1, root2) + 1),
    hi: Math.ceil(Math.max(root1, root2) - 1),
  };
}

export default async function solver(inputFile: string): Promise<Day6ReturnValue> {
  const input = (await readInputFile(inputFile)).split('\n');

  // Part One
  const times = input[0]
    .replace(/Time:\s+/, '')
    .split(/\s+/)
    .map((s) => parseInt(s));
  const distances = input[1]
    .replace(/Distance:\s+/, '')
    .split(/\s+/)
    .map((s) => parseInt(s));
  const results = [];

  for (let i = 0; i < times.length; i++) {
    const { lo, hi } = getRoots(-times[i], distances[i]);
    results.push(hi - lo + 1);
  }

  // Part Two
  const time = parseInt(input[0].replace(/Time:\s+/, '').replace(/\s+/g, ''));
  const distance = parseInt(input[1].replace(/Distance:\s+/, '').replace(/\s+/g, ''));
  const { lo: partTwoLo, hi: partTwoHi } = getRoots(-time, distance);

  return {
    partOne: results.reduce((prev, curr) => prev * curr, 1),
    partTwo: partTwoHi - partTwoLo + 1,
  };
}
