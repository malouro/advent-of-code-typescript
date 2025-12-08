import { readInputFile, FsPathLike } from '@helpers/fs';

type Day4Solution = {
  partOne: unknown;
  partTwo: unknown;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day4Solution> {
  const input = (await readInputFile(inputFile)).split('\n');

  console.log(input);

  return {
    partOne: null,
    partTwo: null,
  };
}
