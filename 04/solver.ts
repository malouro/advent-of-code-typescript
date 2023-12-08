import { readFile } from 'node:fs/promises';
import { PathLike } from 'node:fs';

export default async function (inputFile: string | PathLike): Promise<number> {
  const input = await readFile(inputFile, { encoding: 'utf-8' });
  const cards = input.split('\n');

  const cardResults: Map<number, number> = new Map();

  for (const card of cards) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [[cardId], winningNumbers, cardNumbers] = card
      .split(/:|\|/)
      .map((entry) => entry.replace(/Card\s+/g, '').trim())
      .map((entry, i) => (i > 0 ? entry.split(/\s+/) : [entry]))
      .map((section: string[]): number[] =>
        section.map((entry: string): number => Number.parseInt(entry)),
      );

    let winningCount = 0;

    console.log(cardId, winningNumbers, cardNumbers);

    cardNumbers.forEach((number: number) => {
      if (winningNumbers.some((n: number) => n === number)) {
        winningCount++;
      }
    });

    cardResults.set(cardId, Math.floor(Math.pow(2, winningCount - 1)));
  }

  return Array.from(cardResults.values()).reduce((acc: number, result: number) => acc + result, 0);
}
