import { PathLike } from 'node:fs';
import { readInputFile } from '@helpers/fs';

/**
 * How much can you cash in a card, given the # of winning numbers?
 */
function cashInCard(winningCount: number): number {
  return Math.floor(Math.pow(2, winningCount - 1));
}

/**
 * Returns how many winning numbers are on a card.
 */
function getWinningNumbersInCard({ cardNumbers, winningNumbers }: Card): number[] {
  const numbersThatWon: number[] = [];

  cardNumbers.forEach((number: number) => {
    if (winningNumbers.some((n: number) => n === number)) {
      numbersThatWon.push(number);
    }
  });

  return numbersThatWon;
}

/**
 * Heard you liked cards?
 * (Grabs the total earned cards from your scratch-card pile.)
 */
function yoDawg(cards: Card[], cardsEarnedPerCard: Map<number, number>, acc: number = 0): number {
  if (cards.length === 0) {
    return acc;
  }

  const { count, id } = cards[0];
  const winningsOnThisCard: number = cardsEarnedPerCard.get(id) ?? 0;

  acc += count;

  // Debugging only:
  // console.log(
  //   `Card number ${currentCard.id} has ${winningsOnThisCard} winning #'s.`,
  //   `There are ${currentCard.count} amount of this card.`,
  //   `(current total: ${acc})`,
  // );

  for (let i = 1; i <= winningsOnThisCard; i++) {
    if (i <= cards.length - 1) {
      cards[i].count += count;
    }
  }

  cards.shift();

  return yoDawg(cards, cardsEarnedPerCard, acc);
}

export type Card = {
  id: number;
  cardNumbers: number[];
  winningNumbers: number[];
  count: number;
};

export type Day4ReturnValue = {
  pointsEarned: number;
  scratchCardsEarned: number;
} | null;

export default async function (inputFile: string | PathLike): Promise<Day4ReturnValue> {
  const input: string = await readInputFile(inputFile);
  const cardsToProcess = input.split('\n');
  const cards: Card[] = [];
  const pointsEarnedPerCard: Map<number, number> = new Map();
  const cardsEarnedPerCard: Map<number, number> = new Map();

  for (const cardInput of cardsToProcess) {
    const [[cardId], winningNumbers, cardNumbers] = cardInput
      .split(/:|\|/)
      .map((entry) => entry.replace(/Card\s+/g, '').trim())
      .map((entry, i) => (i > 0 ? entry.split(/\s+/) : [entry]))
      .map((section: string[]): number[] =>
        section.map((entry: string): number => Number.parseInt(entry)),
      );

    const card: Card = { id: cardId, cardNumbers, winningNumbers, count: 1 };
    const winningCount = getWinningNumbersInCard(card).length;

    cards.push(card);
    pointsEarnedPerCard.set(cardId, cashInCard(winningCount));
    cardsEarnedPerCard.set(cardId, winningCount);
  }

  const pointsEarned = Array.from(pointsEarnedPerCard.values()).reduce(
    (acc: number, result: number) => acc + result,
    0,
  );

  const scratchCardsEarned = yoDawg(cards, cardsEarnedPerCard);

  return {
    pointsEarned,
    scratchCardsEarned,
  };
}
