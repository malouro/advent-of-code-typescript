import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, resolve as resolvePath } from 'node:path';

const { AOC_SECRET } = process.env;

if (!AOC_SECRET) {
  throw new Error('No "AOC_SECRET" value was detected in your env vars. Aborting...');
}

export async function getPuzzlePrompt(year: number, day: number): Promise<string> {
  const puzzleInputUrl = `https://adventofcode.com/${year}/day/${day}`;
  const resp = await fetch(puzzleInputUrl, {
    headers: {
      'Content-Type': 'text/plain',
      Cookie: `session=${AOC_SECRET}`,
    },
  });

  return resp.text();
}

export async function getPuzzleInput(
  year: number | undefined,
  day: number | undefined,
): Promise<string> {
  const puzzleInputUrl = `https://adventofcode.com/${year}/day/${day}/input`;
  const resp = await fetch(puzzleInputUrl, {
    headers: {
      'Content-Type': 'text/plain',
      Cookie: `session=${AOC_SECRET}`,
    },
  });

  return resp.text();
}

export function getPuzzlePath(year: number, day: number, fileName?: string) {
  const dayStr = day > 9 ? `${day}` : `0${day}`;
  return resolvePath(__dirname, `./src/${year}/${dayStr}${fileName ? '/' + fileName : ''}`);
}

export function puzzleToMarkdown(input: string) {
  const [...blocks] = input.matchAll(/<article class="day-desc">((?!<\/article>).)*<\/article>/gs);

  return blocks.map((matches) => matches[0].trim()).join('\n');
}

export async function saveToFile(input: string, outputPath: string): Promise<void> {
  const basePath = outputPath.substring(0, outputPath.indexOf(basename(outputPath)));

  if (!existsSync(basePath)) {
    await mkdir(basePath, { recursive: true });
  }

  await writeFile(outputPath, input, 'utf-8').then(() => {
    console.info(`[SUCCESS] Wrote content to "${outputPath}".`);
  });
}
