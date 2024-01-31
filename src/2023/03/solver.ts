import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

export const EMPTY_SYMBOL = '.';

type Position = {
  x: number; // Row, or "line"; starting from top
  y: number; // Column; starting from left-most
};
type Part = {
  id: string;
  position: Position;
};
type SymbolMarker = {
  symbol: string;
  position: Position;
};
type Day3ReturnValue = {
  partNumbers: number;
  gearRatios: number;
};

/**
 * Does a symbol exist at the given x,y coord?
 */
export function symbolExistsAtPos(p: Position, symbols: SymbolMarker[]): boolean {
  return symbols.some(({ position }) => position.x === p.x && position.y === p.y);
}

/**
 * Gives back the exact Part that may exist at a given x,y coord
 * If none, return `null`
 */
export function getPartAtPos(p: Position, parts: Part[]): Part | null {
  let part = null;

  parts.forEach(({ position, id }) => {
    if (p.y === position.y && p.x >= position.x && p.x < position.x + id.length) {
      part = { position, id };
    }
  });

  return part;
}

/**
 * Does the given Part have an adjacent symbol?
 */
export function hasAdjacentSymbol(
  puzzle: string[][],
  symbols: SymbolMarker[],
  part: Part,
): boolean {
  const { id, position: posToCheck } = part;
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
    if (posToCheck.y >= 1) {
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

/**
 * Get all parts that are adjacent to a given SymbolMarker
 */
export function getAdjacentParts(puzzle: string[][], parts: Part[], posToCheck: Position): Part[] {
  const puzzleWidth = puzzle[0].length;
  const puzzleHeight = puzzle.length;
  const partMatchingList: Part[] = [];

  let tempMatchingPart: Part | null = null;

  function toPushOrNotToPush() {
    if (
      tempMatchingPart &&
      !partMatchingList.some(
        ({ position }) =>
          position.x === tempMatchingPart?.position.x && position.y === tempMatchingPart.position.y,
      )
    ) {
      partMatchingList.push(tempMatchingPart);
      tempMatchingPart = null;
    }
  }

  // left
  if (posToCheck.x > 0) {
    tempMatchingPart = getPartAtPos({ x: posToCheck.x - 1, y: posToCheck.y }, parts) ?? null;
    toPushOrNotToPush();
  }

  // right
  if (posToCheck.x < puzzleWidth - 1) {
    tempMatchingPart = getPartAtPos({ x: posToCheck.x + 1, y: posToCheck.y }, parts) ?? null;
    toPushOrNotToPush();
  }

  for (let xOffset = -1; xOffset < 2; xOffset++) {
    // Ignore if we might be looking out of bounds
    if (posToCheck.x + xOffset < 0 || posToCheck.x + xOffset > puzzleWidth - 1) {
      continue;
    }

    // above the possible part number
    if (posToCheck.y >= 1) {
      tempMatchingPart =
        getPartAtPos({ x: posToCheck.x + xOffset, y: posToCheck.y - 1 }, parts) ?? null;
      toPushOrNotToPush();
    }

    // below the possible part number
    if (posToCheck.y < puzzleHeight - 1) {
      tempMatchingPart =
        getPartAtPos({ x: posToCheck.x + xOffset, y: posToCheck.y + 1 }, parts) ?? null;
      toPushOrNotToPush();
    }
  }

  return partMatchingList;
}

export default async function (inputFile: string | PathLike): Promise<Day3ReturnValue> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n').map(
    (line) =>
      line
        .replace('\r', '') // windows fix
        .concat(EMPTY_SYMBOL), // easier handling of EOL edge case, I'm lazy :)
  );

  // Build out arrays of Parts and Symbols:
  const possibleParts: Part[] = [];
  const symbols: SymbolMarker[] = [];
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let idBuilder = '';

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx];

      if (/\d/.test(char)) {
        idBuilder += char;
        continue;
      } else if (char !== EMPTY_SYMBOL) {
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

  // The parts we care about; they have symbols next to them.
  const parts = possibleParts.filter((part) =>
    hasAdjacentSymbol(lines as unknown as string[][], symbols, part),
  );

  // For debugging:
  // console.log('Part Numbers:', partNumbers.length, partNumbers);

  const partNumbers = parts.reduce((acc, part) => acc + Number.parseInt(part.id), 0);
  const gearRatios = symbols.reduce((prev, symbol) => {
    const adjParts = getAdjacentParts(lines as unknown as string[][], parts, symbol.position);

    if (adjParts.length === 2) {
      return prev + Number.parseInt(adjParts[0].id) * Number.parseInt(adjParts[1].id);
    }
    return prev;
  }, 0);

  return {
    partNumbers,
    gearRatios,
  };
}
