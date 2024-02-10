import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

/* secrets 🤫 */
const { AOC_SECRET } = process.env;

const { year, day } = yargs(hideBin(process.argv))
  .command('get-puzzle', {})
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
