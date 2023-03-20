#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { globSync } from "glob";
import pixelMatch from "pixelmatch";
import { PNG } from "pngjs";
import yargs from "yargs";

import {
  stylesRoot,
  inStyles,
  diffFolder,
  referenceFolder,
  runFolder,
  p_ok,
  p_warn,
  p_ko,
  stylesJSON,
  referenceUpdateFolder
} from "./lib.js";

fs.mkdirSync(stylesRoot, { recursive: true });
fs.mkdirSync(inStyles(diffFolder), { recursive: true });
fs.mkdirSync(inStyles(diffFolder, "desktop"), { recursive: true });
fs.mkdirSync(inStyles(diffFolder, "mobile"), { recursive: true });

// Configurations
const MaxDiffs = {
  sizePercent: 0.1,
  contentPixels: 40
};

const listOfFiles = [];
// Add the ref
globSync("**/*.png", { cwd: inStyles(referenceFolder) }).map((f) =>
  listOfFiles.push({
    key: f,
    ref: path.join(referenceFolder, f)
  })
);

// Add the run
globSync("**/*.png", { cwd: inStyles(runFolder) }).map((f) =>
  listOfFiles.push({
    key: f,
    run: path.join(runFolder, f)
  })
);

const problemsList = Object.values(
  listOfFiles.reduce((acc, val) => {
    // Join ref and run
    // { fk1: f1+f1, fk2: f2 } => [ f1 f2 f3 ]
    acc[val.key] = {
      ...acc[val.key],
      ...val
    };
    return acc;
  }, {})
)
  .map((fset) => {
    fset.problem = false;
    fset.warning = false;

    if (!("ref" in fset)) {
      fset.problem = true;
      fset.problemText = "No reference found";
    }
    if (!("run" in fset)) {
      fset.problem = true;
      fset.problemText = "No run found";
    }

    if (!fset.problem) {
      // Generate the diffs
      fset.diff = path.join(diffFolder, fset.key);
      const ref = PNG.sync.read(fs.readFileSync(inStyles(fset.ref)));
      const run = PNG.sync.read(fs.readFileSync(inStyles(fset.run)));
      const { width, height } = ref;
      const diffPNG = new PNG({ width, height });

      fset.diffSize = Math.abs(
        1 - (run.height * run.width) / (ref.height * ref.width)
      );
      if (fset.diffSize == 0) {
        fset.diffPixels = pixelMatch(
          ref.data,
          run.data,
          diffPNG.data,
          width,
          height /*, { threshold: 0.1 } */
        );
      }

      const r = (v) => Math.round(v * 100) + "%";

      if (fset.diffSize == 0 && "diffPixels" in fset && fset.diffPixels == 0) {
        fs.unlinkSync(inStyles(fset.ref));
      } else {
        if (fset.diffSize > 0) {
          // if (fset.diffSize > MaxDiffs.sizePercent) {
          fset.problem = true;
          fset.problemText = `size    - ${r(fset.diffSize)} vs. ${
            MaxDiffs.sizePercent
          }`;
          // }
        } else {
          if (fset.diffPixels > 0) {
            if (fset.diffPixels > MaxDiffs.contentPixels) {
              fset.problem = true;
              fset.problemText = `content - ${fset.diffPixels} vs. ${MaxDiffs.contentPixels}`;
            } else {
              fset.warning = true;
              fset.warningText = `content - ${fset.diffPixels}`;
            }
          }
        }

        fs.writeFileSync(inStyles(fset.diff), PNG.sync.write(diffPNG));
      }
    }
    if (fset.problem || fset.warning) {
      if (fset.problem) {
        console.error(`${p_ko}: ${fset.key} ${fset.problemText}`);
      } else {
        console.warn(`${p_warn}: ${fset.key} ${fset.warningText}`);
      }
    } else {
      console.info(`${p_ok}: ${fset.key}`);
    }
    return fset;
  })
  .filter((fset) => fset.problem || fset.warning);

console.info("---------------------");

fs.writeFileSync(stylesJSON, JSON.stringify(problemsList, null, 2));

const args = yargs(process.argv.slice(2)).boolean("update").argv;
if (args.update) {
  for (const fset of problemsList) {
    if (!fset.problem && !fset.warning) {
      continue;
    }
    if (!fset.run) {
      console.error(`${p_ko}: ${fset.key} does not have a run`);
      continue;
    }
    process.stdout.write(`[update] ${fset.key}\n`);
    fs.copyFileSync(
      inStyles(fset.run),
      path.join(referenceUpdateFolder, fset.key)
    );
  }
} else {
  if (problemsList.filter((fset) => fset.problem).length > 0) {
    console.error(p_ko, "some tests did fail");
    process.exit(1);
  }

  console.info(p_ok, "ok");
  process.exit(0);
}