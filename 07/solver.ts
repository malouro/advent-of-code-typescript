import { readInputFile } from '@helpers/fs';
import { PathLike } from 'node:fs';

/**
 * @param {number[]} hand Array of numbers that represent the card values.
 * @returns {HandValue}
 */
function getHandValue(hand: number[]): { handType: number; values: number[] } {
  const matches = new Map();
  let handType = 0;
  let values: number[] = [];

  for (const card of hand) {
    if (!matches.has(card)) {
      matches.set(card, 1);
    } else {
      matches.set(card, matches.get(card) + 1);
    }
  }

  const cardValues = Array.from(matches.values());
  const pairTypes = cardValues.filter((val) => val !== 1);
  const pairValues = Array.from(matches.keys()).filter((val) => matches.get(val) !== 1);

  if (pairTypes.includes(5)) {
    handType = 6;
    values.push(pairValues[0]);
  } else if (pairTypes.includes(4)) {
    handType = 5;
    values.push(pairValues[0]);
  } else if (pairTypes.includes(3)) {
    if (pairValues.includes(2)) {
      handType = 4;
      values.push(Math.max(...pairValues));
      values.push(Math.min(...pairValues));
    } else {
      handType = 3;
      values.push(pairValues[0]);
    }
  } else if (pairTypes.includes(2)) {
    if (pairTypes.length > 1) {
      handType = 2;
      values.push(Math.max(...pairValues));
      values.push(Math.min(...pairValues));
    } else {
      handType = 1;
      values.push(pairValues[0]);
    }
  }

  values.push(...hand.sort((a, b) => b - a).filter((v) => !values.includes(v)));

  return {
    handType,
    values,
  };
}

function convertToNumber(cardValue: string): number {
  if (/[2-9]/.test(cardValue)) {
    return parseInt(cardValue);
  }
  switch (cardValue) {
    case 'T':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
    default:
      console.info(`No matching card value for ${cardValue} found; returning 0.`);
      return 0;
  }
}

type Hand = {
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
  values: number[];
  bet: number;
};

type Day7Solution = {
  partOne: number;
};

export default async function solver(inputFile: string | PathLike): Promise<Day7Solution> {
  const input = (await readInputFile(inputFile)).split('\n');

  const bets: number[] = input.map((line) => parseInt(line.split(/\s/g)[1], 10));
  const hands: Hand[] = input
    .map((line) => [...line.split(/\s/g)[0]].map((card) => convertToNumber(card)))
    .map((hand, i) => {
      const { handType, values } = getHandValue(hand);

      return {
        handType,
        values,
        bet: bets[i],
      };
    });

  for (let i = 0; i < hands.length; ++i) {
    for (let j = 0; j < hands.length - 1 - i; ++j) {
      if (hands[j].handType < hands[j + 1].handType) {
        const tmp = hands[j];
        hands[j] = hands[j + 1];
        hands[j + 1] = tmp;
      }
      if (hands[j].handType === hands[j + 1].handType) {
        for (let k = 0; k < hands[j].values.length; ++k) {
          const firstVal = hands[j].values[k];
          const secondVal = hands[j + 1].values[k];

          if (firstVal < secondVal) {
            const tmp = hands[j];
            hands[j] = hands[j + 1];
            hands[j + 1] = tmp;
            break;
          }
          if (firstVal > secondVal) {
            break;
          }
        }
      }
    }
  }

  console.log('Sorted hands: ', hands);

  const partOneResult = hands.reduce(
    (prev, next, index, arr) => prev + next.bet * (arr.length - index),
    0,
  );

  return {
    partOne: partOneResult,
  };
}
