import { readInputFile, FsPathLike } from '@helpers/fs';

type Day1Solution = {
  partOne: any;
  partTwo: any;
};

const initialPosition = 50;

type Direction = 'L' | 'R'

export default async function solver(inputFile: string | FsPathLike): Promise<Day1Solution> {
  const input = (await readInputFile(inputFile)).split('\n');
  const permutations = input.map((str: string) => ({ direction: str.charAt(0) as Direction, value: str.slice(1) }))

  let currentPos = initialPosition;

  let code1 = 0;
  let code2 = 0;

  permutations.forEach(({ direction, value }) => {
    const val = parseInt(value, 10);
    const dialTickChange = val % 100;
    const extraTurns = Math.floor(val / 100);

    let trackingPos = currentPos;
    
    const startingAt0Offset = currentPos === 0 ? 0 : 1;

    if (direction === 'L') {
      trackingPos -= val;
    } else {
      trackingPos += val;
    }

    let newPos = trackingPos;

    if (trackingPos < 0) {
      code2 += (extraTurns + startingAt0Offset);
      newPos = 100 + (trackingPos % 100);
    } else if (trackingPos > 100) {
      code2 += (extraTurns + startingAt0Offset);
      newPos = (trackingPos % 100);
    } else if (trackingPos === 100) {
      code1++;
      code2++;
      newPos = 0;
    } else if (trackingPos === 0) {
      code1++;
      code2++;
      newPos = 0;
    }

    console.info(
      'START: ', currentPos,
      '| Dir:', direction, val,
      '| DialTickChange:', dialTickChange,
      '| ExtraTurns:', extraTurns,
      '| NOW AT: ', newPos
    );
    console.info('Current code count:', code1, code2);

    currentPos = newPos;
  });

  return {
    partOne: code1,
    partTwo: code2,
  }
}
