#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { globSync } from "glob";
import pixelMatch from "pixelmatch";
import { PNG } from "pngjs";
import yargs from "yargs";
import chalk from "chalk";

export const p_ok = chalk.green(" ✓ ");
export const p_warn = chalk.yellow(" ? ");
export const p_ko = chalk.red("✗  ");

const args = await yargs(process.argv.slice(2)).options({
  root: { type: "string", required: true },
  references: { type: "string", required: true },
  runtime: { type: "string", required: true },
  target: { type: "string", required: true },
  update: { type: "boolean", default: false }
}).argv;

const root = args.root;
const referencesFolder = args.references;
const runtimeFolder = args.runtime;
const targetFolder = args.target;
const differenceFolder = path.join(targetFolder, "differences");
const stylesJSON = path.join(targetFolder, "styles-problems-list.json");

const MaxDiffs = {
  sizePercent: 0.1,
  contentPixels: 40
};

fs.mkdirSync(targetFolder, { recursive: true });
fs.mkdirSync(differenceFolder, { recursive: true });
fs.mkdirSync(path.join(differenceFolder, "desktop"), { recursive: true });
fs.mkdirSync(path.join(differenceFolder, "mobile"), { recursive: true });

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

function rel2abs(str: string): string {
  return path.join(root, str);
}

function abs2rel(str: string): string {
  return str.substring(root.length + 1);
}

// Full list of files
const listOfFiles = new Map<string, Diff>();

for (const flavor of ["desktop", "mobile"]) {
  // Add the run
  const runSubFolder = path.join(runtimeFolder, flavor, "screenshots");
  globSync("**/*.png", { cwd: runSubFolder }).map((f) => {
    const key = path.join(flavor, path.basename(f));
    let diff = listOfFiles.get(key);
    if (!diff) {
      diff = new Diff();
    }

    diff.runtime = abs2rel(path.join(runSubFolder, f));
    listOfFiles.set(key, diff);
  });

  // Add the ref
  const refSubFolder = path.join(referencesFolder, flavor);
  globSync("**/*.png", { cwd: refSubFolder }).map((f) => {
    const key = path.join(flavor, path.basename(f));
    let diff = listOfFiles.get(key);
    if (!diff) {
      diff = new Diff();
    }

    diff.reference = abs2rel(path.join(refSubFolder, f));
    listOfFiles.set(key, diff);
  });
}

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
      const pngReference = PNG.sync.read(
        fs.readFileSync(rel2abs(diff.reference))
      );
      const pngRuntime = PNG.sync.read(fs.readFileSync(rel2abs(diff.runtime)));
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
          diff.difference = abs2rel(path.join(differenceFolder, key));
          fs.writeFileSync(
            rel2abs(diff.difference),
            PNG.sync.write(pngDifference)
          );
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

console.info("---------------------");

fs.writeFileSync(
  stylesJSON,
  JSON.stringify(Object.fromEntries(listOfFiles), null, 2)
);

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
      continue;
    }
    if (!diff.reference) {
      console.error(
        `${p_ko}: ${align(key, maxFilenameLength)} does not have a reference`
      );
      continue;
    }
    process.stdout.write(`[update] ${key}\n`);
    // fs.copyFileSync(rel2abs(diff.runtime), rel2abs(diff.reference));
  }
} else {
  if (
    Array.from(listOfFiles.values()).filter((diff) => diff.problem).length > 0
  ) {
    console.error(p_ko, "some tests did fail");
    process.exit(1);
  }
  console.info(p_ok, "ok");
  process.exit(0);
}
