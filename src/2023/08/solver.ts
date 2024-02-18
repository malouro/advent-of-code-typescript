import { readInputFile, FsPathLike } from '@helpers/fs';

const START = 'AAA';
const END = 'ZZZ';
const LEFT = 'L';
const RIGHT = 'R';

type Day8Solution = {
  partOne: number;
};

export default async function solver(inputFile: string | FsPathLike): Promise<Day8Solution> {
  const input = (await readInputFile(inputFile)).split('\n').filter((line) => line !== '');

  const instructions = input.splice(0, 1)[0];
  const nodes = input.map((line) => {
    const [nodeName, left, right] = [...line.matchAll(/[A-Z]+/g)];

    return { nodeName: nodeName[0], branches: [left[0], right[0]] };
  });

  let currentNode = START;
  let index = 0;
  const path = [];

  while (currentNode !== END) {
    const node = nodes.find(({ nodeName }) => nodeName === currentNode);
    const currentInstruction = instructions[index % instructions.length];

    if (currentInstruction === LEFT) {
      currentNode = node?.branches[0] as string;
      path.push(LEFT);
    } else if (currentInstruction === RIGHT) {
      currentNode = node?.branches[1] as string;
      path.push(RIGHT);
    }

    index++;
  }

  console.log(path);

  return {
    partOne: path.length,
  };
}
