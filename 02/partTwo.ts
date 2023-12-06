import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';
import { GAME_ID_REGEX, GAME_SPLITTER, getAmountOfColor } from './helpers';

export default async function (inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const lines = input.split('\n');

  let sum = 0;

  for (const line of lines) {
    const [, gameID] = GAME_ID_REGEX.exec(line) ?? [];

    if (typeof gameID === 'undefined') {
      throw new Error(
        `Something went wrong; the gameID couldn't be parsed...\n\n${line}`,
      );
    }

    const games = line.replace(GAME_ID_REGEX, '').split(GAME_SPLITTER);

    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    for (const game of games) {
      const red = getAmountOfColor(game, 'red');
      const green = getAmountOfColor(game, 'green');
      const blue = getAmountOfColor(game, 'blue');

      if (red > maxRed) {
        maxRed = red;
      }
      if (green > maxGreen) {
        maxGreen = green;
      }
      if (blue > maxBlue) {
        maxBlue = blue;
      }
    }

    sum += maxRed * maxGreen * maxBlue;
  }

  return sum;
}
