# Advent of Code

Advent calendar of code puzzles. (see https://adventofcode.com/)

## Getting Started

### Installation & setup

```sh
(nvm use || echo "NVM not found; make sure your Node version is $(cat .nvmrc)") && yarn install
```

### Pulling down puzzles

```sh
npm run cli get-puzzle -- --year {YEAR} --day {DAY}
```

This will pull down the puzzle prompt as a `readme.md` file, and set up some quick solution boilerplate code:

**Pre-reqs:**

- Requries a `AOC_SECRET` token.
  1. Authenticate on the AoC site, and examine the session token from the browser devtools network tab (looks like `session="TOKEN HERE"`), in the cookies section.
  2. Add this token into a `.env` file, or pass as an env variable.
  3. Now you can run any of the `npm run cli` commands. 🙂

**Additionally:**

- Use an `AOC_YEAR` env variable to not have to type in the year everytime.
- (`AOC_DAY` env variable also exists)

### Running tests

```sh
# Run all tests
npm test
# Run watch mode; test as you code
npm test --watch
# Run a specific day's tests
npm test ./$DAY_NUMBER
```

### Linting & Formatting

```sh
# Lint
npm run lint
# Format
npm run format:check # Check if formatting is good
npm run format:fix   # Write fixes for formatting (work in a clean tree)
```

## Progress Tracking

<details>
<summary>2023</summary>

|  sun   |  mon   |  tues  |  wed   |  thu   |  fri   |  sat   |
| :----: | :----: | :----: | :----: | :----: | :----: | :----: |
|        |        |        |        |        |  ⭐⭐  | ⭐️⭐️ |
| ⭐️⭐️ | ⭐️⭐️ | ⭐️⭐️ | ⭐️⭐️ | ⭐️⭐️ | ⭐️⭐️ |   9    |
|   10   |   11   |   12   |   13   |   14   |   15   |   16   |
|   17   |   18   |   19   |   20   |   21   |   22   |   23   |
|   23   |   24   |   25   |   26   |   27   |   28   |   29   |
|   30   |   31   |        |        |        |        |        |

</details>
