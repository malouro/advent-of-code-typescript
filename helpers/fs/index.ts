import { readFile } from 'node:fs/promises';
import { type PathLike as FsPathLike } from 'node:fs';

export async function readInputFile(inputFile: string | FsPathLike): Promise<string> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });

  return input;
}

export { FsPathLike };
