import { readInputFile, FsPathLike } from '@helpers/fs';
import { lcm } from '@helpers/math';

const START = 'AAA';
const END = 'ZZZ';
const LEFT = 'L';
const RIGHT = 'R';
const START_CHAR = 'A';
const END_CHAR = 'Z';

type Day8Solution = {
  path: string[];
  length: number;
};
type PartToSolve = 1 | 2;

export default async function solver(
  inputFile: string | FsPathLike,
  partToSolve: PartToSolve = 1,
): Promise<Day8Solution> {
  const input = (await readInputFile(inputFile)).split('\n').filter((line) => line !== '');

  const instructions = input.splice(0, 1)[0];
  const nodes = input.map((line) => {
    const [nodeName, left, right] = [...line.matchAll(/[A-Z1-9]+/g)];

    return { nodeName: nodeName[0], branches: [left[0], right[0]] };
  });

  const path = [];
  let partTwoLength = 0;
  let index = 0;

  if (partToSolve === 1) {
    let currentNode = START;
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

      ++index;
    }
  } else {
    const startNodes = nodes.filter(({ nodeName }) => nodeName.charAt(2) === START_CHAR);
    const pathLengths = startNodes.map((n) => {
      let currentNode = n.nodeName;
      const currentPath = [];
      while (currentNode.charAt(2) !== END_CHAR) {
        const currentInstruction = instructions[index % instructions.length];
        const node = nodes.find(({ nodeName }) => nodeName === currentNode);

        if (currentInstruction === LEFT) {
          currentNode = node?.branches[0] as string;
          currentPath.push(LEFT);
        } else if (currentInstruction === RIGHT) {
          currentNode = node?.branches[1] as string;
          currentPath.push(RIGHT);
        }

        ++index;
      }
      return currentPath.length;
    });

    partTwoLength = pathLengths.reduce(lcm);
  }

  return {
    path,
    length: partToSolve === 1 ? path.length : partTwoLength,
  };
}
