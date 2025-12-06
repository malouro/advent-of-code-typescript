/* cspell:words joltage */
import { readInputFile, FsPathLike } from '@helpers/fs';

type Day3Solution = {
  partOne: number;
  partTwo: any;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day3Solution> {
  const batteryBanks: string[] = (await readInputFile(inputFile)).split('\n');
  const largestJoltagePairs: number[] = [];

  batteryBanks.forEach((bank) => {
    let largestTensJolt = 0;
    let largestPair = 0; // largest pairing

    for (let i = 0; i < bank.length; i++) {
      const joltage = parseInt(bank[i], 10);

      if (joltage > largestTensJolt) {
        if (i !== bank.length - 1) {
          largestTensJolt = joltage;
          continue;
        }
      }

      const testVal = 10 * largestTensJolt + joltage;

      if (testVal > largestPair) {
        largestPair = testVal;
      }
    }

    largestJoltagePairs.push(largestPair);
  });

  return {
    partOne: largestJoltagePairs.reduce((prev, cur) => prev + cur, 0),
    partTwo: null,
  }
}
