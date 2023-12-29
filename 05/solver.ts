import { readInputFile } from '@helpers/fs';

type Day5ReturnValue = {
  partOne: number;
};

export default async function (inputFile: string): Promise<Day5ReturnValue> {
  const input = (await readInputFile(inputFile)).split(/[\n\r][\n\r]/);
  const seeds = input[0]
    .split(': ')[1]
    .split(' ')
    .map((x) => parseInt(x));
  const maps = [...input.slice(1)].map((x) =>
    x
      .split('\n')
      .slice(1)
      .map((y) => y.split(' ').map((z) => parseInt(z))),
  );
  const partOneResult = [];

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

  return {
    partOne: Math.min(...partOneResult),
  };
}
