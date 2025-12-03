import yargs from 'yargs/yargs';
import { type ArgumentsCamelCase, type Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import 'dotenv/config'

import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import {
  getPuzzleInput,
  getPuzzlePath,
  getPuzzlePrompt,
  makeSolutionBoilerPlate,
  puzzleToMarkdown,
  saveToFile,
} from './helpers/puzzle';

type PuzzleOptions = {
  year: number;
  day: number;
};

type RunPuzzleOptions = {
  year: number;
  day: number;
  part?: number;
  input?: string;
};

const defaultOptions = (y: Argv) => {
  y.env('AOC').options({
    year: {
      alias: ['y'],
      type: 'number',
      description: 'Year for the Advent of Code puzzle',
      demandOption: true,
    },
    day: {
      alias: ['d'],
      type: 'number',
      description: 'Day of puzzle in given year',
      demandOption: true,
    },
  });
};

const runPuzzleOptions = (y: Argv) => {
  y.env('AOC').options({
    year: {
      alias: ['y'],
      type: 'number',
      description: 'Year for the Advent of Code puzzle',
      demandOption: true,
    },
    day: {
      alias: ['d'],
      type: 'number',
      description: 'Day of puzzle in given year',
      demandOption: true,
    },
    part: {
      alias: ['p'],
      type: 'number',
      description: 'Part number (1 or 2) - only for partOne/partTwo structure',
      choices: [1, 2],
    },
    input: {
      alias: ['i'],
      type: 'string',
      description: 'Input file name (defaults to finding star.txt, test.txt, or sample1.txt)',
    },
  });
};

// Helper function to get available years
async function getAvailableYears(): Promise<number[]> {
  const srcPath = join(__dirname, 'src');
  const entries = await readdir(srcPath, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && /^\d{4}$/.test(entry.name))
    .map(entry => parseInt(entry.name))
    .sort();
}

// Helper function to get available days for a year
async function getAvailableDays(year: number): Promise<number[]> {
  const yearPath = join(__dirname, 'src', year.toString());
  if (!existsSync(yearPath)) return [];
  
  const entries = await readdir(yearPath, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && /^\d{2}$/.test(entry.name))
    .map(entry => parseInt(entry.name))
    .sort();
}

// Helper function to detect puzzle structure and find input file
async function detectPuzzleStructure(year: number, day: number) {
  const dayPath = join(__dirname, 'src', year.toString(), day.toString().padStart(2, '0'));
  
  if (!existsSync(dayPath)) {
    throw new Error(`Puzzle not found for year ${year}, day ${day}`);
  }

  const solverPath = join(dayPath, 'solver.js');
  const partOnePath = join(dayPath, 'partOne.js');
  const partTwoPath = join(dayPath, 'partTwo.js');

  // Check for input files
  const possibleInputs = ['star.txt', 'test.txt', 'sample1.txt', 'sample.txt'];
  let inputFile = null;
  
  for (const input of possibleInputs) {
    if (existsSync(join(dayPath, input))) {
      inputFile = join(dayPath, input);
      break;
    }
  }

  return {
    hasSolver: existsSync(solverPath),
    hasPartStructure: existsSync(partOnePath) && existsSync(partTwoPath),
    inputFile,
    dayPath,
    solverPath,
    partOnePath,
    partTwoPath,
  };
}

// Helper function to run a puzzle
async function runPuzzle(year: number, day: number, part?: number, inputFile?: string) {
  const structure = await detectPuzzleStructure(year, day);
  
  let targetInputFile = inputFile;
  if (!targetInputFile) {
    if (!structure.inputFile) {
      throw new Error(`No input file found for year ${year}, day ${day}. Available files: star.txt, test.txt, sample1.txt, sample.txt`);
    }
    targetInputFile = structure.inputFile;
  } else {
    if (!inputFile) {
      throw new Error(`Input file must be specified when no default input file is found`);
    }
    targetInputFile = join(structure.dayPath, inputFile);
    if (!existsSync(targetInputFile)) {
      throw new Error(`Input file not found: ${targetInputFile}`);
    }
  }

  console.log(`🎄 Running Advent of Code ${year} - Day ${day.toString().padStart(2, '0')}`);
  console.log(`📁 Input file: ${targetInputFile}`);
  
  if (structure.hasSolver) {
    console.log(`🚀 Running solver...`);
    const solver = await import(structure.solverPath);
    const result = await solver.default(targetInputFile);
    
    console.log(`✨ Results:`);
    if (typeof result === 'object' && result !== null) {
      if ('partOne' in result) console.log(`   Part 1: ${result.partOne}`);
      if ('partTwo' in result) console.log(`   Part 2: ${result.partTwo}`);
      if (Object.keys(result).length === 0) console.log(`   No results returned`);
    } else {
      console.log(`   Result: ${result}`);
    }
  } else if (structure.hasPartStructure) {
    if (part === 1 || (!part && !existsSync(structure.partTwoPath))) {
      console.log(`🚀 Running Part 1...`);
      const partOne = await import(structure.partOnePath);
      const result = await partOne.default(targetInputFile);
      console.log(`✨ Part 1 Result: ${result}`);
    } else if (part === 2 || (!part && existsSync(structure.partTwoPath))) {
      console.log(`🚀 Running Part 2...`);
      const partTwo = await import(structure.partTwoPath);
      const result = await partTwo.default(targetInputFile);
      console.log(`✨ Part 2 Result: ${result}`);
    }
    
    if (!part && existsSync(structure.partOnePath) && existsSync(structure.partTwoPath)) {
      console.log(`\n🚀 Running both parts...`);
      const [partOne, partTwo] = await Promise.all([
        import(structure.partOnePath),
        import(structure.partTwoPath)
      ]);
      
      const [result1, result2] = await Promise.all([
        partOne.default(targetInputFile),
        partTwo.default(targetInputFile)
      ]);
      
      console.log(`✨ Results:`);
      console.log(`   Part 1: ${result1}`);
      console.log(`   Part 2: ${result2}`);
    }
  } else {
    throw new Error(`No solver found for year ${year}, day ${day}. Expected solver.js or partOne.js/partTwo.js`);
  }
}

const parser = yargs(hideBin(process.argv))
  .scriptName('cli')
  .command(
    'run [year] [day]',
    'Run a specific puzzle solver',
    runPuzzleOptions,
    async ({ year, day, part, input }: ArgumentsCamelCase<RunPuzzleOptions>) => {
      try {
        await runPuzzle(year, day, part, input);
      } catch (error) {
        console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    },
  )
  .command(
    'list',
    'List all available puzzles',
    {},
    async () => {
      console.log('🎄 Available Advent of Code Puzzles:\n');
      
      try {
        const years = await getAvailableYears();
        
        for (const year of years) {
          const days = await getAvailableDays(year);
          console.log(`📅 ${year}:`);
          
          if (days.length === 0) {
            console.log('   No puzzles found\n');
            continue;
          }
          
          for (const day of days) {
            const dayStr = day.toString().padStart(2, '0');
            try {
              const structure = await detectPuzzleStructure(year, day);
              const type = structure.hasSolver ? 'solver' : 'parts';
              const inputInfo = structure.inputFile ? `(${structure.inputFile.split('/').pop()})` : '(no input)';
              console.log(`   Day ${dayStr}: ${type} ${inputInfo}`);
            } catch {
              console.log(`   Day ${dayStr}: error detecting structure`);
            }
          }
          console.log();
        }
      } catch (error) {
        console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    },
  )
  .command(
    'get-puzzle',
    'Get puzzle input for a Year/Day.',
    defaultOptions,
    async ({ year, day }: ArgumentsCamelCase<PuzzleOptions>) => {
      const puzzleText = (await getPuzzlePrompt(year, day)).trim();
      const puzzleInput = (await getPuzzleInput(year, day)).trim();
      const markdown = puzzleToMarkdown(puzzleText);

      await saveToFile(markdown, getPuzzlePath(year, day, 'readme.md'));
      await saveToFile(puzzleInput, getPuzzlePath(year, day, 'star.txt'));

      await makeSolutionBoilerPlate(year, day);
    },
  )
  .command(
    'solve-puzzle',
    'Submit solution for a Year/Day.',
    defaultOptions,
    ({ year, day }: ArgumentsCamelCase<PuzzleOptions>) => {
      console.debug(year, day);
      console.info(
        'TODO: Implement solve-puzzle command here. It will submit a solution value to AoC.',
      );
    },
  )
  .help();

(async () => {
  await parser.parse();
})()
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
