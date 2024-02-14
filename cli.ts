import yargs from 'yargs/yargs';
import { type ArgumentsCamelCase, type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getPuzzlePath, getPuzzlePrompt, puzzleToMarkdown, saveToFile } from './helpers/puzzle';

type PuzzleOptions = {
  year: number;
  day: number;
};

const defaultOptions = (y: Argv) => {
  y.option('year', {
    alias: 'y',
    type: 'number',
    description: 'Year for the Advent of Code puzzle',
    default: process.env.AOC_YEAR ?? new Date().getFullYear(),
  }).option('day', {
    alias: 'd',
    type: 'number',
    description: 'Day of puzzle in given year',
  });
};

const parser = yargs(hideBin(process.argv))
  .scriptName('cli')
  .command(
    'get-puzzle',
    'Get puzzle input for a Year/Day.',
    defaultOptions,
    async ({ year, day }: ArgumentsCamelCase<PuzzleOptions>) => {
      const puzzleText = await getPuzzlePrompt(year, day);
      const markdown = puzzleToMarkdown(puzzleText);

      await saveToFile(markdown, getPuzzlePath(year, day, 'readme.md'));
    },
  )
  .command(
    'solve-puzzle',
    'Submit solution for a Year/Day.',
    defaultOptions,
    ({ year, day }: ArgumentsCamelCase<PuzzleOptions>) => {
      console.debug(year, day);
      console.info(
        'TODO: Implement solve-puzzle command here. It will submit a solution value to AoC.',
      );
    },
  );

(async () => {
  await parser.parse();
})()
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
