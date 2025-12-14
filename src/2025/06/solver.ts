import { readInputFile, FsPathLike } from '@helpers/fs';

type Day6Solution = {
  partOne: number;
  partTwo: number;
};

async function handleInput(inputFile: string | FsPathLike) {
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

export default async function solver(inputFile: string | FsPathLike): Promise<Day6Solution> {
  const { operands, operators } = await handleInput(inputFile);
  const results: number[] = [];

  console.log('Operands', operands);
  console.log('Operators', operators);

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

  console.log(results);

  return {
    partOne: results.reduce((prev, curr) => prev + curr, 0),
    partTwo: 0,
  };
}
