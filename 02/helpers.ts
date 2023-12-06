type Color = 'red' | 'blue' | 'green';
type ColorLimits = Record<Color, number>;

export const LIMITS: ColorLimits = {
  red: 12,
  green: 13,
  blue: 14,
};

export const GAME_ID_REGEX = /Game (\d+): /;
export const GAME_SPLITTER = ';';

/**
 * @returns Whether or not the given game was possible, given the limit of each color.
 */
export function validateGame(
  game: string,
  color: Color,
  colorLimits: ColorLimits = LIMITS,
): boolean {
  const amount = getAmountOfColor(game, color);

  if (amount === 0) {
    return true;
  }
  if (amount > colorLimits[color]) {
    return false;
  }
  return true;
}

/**
 * @returns Amount of a given color in that game.
 */
export function getAmountOfColor(game: string, color: Color): number {
  const [, matches] = new RegExp(`(\\d+) ${color}`).exec(game.trim()) ?? [];

  if (typeof matches === 'undefined') {
    // Couldn't match, let's assume 0.
    return 0;
  }

  return Number.parseInt(matches);
}
