import { readInputFile } from '@helpers/fs';

type Day5ReturnValue = {
  partOne: number;
};

export default async function (inputFile: string): Promise<Day5ReturnValue> {
  const input = await readInputFile(inputFile);

  console.log(input);

  return {
    partOne: 0,
  };
}
