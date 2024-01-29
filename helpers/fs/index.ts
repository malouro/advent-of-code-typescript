import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

export async function readInputFile(inputFile: string | PathLike): Promise<string> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });

  return input;
}
