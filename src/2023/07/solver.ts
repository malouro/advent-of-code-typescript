import { readInputFile } from '@helpers/fs';
import { PathLike } from 'node:fs';

const JOKER_VALUE = 11;

/**
 * @param {number[]} hand Array of numbers that represent the card values.
 * @returns {HandValue}
 */
function getHandValue(
  hand: number[],
  jokersWild?: boolean,
): { handType: number; modifiedHand: number[] | null } {
  /** Map<`cardValue`: `howManyOfIt`> */
  const cardCounter = new Map<number, number>();
  let handType = 0;
  let modifiedHand: number[] | null = null;

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

  if (jokersWild && hand.includes(JOKER_VALUE)) {
    switch (handType) {
      // five of a kind
      case 6:
        // assuming 5 Jokers -> make it 5 Aces
        modifiedHand = new Array(5).fill(14);
        break;
      // four of a kind
      case 5:
        // turn modified hand to a 5-of-a-kind
        modifiedHand = hand.map((val) =>
          val === JOKER_VALUE ? [...cardCounter.keys()].filter((x) => x !== JOKER_VALUE)[0] : val,
        );
        break;
      // full house
      case 4:
        // Two cases to handle:
        // J J J x x
        // J J x x x
        // Either way, we make this a 5-of-a-kind with the "x" card.
        modifiedHand = new Array(5).fill(
          [...cardCounter.keys()].filter((x) => x !== JOKER_VALUE)[0],
        );
        break;
      // three of a kind
      case 3:
        // J J J x y
        // x x x J y
        modifiedHand =
          cardCounter.get(JOKER_VALUE) === 3
            ? hand.map((val) =>
                val === JOKER_VALUE
                  ? Math.max(...[...cardCounter.keys()].filter((x) => x !== JOKER_VALUE))
                  : val,
              )
            : hand.map((val) =>
                val === JOKER_VALUE
                  ? [...cardCounter.keys()].filter((x) => cardCounter.get(x) === 3)[0]
                  : val,
              );
        break;
      case 2:
        // x x y y J
        // J J x x y
        // Dear god this looks awful :)
        modifiedHand =
          cardCounter.get(JOKER_VALUE) === 2
            ? hand.map((val) =>
                val === JOKER_VALUE
                  ? [...cardCounter.keys()].filter(
                      (x) => cardCounter.get(x) === 2 && x !== JOKER_VALUE,
                    )[0]
                  : val,
              )
            : hand.map((val) =>
                val === JOKER_VALUE
                  ? Math.max(...[...cardCounter.keys()].filter((x) => x !== JOKER_VALUE))
                  : val,
              );
        break;
      case 1:
        // J J x y z
        // x x J y z
        // Dear god this looks awful :)
        modifiedHand =
          cardCounter.get(JOKER_VALUE) === 2
            ? hand.map((val) =>
                val === JOKER_VALUE
                  ? Math.max(...[...cardCounter.keys()].filter((x) => x !== JOKER_VALUE))
                  : val,
              )
            : hand.map((val) =>
                val === JOKER_VALUE
                  ? [...cardCounter.keys()].filter((x) => cardCounter.get(x) === 2)[0]
                  : val,
              );
        break;
      case 0:
        modifiedHand = hand.map((val) =>
          val === JOKER_VALUE
            ? Math.max(...[...cardCounter.keys()].filter((x) => x !== JOKER_VALUE))
            : val,
        );
        break;
      default:
        throw new Error('wtf');
    }
  }

  return {
    handType,
    modifiedHand,
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
  modifiedHand?: number[] | null;
  originalHand?: number[] | null;
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

type Day7Solution = number;

export default async function solver(
  inputFile: string | PathLike,
  jokersWild?: boolean,
): Promise<Day7Solution> {
  const input = (await readInputFile(inputFile)).split('\n');

  const bets: number[] = input.map((line) => parseInt(line.split(/\s/g)[1], 10));
  const hands: Hand[] = input
    .map((line) => [...line.split(/\s/g)[0]].map((card) => convertToNumber(card)))
    .map((hand, i) => {
      const { handType, modifiedHand } = getHandValue(hand, jokersWild);
      let handTypeToUse = handType;
      let handToUse = hand;

      if (modifiedHand) {
        handTypeToUse = getHandValue(modifiedHand).handType;
        handToUse = hand.map((val) => (val === JOKER_VALUE ? 0 : val));
      }

      return {
        originalHand: hand,
        hand: handToUse,
        modifiedHand,
        handType: handTypeToUse,
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

  // Debugging purposes:
  // console.log(hands);

  const result = hands.reduce(
    (prev, next, index, arr) => prev + next.bet * (arr.length - index),
    0,
  );

  return result;
}
