import { readInputFile } from '@helpers/fs';

type Day5ReturnValue = {
  partOne: number;
  partTwo: number;
};

export default async function (inputFile: string): Promise<Day5ReturnValue> {
  const input = (await readInputFile(inputFile)).split(/[\n\r][\n\r]/);
  const seeds = input[0] // for part one
    .split(': ')[1]
    .split(' ')
    .map((x) => parseInt(x));
  // `eslint-disable` here while part two solution is skipped.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const seedySeeds = input[0] // for part two
    .split(': ')[1]
    .split(' ')
    .map((x, index, arr): [number, number] | undefined => {
      if (index % 2 === 0) {
        return [parseInt(x), parseInt(arr[index + 1])];
      }
      return undefined;
    })
    .map((x) => {
      if (typeof x !== 'undefined') {
        const arr: number[] = [];
        const [value, range]: [value: number, range: number] = x;

        arr.push(value);
        arr.push(value + range - 1);
        return arr;
      }
    })
    .filter((x) => typeof x !== 'undefined') as unknown as [number, number][];

  const maps = [...input.slice(1)].map((x) =>
    x
      .split('\n')
      .slice(1)
      .map((y) => y.split(' ').map((z) => parseInt(z))),
  );
  const partOneResult = [];
  // `eslint-disable` here while part two soultion is skipped.
  // eslint-disable-next-line prefer-const
  let partTwoResult = -1;

  function translate(index: number, value: number) {
    if (index == maps.length) return value;

    for (const [destination, source, range] of maps[index]) {
      if (source <= value && value < source + range)
        return translate(index + 1, destination + value - source);
    }

    return translate(index + 1, value);
  }

  for (const seed of seeds) {
    partOneResult.push(translate(0, seed));
  }

  /*
  // This brute force approach is ridiculously unperformant.
  // Uncomment for the part two result, or whatever.
  // :^)
  for (const seed of seedySeeds) {
    const [start, end] = seed;

    for (let i = 0; i < end - start; ++i) {
      const res = translate(0, start + i);

      if (partTwoResult === -1) {
        partTwoResult = res;
      } else if (res < partTwoResult) {
        partTwoResult = res;
      }

      // console.log(
      //   'Result is',
      //   res,
      //   'for value:',
      //   start + i + '.',
      //   'Min currently is',
      //   partTwoResult,
      // );
    }
  }
  */

  return {
    partOne: Math.min(...partOneResult),
    partTwo: partTwoResult,
  };
}
