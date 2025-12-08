import { readInputFile, FsPathLike } from '@helpers/fs';

type Day9Solution = {
  partOne: unknown;
  partTwo: unknown;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day9Solution> {
  const input = (await readInputFile(inputFile)).split('\n');

  console.log(input);

  return {
    partOne: null,
    partTwo: null,
  };
}
