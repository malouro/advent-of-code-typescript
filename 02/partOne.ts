import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs'

const GAME_ID_REGEX = /Game (\d+): /
const GAME_SPLITTER = ';'

type Color = 'red' | 'blue' | 'green';

const limits: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14
}

/**
 * Returns whether or not the given game was possible.
 */
export function validateGame(game: string, color: Color): boolean {
  const [, matches] = new RegExp(`(\\d+) ${color}`).exec(game.trim()) ?? [];

  if (typeof matches === 'undefined') {
    // Couldn't match, let's assume a 0 of the amount
    return true;
  }
  if (Number.parseInt(matches) > limits[color]) {
    return false;
  }
  return true;
}

export default async function(inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n')

  let sum = 0;

  for (const line of lines) {
    const [,gameID] = GAME_ID_REGEX.exec(line) ?? [];

    if (typeof gameID === 'undefined') {
      throw new Error(`Something went wrong; the gameID couldn't be parsed...\n\n${line}`);
    }

    const games = line.replace(GAME_ID_REGEX, '').split(GAME_SPLITTER);

    let gameIsPossible = true;
    for (const game of games) {
      if (
        !validateGame(game, 'red') ||
        !validateGame(game, 'green') ||
        !validateGame(game, 'blue')
      ) {
        gameIsPossible = false;
        break;
      }
    }
    if (gameIsPossible) {
      sum += Number.parseInt(gameID);
    }
  }

  return sum;
}