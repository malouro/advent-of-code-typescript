import { readInputFile } from '@helpers/fs';
import { PathLike } from 'node:fs';

/**
 * @param {number[]} hand Array of numbers that represent the card values.
 * @returns {HandValue}
 */
function getHandValue(hand: number[]): { handType: number } {
  const cardCounter = new Map<number, number>();
  let handType = 0;

  for (const card of hand) {
    if (cardCounter.has(card)) {
      cardCounter.set(card, (cardCounter.get(card) as number) + 1);
    } else {
      cardCounter.set(card, 1);
    }
  }

  const cards = Array.from(cardCounter.values());
  const matches = cards.filter((val) => val !== 1);

  if (matches.includes(5)) {
    handType = 6;
  } else if (matches.includes(4)) {
    handType = 5;
  } else if (matches.includes(3)) {
    if (matches.includes(2)) {
      handType = 4;
    } else {
      handType = 3;
    }
  } else if (matches.includes(2)) {
    if (matches.length > 1) {
      handType = 2;
    } else {
      handType = 1;
    }
  }

  return {
    handType,
  };
}

/**
 * Returns number value of card, given the card face character.
 */
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
  hand: number[];
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
      const { handType } = getHandValue(hand);

      return {
        hand,
        handType,
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
        for (let k = 0; k < 5; ++k) {
          const firstVal = hands[j].hand[k];
          const secondVal = hands[j + 1].hand[k];
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

  const partOneResult = hands.reduce(
    (prev, next, index, arr) => prev + next.bet * (arr.length - index),
    0,
  );

  return {
    partOne: partOneResult,
  };
}
