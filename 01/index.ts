import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs'

export default async function(
  inputFile: string | PathLike = '01/star-input.txt',
  // options?: SolverOptions = { part: 1 }
): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n');
  const values = [];

  for (const line of lines) {
    let firstDigit = null;
    let lastDigit = null;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < line.length; i++) {
      if (/[0-9]/.test(line[i])) {
        firstDigit = line[i];
        break;
      }
    }

    for (let j = line.length - 1; j >= 0; j--) {
      if (/[0-9]/.test(line[j])) {
        lastDigit = line[j];
        break;
      }
    }

    values.push(Number.parseInt(`${firstDigit}${lastDigit}`))
  }

  console.log(values);

  const sum = values.reduce((prev, curr) => {
    // console.log(prev, curr)
    return curr + prev
  });
  return sum;
}