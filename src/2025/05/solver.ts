import { readInputFile, FsPathLike } from '@helpers/fs';

type Day5Solution = {
  partOne: any;
  partTwo: any;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day5Solution> {
  const input = (await readInputFile(inputFile)).split('\n');

  return {
    partOne: null,
    partTwo: null,
  }
}
