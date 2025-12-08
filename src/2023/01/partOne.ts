import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

export default async function (inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n');
  const values = [];

  for (const line of lines) {
    let firstDigit = null;
    let lastDigit = null;

    for (let i = 0; i < line.length; i++) {
      if (/\d/.test(line[i])) {
        firstDigit = line[i];
        break;
      }
    }

    for (let j = line.length - 1; j >= 0; j--) {
      if (/\d/.test(line[j])) {
        lastDigit = line[j];
        break;
      }
    }

    values.push(Number.parseInt(`${firstDigit}${lastDigit}`));
  }

  return values.reduce((prev, curr) => curr + prev);
}
