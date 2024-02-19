import { readInputFile, FsPathLike } from '@helpers/fs';

type Day10Solution = {
  partOne: any;
  partTwo: any;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day10Solution> {
  const input = (await readInputFile(inputFile)).split('\n');

  return {
    partOne: null,
    partTwo: null,
  }
}
