#!/usr/bin/env sh

AOC_SECRET="53616c7465645f5fd24fa06eca57c274e7a8f247c8d30d360d05dbbb104f894daf064a6a6a1b5acccfd5a56fcb1aa8bbca56e2997828a539f17d587d5e59c977"

http --body --check-status https://adventofcode.com/2023/day/8 "Cookie:session=$AOC_SECRET"