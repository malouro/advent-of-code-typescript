import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

import { validateGame, GAME_ID_REGEX, GAME_SPLITTER } from './helpers';

export default async function (inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n');

  let sum = 0;

  for (const line of lines) {
    const [, gameID] = GAME_ID_REGEX.exec(line) ?? [];

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
