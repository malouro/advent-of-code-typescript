import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs'

export default function(inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });

  console.log(input);

  // TODO
}