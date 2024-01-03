import { readInputFile } from '@helpers/fs';
import { PathLike } from 'node:fs';

type HandValue = {
  /**
   * - 0: High card
   * - 1: Pair
   * - 2: Two-pair
   * - 3: Three-of-a-kind
   * - 4: Fullhouse
   * - 5: Four-of-a-kind
   * - 6: Five-of-a-kind
  */
  handType: number;
  value: number[];
}

/**
 * @param {number[]} hand Array of numbers that represent the card values.
 * @returns {HandValue}
 */
function getHandValue(hand: number[]): HandValue {
  const matches = new Map();
  const values = []

  for (const card of hand) {
    if (!matches.has(card)) {
      matches.set(card, 1);
    } else {
      matches.set(card, matches.get(card) + 1);
    }
  }

  let pairs = [];

  Array.from(matches.keys()).forEach((card: number) => {
    const numberOfThisCard = matches.get(card);

    if (numberOfThisCard > 1) {
      pairs.push(card);
    }
  })

  return {
    handType: 0,
    value: []
  }
}

function convertToHex(cardValue: string): number {
  if (cardValue.length > 1) {
    throw new Error([
      '`cardValue` can only be a single character.',
      'Given string had a length larger than 1; did something go wrong?'
    ].join('\n'))
  }

  switch (true) {
    case /[2-9]/.test(cardValue):
      return parseInt(cardValue, 16)
    case /T/.test(cardValue):
      return 0xA
    case /J/.test(cardValue):
      return 0xB
    case /Q/.test(cardValue):
      return 0xC
    case /K/.test(cardValue):
      return 0xD
    case /A/.test(cardValue):
      return 0xE
    default:
      console.info(`No matching card value for ${cardValue} found; returning 0.`)
      return 0;
  }
}

type Day7Solution = {
  partOne: number;
}

export default async function solver(inputFile: string | PathLike): Promise<Day7Solution> {
  const input = (await readInputFile(inputFile)).split('\n');

  const hands: number[][] = input
    .map((line) => [...line.split(/\s/g)[0]]
    .map((card) => convertToHex(card)))
  const bets: number[] = input.map((line) => parseInt(line.split(/\s/g)[1], 10))

  console.log(hands, bets)

  for (const hand of hands) {
    const { handType, value } = getHandValue(hand);

    console.log('Hand type: ', handType)
    console.log('Hand value: ', value)
  }

  return {
    partOne: 0
  }
}