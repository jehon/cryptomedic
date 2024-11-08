#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import { globSync } from "glob";
import assert from "node:assert/strict";
import { parseArgs } from "node:util";
import path from "path";
import pixelMatch from "pixelmatch";
import { PNG } from "pngjs";

const p_ok = chalk.green(" ✓ ");
const p_warn = chalk.yellow(" ? ");
const p_ko = chalk.red("✗  ");

const args = parseArgs({
  options: {
    references: {
      type: "string"
    },
    screenshots: { type: "string" },
    results: { type: "string" },
    update: { type: "boolean" }
  }
}).values;
assert(args.references, "You must specify a reference: --reference");
assert(args.screenshots, "You must specify a screenshots: --screenshots");
assert(args.results, "You must specify a results: --results");

const root = process.cwd();

console.info(`Generating relative to ${root}`);

const MaxDiffs = {
  sizePercent: 0.1,
  contentPixels: 40
};

class Diff {
  reference?: string;
  runtime?: string;
  difference?: string;
  differenceSize: number = 0;
  differencePixes: number = 0;
  problem: boolean = false;
  warning: boolean = false;
  message: string = "";
}

function rnd(v: number): string {
  return Math.round(v * 100) + "%";
}

function align(msg: string, n: number) {
  return msg.padEnd(n);
}

// Full list of files
const fullListOfFiles = new Map<string, Diff>();

const listOfFiles = new Map<string, Diff>();

const referencesFolder: string = args.references!;
const screenshotsFolder: string = args.screenshots!;
const resultsFolder = args.results!;
const stylesJSON = path.join(resultsFolder, "styles.json");
const differenceFolder = path.join(resultsFolder, "differences");

fs.mkdirSync(differenceFolder, { recursive: true });

// Add the run
globSync("**/*.png", { cwd: screenshotsFolder }).map((f) => {
  const key = path.basename(f);
  let diff = listOfFiles.get(key);
  if (!diff) {
    diff = new Diff();
  }

  diff.runtime = path.join(screenshotsFolder, f);
  listOfFiles.set(key, diff);
});

// Add the ref
globSync("**/*.png", { cwd: referencesFolder }).map((f) => {
  const key = path.basename(f);
  let diff = listOfFiles.get(key);
  if (!diff) {
    diff = new Diff();
  }

  diff.reference = path.join(referencesFolder, f);
  listOfFiles.set(key, diff);
  fullListOfFiles.set(key, diff);
});

const maxFilenameLength = Array.from(listOfFiles.keys()).reduce(
  (prev, val) => Math.max(prev, val.length),
  0
);

for (const [key, diff] of listOfFiles) {
  if (!diff.reference) {
    diff.problem = true;
    diff.message = "No reference found";
  } else {
    if (!diff.runtime) {
      diff.problem = true;
      diff.message = "No run found";
    } else {
      // Generate the diffs
      const pngReference = PNG.sync.read(fs.readFileSync(diff.reference));
      const pngRuntime = PNG.sync.read(fs.readFileSync(diff.runtime));
      const { width, height } = pngReference;
      const pngDifference = new PNG({ width, height });
      diff.differenceSize = Math.abs(
        1 -
          (pngRuntime.height * pngRuntime.width) /
            (pngReference.height * pngReference.width)
      );
      if (diff.differenceSize > 0) {
        diff.problem = true;
        diff.message = `size    - ${rnd(diff.differenceSize)} vs. ${
          MaxDiffs.sizePercent
        }`;
      } else {
        diff.differencePixes = pixelMatch(
          pngReference.data,
          pngRuntime.data,
          pngDifference.data,
          width,
          height /*, { threshold: 0.1 } */
        );
        if (diff.differencePixes > 0) {
          if (diff.differencePixes > MaxDiffs.contentPixels) {
            diff.problem = true;
            diff.message = `content - ${diff.differencePixes} vs. ${MaxDiffs.contentPixels}`;
          } else {
            diff.warning = true;
            diff.message = `content - ${diff.differencePixes}`;
          }
          diff.difference = path.join(differenceFolder, key);
          fs.writeFileSync(diff.difference, PNG.sync.write(pngDifference));
        }
      }
    }
  }

  if (diff.problem || diff.warning) {
    if (diff.problem) {
      console.error(
        `${p_ko}: ${align(key, maxFilenameLength)}: ${diff.message}`
      );
    } else {
      console.warn(
        `${p_warn}: ${align(key, maxFilenameLength)}: ${diff.message}`
      );
    }
  } else {
    console.info(`${p_ok}: ${align(key, maxFilenameLength)}`);
  }
}
let success = true;

if (args.update) {
  console.info("Updating references...");
  for (const [key, diff] of listOfFiles) {
    if (!diff.problem && !diff.warning) {
      continue;
    }
    if (!diff.runtime) {
      console.error(
        `${p_ko}: ${align(key, maxFilenameLength)} does not have a run`
      );
      success = false;
      continue;
    }
    if (!diff.reference) {
      console.error(
        `${p_ko}: ${align(key, maxFilenameLength)} does not have a reference`
      );
      success = false;
      continue;
    }
    process.stdout.write(`[update] ${key}\n`);
    fs.copyFileSync(diff.runtime, diff.reference);
  }
} else {
  fs.writeFileSync(
    stylesJSON,
    JSON.stringify(Object.fromEntries(listOfFiles), null, 2)
  );

  success =
    Array.from(listOfFiles.values()).filter((diff) => diff.problem).length == 0;
}

if (!success) {
  console.error(p_ko, "some tests did fail");
  process.exit(1);
}
console.info(p_ok, "ok");
process.exit(0);
