import { readInputFile, FsPathLike } from '@helpers/fs';

type Day4Solution = {
  partOne: number;
  partTwo: unknown;
};

const ROLL_CHAR = '@';
const EMPTY_CHAR = '.';

function checkAdjacentRolls(grid: string[][], posX: number, posY: number): number {
  let rollCount = 0;
  const onLeftEdge = posX === 0;
  const onRightEdge = posX === grid[0].length - 1;
  const onTopEdge = posY === 0;
  const onBottomEdge = posY === grid.length - 1;

  const accRollCount = (offsetX: number, offsetY: number): void => {
    const spotToCheck = grid[posY + offsetY][posX + offsetX];
    const isARoll = spotToCheck === ROLL_CHAR;

    rollCount += isARoll ? 1 : 0;
  };

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) {
        // rollCount++;
      } else if (
        !(x === -1 && onLeftEdge) &&
        !(x === 1 && onRightEdge) &&
        !(y === -1 && onTopEdge) &&
        !(y === 1 && onBottomEdge)
      ) {
        accRollCount(x, y);
      }
    }
  }

  return rollCount;
}

interface Position {
  x: number;
  y: number;
}

function recurse(grid: string[][], count: number) {
  const liftableRolls: Position[] = [];

  grid.forEach((row, y) => {
    row.forEach((_col, x) => {
      if (grid[y][x] === ROLL_CHAR) {
        if (checkAdjacentRolls(grid, x, y) < 4) {
          count++;
          liftableRolls.push({ x, y });
        }
      }
    });
  });

  if (liftableRolls.length === 0) {
    return count;
  }

  // remove rolls
  for (const position of liftableRolls) {
    grid[position.y][position.x] = EMPTY_CHAR;
  }

  return recurse(grid, count);
}

export default async function solver(inputFile: string | FsPathLike): Promise<Day4Solution> {
  const grid: string[][] = (await readInputFile(inputFile)).split('\n').map((row) => [...row]);

  let partOneCount = 0;

  grid.forEach((row, y) => {
    row.forEach((_col, x) => {
      if (grid[y][x] === ROLL_CHAR) {
        if (checkAdjacentRolls(grid, x, y) < 4) {
          partOneCount++;
        }
      }
    });
  });

  const partTwoCount = recurse(grid, 0);

  return {
    partOne: partOneCount,
    partTwo: partTwoCount,
  };
}
