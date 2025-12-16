import { readInputFile, FsPathLike } from '@helpers/fs';

type Day6Solution = {
  partOne: number;
  partTwo: number;
};

type Operands = number[][];
type Operators = string[];

async function handleInputPartOne(inputFile: string | FsPathLike): Promise<{
  operands: Operands;
  operators: Operators;
}> {
  const input = (await readInputFile(inputFile)).split('\n');
  let operands: number[][] = [];
  let operators: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const vals = line.trim().split(/\s+/);

    // Initialize operands at start of iteration
    if (i === 0) {
      let { length } = vals;
      operands = new Array(length);
      while (length--) {
        operands[length] = [];
      }
    }

    if (isNaN(parseInt(vals[0]))) {
      operators = vals;
    } else {
      vals.forEach((val, index) => {
        const parsedVal = parseInt(val, 10);

        operands[index].push(parsedVal);
      });
    }
  }

  return { operands, operators };
}

async function handleInputPartTwo(inputFile: string | FsPathLike): Promise<{
  operands: Operands;
  operators: Operators;
}> {
  const input = (await readInputFile(inputFile)).split('\n');
  let operators: Operators = [];
  let operatorIndex = 0;

  // setup
  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.includes('*') || line.includes('+')) {
      operatorIndex = i;
      operators = line.trim().split(/\s+/g).reverse();
    }
  }

  input.splice(operatorIndex, 1);

  // This will be backwards grouping of
  const done = [];
  let operandsInProgress: number[] = [];

  for (let i = input[0].length - 1; i >= -1; i--) {
    let emptyChars = 0;
    let operandInProgress: number[] = [];

    for (let j = 0; j < input.length; j++) {
      const charToCheck = input[j][i];

      if (charToCheck === ' ' || i === -1) {
        emptyChars++;
        if (emptyChars === input.length) {
          done.push(operandsInProgress);
          operandsInProgress = [];
          continue;
        }
      } else {
        emptyChars = 0;
        const val = parseInt(charToCheck, 10);

        operandInProgress.push(val);
      }

      if (j === input.length - 1) {
        const parsedVal = operandInProgress
          .reverse()
          .reduce((prev, curr, index) => prev + curr * 10 ** index, 0);

        operandsInProgress.push(parsedVal);
        operandInProgress = [];
      }
    }
  }

  // console.log(done);
  // console.log(operators);

  return {
    operands: done,
    operators,
  };
}

function operate(operands: Operands, operators: Operators): number[] {
  const results: number[] = [];

  operands.forEach((operandList, index) => {
    const result = operandList.reduce((prev, curr, operandIdx) => {
      const operator = operators[index];

      switch (operator) {
        case '+':
          return prev + curr;
        case '*':
          if (operandIdx === 0) {
            return curr;
          }
          return prev * curr;
      }

      return prev + curr;
    }, 0);

    results.push(result);
  });

  return results;
}

export async function solvePartOne(
  inputFile: string | FsPathLike,
): Promise<Day6Solution['partOne']> {
  const { operands, operators } = await handleInputPartOne(inputFile);

  const results = operate(operands, operators);

  return results.reduce((prev, curr) => prev + curr, 0);
}

export async function solvePartTwo(
  inputFile: string | FsPathLike,
): Promise<Day6Solution['partTwo']> {
  const { operands, operators } = await handleInputPartTwo(inputFile);

  const results = operate(operands, operators);

  return results.reduce((prev, curr) => prev + curr, 0);
}
