import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

export const EMPTY_SYMBOL = '.';

type position = {
  x: number; // Row, or "line"; starting from top
  y: number; // Column; starting from left-most
};
type PartNumber = {
  id: string;
  position: position;
};
type SymbolMarker = {
  symbol: string;
  position: position;
};

export function symbolExistsAtPos(p: position, symbols: SymbolMarker[]): boolean {
  return symbols.some(({ position }) => position.x === p.x && position.y === p.y);
}

export function hasAdjacentSymbol(
  puzzle: string[][],
  symbols: SymbolMarker[],
  id: string,
  posToCheck: position,
) {
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
  const lines = input.split('\n');

  const possibleParts: PartNumber[] = [];
  const symbols: SymbolMarker[] = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let idBuilder = '';

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx];

      if (/\d/.test(char)) {
        idBuilder += char;
        if (charIdx !== line.length - 1) {
          continue;
        }
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

  // For debugging:
  console.log('Possible parts?:', possibleParts);
  console.log('Symbols found:', symbols);

  const partNumbers = possibleParts.filter(({ id, position }) =>
    hasAdjacentSymbol(lines as unknown as string[][], symbols, id, position),
  );

  // For debugging:
  console.log('Part Numbers:', partNumbers);

  return partNumbers.reduce((acc, partNumber) => acc + Number.parseInt(partNumber.id), 0);
}
