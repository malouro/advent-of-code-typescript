import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

export default async function (inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n');

  console.log(lines);

  return 0;
}
