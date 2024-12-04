import { readInputFile, FsPathLike } from '@helpers/fs';

type Day1Solution = {
  partOne: number;
  partTwo: any;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day1Solution> {
  const input: string[] = (await readInputFile(inputFile)).split('\n');

  const list1: number[] = []
  const list2: number[] = []

  for (const row of input) {
    const [item1, item2] = row.split(/\s+/)
    list1.push(Number(item1))
    list2.push(Number(item2))
  }

  list1.sort()
  list2.sort()

  const diffs = []
  let totalDiff = 0;

  list1.forEach((item, index) => {
    const diff = Math.abs(item - list2[index])
    diffs.push(diff)
    totalDiff += diff
  })

  return {
    partOne: totalDiff,
    partTwo: null,
  }
}
