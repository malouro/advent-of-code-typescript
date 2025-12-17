import { existsSync } from 'node:fs';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
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
  return resolvePath(
    __dirname,
    '../../',
    `./src/${year}/${dayStr}${fileName ? '/' + fileName : ''}`,
  );
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

export async function makeSolutionBoilerPlate(year: number, day: number) {
  const srcFilePath = getPuzzlePath(year, day, 'solver.ts');
  const testFilePath = getPuzzlePath(year, day, 'solver.test.ts');
  const d = day.toString();
  const cleanDay = d[0] === '0' ? d.substring(1, d.length) : d;
  const dirtyDay = d[0] !== '0' && d.length === 1 ? `0${d}` : d;

  if (existsSync(srcFilePath)) {
    console.warn(`[WARN] File at location "${srcFilePath}" already exists. Skipping...`);
  } else {
    const srcContent = `import { readInputFile, FsPathLike } from '@helpers/fs';

type Day${cleanDay}Solution = {
  partOne: any;
  partTwo: any;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day${cleanDay}Solution> {
  const input = (await readInputFile(inputFile)).split('\\n');

  return {
    partOne: null,
    partTwo: null,
  }
}
`;
    await writeFile(srcFilePath, srcContent, 'utf-8').then(() => {
      console.info(`[SUCCESS] Wrote content to "${srcFilePath}".`);
    });
  }

  if (existsSync(testFilePath)) {
    console.warn(`[WARN] File at location "${srcFilePath}" already exists. Skipping...`);
  } else {
    const testContent = `import solver from './solver';

describe('Day ${cleanDay}', () => {
  describe('Part One', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/${year}/${dirtyDay}/fixtures/sample.txt')).partOne).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/${year}/${dirtyDay}/star.txt')).partOne).toBe(0);
    });
  });

  describe('Part Two', () => {
    test('solves correctly with sample input', async () => {
      expect((await solver('src/${year}/${dirtyDay}/fixtures/sample.txt')).partTwo).toBe(0);
    });

    test('solves correctly with puzzle input', async () => {
      expect((await solver('src/${year}/${dirtyDay}/star.txt')).partTwo).toBe(0);
    });
  });
});
`;
    await writeFile(testFilePath, testContent, 'utf-8').then(() => {
      console.info(`[SUCCESS] Wrote content to "${testFilePath}".`);
    });
    await mkdir(getPuzzlePath(year, day, 'fixtures'))
      .catch(() => {
        console.error(
          `[ERROR] Could not create fixtures directory at "${getPuzzlePath(year, day)}fixtures".`,
        );
      })
      .then(() => {
        console.info(
          `[SUCCESS] Created test fixtures directory at "${getPuzzlePath(year, day)}fixtures".`,
        );
      });

    await writeFile(getPuzzlePath(year, day, 'fixtures/sample.txt'), '', 'utf-8').then(() => {
      console.info(
        `[SUCCESS] Made empty sample input file at "${getPuzzlePath(year, day, 'fixtures/sample.txt')}". Attempting to get sample input from problem...`,
      );
    });

    if (existsSync(getPuzzlePath(year, day, 'readme.md'))) {
      const readmeContent = await readFile(getPuzzlePath(year, day, 'readme.md'), 'utf-8');
      const codeSampleBlock = /<pre>\s*<code>((.|\n)*)<\/code><\/pre>/gm.exec(readmeContent);

      if (codeSampleBlock && codeSampleBlock.length > 1) {
        await writeFile(
          getPuzzlePath(year, day, 'fixtures/sample.txt'),
          codeSampleBlock[1],
          'utf-8',
        ).then(() => {
          console.info(
            `[SUCCESS] Wrote sample input into "${getPuzzlePath(year, day, 'fixtures/sample.txt')}".`,
          );
        });
      } else {
        console.warn(
          `[WARN] Unable to get sample input from "${getPuzzlePath(year, day, 'readme.md')}". Keeping the sample input file empty...`,
        );
      }
    }
  }
}
