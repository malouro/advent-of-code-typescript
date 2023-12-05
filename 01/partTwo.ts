import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs'

const StringDigits = new Map()
  .set('zero', 0)
  .set('one', 1)
  .set('two', 2)
  .set('three', 3)
  .set('four', 4)
  .set('five', 5)
  .set('six', 6)
  .set('seven', 7)
  .set('eight', 8)
  .set('nine', 9)
  .set('0', 0)
  .set('1', 1)
  .set('2', 2)
  .set('3', 3)
  .set('4', 4)
  .set('5', 5)
  .set('6', 6)
  .set('7', 7)
  .set('8', 8)
  .set('9', 9);

const StringDigitKeys: string[] = [ ...StringDigits.keys() ];

export default async function(inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n');
  const values: number[] = [];

  for (const line of lines) {
    const firstMatch: { index: number; value: string; } = { index: Number.MAX_SAFE_INTEGER, value: '' };
    const lastMatch:  { index: number; value: string; } = { index: -1,                       value: '' };

    StringDigitKeys.forEach((key) => {
      const matches = [ ...line.matchAll(new RegExp(key, 'g')) ];

      matches.forEach((match) => {
        if (typeof match.index !== 'undefined') {
          if (match.index < firstMatch.index) {
            firstMatch.index = match.index;
            firstMatch.value = StringDigits.get(match[0]);
          }
          if (match.index > lastMatch.index) {
            lastMatch.index = match.index;
            lastMatch.value = StringDigits.get(match[0]);
           }
        }
      });
    });

    // Debugging:
    // console.log('Line: ', line, '\nFirst match: ', firstMatch, '\nLast match: ', lastMatch);
    values.push(Number.parseInt(`${firstMatch.value}${lastMatch.value}`));
  }

  return values.reduce((prev, curr) => curr + prev, 0);
}