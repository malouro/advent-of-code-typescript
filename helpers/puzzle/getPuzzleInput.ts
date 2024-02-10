import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { PathLike } from 'node:fs';
import { resolve as pathResolve } from 'node:path';

const { AOC_SECRET } = process.env;

const { year, day } = yargs(hideBin(process.argv))
  .option('year', {
    alias: 'y',
    type: 'number',
    description: 'Year of Advent of Code puzzles',
    default: new Date().getFullYear(),
  })
  .option('day', {
    alias: 'd',
    type: 'number',
    description: 'Day of puzzle in given year',
  })
  .parseSync();

export async function getInput(year: number | undefined, day: number | undefined): Promise<string> {
  const puzzleInputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
  const resp = await fetch(puzzleInputUrl, {
    headers: {
      'Content-Type': 'text/plain',
      Cookie: `session=${AOC_SECRET}`,
    },
  });

  return resp.text();
}

export async function saveInput(input: string, output: string | PathLike): Promise<void> {
  if (day && day < 10) {
    day;
  }
  const pathToSaveTo = pathResolve(__dirname, `../../src/${year}/${day}/star.txt`);

  console.log(pathToSaveTo);
}

if (require.main === module) {
  (async () => {
    if (!year) {
      throw new Error('`year` not provided.');
    }
    if (!day) {
      throw new Error('`day` not provided.');
    }

    // const puzzleInput = (await getInput(year, day)).trim();

    // console.log(puzzleInput);

    await saveInput('in', 'out');
  })().catch((err) => {
    console.error(err);
  });
}
