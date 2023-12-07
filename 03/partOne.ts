import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

export const EMPTY_SYMBOL = '.';

type Position = {
  x: number; // Row, or "line"; starting from top
  y: number; // Column; starting from left-most
};
type PartNumber = {
  id: string;
  position: Position;
};
type SymbolMarker = {
  symbol: string;
  position: Position;
};

export function symbolExistsAtPos(p: Position, symbols: SymbolMarker[]): boolean {
  return symbols.some(({ position }) => position.x === p.x && position.y === p.y);
}

export function hasAdjacentSymbol(
  puzzle: string[][],
  symbols: SymbolMarker[],
  part: PartNumber
) {
  const { id, position } = part;
  const { length: lengthOfNumber } = id;
  const puzzleWidth = puzzle[0].length;
  const puzzleHeight = puzzle.length;

  // Check sides first:
  // ......v-- checking here
  // ..*123*................
  // ..^--- and here........

  // left
  if (posToCheck.x > 0) {
    if (symbolExistsAtPos({ x: posToCheck.x - 1, y: posToCheck.y }, symbols)) {
      return true;
    }
  }
  // right
  if (posToCheck.x < puzzleWidth - 1) {
    if (symbolExistsAtPos({ x: posToCheck.x + lengthOfNumber, y: posToCheck.y }, symbols)) {
      return true;
    }
  }

  for (let xOffset = -1; xOffset < lengthOfNumber + 1; xOffset++) {
    // Ignore if we might be looking out of bounds
    if (posToCheck.x + xOffset < 0 || posToCheck.x + xOffset > puzzleWidth - 1) {
      continue;
    }

    // above the possible part number
    if (posToCheck.y - 1 >= 0) {
      if (symbolExistsAtPos({ x: posToCheck.x + xOffset, y: posToCheck.y - 1 }, symbols)) {
        return true;
      }
    }

    // below the possible part number
    if (posToCheck.y < puzzleHeight - 1) {
      if (symbolExistsAtPos({ x: posToCheck.x + xOffset, y: posToCheck.y + 1 }, symbols)) {
        return true;
      }
    }
  }

  return false;
}

export default async function (inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input
    .split('\n')
    .map((line) => line.replace('\r', '') // windows fix
    .concat(EMPTY_SYMBOL)); // easier handling of EOL edge case, I'm lazy :)

  const possibleParts: PartNumber[] = [];
  const symbols: SymbolMarker[] = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let idBuilder = '';

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx];

      if (/\d/.test(char)) {
        idBuilder += char;
        continue;
      } else if (char !== '.') {
        symbols.push({
          symbol: char,
          position: { x: charIdx, y: lineIdx },
        });
      }

      if (idBuilder.length > 0) {
        possibleParts.push({
          id: idBuilder,
          position: { x: charIdx - idBuilder.length, y: lineIdx },
        });
        idBuilder = '';
      }
    }
  }

  const partNumbers = possibleParts.filter((part) =>
    hasAdjacentSymbol(lines as unknown as string[][], symbols, part),
  );

  return partNumbers.reduce((acc, partNumber) => acc + Number.parseInt(partNumber.id), 0);
}
