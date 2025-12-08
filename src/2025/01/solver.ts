import { readInputFile, FsPathLike } from '@helpers/fs';

type Day1Solution = {
  partOne: number;
  partTwo: number;
};

const initialPosition = 50;

type Direction = 'L' | 'R';

export default async function solver(inputFile: string | FsPathLike): Promise<Day1Solution> {
  const input = (await readInputFile(inputFile)).split('\n');
  const permutations = input.map((str: string) => ({
    direction: str.charAt(0) as Direction,
    value: str.slice(1),
  }));

  let currentPos = initialPosition;

  let code1 = 0;
  let code2 = 0;

  permutations.forEach(({ direction, value }) => {
    const val = parseInt(value, 10);
    const extraTurns = Math.floor(val / 100);
    const dialTicks = val % 100;

    let trackingPos = currentPos;

    // If we're starting at 0, a change will trigger a code block below,
    // but not necessarily mean we pass 0. We're starting at zero already.
    const startingAt0Offset = currentPos === 0 ? 0 : 1;

    // Track change in value, but we won't care about the hundreds place
    // so let's just use the 'dialTicks'
    if (direction === 'L') {
      trackingPos -= dialTicks;
    } else {
      trackingPos += dialTicks;
    }

    let newPos = trackingPos;

    if (trackingPos < 0) {
      // We went negative, meaning we potentially passed zero.
      // Add the zero offset to the counter (+1 if we weren't starting at zero already)
      // and add any extra turns from the hundreds place
      code2 += extraTurns + startingAt0Offset;
      newPos = 100 + trackingPos; // 100 - mod100 value change
    } else if (trackingPos > 100) {
      // We went passed 100, and therefore hit zero
      code2 += extraTurns + startingAt0Offset;
      newPos = trackingPos % 100;
    } else if (trackingPos === 100 || trackingPos === 0) {
      // We hit zero or 100 exactly, new position is 0
      code1++;
      code2 += extraTurns + 1;
      newPos = 0;
    } else if (extraTurns > 0) {
      // Let's not forget to count in the hundreds place that we dropped before
      // Those are full turns to add to the counter!
      code2 += extraTurns;
    }

    // console.info(
    //   'START: ', currentPos,
    //   '| Dir:', direction, val,
    //   '| ExtraTurns:', extraTurns,
    //   '| NOW AT: ', newPos
    // );
    // console.info('Current code count:', code1, code2);

    // update pos for next iteration
    currentPos = newPos;
  });

  return {
    partOne: code1,
    partTwo: code2,
  };
}
