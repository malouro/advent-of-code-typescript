/* cspell:words joltage, joltages */
import { readInputFile, FsPathLike } from '@helpers/fs';

type Day3Solution = {
  partOne: number;
  partTwo: any;
};

export async function partOneSolver(inputFile: string | FsPathLike): Promise<Day3Solution['partOne']> {
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

  return largestJoltagePairs.reduce((prev, cur) => prev + cur, 0);
}

function recurse(maxNumberNeeded: number, numberNeeded: number, batteryBank: number[], output: number[]) {
  if (output.length === maxNumberNeeded) {
    return output;
  }
  const bankToCheck = [...batteryBank.slice(0, batteryBank.length - numberNeeded + 1)];

  // console.info('Bank to check: ', bankToCheck);

  let largest = 0;
  let largestIndex = 0;

  bankToCheck.forEach((val, index) => {
    if (val > largest) {
      largest = val;
      largestIndex = index;
    }
  });

  output.push(largest);

  const nextBankToCheck = [...batteryBank.slice(largestIndex + 1)];

  return recurse(maxNumberNeeded, maxNumberNeeded - output.length, nextBankToCheck, output);
}

export async function partTwoSolver(inputFile: string | FsPathLike): Promise<Day3Solution['partTwo']> {
  let numberOfBatteriesNeeded = 12;
  const batteryBanks: string[] = (await readInputFile(inputFile)).split('\n');
  const joltages: number[] = [];

  batteryBanks.forEach((bank) => {
    const joltage = recurse(
      numberOfBatteriesNeeded, numberOfBatteriesNeeded, [...bank].map((v) => parseInt(v, 10)), []
    ).reduce((s, n) => s.toString() + n.toString(), '')

    joltages.push(parseInt(joltage, 10));
  });

  return joltages.reduce((cur, next) => cur + next, 0);
}