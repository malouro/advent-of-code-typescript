import { readInputFile, FsPathLike } from '@helpers/fs';

type Day5Solution = {
  partOne: number | null;
  partTwo: number | null;
};

async function handleInput(
  inputFile: string | FsPathLike,
): Promise<{ ranges: string[]; avail: string[] }> {
  const input = (await readInputFile(inputFile)).split('\n');
  const separatorIdx = input.indexOf('');
  const [ranges, avail] = [[...input.slice(0, separatorIdx)], [...input.slice(separatorIdx + 1)]];

  return {
    ranges,
    avail,
  };
}

function checkIsInRange(input: number, ranges: string[], mins: number[], maxs: number[]): boolean {
  for (let i = 0; i < ranges.length; i++) {
    if (mins[i] > input) {
      continue;
    }
    if (maxs[i] < input) {
      continue;
    }
    if (input >= mins[i] && input <= maxs[i]) {
      return true;
    }
  }

  return false;
}

export async function solvePartOne(
  inputFile: string | FsPathLike,
): Promise<Day5Solution['partOne']> {
  const { ranges, avail } = await handleInput(inputFile);
  const mins: number[] = [];
  const maxs: number[] = [];
  const fresh: number[] = [];

  for (const range of ranges) {
    const [min, max, ..._other] = range.split('-');
    const minInt = parseInt(min, 10);
    const maxInt = parseInt(max, 10);

    mins.push(minInt);
    maxs.push(maxInt);
  }

  for (const availableId of avail) {
    const id = parseInt(availableId, 10);

    if (checkIsInRange(id, ranges, mins, maxs)) {
      fresh.push(id);
    }
  }

  return fresh.length;
}

// TODO - This is not working :)
export async function solvePartTwo(
  inputFile: string | FsPathLike,
): Promise<Day5Solution['partTwo']> {
  interface RangeType {
    min: number;
    max: number;
  }

  const { ranges } = await handleInput(inputFile);
  const Ranges: RangeType[] = [];
  let fresh = 0;

  // let lowestMin = Number.MAX_SAFE_INTEGER;
  // let largestMax = 0;

  for (const range of ranges) {
    const [min, max, ..._other] = range.split('-');
    const minInt = parseInt(min, 10);
    const maxInt = parseInt(max, 10);
    const totalRanges = Ranges.length;

    // if (minInt < lowestMin) {
    //   lowestMin = minInt;
    // }
    // if (maxInt > largestMax) {
    //   largestMax = maxInt;
    // }

    let updatedARange = false;
    let mightBeNewRange = false;

    for (let i = 0; i < totalRanges; i++) {
      const Range = Ranges[i];

      if (minInt >= Range.min && maxInt <= Range.max) {
        mightBeNewRange = true;
        continue;
      }

      if (minInt <= Range.max) {
        if (minInt <= Range.min && maxInt >= Range.max) {
          Range.max = maxInt;
          Range.min = minInt;
          updatedARange = true;
        } else if (minInt <= Range.min && maxInt >= Range.min) {
          Range.min = minInt;
          updatedARange = true;
        } else if (maxInt <= Range.max) {
          mightBeNewRange = true;
        }
      } else if (maxInt >= Range.min) {
        if (maxInt >= Range.max && minInt <= Range.min) {
          Range.max = maxInt;
          Range.min = minInt;
          updatedARange = true;
        } else if (maxInt >= Range.max && minInt <= Range.max) {
          Range.max = maxInt;
          updatedARange = true;
        } else if (minInt >= Range.min) {
          mightBeNewRange = true;
        }
      }
    }

    if ((!updatedARange && mightBeNewRange) || Ranges.length === 0) {
      Ranges.push({ min: minInt, max: maxInt });
    }

    // console.log(Ranges);

    // if (Ranges.length === 0) {
    //   Ranges.push({ min: minInt, max: maxInt });
    // }
  }

  for (const Range of Ranges) {
    fresh += Range.max - Range.min + 1;
  }

  return fresh;
}
